
import React from 'react';
import { Check } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-2 mb-4">Why Choose Our System?</h2>
          <p className="text-white/80 text-lg">
            Built with modern object-oriented programming principles for maximum flexibility and reliability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
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
  );
};

export default BenefitsSection;
