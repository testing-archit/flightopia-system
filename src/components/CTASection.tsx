
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-2 mb-4">Ready to Streamline Your Flight Operations?</h2>
          <p className="subtitle mb-8 max-w-2xl mx-auto">
            Experience the power of object-oriented design in managing complex airline operations with elegance and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="btn-hover-effect"
              onClick={() => navigate('/flights')}
            >
              Explore Flights
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/booking')}
            >
              Start Booking
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
