import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const fullYear = new Date().getFullYear();

function Footer() {
  return (
    // Updated: Adjusted padding and border color for a cleaner separation
    <footer className="w-full py-8 mt-24 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">

        {/* Copyright and Logo (Combined for clean look) */}
        <div className="flex items-center space-x-4">
          <p className="text-center md:text-left text-sm text-gray-500 dark:text-gray-400">
            &copy; {fullYear} NextForm. All rights reserved.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
          <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Social Links Section */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            href="https://github.com/anuragbehura"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://github.com/anuragbehura"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <FaXTwitter className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;