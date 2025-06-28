import React, { useState, useEffect, useRef } from 'react'
import { Briefcase, Calendar, MapPin, Users, Target, Award, ChevronRight } from 'lucide-react'

const Experience = () => {
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

  const experiences = [
    {
      title: "Software Development Intern",
      company: "DNote",
      location: "Remote",
      period: "July 2025 – Present",
      type: "Internship",
      description: "Currently working as a Software Development Intern at DNote, contributing to the design and development of AI-powered software solutions and acquiring hands-on experience in modern development practices and agile workflows.",
      achievements: [
        "Developing and implementing features for real-world applications with a focus on scalability and performance",
        "Collaborating closely with cross-functional teams and mentors to deliver high-quality solutions",
        "Participating in code reviews, daily stand-ups, and sprint planning sessions",
        "Applying industry best practices in software architecture, testing, and deployment",
        "Enhancing skills in modern development frameworks"
      ],
      technologies: ["React", "JavaScript", "Node.js", "Git", "Agile Methodologies", "Express"],
      current: true
    },
    {
      title: "General Secretary – IIITV Hostel",
      company: "Indian Institute of Information Technology Vadodara",
      location: "Vadodara, Gujarat",
      period: "June 2024 – May 2025",
      type: "Leadership Role",
      description: "Served as General Secretary for IIITV Hostel, responsible for student welfare, event coordination, and bridging communication between hostel administration and students.",
      achievements: [
        "Led hostel student body and managed student affairs effectively",
        "Organized cultural and academic events for hostel residents",
        "Facilitated communication between students and administration",
        "Implemented student welfare initiatives to improve hostel life",
        "Managed hostel resources and facilities efficiently"
      ],
      technologies: ["Leadership", "Event Management", "Communication", "Problem Solving", "Team Coordination"],
      current: false
    }
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Experience</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My professional journey and leadership experiences
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-purple-400 rounded-full opacity-80"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10 flex items-center justify-center">
                    <Briefcase size={16} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-1/2 md:pr-8' : 'md:pl-1/2 md:pl-8'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/20 p-6 sm:p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-gray-900/30 transition-all duration-300 transform hover:-translate-y-1">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mr-3">
                              {exp.title}
                            </h3>
                            {exp.current && (
                              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <Users size={16} className="mr-2" />
                              <span className="font-medium">{exp.company}</span>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <MapPin size={16} className="mr-2" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <Calendar size={16} className="mr-2" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-semibold">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-4">
                          <Target size={16} className="mr-2 text-accent-600 dark:text-accent-400" />
                          Key Responsibilities & Achievements
                        </h4>
                        <div className="space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start">
                              <ChevronRight size={16} className="mr-3 mt-0.5 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies/Skills */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Technologies & Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium border border-primary-200 dark:border-primary-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Stats */}
          <div className="mt-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl font-bold mb-2">2+</div>
                <div className="text-primary-100 text-sm sm:text-base">Active Roles</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl font-bold mb-2">2024</div>
                <div className="text-primary-100 text-sm sm:text-base">Leadership Since</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl font-bold mb-2">100%</div>
                <div className="text-primary-100 text-sm sm:text-base">Commitment</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
              Interested in working together or learning more about my experience?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-full hover:from-primary-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <span>Get In Touch</span>
              <ChevronRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
