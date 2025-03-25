
import React, { useState } from 'react';
import { Calendar, Search, MapPin, Filter, Clock, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
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
  {
    id: '4',
    flightNumber: 'FS3456',
    origin: 'DFW',
    destination: 'BOS',
    departureTime: new Date('2023-06-18T09:45:00'),
    arrivalTime: new Date('2023-06-18T14:00:00'),
    price: 329.99,
    availableSeats: 31,
  },
  {
    id: '5',
    flightNumber: 'FS7890',
    origin: 'ATL',
    destination: 'DEN',
    departureTime: new Date('2023-06-19T11:30:00'),
    arrivalTime: new Date('2023-06-19T13:45:00'),
    price: 259.99,
    availableSeats: 12,
  },
  {
    id: '6',
    flightNumber: 'FS2345',
    origin: 'LGA',
    destination: 'SFO',
    departureTime: new Date('2023-06-20T06:15:00'),
    arrivalTime: new Date('2023-06-20T09:45:00'),
    price: 379.99,
    availableSeats: 5,
  },
];

const Flights = () => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
  });
  const [sortBy, setSortBy] = useState('price');
  const [showFilters, setShowFilters] = useState(false);
  const [flights, setFlights] = useState(allFlights);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter flights based on search parameters (simplified for demo)
    const filtered = allFlights.filter(flight => {
      const matchOrigin = !searchParams.origin || 
        flight.origin.toLowerCase().includes(searchParams.origin.toLowerCase());
      const matchDestination = !searchParams.destination || 
        flight.destination.toLowerCase().includes(searchParams.destination.toLowerCase());
      return matchOrigin && matchDestination;
    });
    
    setFlights(filtered);
  };
  
  const handleSort = (value: string) => {
    setSortBy(value);
    let sortedFlights = [...flights];
    
    switch (value) {
      case 'price':
        sortedFlights.sort((a, b) => a.price - b.price);
        break;
      case 'departure':
        sortedFlights.sort((a, b) => a.departureTime.getTime() - b.departureTime.getTime());
        break;
      case 'duration':
        sortedFlights.sort((a, b) => {
          const durationA = a.arrivalTime.getTime() - a.departureTime.getTime();
          const durationB = b.arrivalTime.getTime() - b.departureTime.getTime();
          return durationA - durationB;
        });
        break;
      case 'availability':
        sortedFlights.sort((a, b) => b.availableSeats - a.availableSeats);
        break;
    }
    
    setFlights(sortedFlights);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="heading-2 mb-4">Find Available Flights</h1>
          <p className="subtitle">
            Search and filter through our extensive network of flights to find your perfect journey.
          </p>
        </div>
        
        {/* Search form */}
        <div className="bg-card border rounded-xl p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="origin" className="mb-2 block">From</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="origin"
                  placeholder="Origin Airport" 
                  className="pl-10"
                  value={searchParams.origin}
                  onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="destination" className="mb-2 block">To</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="destination"
                  placeholder="Destination Airport" 
                  className="pl-10"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="date" className="mb-2 block">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="date"
                  type="date" 
                  className="pl-10"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <Button type="submit" className="w-full btn-hover-effect">
                <Search className="mr-2 h-4 w-4" />
                Search Flights
              </Button>
            </div>
          </form>
          
          <div className="mt-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="sort" className="text-sm whitespace-nowrap">Sort by:</Label>
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger id="sort" className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (lowest first)</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-down">
              <div>
                <Label htmlFor="airline" className="mb-2 block">Airline</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="airline">
                    <SelectValue placeholder="All Airlines" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Airlines</SelectItem>
                    <SelectItem value="fs">FlightSystem Airways</SelectItem>
                    <SelectItem value="aa">American Airlines</SelectItem>
                    <SelectItem value="dl">Delta Airlines</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="price-range" className="mb-2 block">Price Range</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="price-range">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="lt200">Less than $200</SelectItem>
                    <SelectItem value="200-300">$200 - $300</SelectItem>
                    <SelectItem value="300-400">$300 - $400</SelectItem>
                    <SelectItem value="gt400">More than $400</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="stops" className="mb-2 block">Stops</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="stops">
                    <SelectValue placeholder="Any Number of Stops" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Number of Stops</SelectItem>
                    <SelectItem value="nonstop">Nonstop Only</SelectItem>
                    <SelectItem value="1stop">1 Stop Max</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {flights.length} {flights.length === 1 ? 'Flight' : 'Flights'} Found
            </h2>
          </div>
          
          {flights.length > 0 ? (
            <div className="space-y-6">
              {flights.map((flight, idx) => (
                <div 
                  key={flight.id} 
                  className="animate-fade-up" 
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <FlightCard {...flight} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No flights match your search criteria.</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchParams({ origin: '', destination: '', date: '' });
                  setFlights(allFlights);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Flights;
