import React, { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      // Send to backend API
      const apiUrl =  const apiUrl = import.meta.env.VITE_API_URL || '/.netlify/functions/contact-simple'

      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 5000)
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
      
    } catch (error) {
      console.error('Contact form error:', error)
      setIsSubmitting(false)
      
      // Handle different error types
      let errorMessage = 'Failed to send message. Please try again or contact me directly at hardikcp59@gmail.com'
      
      if (error.message.includes('fetch')) {
        errorMessage = 'Unable to connect to server. Please check your internet connection and try again.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setSubmitError(errorMessage)
      
      // Clear error after 7 seconds
      setTimeout(() => {
        setSubmitError('')
      }, 7000)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hardikcp59@gmail.com",
      link: "mailto:hardikcp59@gmail.com",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9510705002",
      link: "tel:+919510705002",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Vadodara, Gujarat",
      link: "https://maps.google.com/?q=Vadodara,Gujarat",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/hard-i-k",
      color: "hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-900"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/hardik-kannoija-95b31629b",
      color: "hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400"
    },
    {
      icon: Mail,
      name: "Email",
      url: "mailto:hardikcp59@gmail.com",
      color: "hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400"
    }
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Mail className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Get In Touch</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Let's discuss your next project or just say hello
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  Let's start a conversation
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8">
                  I'm always excited to work on new projects and meet like-minded people. 
                  Whether you have a project in mind, want to collaborate, or just want to 
                  connect, I'd love to hear from you.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/20 hover:shadow-lg dark:hover:shadow-gray-900/30 transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${contact.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{contact.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Connect with me on social media
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/20 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg dark:hover:shadow-gray-900/30 ${social.color} dark:hover:bg-gray-700`}
                      aria-label={social.name}
                    >
                      <social.icon size={20} className="text-gray-600 dark:text-gray-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send me a message
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for reaching out. I'll get back to you within 24 hours!
                  </p>
                </div>
              ) : (
                <div>
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                      <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />
                      <p className="text-red-700 dark:text-red-400 text-sm">{submitError}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-colors duration-200 resize-none placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg dark:hover:shadow-primary-900/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
