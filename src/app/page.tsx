'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import CinematicHero from '../components/3d/CinematicHero'
import { useScrollAnimation, fadeInUpVariants, staggerContainer } from '../hooks/useScrollAnimation'

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    currentWebsite: '',
    projectVision: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Scroll animation hooks for each section
  const heroAnimation = useScrollAnimation(0.1);
  const pricingAnimation = useScrollAnimation(0.1);
  const featuresAnimation = useScrollAnimation(0.1);
  const testimonialsAnimation = useScrollAnimation(0.1);
  const contactAnimation = useScrollAnimation(0.1);
  const faqAnimation = useScrollAnimation(0.1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('🎉 Thank you! Your consultation request has been submitted successfully. Check your email for confirmation.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          currentWebsite: '',
          projectVision: ''
        });
      } else {
        setSubmitMessage(`❌ Error: ${result.error || 'Failed to submit consultation request. Please try again.'}`);
      }
    } catch (error) {
      console.error('Consultation form error:', error);
      setSubmitMessage('❌ Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <CinematicHero />
      </div>

      {/* Pricing Tiers Section */}
      <motion.section 
        ref={pricingAnimation.ref}
        initial="hidden"
        animate={pricingAnimation.isVisible ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        className="py-24 bg-black relative overflow-hidden z-10">
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/30 rotate-45 animate-pulse" style={{animationDuration: '2s'}}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-500/30 rotate-12 animate-pulse delay-500" style={{animationDuration: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/10 rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-24" id="products">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8 glow-text leading-tight">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">AI Success Plan</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Start your AI journey with our carefully crafted tiers. From beginner-friendly tools to advanced business strategies.
            </p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={pricingAnimation.isVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* LITE Plan */}
            <motion.div 
              variants={fadeInUpVariants}
              className="group relative glass-panel rounded-3xl shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden border border-white/20">
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse" style={{animationDuration: '2s'}}>
                  LITE
                </div>
              </div>
              <div className="h-48 bg-gradient-to-br from-green-900/30 to-emerald-900/30 relative overflow-hidden flex items-center justify-center">
                <div className="text-6xl font-black text-green-400 opacity-40 glow-text">L</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black mb-2 text-white glow-text">
                  AI Prompts Arsenal 2025
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  30 professional AI prompts across multiple business categories. Expertly crafted for content creation, marketing, SEO, business automation, e-commerce, and personal branding.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Business, marketing & SEO prompts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Creative & e-commerce templates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Personal branding & networking tools</span>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-white glow-text mb-2">A$10</div>
                  <div className="text-sm text-gray-400">One-time payment</div>
                </div>
                <Link href="/products/2" className="neon-button w-full block text-center py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/40">
                  Get Started
                </Link>
              </div>
            </motion.div>
            
            {/* ADVANCE Plan */}
            <motion.div 
              variants={fadeInUpVariants}
              className="group relative glass-panel rounded-3xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden border-2 border-blue-500/40">
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse" style={{animationDuration: '2s'}}>
                  ADVANCE
                </div>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce" style={{animationDuration: '1s'}}>
                  POPULAR
                </div>
              </div>
              <div className="h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative overflow-hidden flex items-center justify-center">
                <div className="text-6xl font-black text-blue-400 opacity-40 glow-text">A</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black mb-2 text-white glow-text">
                  AI Tools Mastery Guide 2025
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Complete 30-lesson guide to making money with AI in 2025. Each lesson focuses on a specific AI tool or business strategy with clear action steps and practical implementation examples.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Master advanced AI platform techniques</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Build profitable AI-powered businesses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Step-by-step implementation guides</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Complete 30/90/365-day roadmap</span>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-4xl font-black text-white glow-text">A$25</span>
                <span className="text-xl text-gray-500 line-through">A$50</span>
                  </div>
                  <div className="text-sm text-green-400 font-semibold animate-pulse" style={{animationDuration: '2s'}}>50% OFF Launch Price</div>
                </div>
                <Link href="/products/1" className="neon-button w-full block text-center py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/40">
                  Get Advanced
                </Link>
              </div>
            </motion.div>
            
            {/* PRO Plan */}
            <motion.div 
              variants={fadeInUpVariants}
              className="group relative glass-panel rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden border border-purple-500/40">
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse" style={{animationDuration: '2s'}}>
                  PRO
                </div>
              </div>
              <div className="h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative overflow-hidden flex items-center justify-center">
                <div className="text-6xl font-black text-purple-400 opacity-40 glow-text">P</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black mb-2 text-white glow-text">
                  AI Business Strategy Session 2025
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  60-minute coaching session to learn how to make money online with AI tools and AI prompts. Get personalized strategies.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Live 60-minute video coaching session</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Master ChatGPT for business applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Learn Vercel deployment from scratch</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Comprehensive implementation report</span>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-4xl font-black text-white glow-text">A$500</span>
                    <span className="text-xl text-gray-500 line-through">A$3000</span>
                  </div>
                  <div className="text-sm text-green-400 font-semibold animate-pulse" style={{animationDuration: '2s'}}>🔥 LAUNCH OFFER - 83% OFF</div>
                </div>
                <Link href="/products/3" className="neon-button w-full block text-center py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/40">
                  Go Pro
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="text-center mt-16">
            <p className="text-lg text-gray-300 mb-8">
              Not sure which plan is right for you? <Link href="/contact" className="text-blue-400 hover:text-blue-300 font-semibold underline glow-text">Get in touch</Link> and we'll help you choose.
            </p>
            <Link href="/products" className="neon-button group relative inline-flex items-center px-12 py-5 font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl overflow-hidden">
              <span className="relative z-10">View All Products</span>
              <svg className="ml-4 w-6 h-6 transform group-hover:translate-x-3 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Elite Custom Website Creation Section - FLAGSHIP OFFERING */}
      <motion.section 
        ref={featuresAnimation.ref}
        initial="hidden"
        animate={featuresAnimation.isVisible ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        className="py-32 bg-gradient-to-br from-black via-purple-950/30 to-blue-950/30 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/5 via-blue-500/10 to-pink-500/5"></div>
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-purple-500/20 rotate-12 animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-blue-500/20 rotate-45 animate-pulse delay-1000" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-xl animate-floatDelayed"></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Elite Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-6 py-3 mb-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
              <svg className="w-6 h-6 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-purple-300 font-bold text-sm tracking-wider uppercase">FLAGSHIP PREMIUM SERVICE</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-8 glow-text leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">Elite Custom</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Website Creation</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-8">
              Transform your vision into a <span className="text-purple-400 font-bold">high-converting digital masterpiece</span>. I craft bespoke websites that don't just look stunning—they <span className="text-blue-400 font-bold">drive results and maximize ROI</span>.
            </p>

          </div>
          


          {/* Elite Inquiry Form Section */}
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel rounded-3xl shadow-2xl border-2 border-purple-500/40 overflow-hidden backdrop-blur-xl">
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/40">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-5xl font-black text-white mb-6 glow-text">Ready to Dominate Your Market?</h3>
                  <p className="text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-8">
                    Get a <span className="text-purple-400 font-bold">FREE QUOTE</span> and discover how we can transform your business with a <span className="text-blue-400 font-bold">high-converting custom website</span> that drives real results.
                  </p>
                  <div className="flex justify-center items-center space-x-12 text-sm text-gray-400 mb-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="font-semibold">No Obligation</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elite Inquiry Form */}
              <div className="p-12">
                <div className="max-w-5xl mx-auto">
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-white font-bold mb-3 flex items-center text-lg">
                            <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3 animate-pulse"></span>
                            Full Name *
                          </label>
                          <input 
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full p-5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-2 border-purple-500/30 rounded-2xl text-white text-lg focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 hover:border-purple-300 placeholder-gray-400 backdrop-blur-sm shadow-lg"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white font-bold mb-3 flex items-center text-lg">
                            <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 animate-pulse"></span>
                            Email *
                          </label>
                          <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.business@email.com"
                            required
                            className="w-full p-5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-2 border-blue-500/30 rounded-2xl text-white text-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 hover:border-blue-300 placeholder-gray-400 backdrop-blur-sm shadow-lg"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white font-bold mb-3 flex items-center text-lg">
                            <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 animate-pulse"></span>
                            Phone Number *
                          </label>
                          <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 123-4567"
                            required
                            className="w-full p-5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-2 border-green-500/30 rounded-2xl text-white text-lg focus:border-green-400 focus:ring-4 focus:ring-green-400/20 focus:outline-none transition-all duration-300 hover:border-green-300 placeholder-gray-400 backdrop-blur-sm shadow-lg"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white font-bold mb-3 flex items-center text-lg">
                            <span className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-3 animate-pulse"></span>
                            Company/Organization
                          </label>
                          <input 
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your company name"
                            className="w-full p-5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-2 border-pink-500/30 rounded-2xl text-white text-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 focus:outline-none transition-all duration-300 hover:border-pink-300 placeholder-gray-400 backdrop-blur-sm shadow-lg"
                          />
                        </div>
                      </div>
                      
                      {/* Project Details Section */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-white font-bold mb-3 flex items-center text-lg">
                            <span className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-3 animate-pulse"></span>
                            Project Type *
                          </label>
                          <select 
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            required
                            className="w-full p-5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-2 border-cyan-500/30 rounded-2xl text-white text-lg focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 hover:border-cyan-300 backdrop-blur-sm shadow-lg">
                            <option value="">Select your project type</option>
                            <option value="business-website">🏢 Professional Business Website</option>
                            <option value="e-commerce">🛒 E-commerce Platform</option>
                            <option value="web-app">⚡ Custom Web Application</option>
                            <option value="saas">⚡ SaaS Platform</option>
                            <option value="enterprise">🏆 Enterprise Solution</option>
                            <option value="other">💡 Custom Solution (Let's Discuss)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-white font-bold mb-3 flex items-center text-lg">
                            <span className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3 animate-pulse"></span>
                            Investment Budget *
                          </label>
                          <select 
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            required
                            className="w-full p-5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-2 border-yellow-500/30 rounded-2xl text-white text-lg focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 hover:border-yellow-300 backdrop-blur-sm shadow-lg">
                            <option value="">Select your investment range</option>
                            <option value="1k-3k">💰 $1,500 - $3,000 (Professional)</option>
                            <option value="3k-7k">💎 $3,000 - $7,500 (Enterprise)</option>
                            <option value="7k-15k">🏆 $7,500 - $15,000 (Elite)</option>
                            <option value="15k-30k">⚡ $15,000 - $30,000 (Premium)</option>
                            <option value="30k-plus">👑 $30,000+ (Luxury)</option>
                            <option value="discuss">🤝 Let's Discuss My Vision</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-white font-bold mb-3 flex items-center text-lg">
                            <span className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-3 animate-pulse"></span>
                            Project Timeline *
                          </label>
                          <select 
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            required
                            className="w-full p-5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-2 border-red-500/30 rounded-2xl text-white text-lg focus:border-red-400 focus:ring-4 focus:ring-red-400/20 focus:outline-none transition-all duration-300 hover:border-red-300 backdrop-blur-sm shadow-lg">
                            <option value="">When do you need this completed?</option>
                            <option value="rush">⚡ Rush Delivery (1-2 weeks) +50% fee</option>
                            <option value="standard">🎯 Standard Timeline (2-4 weeks)</option>
                            <option value="extended">📅 Extended Timeline (1-2 months)</option>
                            <option value="flexible">🤝 Flexible (Quality over speed)</option>
                          </select>
                        </div>
                        

                      </div>
                    </div>
                    
                    {/* Project Vision Section */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-bold mb-3 flex items-center text-lg">
                          <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 animate-pulse"></span>
                          Describe Your Vision *
                        </label>
                        <textarea 
                          rows={6}
                          name="projectVision"
                          value={formData.projectVision}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project goals, target audience, key features you need, and what success looks like for your business. The more details you provide, the better we can tailor our proposal to exceed your expectations."
                          required
                          className="w-full p-5 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-2 border-purple-500/30 rounded-2xl text-white text-lg focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 hover:border-purple-300 placeholder-gray-400 backdrop-blur-sm shadow-lg resize-none"
                        ></textarea>
                      </div>
                      
                      {/* Premium CTA Section */}
                      <div className="text-center pt-8">
                        <div className="mb-8">
                          <p className="text-xl text-gray-300 mb-4">
                            🎯 <span className="text-purple-400 font-bold">Ready to transform your business?</span> We are standing by to create your digital masterpiece.
                          </p>
                        </div>
                        
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className={`group relative inline-flex items-center px-16 py-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white text-xl font-black rounded-2xl shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden border-2 border-purple-400/30 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <span className="relative z-10 mr-4">
                            {isSubmitting ? '⏳ SUBMITTING...' : '🔥 GET MY FREE QUOTE'}
                          </span>
                          {!isSubmitting && (
                            <svg className="relative z-10 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          )}
                        </button>
                        
                        {submitMessage && (
                          <div className={`mt-6 p-4 rounded-xl text-center font-semibold ${submitMessage.includes('🎉') ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                            {submitMessage}
                          </div>
                        )}
                        
                        <p className="text-sm text-gray-500 mt-6 max-w-2xl mx-auto">
                          We respect your privacy and will never share your information.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>



      {/* Elite Benefits Section */}
      <motion.section 
        id="why-choose-platforms"
        ref={testimonialsAnimation.ref}
        initial="hidden"
        animate={testimonialsAnimation.isVisible ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 glow-text">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Full-Stack Platforms</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build scalable digital businesses with complete ownership, unlimited customization, and higher profit margins.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group text-center p-8 glass-panel rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 border border-blue-500/30">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white glow-text">💯 Full Ownership & Control</h3>
              <p className="text-gray-300 leading-relaxed">
                You own the UI, backend, logic, data, customer flow, SEO, and brand. You can edit anything any time without restrictions.
              </p>
            </div>
            
            <div className="group text-center p-8 glass-panel rounded-3xl shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 border border-green-500/30">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white glow-text">🚀 Unlimited Customization</h3>
              <p className="text-gray-300 leading-relaxed">
                Build any feature: chatbots, lead scoring, dashboards, login logic, upsells, dynamic pricing — whatever your imagination can create.
              </p>
            </div>
            
            <div className="group text-center p-8 glass-panel rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 border border-purple-500/30">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white glow-text">💸 Higher Profit Margins</h3>
              <p className="text-gray-300 leading-relaxed">
                No platform fees, no app charges, no transaction percentages. You just pay for hosting (Vercel, Supabase, etc.) — which can be nearly free if optimized.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            <div className="group text-center p-8 glass-panel rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 border border-blue-500/30">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white glow-text">🔐 Better Data Ownership</h3>
              <p className="text-gray-300 leading-relaxed">
                Your customers, emails, payments, and analytics stay yours. You're not trapped in a platform's ecosystem or terms and conditions.
              </p>
            </div>
            
            <div className="group text-center p-8 glass-panel rounded-3xl shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 border border-green-500/30">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white glow-text">🌍 Scalability & Automation</h3>
              <p className="text-gray-300 leading-relaxed">
                You can auto-connect APIs (Stripe, SendGrid, AI, etc.). Build once, deploy anywhere, scale without limits as your business grows.
              </p>
            </div>
            
            <div className="group text-center p-8 glass-panel rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 border border-purple-500/30">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white glow-text">🧠 Real IP Creation</h3>
              <p className="text-gray-300 leading-relaxed">
                Your backend logic and AI integrations = actual proprietary tech. That builds long-term brand value, not just a store.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      
      {/* Elite Call to Action */}
      <motion.section 
        ref={contactAnimation.ref}
        initial="hidden"
        animate={contactAnimation.isVisible ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        className="py-24 bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rotate-45 animate-pulse" style={{animationDuration: '2s'}}></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/30 rotate-12 animate-pulse delay-500" style={{animationDuration: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x" style={{animationDuration: '3s'}}>Ready to Transform Your Future?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
              Join thousands of forward-thinking professionals who have already embraced the AI revolution. 
              <span className="font-bold text-white">Everything here was created with AI - and so can your success.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  <Link href="/products" className="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-white to-gray-100 text-black font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/30 overflow-hidden">
    <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    <span className="relative z-10">Start Your Journey</span>
    <svg className="ml-4 w-6 h-6 transform group-hover:translate-x-3 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </Link>
</div>
          </div>
        </div>
      </motion.section>
    </main>
  )
}