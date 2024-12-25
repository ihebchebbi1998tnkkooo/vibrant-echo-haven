import React from "react";
import Card from "./Card";
import { Rocket, Zap, Shield } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Amazing Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card
            icon={<Rocket />}
            title="Fast Performance"
            description="Lightning-fast loading times and smooth interactions for the best user experience."
          />
          <Card
            icon={<Zap />}
            title="Easy to Use"
            description="Intuitive interface designed for both beginners and professionals."
          />
          <Card
            icon={<Shield />}
            title="Secure"
            description="Built with security in mind to protect your data and privacy."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;