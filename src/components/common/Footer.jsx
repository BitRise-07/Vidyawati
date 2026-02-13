import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLink2 } from "../../data/footer-links"

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-vd-secondary to-gray-900 text-white">
      {/* Main Footer Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Company Section */}
          <div >
            <h2 className="text-2xl font-bold text-[#F9872C] mb-4">Vidyawati</h2>
            <div className="space-y-2">
              <h3 className="font-semibold text-orange-200 mb-3">Company</h3>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">About</Link>
                <Link to="/careers" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Careers</Link>
                <Link to="/affiliates" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Affiliates</Link>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-semibold text-orange-200 mb-4">Resources</h3>
            <div className="space-y-2">
              <Link to="/articles" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Articles</Link>
              <Link to="/blog" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Blog</Link>
              <Link to="/cheatsheet" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Cheat Sheet</Link>
              <Link to="/code-challenges" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Code challenges</Link>
              <Link to="/docs" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Docs</Link>
              <Link to="/projects" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Projects</Link>
              <Link to="/videos" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Videos</Link>
              <Link to="/workspaces" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Workspaces</Link>
            </div>
            {/* Support Section */}
          <div>
            <h3 className="font-semibold text-orange-200 mt-4">Support</h3>
            <div className="space-y-2">
              <Link to="/help-center" className="block mt-2 text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Help Center</Link>
            </div>
          </div>
          </div>

          {/* Plans & Community Section */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-orange-200 mb-4">Plans</h3>
              <div className="space-y-2">
                <Link to="/paid-memberships" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Paid memberships</Link>
                <Link to="/for-students" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">For students</Link>
                <Link to="/business-solutions" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Business solutions</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-orange-200 mb-4">Community</h3>
              <div className="space-y-2">
                <Link to="/forums" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Forums</Link>
                <Link to="/chapters" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Chapters</Link>
                <Link to="/events" className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300">Events</Link>
              </div>
            </div>
          </div>

          {/* Dynamic Sections from FooterLink2 */}
          {FooterLink2.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-orange-200 mb-4">{section.title}</h3>
              <div className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <Link 
                    key={linkIndex}
                    to={link.link} 
                    className="block text-gray-300 hover:text-[#F9872C] transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center gap-4 text-gray-300 text-sm">
              <Link to="/privacy-policy" className="hover:text-[#F9872C] transition-colors duration-300">Privacy Policy</Link>
              <span className="text-orange-600">|</span>
              <Link to="/cookie-policy" className="hover:text-[#F9872C] transition-colors duration-300">Cookie Policy</Link>
              <span className="text-orange-600">|</span>
              <Link to="/terms" className="hover:text-[#F9872C] transition-colors duration-300">Terms</Link>
            </div>
            <div className="text-gray-300 text-sm text-center md:text-right">
              Made with <span className="text-[#F9872C] animate-pulse">●</span> raushan © 2025 Vidyawati
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;