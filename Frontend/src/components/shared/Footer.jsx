import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white py-10 mt-10 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-extrabold tracking-tight">JOBFINDER</h2>
          <p className="text-sm mt-1">&copy; 2024 JOBFINDER. All rights reserved.</p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" className="hover:text-gray-200 transition" aria-label="Facebook"><FaFacebook size={24} /></a>
          <a href="https://twitter.com" className="hover:text-gray-200 transition" aria-label="Twitter"><FaTwitter size={24} /></a>
          <a href="https://linkedin.com" className="hover:text-gray-200 transition" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
          <a href="https://github.com" className="hover:text-gray-200 transition" aria-label="GitHub"><FaGithub size={24} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;