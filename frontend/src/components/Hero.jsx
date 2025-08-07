import React, { useState, useEffect } from 'react'
import { ArrowDown, Github, Linkedin, Mail, Download, MapPin, Coffee, Code2 } from 'lucide-react'

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  const roles = [
    'Full Stack Developer',
    'React Developer',
    'SDE Intern @ DNote',
    'Collaborative App Builder',
    'Problem Solver',
    'Software Engineer'
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const socialLinks = [
    { 
      href: 'https://github.com/hard-i-k', 
      icon: Github, 
      label: 'GitHub',
      color: 'hover:text-gray-900 hover:bg-gray-100'
    },
    { 
      href: 'https://www.linkedin.com/in/hardik-kannojia-95b31629b', 
      icon: Linkedin, 
      label: 'LinkedIn',
      color: 'hover:text-blue-600 hover:bg-blue-50'
    },
    { 
      href: 'mailto:hardikcp5@gmail.com', 
      icon: Mail, 
      label: 'Email',
      color: 'hover:text-red-600 hover:bg-red-50'
    },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/50 to-purple-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:from-primary-800/30 dark:to-purple-800/30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-200/50 to-pink-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:from-accent-800/30 dark:to-pink-800/30"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:from-blue-800/30 dark:to-indigo-800/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                <span>Vadodara, Gujarat • Currently Studying at IIIT Vadodara</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Hardik Kannoija
                </span>
              </h1>
              
              <div className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 h-12 flex items-center">
                <span className="mr-3">I'm a</span>
                <span className="text-primary-600 dark:text-primary-400 font-semibold min-w-0">
                  {roles[currentRole]}
                </span>
              </div>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              B.Tech Computer Science student at IIIT Vadodara with hands-on experience in full-stack development. Recently completed an SDE Internship at DNote (July 2025 – August 2025), where I engineered a collaborative note editor using React, BlockNote.js, Wasabi storage, and Supabase—streamlining workflows by 40% with rich text formatting, version control, seamless media handling, and real-time multi-user note sharing. Recognized as a Top 5 performer among 25 interns and awarded a special recommendation letter for exceptional contribution and development impact. Passionate about building scalable, user-centric solutions and contributing to innovative projects.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('#projects')}
                className="btn-glow bg-primary-600 hover:bg-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>View My Work</span>
                <Code2 size={18} sm:size={20} />
              </button>
              
              <a 
                href="/resume/HARDIK KANNOJIA_202351044_IIITV-GNR.pdf" 
                download="HARDIK KANNOJIA_202351044_IIITV-GNR.pdf"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Connect with me:</span>
              <div className="flex space-x-3">
                {socialLinks.map(({ href, icon: Icon, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${color} dark:hover:bg-gray-700`}
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>


          </div>

          {/* Profile Image */}
          <div className={`flex justify-center lg:justify-end transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-2 shadow-2xl animate-float mx-auto">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/hardik-profile.jpg" 
                    alt="Hardik Kannoija"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback initials */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center" style={{display: 'none'}}>
                    <span className="text-4xl sm:text-6xl font-bold text-gray-400 dark:text-gray-300">HK</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white dark:bg-gray-800 rounded-full p-2 sm:p-3 shadow-lg dark:shadow-gray-900/20 animate-bounce">
                <Coffee className="text-amber-600 dark:text-amber-400" size={20} sm:size={24} />
              </div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white dark:bg-gray-800 rounded-full p-2 sm:p-3 shadow-lg dark:shadow-gray-900/20 animate-bounce animation-delay-1000">
                <Code2 className="text-blue-600 dark:text-blue-400" size={20} sm:size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-16">
          <button 
            onClick={() => scrollToSection('#about')}
            className="animate-bounce-slow text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
