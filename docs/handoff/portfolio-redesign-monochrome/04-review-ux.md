# Revisión UX: rediseño monocromo del portfolio (React + Vite)

**Contexto asumido:** portfolio público de una sola página con anclas (Hero, Stats, Stack, Work, About, Contact, Footer). Tarea principal del visitante: entender quién es y contactar o ver proyectos. No hay formularios, ni datos asíncronos, así que los estados de carga, vacío y error no aplican. La interacción es navegación por anclas, cambio de idioma, menú móvil, animaciones de entrada y enlaces externos.

**Resumen:** la jerarquía tipográfica, el gating de movimiento con `prefers-reduced-motion` y el CTA principal están bien resueltos. El problema de mayor impacto son los objetivos táctiles de texto en móvil (enlaces de tarjetas, footer y handle del Hero) por debajo de 24px de alto, que incumplen el mínimo de WCAG 2.2 AA. El segundo son los dos enlaces idénticos de cada tarjeta de proyecto. El titular ES a 390px sigue sin verificarse en navegador.

## Hallazgos

### Bloqueante: enlaces de texto con menos de 24px de alto en móvil
**Ley:** Fitts (tamaño del objetivo; criterio de accesibilidad básica) · **Dónde:** `src/components/Projects.css:20-21` (`.card-links a`), `src/components/Footer.css:7-8` y `:11-14` (`.footer-links a`), `src/components/Hero.css:51` (`.hero-handle` dentro de `.hero-foot`)
**Problema:** en móvil estos enlaces son texto de 10-11px sin padding vertical ni `min-height`. Su caja clicable mide unos 13-17px de alto. El patrón `.hit44` existe en el proyecto, pero no se aplica aquí. Con el pulgar, "Code", "Demo", GitHub, LinkedIn o el handle son muy difíciles de acertar.
**Fix:**
```css
/* Projects.css, Footer.css y Hero.css: dentro de @media (max-width: 768px) */
.card-links a,
.footer-links a,
.hero-handle { display: inline-flex; align-items: center; min-height: 44px; }
```

### Advertencia: el pill "Home" sigue activo mientras se lee Stats
**Ley:** Jakob / Mental Model (la navegación indica una posición que no es la real) · **Dónde:** `src/components/Navigation.jsx:8` y `:22-32`
**Problema:** `ids` no incluye `stats`, así que el `IntersectionObserver` nunca marca esa sección. Mientras el usuario lee las cifras, el pill "Home" sigue resaltado en blanco. Es el único indicador de posición de la barra.
**Fix:** añadir `'stats'` a `ids` (el pill puede seguir sin enlace si el mockup no lo muestra, o filtrar en el render con `ids.filter((id) => id !== 'stats')`), o mapear `stats` a `home` en el callback del observer.

### Advertencia: los dos enlaces de tarjeta llevan al mismo sitio
**Ley:** Hick (más opciones que decidir) y Tesler (complejidad trasladada al usuario) · **Dónde:** `src/components/Projects.jsx:34` (flecha `card-arrow` con `href={project.demo}`) y `:45` (enlace "Demo")
**Problema:** cada tarjeta ofrece la flecha y "Demo" con el mismo destino, más "Code". Son tres caminos para dos destinos, y el visitante tiene que decidir cuál es el "bueno".
**Fix:** dejar la flecha como elemento decorativo (`<span aria-hidden="true">`) o quitar el enlace "Demo" y mantener la flecha como CTA principal. Si la flecha es decorativa, quitar también `hit44` y `icon-btn` interactivos.

### Advertencia: el titular ES a 390px podría recortarse sin aviso
**Ley:** Gestalt / Prägnanz y carga cognitiva (titular cortado) · **Dónde:** `src/components/Hero.css:47` y `src/styles/index.css:27` (`body { overflow-x: hidden }`)
**Problema:** en móvil `.hero-title` usa `clamp(48px, 15vw, 58px)`, que a 390px resuelve a 58px. "INGENIERO" está en `white-space: nowrap` dentro de `.hero-line`. Si la palabra supera los ~350px de caja disponible, `overflow-x: hidden` la recorta sin scroll ni aviso. Es una estimación aproximada, no una medición.
**Fix:** medir en navegador a 390px (ancho de `.hero-line` y `scrollWidth` del `h1` en EN y ES, ambos <= 350px). Si no cabe, bajar el factor a `14vw` o aplicar un tamaño menor solo con `:lang(es)`.

### Advertencia: el selector de idioma oculta su texto visible al lector de pantalla
**Ley:** Jakob / Postel (lo que ve el usuario debe coincidir con lo que recibe la tecnología de apoyo; WCAG 2.5.3 Label in Name) · **Dónde:** `src/components/LanguageSwitcher.jsx:10` y `src/data/translations.js:3` y `:67`
**Problema:** el botón muestra "EN / ES", pero `aria-label` lo sustituye por "Switch language to Spanish". Un usuario de control por voz que diga "EN" o "ES" no encuentra el control.
**Fix:** quitar el `aria-label` (el nombre accesible será el texto visible) o anteponer el texto visible: `aria-label={`EN / ES: ${t.nav.switchLang}`}`.

