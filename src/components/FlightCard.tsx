
import React from 'react';
import { format } from 'date-fns';
import { Plane, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FlightCardProps {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  availableSeats: number;
  variant?: 'default' | 'compact';
}

const FlightCard = ({
  id,
  flightNumber,
  origin,
  destination,
  departureTime,
  arrivalTime,
  price,
  availableSeats,
  variant = 'default'
}: FlightCardProps) => {
  const navigate = useNavigate();
  
  // Calculate flight duration in hours and minutes
  const durationMs = arrivalTime.getTime() - departureTime.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  // Format time as HH:MM AM/PM
  const formatTime = (date: Date) => format(date, 'h:mm a');
  
  // Format date as Day, Month DD
  const formatDate = (date: Date) => format(date, 'EEE, MMM dd');

  const handleBookNow = () => {
    navigate(`/booking?flight=${id}`);
  };

  if (variant === 'compact') {
    return (
      <div className="bg-card border rounded-xl p-4 hover:shadow-sm transition-all">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-1.5">
              <Plane className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-sm">{flightNumber}</span>
          </div>
          <span className="text-sm text-muted-foreground">{formatDate(departureTime)}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <p className="text-lg font-semibold">{origin}</p>
            <p className="text-xs text-muted-foreground">{formatTime(departureTime)}</p>
          </div>
          
          <div className="flex-1 mx-2 flex flex-col items-center">
            <div className="w-full flex items-center gap-1">
              <div className="h-[1px] flex-1 bg-border"></div>
              <Plane className="h-3 w-3 text-muted-foreground rotate-90" />
              <div className="h-[1px] flex-1 bg-border"></div>
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {durationHours}h {durationMinutes}m
            </span>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold">{destination}</p>
            <p className="text-xs text-muted-foreground">{formatTime(arrivalTime)}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="font-semibold">${price.toFixed(2)}</p>
          <Button size="sm" onClick={handleBookNow}>Select</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-md bg-primary/10 p-1.5">
              <Plane className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">{flightNumber}</span>
          </div>
          <p className="text-sm text-muted-foreground">{formatDate(departureTime)}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {durationHours}h {durationMinutes}m
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <p className="text-2xl font-semibold">{origin}</p>
          <p className="text-sm text-muted-foreground">{formatTime(departureTime)}</p>
        </div>
        
        <div className="flex-1 mx-4 flex flex-col items-center">
          <div className="w-full flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-border"></div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="h-[1px] flex-1 bg-border"></div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-semibold">{destination}</p>
          <p className="text-sm text-muted-foreground">{formatTime(arrivalTime)}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">From</p>
          <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className={cn(
              "font-medium",
              availableSeats < 10 ? "text-amber-500" : "text-green-500"
            )}>
              {availableSeats} seats
            </p>
          </div>
          
          <Button className="btn-hover-effect" onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
