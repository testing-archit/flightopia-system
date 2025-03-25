
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  User, 
  Users, 
  UserPlus, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

// Mock data for passengers
const initialPassengers = [
  { 
    id: '1', 
    firstName: 'John', 
    lastName: 'Smith', 
    email: 'john.smith@example.com',
    phone: '(123) 456-7890',
    frequentFlyerNumber: 'FF123456',
    totalFlights: 12,
    status: 'Active',
  },
  { 
    id: '2', 
    firstName: 'Emily', 
    lastName: 'Johnson', 
    email: 'emily.johnson@example.com',
    phone: '(234) 567-8901',
    frequentFlyerNumber: 'FF234567',
    totalFlights: 8,
    status: 'Active',
  },
  { 
    id: '3', 
    firstName: 'Michael', 
    lastName: 'Williams', 
    email: 'michael.williams@example.com',
    phone: '(345) 678-9012',
    frequentFlyerNumber: 'FF345678',
    totalFlights: 5,
    status: 'Inactive',
  },
  { 
    id: '4', 
    firstName: 'Sarah', 
    lastName: 'Brown', 
    email: 'sarah.brown@example.com',
    phone: '(456) 789-0123',
    frequentFlyerNumber: 'FF456789',
    totalFlights: 15,
    status: 'Active',
  },
  { 
    id: '5', 
    firstName: 'David', 
    lastName: 'Jones', 
    email: 'david.jones@example.com',
    phone: '(567) 890-1234',
    frequentFlyerNumber: 'FF567890',
    totalFlights: 3,
    status: 'Active',
  },
];

// Mock data for recent bookings
const recentBookings = [
  {
    id: 'B1001',
    passengerId: '1',
    flightNumber: 'FS1234',
    origin: 'SFO',
    destination: 'JFK',
    date: '2023-06-15',
    status: 'Confirmed',
  },
  {
    id: 'B1002',
    passengerId: '2',
    flightNumber: 'FS5678',
    origin: 'LAX',
    destination: 'ORD',
    date: '2023-06-16',
    status: 'Confirmed',
  },
  {
    id: 'B1003',
    passengerId: '4',
    flightNumber: 'FS9012',
    origin: 'MIA',
    destination: 'SEA',
    date: '2023-06-17',
    status: 'Confirmed',
  },
  {
    id: 'B1004',
    passengerId: '1',
    flightNumber: 'FS3456',
    origin: 'DFW',
    destination: 'BOS',
    date: '2023-06-18',
    status: 'Cancelled',
  },
  {
    id: 'B1005',
    passengerId: '5',
    flightNumber: 'FS7890',
    origin: 'ATL',
    destination: 'DEN',
    date: '2023-06-19',
    status: 'Confirmed',
  },
];

