import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ['Full Stack Developer', 'React Specialist', 'UI/UX Enthusiast', 'Problem Solver'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              Hi, I'm <span className="text-gradient">Your Name</span>
            </h1>
            
            <div className="hero-subtitle fade-in stagger-1">
              <span>I'm a </span>
              <span className="role-text">{roles[currentRole]}</span>
            </div>
            
            <p className="hero-description fade-in stagger-2">
              Passionate about creating exceptional digital experiences with modern 
              technologies. I love building responsive web applications that solve 
              real-world problems.
            </p>
            
            <div className="hero-actions fade-in stagger-3">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('#projects')}
              >
                View My Work
              </button>
              <a href="/resume.pdf" className="btn btn-secondary" download>
                <Download size={20} />
                Download CV
              </a>
            </div>
            
            <div className="social-links fade-in stagger-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:your.email@example.com" 
                className="social-link"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          <div className="hero-image fade-in stagger-2">
            <div className="image-placeholder">
              <div className="avatar">
                <span>YN</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className="scroll-indicator"
          onClick={() => scrollToSection('#about')}
          aria-label="Scroll to about section"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
