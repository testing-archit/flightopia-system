
import React from 'react';
import { Plane, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FlightCard from '@/components/FlightCard';

// Mock data for demonstration
const featuredFlights = [
  {
    id: '1',
    flightNumber: 'FS1234',
    origin: 'SFO',
    destination: 'JFK',
    departureTime: new Date('2023-06-15T08:00:00'),
    arrivalTime: new Date('2023-06-15T16:30:00'),
    price: 349.99,
    availableSeats: 23,
  },
  {
    id: '2',
    flightNumber: 'FS5678',
    origin: 'LAX',
    destination: 'ORD',
    departureTime: new Date('2023-06-16T10:15:00'),
    arrivalTime: new Date('2023-06-16T16:45:00'),
    price: 289.99,
    availableSeats: 8,
  },
  {
    id: '3',
    flightNumber: 'FS9012',
    origin: 'MIA',
    destination: 'SEA',
    departureTime: new Date('2023-06-17T14:30:00'),
    arrivalTime: new Date('2023-06-17T21:15:00'),
    price: 399.99,
    availableSeats: 15,
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Travel Manager',
    comment: 'The object-oriented design of this system makes it incredibly flexible for our airline\'s needs. We\'ve seamlessly integrated it with our existing infrastructure.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Software Architect',
    comment: 'As a developer, I appreciate the clean architecture and modularity. It\'s a masterclass in object-oriented programming principles.',
    rating: 5,
  },
  {
    name: 'Jessica Williams',
    role: 'Airline Operations Director',
    comment: 'This flight management system has transformed how we handle bookings and passenger data. The integration capabilities are exceptional.',
    rating: 4,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Featured Flights */}
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
            {featuredFlights.map((flight) => (
              <FlightCard 
                key={flight.id} 
                {...flight} 
                variant="compact" 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-2 mb-4">Why Choose Our System?</h2>
            <p className="text-white/80 text-lg">
              Built with modern object-oriented programming principles for maximum flexibility and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Modular Architecture',
                description: 'Independently managed components that communicate seamlessly.'
              },
              {
                title: 'Extensible Design',
                description: 'Easily add new features without disrupting existing functionality.'
              },
              {
                title: 'Enterprise Scalability',
                description: 'Handles thousands of flights and passengers with consistent performance.'
              },
            ].map((benefit, idx) => (
              <div key={idx} className="animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-white/20 p-1.5">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                </div>
                <p className="text-white/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-2 mb-4">What Our Users Say</h2>
            <p className="subtitle">
              Industry professionals trust our flight management system for its reliability and elegant design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-card border rounded-xl p-6 hover:shadow-md transition-all"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.comment}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
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
      
      {/* Footer */}
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
    </main>
  );
};

export default Index;