const Passengers = () => {
  const { toast } = useToast();
  const [passengers, setPassengers] = useState(initialPassengers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPassengerOpen, setIsAddPassengerOpen] = useState(false);
  const [newPassenger, setNewPassenger] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    frequentFlyerNumber: '',
  });
  const [selectedPassenger, setSelectedPassenger] = useState<any | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredPassengers = passengers.filter(passenger => {
    const query = searchQuery.toLowerCase();
    const fullName = `${passenger.firstName} ${passenger.lastName}`.toLowerCase();
    
    if (activeTab === 'active' && passenger.status !== 'Active') return false;
    if (activeTab === 'inactive' && passenger.status !== 'Inactive') return false;
    
    return (
      fullName.includes(query) ||
      passenger.email.toLowerCase().includes(query) ||
      passenger.frequentFlyerNumber.toLowerCase().includes(query)
    );
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassenger(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddPassenger = () => {
    // Validate form
    if (!newPassenger.firstName || !newPassenger.lastName || !newPassenger.email) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const id = (passengers.length + 1).toString();
    const createdPassenger = {
      id,
      ...newPassenger,
      totalFlights: 0,
      status: 'Active',
    };
    
    setPassengers([...passengers, createdPassenger]);
    
    toast({
      title: "Passenger Added",
      description: `${newPassenger.firstName} ${newPassenger.lastName} has been added successfully.`,
    });
    
    // Reset form
    setNewPassenger({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      frequentFlyerNumber: '',
    });
    setIsAddPassengerOpen(false);
  };
  
  const handleEditPassenger = (passenger: any) => {
    setSelectedPassenger(passenger);
    setNewPassenger({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      email: passenger.email,
      phone: passenger.phone,
      frequentFlyerNumber: passenger.frequentFlyerNumber,
    });
    setIsAddPassengerOpen(true);
  };
  
  const handleUpdatePassenger = () => {
    if (!selectedPassenger) return;
    
    const updatedPassengers = passengers.map(p => 
      p.id === selectedPassenger.id ? { ...p, ...newPassenger } : p
    );
    
    setPassengers(updatedPassengers);
    
    toast({
      title: "Passenger Updated",
      description: `${newPassenger.firstName} ${newPassenger.lastName}'s information has been updated.`,
    });
    
    setNewPassenger({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      frequentFlyerNumber: '',
    });
    setSelectedPassenger(null);
    setIsAddPassengerOpen(false);
  };
  
  const openDeleteDialog = (passenger: any) => {
    setSelectedPassenger(passenger);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeletePassenger = () => {
    if (!selectedPassenger) return;
    
    const updatedPassengers = passengers.filter(p => p.id !== selectedPassenger.id);
    setPassengers(updatedPassengers);
    
    toast({
      title: "Passenger Deleted",
      description: `${selectedPassenger.firstName} ${selectedPassenger.lastName} has been removed.`,
    });
    
    setSelectedPassenger(null);
    setIsDeleteDialogOpen(false);
  };
  
  const getPassengerBookings = (passengerId: string) => {
    return recentBookings.filter(booking => booking.passengerId === passengerId);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="heading-2 mb-4">Passenger Management</h1>
          <p className="subtitle">
            Efficiently manage passenger profiles and view their booking history.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main passenger list */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Passengers</CardTitle>
                    <CardDescription>
                      Manage all passengers in the system
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search passengers..." 
                        value={searchQuery}
                        onChange={handleSearch}
                        className="pl-10 w-full md:w-[200px]"
                      />
                    </div>
                    
                    <Button 
                      onClick={() => {
                        setSelectedPassenger(null);
                        setNewPassenger({
                          firstName: '',
                          lastName: '',
                          email: '',
                          phone: '',
                          frequentFlyerNumber: '',
                        });
                        setIsAddPassengerOpen(true);
                      }}
                      className="btn-hover-effect"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 w-full max-w-xs">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {filteredPassengers.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="inline-flex rounded-full bg-muted p-3 mb-4">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No passengers found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? 'Try adjusting your search term' : 'Add your first passenger to get started'}
                    </p>
                    {!searchQuery && (
                      <Button 
                        variant="outline" 
                        className="mx-auto"
                        onClick={() => {
                          setSelectedPassenger(null);
                          setNewPassenger({
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            frequentFlyerNumber: '',
                          });
                          setIsAddPassengerOpen(true);
                        }}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Passenger
                      </Button>
                    )}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Flights</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPassengers.map((passenger) => (
                        <TableRow key={passenger.id} className="animate-fade-up">
                          <TableCell className="font-medium">
                            {passenger.firstName} {passenger.lastName}
                          </TableCell>
                          <TableCell>{passenger.email}</TableCell>
                          <TableCell>
                            <div className={`
                              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${passenger.status === 'Active' 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-amber-50 text-amber-700'}
                            `}>
                              {passenger.status === 'Active' 
                                ? <CheckCircle className="h-3 w-3 mr-1" /> 
                                : <XCircle className="h-3 w-3 mr-1" />}
                              {passenger.status}
                            </div>
                          </TableCell>
                          <TableCell>{passenger.totalFlights}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditPassenger(passenger)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive"
                                onClick={() => openDeleteDialog(passenger)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Bookings */}
          <div className="w-full lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  Latest passenger bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.slice(0, 5).map((booking) => {
                    const passenger = passengers.find(p => p.id === booking.passengerId);
                    return (
                      <div key={booking.id} className="flex items-start space-x-3 pb-4 border-b last:pb-0 last:border-0">
                        <div className="rounded-full bg-primary/10 p-2">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {passenger?.firstName} {passenger?.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.origin} → {booking.destination}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs">{booking.flightNumber}</span>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-xs">{booking.date}</span>
                          </div>
                          <div className={`
                            inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium
                            ${booking.status === 'Confirmed' 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-rose-50 text-rose-700'}
                          `}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Bookings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Passenger Dialog */}
      <Dialog open={isAddPassengerOpen} onOpenChange={setIsAddPassengerOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedPassenger ? 'Edit Passenger' : 'Add New Passenger'}
            </DialogTitle>
            <DialogDescription>
              {selectedPassenger 
                ? "Update passenger information" 
                : "Create a new passenger profile"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name*</Label>
              <Input 
                id="firstName" 
                name="firstName"
                value={newPassenger.firstName}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name*</Label>
              <Input 
                id="lastName" 
                name="lastName"
                value={newPassenger.lastName}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address*</Label>
              <Input 
                id="email" 
                name="email"
                type="email"
                value={newPassenger.email}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                value={newPassenger.phone}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            
            <div className="sm:col-span-2">
              <Label htmlFor="frequentFlyerNumber">Frequent Flyer Number</Label>
              <Input 
                id="frequentFlyerNumber" 
                name="frequentFlyerNumber"
                value={newPassenger.frequentFlyerNumber}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddPassengerOpen(false);
                setSelectedPassenger(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={selectedPassenger ? handleUpdatePassenger : handleAddPassenger}
              className="btn-hover-effect"
            >
              {selectedPassenger ? 'Update Passenger' : 'Add Passenger'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this passenger? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPassenger && (
            <div className="p-4 bg-secondary/50 rounded-lg mb-4">
              <p className="font-medium">{selectedPassenger.firstName} {selectedPassenger.lastName}</p>
              <p className="text-sm text-muted-foreground">{selectedPassenger.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {getPassengerBookings(selectedPassenger.id).length} bookings
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeletePassenger}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Passengers;
