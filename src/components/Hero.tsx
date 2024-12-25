import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4 py-32 text-center animate-fade-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Welcome to Your App
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Build something amazing with React and modern web technologies.
        </p>
        <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;