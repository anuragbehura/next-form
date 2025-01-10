import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
// import Logo from "./Logo";

const fullYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="w-full py-6 mt-16 border-t">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center space-x-4">
          {/* <Logo /> */}
          <p className="text-center md:text-right mt-4 md:mt-0">
            &copy; {fullYear} NextForm. All rights reserved.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>
        </div>

        {/* Copyright Section */}
        <div className="flex gap-2">
          <Link
            href="https://github.com/anuragbehura"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="https://github.com/anuragbehura"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            <FaXTwitter className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}


export default Footer;
