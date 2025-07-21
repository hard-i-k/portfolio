import React, { useState, useEffect } from 'react'
import { Menu, X, Home, User, BookOpen, Code, Briefcase, Mail, Moon, Sun, Download } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()

  const handleDownloadResume = () => {
    console.log('Download button clicked!')
    
    try {
      // Test 1: Check if file exists
      fetch('/resume/HARDIK KANNOJIA_202351044_IIITV-GNR.pdf', { method: 'HEAD' })
        .then(response => {
          console.log('File check response:', response.status, response.statusText)
          if (response.ok) {
            console.log('File exists, proceeding with download...')
            
            // Simple and reliable download method
            const link = document.createElement('a')
            link.href = '/resume/HARDIK KANNOJIA_202351044_IIITV-GNR.pdf'
            link.download = 'HARDIK KANNOJIA_202351044_IIITV-GNR.pdf'
            link.style.display = 'none'
            
            // Add to DOM, click, and remove
            document.body.appendChild(link)
            console.log('Link created and added to DOM')
            link.click()
            console.log('Link clicked')
            document.body.removeChild(link)
            console.log('Link removed from DOM')
            
            console.log('Resume download triggered successfully')
          } else {
            throw new Error(`File not accessible: ${response.status}`)
          }
        })
        .catch(error => {
          console.error('File check failed:', error)
          // Fallback: open in new tab
          console.log('Trying fallback: open in new tab')
          window.open('/resume/HARDIK KANNOJIA_202351044_IIITV-GNR.pdf', '_blank')
        })
    } catch (error) {
      console.error('Download failed:', error)
      // Ultimate fallback
      window.open('/resume/HARDIK KANNOJIA_202351044_IIITV-GNR.pdf', '_blank')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#experience', label: 'Experience', icon: Briefcase },
    { href: '#about', label: 'About', icon: User },
    { href: '#education', label: 'Education', icon: BookOpen },
    { href: '#skills', label: 'Skills', icon: Code },
    { href: '#projects', label: 'Projects', icon: Briefcase },
    { href: '#contact', label: 'Contact', icon: Mail },
  ]

  const handleNavClick = (href) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:bg-gray-900/95 dark:border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="text-xl sm:text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
            >
              Hardik Kannoija
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === href.slice(1)
                    ? 'bg-primary-100 text-primary-700 shadow-md dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Download Resume Button */}
            <a
              href="/resume/HARDIK KANNOJIA_202351044_IIITV-GNR.pdf"
              download="HARDIK KANNOJIA_202351044_IIITV-GNR.pdf"
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Download size={16} />
              <span>Resume</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden absolute top-full left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg dark:bg-gray-900/95 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    activeSection === href.slice(1)
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ))}
              
              {/* Mobile Download Resume Button */}
              <a
                href="/resume/HARDIK KANNOJIA_202351044_IIITV-GNR.pdf"
                download="HARDIK KANNOJIA_202351044_IIITV-GNR.pdf"
                className="flex items-center space-x-3 px-4 py-3 bg-primary-600 text-white rounded-lg text-base font-medium hover:bg-primary-700 transition-all duration-200 w-full mt-4"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
