import React from 'react'
import { Heart, Github, Linkedin, Mail, ArrowUp, Code } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/hard-i-k',
      icon: Github,
      color: 'hover:text-gray-900 hover:bg-gray-100'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/hardik-kannoija-95b31629b',
      icon: Linkedin,
      color: 'hover:text-blue-600 hover:bg-blue-50'
    },
    {
      name: 'Email',
      href: 'mailto:hardikcp59@gmail.com',
      icon: Mail,
      color: 'hover:text-red-600 hover:bg-red-50'
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600 to-purple-600"></div>
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/15 rounded-full"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Code className="text-primary-400 mr-3" size={32} />
                <h3 className="text-2xl font-bold">Hardik Kannoija</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Full Stack Developer and B.Tech Computer Science student at IIIT Vadodara, 
                passionate about creating innovative web solutions with modern technologies. 
                Currently working as a Software Development Intern at DNote.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
              <div className="space-y-3 text-gray-300">
                <p>📧 hardikcp59@gmail.com</p>
                <p>📱 +91 8273337228</p>
                <p>📍 Vadodara, Gujarat</p>
                <p>🕒 Available for opportunities</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <div className="flex items-center text-gray-400 mb-4 md:mb-0">
                <span>© {currentYear} Hardik Kannoija. Made with</span>
                <Heart className="text-red-500 mx-2" size={16} />
                <span>and lots of ☕</span>
              </div>

              {/* Tech Stack */}
              <div className="flex items-center text-gray-400 text-sm">
                <span className="mr-2">Built with:</span>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">Tailwind</span>
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs">Vite</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary-600 to-purple-600 transition-all duration-300"
          style={{
            width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
          }}
        />
      </div>
    </footer>
  )
}

export default Footer
