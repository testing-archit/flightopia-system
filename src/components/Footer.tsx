
import React from 'react';
import { Plane } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 md:py-12 border-t">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="rounded-lg bg-primary p-1.5 text-white">
              <Plane className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold">FlightSystem</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} Flight Management System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
