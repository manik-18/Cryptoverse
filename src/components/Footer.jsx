import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex justify-center items-center">
        <span className="text-lg text-gray-200">
          <Link to="/" className="hover:underline">
            CryptoVerse
          </Link>
          . Made with ❤️ by Manik.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