### Advertencia: no hay estado de foco diseñado
**Ley:** Feedback / accesibilidad básica (WCAG 2.4.7 Focus Visible) · **Dónde:** `src/styles/index.css` (ninguna regla `:focus` ni `:focus-visible` en `src/`); botones blancos en `Hero.css:32` (`.hero-scroll`), `Navigation.css:12` (`.navpill.on`) y `Navigation.css:30` (`.nav-menu-btn`)
**Problema:** el foco de teclado depende del anillo por defecto del navegador. Sobre fondo negro, con botones blancos y con `a:hover { color: #fff }` en `index.css:32`, el anillo puede confundirse con el hover o tener poco contraste.
**Fix:** en `index.css`: `:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }`. Si el botón blanco no destaca, usar `outline-color: var(--accent)` solo en `:focus-visible` de los botones blancos.

### Advertencia: el menú móvil no bloquea el scroll ni devuelve el foco
**Ley:** Doherty / Jakob (el fondo se desplaza bajo el menú abierto; el foco se pierde al cerrar) · **Dónde:** `src/components/Navigation.jsx:37-43` (lista desplegable) y `:49-56` (botón)
**Problema:** con el menú abierto la página de detrás sigue haciendo scroll. Al cerrar con Escape o con un enlace, el foco no vuelve al botón de menú y el usuario de teclado vuelve al inicio de la página.
**Fix:** `useEffect` que dependa de `open`: `document.body.style.overflow = open ? 'hidden' : ''` (con limpieza en el cleanup) y `menuBtnRef.current?.focus()` al cerrar.

### Advertencia: CTA "View my resume" eliminado y claves de traducción huérfanas
**Ley:** Jakob (el mockup muestra un segundo CTA que no existe en la página) · **Dónde:** `src/components/Contact.jsx` (ausencia del botón) y `src/data/translations.js:62` y `:126` (`contact.resume`)
**Problema:** el mockup y el brief piden dos CTAs en la sección de contacto. Eliminar el botón con `href="#"` fue correcto, pero las claves `contact.resume` (EN y ES) quedan sin uso, y el visitante pierde la ruta al CV hasta que exista el PDF.
**Fix:** cuando exista el PDF, restaurar el botón `<a className="btn-ghost" href={`${import.meta.env.BASE_URL}resume.pdf`} download>` junto a `btn-solid`. Mientras tanto, borrar las dos claves para que el código no quede con texto muerto.

### Advertencia: objetivos de escritorio de 36px (navegación, idioma, GitHub, flecha)
**Ley:** Fitts · **Dónde:** `src/styles/index.css:75-79` (`.icon-btn`), `src/components/LanguageSwitcher.css:2` (`.lang-btn`), `src/components/Navigation.css:6-12` (`.navpill`, altura aproximada de 31px)
**Problema:** `.hit44` solo amplía el objetivo en móvil (`index.css:93-94`). En escritorio los controles miden 31-36px. Es aceptable con ratón, pero queda por debajo de la recomendación de 44px y de lo que usan los trackpads táctiles.
**Fix:** `min-height: 40px` en `.navpill`, y `min-height: 44px` en `.icon-btn` y `.lang-btn` a partir de `min-width: 769px`, o aplicar `hit44` también en escritorio.

## Lo que ya funciona bien
- El movimiento GSAP está protegido por `gsap.matchMedia` con `prefers-reduced-motion: no-preference` en `useAnimations.js`. Con reducción de movimiento, los contadores muestran su valor final en el HTML. No tocar en el refactor.
- La navegación tiene `aria-expanded`, `aria-controls`, `aria-label` en el botón de menú y cierre con Escape. El Hero duplica el titular en `sr-only` con el texto completo, así que el "Soft⚡ware" no rompe la lectura.
- Jerarquía clara: tag mono en acento, título grande y subtítulo en todas las secciones. El móvil reduce las decisiones (una columna en tarjetas y skills, idioma como pill de un solo código).

## Siguientes pasos
1. Corregir los objetivos táctiles de móvil (bloqueante): es un cambio de CSS de tres selectores.
2. Medir el titular ES a 390px en navegador y ajustar el `clamp` si recorta (verificación manual del tester).
3. Quitar el `aria-label` del selector de idioma y añadir `:focus-visible` en `index.css`.
4. Añadir `'stats'` al observer de la navegación.
5. Resolver la redundancia flecha/"Demo" en las tarjetas.
6. Pulido: bloqueo de scroll y foco en el menú móvil; restaurar o borrar `contact.resume`; objetivos de escritorio a 44px.

Medir después: clics en "Demo" frente a "Code" (si hay analítica), y errores de toque en móvil con una prueba real de pulgar en iPhone y Android.

Nota de alcance: no hay formularios ni datos asíncronos en el código revisado, así que los estados de carga, vacío y error quedan fuera del informe.
