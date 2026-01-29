# 🚀 David | Backend Developer Portfolio

Portfolio personal con React + Vite, diseño futurista en tonos verdes, animaciones GSAP y soporte multiidioma.

## 📁 Estructura del Proyecto

```
portfolio-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.jsx / About.css
│   │   ├── Contact.jsx / Contact.css
│   │   ├── Footer.jsx / Footer.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Icons.jsx
│   │   ├── LanguageSwitcher.jsx / LanguageSwitcher.css
│   │   ├── MatrixRain.jsx / MatrixRain.css
│   │   ├── Navigation.jsx / Navigation.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── Skills.jsx / Skills.css
│   │   └── Terminal.jsx / Terminal.css
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── data/
│   │   ├── content.js
│   │   └── translations.js
│   ├── hooks/
│   │   └── useAnimations.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Instalación

```bash
# Clonar o descomprimir el proyecto
cd portfolio-react

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

## 🚀 Despliegue en GitHub Pages

### Paso 1: Crear repositorio

Crea un nuevo repositorio en GitHub (ej: `portfolio`)

### Paso 2: Configurar base URL

En `vite.config.js`, cambia `base` por el nombre de tu repositorio:

```js
export default defineConfig({
  base: '/nombre-de-tu-repo/',
  // ...
})
```

### Paso 3: Subir código

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### Paso 4: Desplegar

```bash
npm run build
npm run deploy
```

### Paso 5: Configurar GitHub Pages

- Ve a Settings > Pages
- Source: "Deploy from a branch"
- Branch: `gh-pages` / `/ (root)`
- Save

Tu sitio estará en: `https://tu-usuario.github.io/tu-repo/`

## 🎨 Personalización

### Información Personal

Edita `src/data/content.js`:

```js
export const personalInfo = {
  name: "Tu Nombre",
  yearsExperience: "X+",
  projectsCount: "XX+",
  dedication: "100%"
}

export const socialLinks = {
  email: "tu@email.com",
  github: "https://github.com/tu-usuario",
  linkedin: "https://linkedin.com/in/tu-usuario"
}
```

### Traducciones

Edita `src/data/translations.js` para modificar textos en inglés y español.

### Skills y Proyectos

Modifica los arrays `skillsData` y `projectsData` en `src/data/content.js`.

### Colores

Cambia las variables CSS en `src/styles/index.css`:

```css
:root {
  --green-400: #34d399;
  --green-500: #10b981;
  /* ... */
}
```

## ✨ Características

- ⚡ **Vite** - Build ultrarrápido
- ⚛️ **React 18** - Última versión
- 🎬 **GSAP** - Animaciones profesionales
- 🌍 **i18n** - Inglés/Español
- 📱 **Responsive** - Mobile-first
- 🎨 **CSS Modules** - Estilos modulares
- 🌙 **Tema oscuro** - Diseño futurista

## 📦 Dependencias

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "gsap": "^3.12.5"
}
```

## 📄 Licencia

MIT License - Siéntete libre de usar y modificar este portfolio.

---

Desarrollado con 💚 por David
