
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, UserCheck } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: 'therapist' | 'seeker') => void;
  onBack: () => void;
}

const RoleSelection = ({ onRoleSelect, onBack }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<'therapist' | 'seeker' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-8 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-gray-600">
            Select how you'd like to use VirevaMind
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedRole === 'therapist' ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedRole('therapist')}
          >
            <CardHeader className="text-center pb-4">
              <UserCheck className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">I'm a Therapist</CardTitle>
              <CardDescription className="text-lg">
                Join our verified network of CBT & NLP practitioners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Complete credential verification
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Set up your professional profile
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Manage your availability & bookings
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Earn from verified sessions
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedRole === 'seeker' ? 'ring-2 ring-green-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedRole('seeker')}
          >
            <CardHeader className="text-center pb-4">
              <User className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">I'm Seeking Therapy</CardTitle>
              <CardDescription className="text-lg">
                Find verified therapists for your cognitive optimization journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Browse verified therapist profiles
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Book sessions instantly
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Access integrated video sessions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Track your progress
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => selectedRole && onRoleSelect(selectedRole)}
            disabled={!selectedRole}
            className="px-12 py-3 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            Continue as {selectedRole === 'therapist' ? 'Therapist' : selectedRole === 'seeker' ? 'Seeker' : 'Selected Role'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
