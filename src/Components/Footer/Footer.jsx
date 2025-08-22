
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCompanyInfo from "../../Hooks/useCompanyInfo";
import logo from "../../../public/logo.png";

const Footer = () => {
  const { companyInfo } = useCompanyInfo();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-300 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img
                    className="h-14 w-14 object-cover rounded-2xl ring-2 ring-[#9538E2]/50 shadow-lg"
                src={companyInfo?.companyLogo || logo}
                    alt={companyInfo?.companyName || "AssetVerse Logo"}
              />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-2xl"></div>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9538E2] to-purple-600 bg-clip-text text-transparent">
                {companyInfo?.companyName || "ASSETVERSE"}
                  </h2>
                  <p className="text-xs text-gray-400">Asset Management System</p>
            </div>
          </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                Your trusted partner in asset management excellence. We help organizations optimize their asset lifecycle, 
                reduce costs, and improve operational efficiency with cutting-edge technology and expert support.
              </p>
              
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/" 
                  className="w-10 h-10 bg-gray-800 hover:bg-[#9538E2] rounded-xl flex items-center justify-center transition-all duration-300 group"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebookF className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.twitter.com/" 
                  className="w-10 h-10 bg-gray-800 hover:bg-[#9538E2] rounded-xl flex items-center justify-center transition-all duration-300 group"
                  aria-label="Follow us on Twitter"
                >
                  <FaTwitter className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.linkedin.com/" 
                  className="w-10 h-10 bg-gray-800 hover:bg-[#9538E2] rounded-xl flex items-center justify-center transition-all duration-300 group"
                  aria-label="Follow us on LinkedIn"
                >
                  <FaLinkedinIn className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.instagram.com/" 
                  className="w-10 h-10 bg-gray-800 hover:bg-[#9538E2] rounded-xl flex items-center justify-center transition-all duration-300 group"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full mr-3"></div>
                Quick Links
              </h3>
              
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/" 
                    className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group"
                  >
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group"
                  >
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group"
                  >
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Join as Employee
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/hrRegister" 
                    className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group"
                  >
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Join as HR Manager
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group"
                  >
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full mr-3"></div>
                Our Services
              </h3>
              
              <ul className="space-y-3">
                <li>
                  <div className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group">
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Asset Tracking
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group">
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Inventory Management
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group">
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Maintenance Scheduling
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group">
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Analytics & Reporting
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-gray-400 hover:text-[#9538E2] transition-all duration-300 group">
                    <FaArrowRight className="text-xs mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Employee Management
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact & Newsletter Section */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-r from-[#9538E2] to-purple-600 rounded-full mr-3"></div>
                Contact Info
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="text-[#9538E2] text-sm" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      123 Business Street<br />
                      Tech City, TC 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaPhone className="text-[#9538E2] text-sm" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaEnvelope className="text-[#9538E2] text-sm" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">info@assetverse.com</p>
                    <p className="text-gray-400 text-sm">support@assetverse.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2]/20 to-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaClock className="text-[#9538E2] text-sm" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-400 text-sm">Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 bg-black/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {currentYear} {companyInfo?.companyName || "ASSETVERSE"}. All Rights Reserved.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <a 
                  href="/privacy" 
                  className="text-gray-400 hover:text-[#9538E2] transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms" 
                  className="text-gray-400 hover:text-[#9538E2] transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a 
                  href="/cookies" 
                  className="text-gray-400 hover:text-[#9538E2] transition-colors duration-300"
                >
                  Cookie Policy
                </a>
                <a 
                  href="/support" 
                  className="text-gray-400 hover:text-[#9538E2] transition-colors duration-300"
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;