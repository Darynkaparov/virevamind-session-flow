
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Calendar, User, Shield, Star, MapPin, Clock } from "lucide-react";
import RoleSelection from "@/components/RoleSelection";
import TherapistOnboarding from "@/components/TherapistOnboarding";
import TherapistDirectory from "@/components/TherapistDirectory";
import SessionBooking from "@/components/SessionBooking";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'role-selection' | 'therapist-onboarding' | 'seeker-app'>('landing');
  const [userRole, setUserRole] = useState<'therapist' | 'seeker' | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);

  const handleRoleSelect = (role: 'therapist' | 'seeker') => {
    setUserRole(role);
    if (role === 'therapist') {
      setCurrentView('therapist-onboarding');
    } else {
      setCurrentView('seeker-app');
    }
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            VirevaMind
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A cognitive optimization platform connecting verified CBT & NLP therapists with seekers for transformative mental health experiences.
          </p>
          <Button 
            onClick={() => setCurrentView('role-selection')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg transition-all duration-200 hover:scale-105"
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Verified Therapists</CardTitle>
              <CardDescription>
                All therapists undergo rigorous credential verification and continuous monitoring
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <Calendar className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Easy Booking</CardTitle>
              <CardDescription>
                Seamless session booking with integrated calendar and automated reminders
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <Star className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Quality Assurance</CardTitle>
              <CardDescription>
                Post-session feedback and continuous quality monitoring ensure excellence
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Therapists</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'landing') {
    return renderLanding();
  }

  if (currentView === 'role-selection') {
    return (
      <RoleSelection 
        onRoleSelect={handleRoleSelect}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'therapist-onboarding') {
    return (
      <TherapistOnboarding 
        onBack={() => setCurrentView('role-selection')}
      />
    );
  }

  if (currentView === 'seeker-app') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">VirevaMind</h1>
              <Button 
                variant="outline"
                onClick={() => setCurrentView('landing')}
              >
                Home
              </Button>
            </div>
          </div>
        </div>

        {selectedTherapist ? (
          <SessionBooking 
            therapist={selectedTherapist}
            onBack={() => setSelectedTherapist(null)}
          />
        ) : (
          <TherapistDirectory 
            onSelectTherapist={setSelectedTherapist}
          />
        )}
      </div>
    );
  }

  return null;
};

export default Index;
