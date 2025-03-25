
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plane, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-1/4 h-1/4 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-6 bg-background">
            <span className="text-xs font-medium">Flight management simplified</span>
          </div>
          
          <h1 className="heading-1 mb-6 animate-fade-up [animation-delay:200ms]">
            Effortless Flight Management at Your Fingertips
          </h1>
          
          <p className="subtitle max-w-2xl mb-10 animate-fade-up [animation-delay:400ms]">
            A sophisticated object-oriented solution for managing flights, passengers, and bookings with a focus on simplicity and user experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:600ms]">
            <Button 
              className="btn-hover-effect group"
              size="lg"
              onClick={() => navigate('/flights')}
            >
              Browse Flights 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/booking')}
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Stats/features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-up [animation-delay:800ms]">
          <div className="flex items-start gap-4 p-6 rounded-xl bg-background border">
            <div className="rounded-full p-2.5 bg-primary/10 text-primary">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Global Network</h3>
              <p className="text-muted-foreground text-sm">Connect to airports worldwide with our comprehensive flight network</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-xl bg-background border">
            <div className="rounded-full p-2.5 bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Secure & Reliable</h3>
              <p className="text-muted-foreground text-sm">Built with robust OOP principles ensuring system stability and data integrity</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-xl bg-background border">
            <div className="rounded-full p-2.5 bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Passenger-Focused</h3>
              <p className="text-muted-foreground text-sm">Streamlined booking and management of passenger information</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
