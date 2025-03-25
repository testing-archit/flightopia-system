
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, User, CreditCard, Calendar, Check, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import FlightCard from '@/components/FlightCard';

// Mock data for demonstration
const allFlights = [
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
  },
];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<any | null>(null);
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  useEffect(() => {
    // Get flight ID from URL query parameter
    const params = new URLSearchParams(location.search);
    const flightId = params.get('flight');
    if (flightId) {
      setSelectedFlightId(flightId);
      const flight = allFlights.find(f => f.id === flightId);
      if (flight) {
        setSelectedFlight(flight);
        setActiveStep(1); // Skip flight selection
      }
    }
  }, [location.search]);
  
  const handleFlightSelect = (id: string) => {
    setSelectedFlightId(id);
    const flight = allFlights.find(f => f.id === id);
    if (flight) {
      setSelectedFlight(flight);
    }
  };
  
  const handlePassengerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassengerInfo({
      ...passengerInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const nextStep = () => {
    if (activeStep === 0 && !selectedFlightId) {
      toast({
        title: "Please select a flight",
        description: "You must select a flight to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (activeStep === 1) {
      // Validate passenger info
      const { firstName, lastName, email, phone } = passengerInfo;
      if (!firstName || !lastName || !email || !phone) {
        toast({
          title: "Incomplete passenger information",
          description: "Please fill out all passenger details.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (activeStep === 2) {
      // Validate payment info
      const { cardName, cardNumber, expiryDate, cvv } = paymentInfo;
      if (!cardName || !cardNumber || !expiryDate || !cvv) {
        toast({
          title: "Incomplete payment information",
          description: "Please fill out all payment details.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const previousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Booking Confirmed!",
      description: "Your flight has been successfully booked. A confirmation email will be sent shortly.",
    });
    
    // Redirect to a confirmation page or back to flights
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  const steps = [
    { title: 'Select Flight', icon: <Plane className="h-5 w-5" /> },
    { title: 'Passenger Info', icon: <User className="h-5 w-5" /> },
    { title: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
    { title: 'Confirmation', icon: <Check className="h-5 w-5" /> },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="heading-2 mb-4">Book Your Flight</h1>
          <p className="subtitle">
            Complete your booking in a few simple steps.
          </p>
        </div>
        
        {/* Booking Steps */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${idx === activeStep ? 'bg-primary text-white' : 
                    idx < activeStep ? 'bg-primary/20 text-primary' : 
                    'bg-secondary text-muted-foreground'}
                `}>
                  {idx < activeStep ? <Check className="h-5 w-5" /> : step.icon}
                </div>
                <span className={`text-sm hidden md:block ${idx === activeStep ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{step.title}</span>
                
                {idx < steps.length - 1 && (
                  <div className={`
                    hidden md:block h-[2px] w-full mt-4
                    ${idx < activeStep ? 'bg-primary' : 'bg-secondary'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        <div className="bg-card border rounded-xl p-6 mb-8">
          {activeStep === 0 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-semibold mb-6">Select Your Flight</h2>
              <div className="space-y-6">
                <RadioGroup value={selectedFlightId || ''} onValueChange={handleFlightSelect}>
                  {allFlights.map((flight) => (
                    <div key={flight.id} className="flex items-start space-x-3">
                      <RadioGroupItem value={flight.id} id={flight.id} className="mt-4" />
                      <label htmlFor={flight.id} className="flex-1 cursor-pointer">
                        <FlightCard {...flight} />
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}
          
          {activeStep === 1 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-semibold mb-6">Passenger Information</h2>
              
              {selectedFlight && (
                <div className="mb-8 p-4 bg-secondary/50 rounded-lg">
                  <h3 className="font-medium mb-2">Selected Flight</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedFlight.flightNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedFlight.origin} to {selectedFlight.destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${selectedFlight.price.toFixed(2)}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm"
                        onClick={() => setActiveStep(0)}
                      >
                        Change flight
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    placeholder="Enter your first name" 
                    className="mt-1"
                    value={passengerInfo.firstName}
                    onChange={handlePassengerInfoChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    placeholder="Enter your last name" 
                    className="mt-1"
                    value={passengerInfo.lastName}
                    onChange={handlePassengerInfoChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="Enter your email" 
                    className="mt-1"
                    value={passengerInfo.email}
                    onChange={handlePassengerInfoChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    placeholder="Enter your phone number" 
                    className="mt-1"
                    value={passengerInfo.phone}
                    onChange={handlePassengerInfoChange}
                    required
                  />
                </div>
              </form>
            </div>
          )}
          
          {activeStep === 2 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
              
              {selectedFlight && (
                <div className="mb-8 p-4 bg-secondary/50 rounded-lg">
                  <h3 className="font-medium mb-2">Booking Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Flight</span>
                      <span>{selectedFlight.flightNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route</span>
                      <span>{selectedFlight.origin} → {selectedFlight.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passenger</span>
                      <span>{passengerInfo.firstName} {passengerInfo.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Fare</span>
                      <span>${selectedFlight.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes & Fees</span>
                      <span>${(selectedFlight.price * 0.12).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(selectedFlight.price * 1.12).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <form className="space-y-6">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input 
                    id="cardName" 
                    name="cardName"
                    placeholder="Enter cardholder name" 
                    className="mt-1"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentInfoChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456" 
                    className="mt-1"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input 
                      id="expiryDate" 
                      name="expiryDate"
                      placeholder="MM/YY" 
                      className="mt-1"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentInfoChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      name="cvv"
                      placeholder="123" 
                      className="mt-1"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {activeStep === 3 && (
            <div className="animate-fade-up text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">Booking Confirmation</h2>
              <p className="text-muted-foreground mb-8">
                Thank you for your booking! Your flight details are below.
              </p>
              
              {selectedFlight && (
                <div className="max-w-md mx-auto bg-secondary/50 rounded-lg p-6 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="rounded-md bg-primary/10 p-1.5 inline-flex">
                        <Plane className="h-4 w-4 text-primary" />
                      </div>
                      <span className="ml-2 font-medium">{selectedFlight.flightNumber}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Confirmation: #FS12345</div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground">Passenger</span>
                      <span>{passengerInfo.firstName} {passengerInfo.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From</span>
                      <span>{selectedFlight.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To</span>
                      <span>{selectedFlight.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span>{selectedFlight.departureTime.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departure</span>
                      <span>{selectedFlight.departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground">Arrival</span>
                      <span>{selectedFlight.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Paid</span>
                      <span>${(selectedFlight.price * 1.12).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-center text-muted-foreground">
                    A confirmation email has been sent to {passengerInfo.email}
                  </p>
                </div>
              )}
              
              <Button 
                onClick={() => navigate('/')} 
                className="mt-8 btn-hover-effect"
              >
                Return to Home
              </Button>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        {activeStep < 3 && (
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={previousStep}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            
            {activeStep < 2 ? (
              <Button onClick={nextStep} className="btn-hover-effect">
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="btn-hover-effect">
                Complete Booking
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Booking;
