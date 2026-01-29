import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Terminal.css'

const Terminal = () => {
  const terminalRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".terminal", 
        { opacity: 0, x: 50, rotateY: -10 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1, delay: 1 }
      )
      
      gsap.fromTo(".code-line", 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.15, delay: 1.5 }
      )
    }, terminalRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={terminalRef}>
      <div className="terminal">
        <div className="terminal-header">
          <span className="terminal-dot dot-red" />
          <span className="terminal-dot dot-yellow" />
          <span className="terminal-dot dot-green" />
          <span className="terminal-title">DeveloperService.java</span>
        </div>
        <div className="terminal-body">
          <div className="code-line"><span className="code-annotation">@Service</span></div>
          <div className="code-line"><span className="code-keyword">public class</span> <span className="code-class">DeveloperService</span> {'{'}</div>
          <div className="code-line">&nbsp;&nbsp;</div>
          <div className="code-line">&nbsp;&nbsp;<span className="code-annotation">@Autowired</span></div>
          <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">private</span> <span className="code-class">SkillRepository</span> skills;</div>
          <div className="code-line">&nbsp;&nbsp;</div>
          <div className="code-line">&nbsp;&nbsp;<span className="code-keyword">public</span> <span className="code-class">Solution</span> <span className="code-method">buildProject</span>(<span className="code-class">Idea</span> <span className="code-param">idea</span>) {'{'}</div>
          <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> skills</div>
          <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span className="code-method">stream</span>()</div>
          <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span className="code-method">apply</span>(<span className="code-param">idea</span>)</div>
          <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span className="code-method">withPassion</span>()</div>
          <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span className="code-method">build</span>();</div>
          <div className="code-line">&nbsp;&nbsp;{'}'}</div>
          <div className="code-line">{'}'}</div>
        </div>
      </div>
    </div>
  )
}

export default Terminal
