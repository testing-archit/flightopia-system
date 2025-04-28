
export interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
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
