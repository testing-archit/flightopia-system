
import React from 'react';
import FlightSearchForm from './FlightSearchForm';

const HeroWithSearch = () => {
  return (
    <section className="relative bg-gradient-to-b from-primary/90 to-primary py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Fly Smarter with Our Flight System
            </h1>
            <p className="text-white/80 text-xl mb-6">
              Experience the future of flight management with our object-oriented design approach.
            </p>
            <div className="hidden md:block">
              <p className="text-white/70 text-lg">
                ✓ Reliable Scheduling   ✓ Competitive Pricing   ✓ Seamless Booking
              </p>
            </div>
          </div>
          
          <div className="md:translate-y-16 z-10">
            <FlightSearchForm />
          </div>
        </div>
      </div>
      
      {/* Visual elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroWithSearch;
