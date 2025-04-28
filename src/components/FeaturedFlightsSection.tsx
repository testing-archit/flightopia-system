
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FlightCard from '@/components/FlightCard';

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  availableSeats: number;
}

interface FeaturedFlightsSectionProps {
  flights: Flight[];
}

const FeaturedFlightsSection = ({ flights }: FeaturedFlightsSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="heading-2 mb-4">Featured Flights</h2>
            <p className="subtitle max-w-2xl">
              Explore our selection of popular routes with competitive pricing and flexible scheduling.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={() => navigate('/flights')}
          >
            View All Flights 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {flights.map((flight) => (
            <FlightCard 
              key={flight.id} 
              {...flight} 
              variant="compact" 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFlightsSection;
