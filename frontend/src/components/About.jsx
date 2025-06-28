import React, { useState, useEffect, useRef } from 'react'
import { User, Heart, Target, Zap, Award, Coffee } from 'lucide-react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const highlights = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Focused on creating impactful solutions that make a difference"
    },
    {
      icon: Zap,
      title: "Fast Learner",
      description: "Quickly adapt to new technologies and frameworks"
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Always putting user experience at the heart of development"
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Committed to writing clean, maintainable, and scalable code"
    }
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <User className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">About Me</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get to know the person behind the code
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {/* Content - Full Width */}
            <div className="space-y-6 sm:space-y-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                B.Tech Student & Software Development Intern
              </h3>
              
              <div className="space-y-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  I'm Hardik Kannoija, currently pursuing B.Tech in Computer Science and Engineering 
                  at the Indian Institute of Information Technology Vadodara. As a Software Development Intern 
                  at DNote, I'm passionate about building innovative  applications.
                </p>
                
                <p>
                  My expertise spans across the full stack - from React and Node.js on the frontend 
                  to MongoDB and Express.js on the backend. I'm particularly interested in 
                  modern development frameworks, and creating scalable web applications that solve 
                  real-world problems.
                </p>
                
                <p>
                  Beyond academics, I served as General Secretary at IIITV Hostel from June 2024 to May 2025, managing operations 
                  and student affairs. I'm actively involved in the tech community, participating in 
                  hackathons, coding competitions, and contributing to collaborative projects that 
                  push the boundaries of technology.
                </p>
              </div>
            </div>

            {/* Highlights Grid + Quick Facts */}
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* 2x2 Grid for highlight cards */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {highlights.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 transform hover:-translate-y-1 ${
                        isVisible ? 'animate-fade-in' : ''
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <item.icon className="text-primary-600 dark:text-primary-400 mb-3" size={20} />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Facts Card */}
              <div className="lg:col-span-1">
                <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg sm:text-xl">Quick Facts</h4>
                  <ul className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    <li>🎓 B.Tech CSE Student - IIIT Vadodara</li>
                    <li>💻 Software Development Intern at DNote</li>
                    <li>🏠 Ex-General Secretary - IIITV Hostel</li>
                    <li>📚 Full Stack Development Enthusiast</li>
                    <li>🎯 Problem Solver & Team Collaborator</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
