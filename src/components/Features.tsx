
import React from 'react';
import { cn } from '@/lib/utils';
import { Plane, Calendar, Users, Map, Globe, Shield, Clock, Layers } from 'lucide-react';

const features = [
  {
    title: 'Flight Management',
    description: 'Efficiently organize and track flights with real-time updates and comprehensive data models.',
    icon: Plane,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Passenger Records',
    description: 'Maintain detailed passenger profiles with seamless integration to bookings and flight manifests.',
    icon: Users,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Booking System',
    description: 'Streamlined booking process with intuitive interfaces for both operators and customers.',
    icon: Calendar,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Airport Management',
    description: 'Comprehensive database of airports with location data and operational capabilities.',
    icon: Map,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Route Optimization',
    description: 'Intelligent algorithms for efficient route planning and flight scheduling.',
    icon: Globe,
    color: 'bg-pink-50 text-pink-600',
  },
  {
    title: 'Security Protocols',
    description: 'Built-in security measures ensuring data protection and regulatory compliance.',
    icon: Shield,
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    title: 'Real-time Updates',
    description: 'Instant notifications and updates for flight status, delays, and gate changes.',
    icon: Clock,
    color: 'bg-rose-50 text-rose-600',
  },
  {
    title: 'Modular Architecture',
    description: 'Flexible, component-based design allowing for easy system expansion and customization.',
    icon: Layers,
    color: 'bg-indigo-50 text-indigo-600',
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-2 mb-4">Advanced Object-Oriented Design</h2>
          <p className="subtitle">
            Our flight management system leverages sophisticated object-oriented programming principles to deliver a robust and scalable solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-card border rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", feature.color)}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
