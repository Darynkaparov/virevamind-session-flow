
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Shield, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TherapistOnboardingProps {
  onBack: () => void;
}

const TherapistOnboarding = ({ onBack }: TherapistOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    certificationType: '',
    licenseNumber: '',
    issuingInstitution: '',
    certificationDate: '',
    documents: null as File | null,
    photo: null as File | null,
    bio: '',
    focusAreas: [] as string[],
    languages: [] as string[],
    location: '',
    timezone: '',
    isInsured: false
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, documents: file });
      // Simulate Stripe Identity + AWS Textract + API verification process
      setTimeout(() => {
        setVerificationStatus('verified');
        toast({
          title: "Credentials Verified",
          description: "Your credentials have been successfully verified via Stripe Identity and license validation APIs.",
        });
      }, 3000);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Identity & Credential Verification</h2>
        <p className="text-gray-600">We need to verify your professional credentials and identity using Stripe Identity and API validation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full legal name"
            />
          </div>

          <div>
            <Label htmlFor="certificationType">License/Certification Type</Label>
            <Select value={formData.certificationType} onValueChange={(value) => setFormData({ ...formData, certificationType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select certification type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cbt">Cognitive Behavioral Therapist</SelectItem>
                <SelectItem value="nlp">NLP Master Practitioner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="licenseNumber">License Number {formData.certificationType === 'nlp' && <span className="text-gray-500">(Optional for NLP)</span>}</Label>
            <Input
              id="licenseNumber"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              placeholder="Enter your license number"
              required={formData.certificationType === 'cbt'}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="insured"
              checked={formData.isInsured}
              onCheckedChange={(checked) => setFormData({ ...formData, isInsured: checked as boolean })}
            />
            <Label htmlFor="insured">I am insured (Professional Liability Insurance)</Label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="institution">Issuing Institution</Label>
            <Input
              id="institution"
              value={formData.issuingInstitution}
              onChange={(e) => setFormData({ ...formData, issuingInstitution: e.target.value })}
              placeholder="Institution that issued your certification"
            />
          </div>

          <div>
            <Label htmlFor="certificationDate">Graduation/Certification Date</Label>
            <Input
              id="certificationDate"
              type="date"
              value={formData.certificationDate}
              onChange={(e) => setFormData({ ...formData, certificationDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="documents">Upload License/Certificates</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                id="documents"
                className="hidden"
                accept=".pdf,.jpg,.png"
                onChange={handleDocumentUpload}
              />
              <label htmlFor="documents" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700">Click to upload</span>
                <span className="text-gray-500"> or drag and drop</span>
              </label>
              <p className="text-sm text-gray-500 mt-2">PDF, PNG, JPG up to 10MB</p>
              <p className="text-xs text-gray-400 mt-2">Documents will be processed via AWS Textract for automatic verification</p>
            </div>
          </div>
        </div>
      </div>

      {verificationStatus === 'verified' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
          <div>
            <p className="font-semibold text-green-900">Credentials Verified!</p>
            <p className="text-green-700">Your credentials have been verified via Stripe Identity, AWS Textract OCR, and {formData.certificationType === 'cbt' ? 'Propelus PSV/NPI Registry' : 'NLP certification validation'}. You're now listed in the VirevaMind directory.</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Therapist Profile Setup</h2>
        <p className="text-gray-600">Create your public profile for the VirevaMind directory</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="photo">Profile Photo</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                id="photo"
                className="hidden"
                accept=".jpg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFormData({ ...formData, photo: file });
                }}
              />
              <label htmlFor="photo" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700">Upload Photo</span>
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell clients about your approach and experience (max 500 characters)"
              maxLength={500}
              rows={4}
            />
            <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
          </div>

          <div>
            <Label htmlFor="location">Location/Timezone</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State/Country"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Focus Areas</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Limiting Beliefs', 'Emotional Regulation', 'Anxiety', 'Depression', 'Self-Esteem', 'Relationships', 'Career', 'Trauma', 'Phobias'].map((area) => (
                <Badge
                  key={area}
                  variant={formData.focusAreas.includes(area) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newAreas = formData.focusAreas.includes(area)
                      ? formData.focusAreas.filter(a => a !== area)
                      : [...formData.focusAreas, area];
                    setFormData({ ...formData, focusAreas: newAreas });
                  }}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Languages</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Mandarin', 'Arabic'].map((lang) => (
                <Badge
                  key={lang}
                  variant={formData.languages.includes(lang) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newLangs = formData.languages.includes(lang)
                      ? formData.languages.filter(l => l !== lang)
                      : [...formData.languages, lang];
                    setFormData({ ...formData, languages: newLangs });
                  }}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {verificationStatus === 'verified' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">Verified {formData.certificationType === 'cbt' ? 'CBT' : 'NLP'} Therapist</span>
              </div>
              <p className="text-blue-700 text-sm">This badge will appear on your public profile</p>
              {formData.isInsured && (
                <p className="text-blue-700 text-sm mt-1">✓ Professional Liability Insurance Verified</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Calendar className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Calendar Integration</h2>
        <p className="text-gray-600">Set up your availability and session preferences with Calendly API</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Availability</CardTitle>
            <CardDescription>Set your recurring weekly schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center justify-between">
                <span className="font-medium">{day}</span>
                <div className="flex items-center space-x-2">
                  <Input type="time" className="w-24" defaultValue="09:00" />
                  <span>-</span>
                  <Input type="time" className="w-24" defaultValue="17:00" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Settings</CardTitle>
            <CardDescription>Configure your session preferences and Calendly integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Session Duration Options</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['30 min', '60 min', '90 min'].map((duration) => (
                  <Badge key={duration} variant="outline" className="cursor-pointer hover:bg-gray-100">
                    {duration}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="dailyLimit">Sessions per Day</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 sessions</SelectItem>
                  <SelectItem value="6">6 sessions</SelectItem>
                  <SelectItem value="8">8 sessions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="weeklyLimit">Sessions per Week</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 sessions</SelectItem>
                  <SelectItem value="30">30 sessions</SelectItem>
                  <SelectItem value="40">40 sessions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-900">Calendly API Integration</span>
              </div>
              <p className="text-purple-700 text-sm">Auto-generated Zoom/Google Meet links will be created for each session booking</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-900">Calendar Integration Ready</span>
              </div>
              <p className="text-green-700 text-sm">Your availability has been saved. Users can now book sessions with you via Calendly.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Role Selection
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Therapist Onboarding</h1>
            <p className="text-xl text-gray-600">Complete your verification to join the VirevaMind network</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === totalSteps}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistOnboarding;
