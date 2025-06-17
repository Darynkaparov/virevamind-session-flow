
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, Video, MapPin, Star, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SessionBookingProps {
  therapist: any;
  onBack: () => void;
}

const SessionBooking = ({ therapist, onBack }: SessionBookingProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const { toast } = useToast();

  // Mock available time slots
  const availableSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const durations = [
    { value: "30", label: "30 minutes", price: "$75" },
    { value: "60", label: "60 minutes", price: "$120" },
    { value: "90", label: "90 minutes", price: "$180" }
  ];

  // Generate next 7 days
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    return dates;
  };

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime || !selectedDuration) {
      toast({
        title: "Please complete your selection",
        description: "Select date, time, and duration to book your session.",
        variant: "destructive"
      });
      return;
    }

    setIsBooked(true);
    toast({
      title: "Session Booked Successfully!",
      description: "You'll receive a confirmation email with Zoom link shortly.",
    });
  };

  if (isBooked) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Session Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">Your session with {therapist.name} has been booked</p>

          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Calendar className="h-6 w-6 mr-2" />
                Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Therapist:</span>
                <span>{therapist.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{getAvailableDates().find(d => d.value === selectedDate)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Duration:</span>
                <span>{durations.find(d => d.value === selectedDuration)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>{durations.find(d => d.value === selectedDuration)?.price}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button onClick={onBack} variant="outline" className="mr-4">
              Back to Directory
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Video className="h-4 w-4 mr-2" />
              Join Session (when time comes)
            </Button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• You'll receive a confirmation email with Zoom link</li>
              <li>• Calendar invite will be sent to your email</li>
              <li>• Join 5 minutes before your session time</li>
              <li>• Post-session feedback survey will be sent after</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Directory
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Therapist Info */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={therapist.photo} alt={therapist.name} />
                  <AvatarFallback>{therapist.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-xl">{therapist.name}</CardTitle>
                    {therapist.verified && (
                      <Shield className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {therapist.rating}
                    </div>
                    <span>{therapist.sessions} sessions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {therapist.location}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <CardDescription>{therapist.bio}</CardDescription>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700">License: </span>
                <Badge variant="secondary">{therapist.licenseType}</Badge>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700 block mb-2">Focus Areas:</span>
                <div className="flex flex-wrap gap-1">
                  {therapist.focusAreas.map((area: string) => (
                    <Badge key={area} variant="outline" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700 block mb-2">Languages:</span>
                <div className="flex flex-wrap gap-1">
                  {therapist.languages.map((lang: string) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                Book Your Session
              </CardTitle>
              <CardDescription>
                Select your preferred date, time, and session duration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Duration Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Session Duration</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {durations.map((duration) => (
                    <Card
                      key={duration.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedDuration === duration.value ? 'ring-2 ring-blue-500 shadow-md' : ''
                      }`}
                      onClick={() => setSelectedDuration(duration.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <Clock className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="font-semibold">{duration.label}</div>
                        <div className="text-blue-600 font-bold">{duration.price}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {getAvailableDates().map((date) => (
                    <Button
                      key={date.value}
                      variant={selectedDate === date.value ? "default" : "outline"}
                      className="h-16 flex flex-col p-2"
                      onClick={() => setSelectedDate(date.value)}
                    >
                      <span className="text-xs">{date.label.split(' ')[0]}</span>
                      <span className="text-sm font-bold">{date.label.split(' ')[2]}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Available Times</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {availableSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="h-12"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Button */}
              <div className="pt-4 border-t">
                <Button
                  onClick={handleBookSession}
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  disabled={!selectedDate || !selectedTime || !selectedDuration}
                >
                  Book Session {selectedDuration && `- ${durations.find(d => d.value === selectedDuration)?.price}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SessionBooking;
