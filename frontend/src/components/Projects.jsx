import React, { useState, useEffect, useRef } from 'react'
import { ExternalLink, Github, Star, Eye, GitFork, Calendar } from 'lucide-react'

const Projects = () => {
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

  const projects = [
    {
      id: 1,
      title: "Skillverse - Full-Stack Course Platform & Developer Collaboration Hub",
      description: "A comprehensive learning platform with advanced features for course creation and community collaboration.",
      details: [
        "Multimedia Course Builder: Integrated PDF viewer, video modules, and interactive quiz system for a complete learning experience increasing variety of media through which a course can be designed.",
        "Secure Stripe Payments: Implemented seamless Stripe checkout and verification, increasing user payment success by 15%.",
        "Real-Time Chat Support: Enabled doubt resolution between learners and creators using WebSocket-based chat system.",
        "Teammate Finder Tool: Matched users based on skills and achievements to form teams for hackathons and projects.",
        "Blog Community Forum: Designed voting-enabled blog feature to share knowledge, boosting user-generated content.",
        "User Dashboard: Personalized progress tracking with role-based course access and performance insights.",
        "Optimized API performance using Express middleware, resulting in 30% faster content load times."
      ],
      image: "/images/skillverse-screenshoot.png",
      category: "fullstack",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Stripe", "WebSocket", "JWT"],
      github: "https://github.com/hard-i-k/SkillVerse",
      live: "https://skilled-verse.netlify.app",
      featured: true,
      stats: { stars: 25, forks: 8, views: 450 },
      date: "2025"
    },
    {
      id: 2,
      title: "Eco-Decor - Carbon Footprint-Based E-commerce",
      description: "An innovative sustainable e-commerce platform focused on environmental impact awareness and green shopping habits.",
      details: [
        "Developed an algorithm to estimate carbon footprint using material type and shipping weight.",
        "Built reward point system that increased low-emission product purchases by 20%.",
        "Added filters by emission rating to promote conscious and green shopping habits.",
        "Helped reduce environmental impact through tech-based product footprint awareness."
      ],
      image: "/images/eco-decor-screenshoot.png",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Carbon Footprint Calculation Algorithm", "Express.js"],
      github: "https://github.com/ArnabMallick12/Eco-Commerce",
      live: "https://eco-decor.netlify.app",
      featured: true,
      stats: { stars: 18, forks: 5, views: 320 },
      date: "2024"
    },
    {
      id: 3,
      title: "Research Publication - Digital Discourse Analysis",
      description: "Published research analyzing the intersection of social media, technology, and digital discourse in educational contexts.",
      details: [
        "Conducted comprehensive analysis of digital equity and technological interventions.",
        "Researched methods for bridging societal divides in education through technology.",
        "Published findings on social media's impact on educational discourse.",
        "Contributed to academic understanding of digital communication patterns."
      ],
      image: "/api/placeholder/600/400",
      category: "research",
      technologies: ["Research", "Data Analysis", "Academic Writing", "Social Technology"],
      github: "#",
      live: "https://evincepub.com",
      featured: false,
      stats: { stars: 0, forks: 0, views: 150 },
      date: "2024"
    },
    {
      id: 4,
      title: "Real-Time Chat Support System",
      description: "WebSocket-based real-time communication system enabling instant messaging between learners and course creators with message history, file sharing, and notification features.",
      image: "/api/placeholder/600/400",
      category: "backend",
      technologies: ["Node.js", "Socket.io", "WebSocket", "MongoDB", "Express.js"],
      github: "https://github.com/hard-i-k/chat-support",
      live: "#",
      featured: false,
      stats: { stars: 12, forks: 3, views: 200 },
      date: "2024"
    },
    {
      id: 5,
      title: "Teammate Finder Tool",
      description: "Smart matching platform that connects users based on skills and achievements to form effective teams for hackathons and collaborative projects using advanced algorithm matching.",
      image: "/api/placeholder/600/400",
      category: "frontend",
      technologies: ["React", "Algorithm Design", "Firebase", "Matching System"],
      github: "https://github.com/hard-i-k/teammate-finder",
      live: "#",
      featured: false,
      stats: { stars: 8, forks: 2, views: 180 },
      date: "2024"
    },
    {
      id: 6,
      title: "Blog Community Forum",
      description: "A modern blogging platform with community features, voting system, and user-generated content management for knowledge sharing and discussions.",
      image: "/api/placeholder/600/400",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "JWT"],
      github: "https://github.com/hardik-kannoija/blog-forum",
      live: "https://blog-community.netlify.app",
      featured: false,
      stats: { stars: 12, forks: 3, views: 200 },
      date: "2024"
    },
    {
      id: 7,
      title: "User Dashboard with Analytics",
      description: "A comprehensive dashboard application featuring data visualizations, user management, and performance insights with role-based access control.",
      image: "/api/placeholder/600/400",
      category: "frontend",
      technologies: ["React", "Chart.js", "Tailwind CSS", "REST API"],
      github: "https://github.com/hardik-kannoija/user-dashboard",
      live: "https://user-analytics-dashboard.netlify.app",
      featured: false,
      stats: { stars: 10, forks: 2, views: 150 },
      date: "2023"
    },
    // Profit Pilot project moved to the top for visibility
    {
      id: 8,
      title: "Profit Pilot – ML-Powered Retail Dashboard",
      description: "Smart dashboards for groceries and electronics to optimize pricing based on expiry, city demand, and product age. Achieved high accuracy in grocery price prediction, improving clearance rate by 30%. Deployed a depreciation model for electronics, helping sellers avoid late discounts. Enabled city-based dynamic pricing recommendations, boosting profit margins for sellers by 25%.",
      details: [
        "Built smart dashboards for groceries and electronics to optimize pricing based on expiry, city demand, and product age.",
        "Achieved accuracy in grocery price prediction, improving clearance rate by 30%.",
        "Deployed a depreciation model for electronics, helping sellers avoid late discounts.",
        "Enabled city-based dynamic pricing recommendations, boosting profit margins for sellers by 25%."
      ],
      image: "/images/Profit_Pilot_Dashboard_screenshot.png",
      category: "fullstack",
      technologies: ["React", "Machine Learning", "Python", "Pandas", "Scikit-learn", "Flask", "Data Visualization"],
      github: "https://github.com/hard-i-k/sparkathon2025_HackMonarchs",
      live: "#",
      featured: true,
      stats: { stars: 0, forks: 0, views: 0 },
      date: "2025"
    },
  ]

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Github className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Projects</h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A showcase of my technical skills and creative problem-solving
            </p>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Projects</h3>
            <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
              {featuredProjects.slice(0, 3).map((project, index) => (
                <div
                  key={project.id}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-gray-900/30 transition-all duration-500 transform hover:-translate-y-2 ${
                    isVisible ? 'animate-scale-in' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="h-64 w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="h-64 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 flex items-center justify-center" style={{display: 'none'}}>
                      <div className="text-6xl opacity-50">🚀</div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {project.featured && (
                        <span className="bg-accent-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      )}
                      <span className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                        {project.date}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 md:p-6 lg:p-6 xl:p-7">
                    <h4 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">{project.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 leading-relaxed text-xs sm:text-sm md:text-sm lg:text-base">{project.description}</p>
                    {/* Detailed Features */}
                    {project.details && (
                      <div className="mb-3 md:mb-4">
                        <ul className="space-y-1 md:space-y-2">
                          {project.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-xs sm:text-sm md:text-sm text-gray-600 dark:text-gray-300">
                              <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-xs md:text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 md:mb-6 text-xs sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="flex items-center">
                          <Star size={16} className="mr-1" />
                          <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork size={16} className="mr-1" />
                          <span>{project.stats.forks}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye size={16} className="mr-1" />
                          <span>{project.stats.views}</span>
                        </div>
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </a>
                      {/* Only show Live Demo if not Profit Pilot */}
                      {project.title !== "Profit Pilot – ML-Powered Retail Dashboard" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                        >
                          <ExternalLink size={18} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
