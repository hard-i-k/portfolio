import React, { useState, useEffect, useRef } from 'react'
import { Code, Database, Cloud, Palette, Settings, Zap } from 'lucide-react'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('frontend')
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

  const skillCategories = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-purple-600',
      skills: [
        { name: 'React', level: 100, icon: '⚛️' },
        { name: 'JavaScript', level: 100, icon: '🟨' },
        { name: 'HTML5', level: 100, icon: '🧡' },
        { name: 'CSS3', level: 100, icon: '🎨' },
        { name: 'Tailwind CSS', level: 100, icon: '💨' },
        { name: 'Responsive Design', level: 100, icon: '📱' },
        { name: 'Redux', level: 100, icon: '🔄' },
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: Database,
      color: 'from-green-500 to-teal-600',
      skills: [
        { name: 'Node.js', level: 100, icon: '🟢' },
        { name: 'Express.js', level: 100, icon: '🚂' },
        { name: 'MongoDB', level: 100, icon: '🍃' },
        { name: 'MySQL', level: 100, icon: '🐬' },
        { name: 'REST APIs', level: 100, icon: '🔗' },
        { name: 'Cloudinary', level: 100, icon: '☁️' },
        { name: 'JSON', level: 100, icon: '📄' },
      ]
    },
    {
      id: 'tools',
      name: 'Tools & DevOps',
      icon: Settings,
      color: 'from-orange-500 to-red-600',
      skills: [
        { name: 'Git & GitHub', level: 100, icon: '📚' },
        { name: 'VS Code', level: 100, icon: '�' },
        { name: 'Chrome DevTools', level: 100, icon: '🔧' },
        { name: 'Figma', level: 100, icon: '🎨' },
        { name: 'Postman', level: 100, icon: '�' },
        { name: 'npm/yarn', level: 100, icon: '📦' },
        { name: 'Webpack', level: 100, icon: '�' },
        { name: 'Responsive Design', level: 100, icon: '�' },
      ]
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      skills: [
        { name: 'Problem Solving', level: 100, icon: '🧩' },
        { name: 'Team Collaboration', level: 100, icon: '👥' },
        { name: 'Communication', level: 100, icon: '💬' },
        { name: 'Project Management', level: 100, icon: '📋' },
        { name: 'Creativity', level: 100, icon: '💡' },
        { name: 'Adaptability', level: 100, icon: '🔄' },
        { name: 'Leadership', level: 100, icon: '👑' },
        { name: 'Time Management', level: 100, icon: '⏰' },
      ]
    }
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Code className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Skills & Expertise</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
            {skillCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <IconComponent size={18} sm:size={20} />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>

          {/* Skills Grid */}
          <div className="relative">
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className={`transition-all duration-500 ${
                  activeCategory === category.id
                    ? 'opacity-100 visible transform translate-y-0'
                    : 'opacity-0 invisible transform translate-y-4 absolute inset-0'
                }`}
              >
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 transform hover:-translate-y-1 ${
                        isVisible && activeCategory === category.id ? 'animate-scale-in' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-lg sm:text-2xl">{skill.icon}</span>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{skill.name}</h3>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-primary-600 dark:text-primary-400">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                          style={{
                            width: isVisible && activeCategory === category.id ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 100 + 300}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skill Highlights */}
          <div className="mt-16 grid gap-6 sm:gap-8 lg:grid-cols-3">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 sm:p-8 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center mb-4">
                <Code className="text-blue-600 dark:text-blue-400 mr-3" size={20} sm:size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Frontend Developer</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                Expert in creating responsive, interactive user interfaces with modern frameworks and best practices.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'HTML/CSS', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 sm:p-8 border border-green-100 dark:border-green-800">
              <div className="flex items-center mb-4">
                <Database className="text-green-600 dark:text-green-400 mr-3" size={20} sm:size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Backend Developer</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                Skilled in building scalable server-side applications, APIs, and database management systems.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express', 'MongoDB', 'REST API'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs sm:text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 sm:p-8 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <Cloud className="text-purple-600 dark:text-purple-400 mr-3" size={20} sm:size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Full Stack</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                End-to-end development capabilities with modern deployment practices and cloud technologies.
              </p>
              <div className="flex flex-wrap gap-2">
                {['AWS', 'Docker', 'Vercel', 'Git'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
