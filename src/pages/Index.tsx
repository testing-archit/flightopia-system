
import React from 'react';
import HeroWithSearch from '@/components/HeroWithSearch';
import Features from '@/components/Features';
import FeaturedFlightsSection from '@/components/FeaturedFlightsSection';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { featuredFlights } from '@/data/flights';
import { benefits } from '@/data/benefits';
import { testimonials } from '@/data/testimonials';

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* Enhanced Hero Section with Search */}
      <HeroWithSearch />
      
      {/* Features Section */}
      <Features />
      
      {/* Featured Flights */}
      <FeaturedFlightsSection flights={featuredFlights} />
      
      {/* Benefits Section */}
      <BenefitsSection benefits={benefits} />
      
      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
