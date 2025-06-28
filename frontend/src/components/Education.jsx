import React, { useState, useEffect, useRef } from 'react'
import { GraduationCap, Calendar, MapPin, BookOpen, ExternalLink } from 'lucide-react'

const Education = () => {
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

  const educationData = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Indian Institute of Information Technology Vadodara",
      location: "Vadodara, Gujarat",
      period: "Aug 2023 - Present",
      description: "Currently pursuing Bachelor of Technology with specialization in Computer Science and Engineering. Focused on core computer science concepts, programming fundamentals, and software engineering practices.",
      highlights: ["Software Development", "Data Structures", "OOPS", "DBMS", "Algorithms"],
      status: "Current"
    },
    {
      degree: "Higher Secondary Education (12th) - 90%",
      institution: "K.L. International School Meerut",
      location: "Meerut, India",
      period: "2023",
      description: "Completed higher secondary education with Science stream, achieving 90% marks. Strong foundation in Mathematics, Physics, Chemistry, and Computer Science.",
      highlights: ["Science Stream", "Mathematics", "Physics", "Computer Science"],
      status: "Completed"
    },
    {
      degree: "Secondary Education (10th) - 94.4%",
      institution: "K.L. International School Meerut",
      location: "Meerut, India", 
      period: "2021",
      description: "Completed secondary education with exceptional academic performance, scoring 94.4%. Built strong foundational knowledge across core subjects.",
      highlights: ["Academic Excellence", "Strong Foundation", "All Subjects", "Leadership Skills"],
      status: "Completed"
    }
  ]

  const publications = [
    {
      title: "The Intersection of Social Media, Technology, and Digital Discourse",
      publisher: "Evince Publications",
      date: "2024",
      description: "Contributed to Chapter 2 of a scholarly book analyzing digital equity and technological interventions for bridging societal divides in education. The chapter explores the role of technology in addressing social inequality.",
      link: "https://evincepub.com",
      type: "Book Chapter"
    }
  ]

  return (
    <section id="education" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Education</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My academic journey and continuous learning path
            </p>
          </div>

          {/* Education Cards */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-gray-900/30 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden ${
                  isVisible ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-500"></div>
                
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    edu.status === 'Current' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  }`}>
                    {edu.status}
                  </span>
                  <GraduationCap className="text-primary-600 dark:text-primary-400" size={20} sm:size={24} />
                </div>

                {/* Degree Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{edu.degree}</h3>
                
                {/* Institution & Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start text-gray-600 dark:text-gray-300">
                    <BookOpen size={16} className="mr-3 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{edu.institution}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{edu.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-3 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{edu.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Key Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900 dark:to-purple-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium border border-primary-200 dark:border-primary-700"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Publications */}
          <div className="mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Publications</h3>
            <div className="grid gap-6">
              {publications.map((pub, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/20 transition-all duration-300 ${
                    isVisible ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: `${(educationData.length + index) * 200}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">{pub.title}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <BookOpen size={14} className="mr-2" />
                          <span>{pub.publisher}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Calendar size={14} className="mr-2" />
                          <span>{pub.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-semibold">
                      {pub.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{pub.description}</p>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                  >
                    View Publication
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Education
