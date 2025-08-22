import React, { useState } from 'react';
import { FiMail, FiPhone, FiMessageCircle, FiSend, FiClock, FiMapPin } from 'react-icons/fi';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [liveChatOpen, setLiveChatOpen] = useState(false);

  const liveChatAvailable = true;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // validation
    if (!name || !email || !message) {
      setError('Please fill in all fields');
      return;
    }
    

    // console.log('Form submitted:', { name, email, message });
    
    // success message and reset form
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setError('');
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  const toggleLiveChat = () => {
    setLiveChatOpen(!liveChatOpen);
  };
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block ">
            <h2 className="text-3xl md:text-4xl font-bold text-[#9538E2] mb-4">
              Contact Us
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Need help? Our team is here 24/7 to answer your questions and provide support for all your asset management needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 md:p-10 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FiMail className="h-6 w-6 text-[#9538E2]" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-white">Email Us</p>
                  <p className="mt-1 text-sm text-gray-400">
                    <a href="mailto:support@assetverse.com" className="text-gray-300 hover:text-[#9538E2] transition-colors duration-300">
                      support@assetverse.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FiPhone className="h-6 w-6 text-[#9538E2]" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-white">Call Us</p>
                  <p className="mt-1 text-sm text-gray-400">
                    <a href="tel:+18005551234" className="text-gray-300 hover:text-[#9538E2] transition-colors duration-300">
                      +1 (800) 555-1234
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FiClock className="h-6 w-6 text-[#9538E2]" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-white">Operating Hours</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Monday - Friday: 9AM - 6PM ET
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Emergency Support: 24/7
                  </p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FiMapPin className="h-6 w-6 text-[#9538E2]" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-white">Headquarters</p>
                  <p className="mt-1 text-sm text-gray-400">
                    1234 Asset Management Way<br />
                    Suite 500<br />
                    Sylhet, Bangladesh 3100
                  </p>
                </div>
              </div>
            </div>
            
            {/* Live chat button */}
            {liveChatAvailable && (
              <div className="mt-10">
                <button
                  onClick={toggleLiveChat}
                  className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-xl btn bg-gradient-to-r from-[#9538E2] to-purple-700 text-white hover:from-purple-700 hover:to-[#9538E2] transition-all duration-300 border-none font-semibold shadow-lg shadow-purple-900/25 hover:scale-105"
                >
                  <FiMessageCircle className="mr-2 h-5 w-5" />
                  Start Live Chat Now
                </button>
              </div>
            )}
          </div>
          
          {/* Contact form */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700 p-8 md:p-10 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h3>
            
            {submitted ? (
              <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-300">
                      Thank you for your message! We'll get back to you shortly.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-300">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered focus:outline-none focus:ring-1 focus:ring-[#9538E2] text-gray-300 block w-full sm:text-sm border-gray-700 rounded-xl p-3 bg-gray-800 placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered focus:outline-none focus:ring-1 focus:ring-[#9538E2] text-gray-300 block w-full sm:text-sm border-gray-700 rounded-xl p-3 bg-gray-800 placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="border input-bordered focus:outline-none focus:ring-1 focus:ring-[#9538E2] text-gray-300 block w-full sm:text-sm border-gray-700 rounded-xl p-3 bg-gray-800 placeholder-gray-500"
                    placeholder="How can we help you with your asset management needs?"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base btn bg-gradient-to-r from-[#9538E2] to-purple-700 text-white hover:from-purple-700 hover:to-[#9538E2] transition-all duration-300 border-none font-semibold rounded-xl shadow-lg shadow-purple-900/25 hover:scale-105"
                  >
                    <FiSend className="mr-2 h-5 w-5" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Live chat modal */}
        {liveChatOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={toggleLiveChat}></div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom bg-gray-900/90 backdrop-blur-xl rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-700">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 sm:mx-0 sm:h-10 sm:w-10">
                      <FiMessageCircle className="h-6 w-6 text-[#9538E2]" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                        Live Chat Support
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-300">
                          Our support agent will be with you shortly. Please provide your name and how we can help.
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="space-y-4">
                          <div>
                            <input
                              type="text"
                              className="input input-bordered focus:outline-none focus:ring-1 focus:ring-[#9538E2] text-gray-300 block w-full sm:text-sm border-gray-700 rounded-xl p-2 bg-gray-800 placeholder-gray-500"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <textarea
                              rows={3}
                              className="border input-bordered focus:outline-none focus:ring-1 focus:ring-[#9538E2] text-gray-300 block w-full sm:text-sm border-gray-700 rounded-xl p-2 bg-gray-800 placeholder-gray-500"
                              placeholder="How can we help you today?"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-[#9538E2] to-purple-700 text-base sm:ml-3 sm:w-auto sm:text-sm text-white hover:from-purple-700 hover:to-[#9538E2] transition-all duration-300 font-semibold shadow-lg shadow-purple-900/25"
                  >
                    Start Chat
                  </button>
                  <button
                    type="button"
                    onClick={toggleLiveChat}
                    className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;