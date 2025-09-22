import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto text-center py-4">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} E-Commerce Clothes. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
