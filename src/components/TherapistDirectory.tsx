
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, MapPin, Star, Shield, Calendar } from "lucide-react";

// Mock therapist data
const mockTherapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    photo: "/placeholder.svg",
    bio: "Specialized in CBT with 10+ years experience helping clients overcome anxiety and limiting beliefs.",
    licenseType: "CBT",
    focusAreas: ["Anxiety", "Limiting Beliefs", "Self-Esteem"],
    languages: ["English", "Spanish"],
    location: "New York, NY",
    rating: 4.9,
    sessions: 250,
    verified: true,
    availability: "Available today"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    photo: "/placeholder.svg",
    bio: "NLP practitioner focused on emotional regulation and relationship dynamics with a holistic approach.",
    licenseType: "NLP",
    focusAreas: ["Emotional Regulation", "Relationships", "Career"],
    languages: ["English", "Mandarin"],
    location: "San Francisco, CA",
    rating: 4.8,
    sessions: 180,
    verified: true,
    availability: "Available tomorrow"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    photo: "/placeholder.svg",
    bio: "Dual-certified in CBT & NLP, specializing in depression treatment and cognitive restructuring.",
    licenseType: "Both CBT & NLP",
    focusAreas: ["Depression", "Anxiety", "Limiting Beliefs"],
    languages: ["English", "Spanish", "Portuguese"],
    location: "Miami, FL",
    rating: 4.9,
    sessions: 320,
    verified: true,
    availability: "Available this week"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    photo: "/placeholder.svg",
    bio: "CBT specialist with expertise in career counseling and self-improvement strategies.",
    licenseType: "CBT",
    focusAreas: ["Career", "Self-Esteem", "Anxiety"],
    languages: ["English", "French"],
    location: "Toronto, ON",
    rating: 4.7,
    sessions: 150,
    verified: true,
    availability: "Available next week"
  }
];

interface TherapistDirectoryProps {
  onSelectTherapist: (therapist: any) => void;
}

const TherapistDirectory = ({ onSelectTherapist }: TherapistDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("");
  const [selectedFocus, setSelectedFocus] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const filteredTherapists = mockTherapists.filter((therapist) => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLicense = !selectedLicense || therapist.licenseType.includes(selectedLicense);
    const matchesFocus = !selectedFocus || therapist.focusAreas.includes(selectedFocus);
    const matchesLanguage = !selectedLanguage || therapist.languages.includes(selectedLanguage);

    return matchesSearch && matchesLicense && matchesFocus && matchesLanguage;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Therapist</h1>
        <p className="text-gray-600 mb-6">Browse our directory of verified cognitive optimization specialists</p>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search therapists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedLicense} onValueChange={setSelectedLicense}>
              <SelectTrigger>
                <SelectValue placeholder="License Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="CBT">CBT</SelectItem>
                <SelectItem value="NLP">NLP</SelectItem>
                <SelectItem value="Both">Both CBT & NLP</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFocus} onValueChange={setSelectedFocus}>
              <SelectTrigger>
                <SelectValue placeholder="Focus Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Areas</SelectItem>
                <SelectItem value="Anxiety">Anxiety</SelectItem>
                <SelectItem value="Depression">Depression</SelectItem>
                <SelectItem value="Limiting Beliefs">Limiting Beliefs</SelectItem>
                <SelectItem value="Self-Esteem">Self-Esteem</SelectItem>
                <SelectItem value="Relationships">Relationships</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Languages</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="Mandarin">Mandarin</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Therapist Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapists.map((therapist) => (
          <Card key={therapist.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => onSelectTherapist(therapist)}>
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={therapist.photo} alt={therapist.name} />
                  <AvatarFallback>{therapist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <CardTitle className="text-lg">{therapist.name}</CardTitle>
                    {therapist.verified && (
                      <Shield className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {therapist.rating}
                    </div>
                    <span>{therapist.sessions} sessions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {therapist.location}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="mb-4 line-clamp-3">
                {therapist.bio}
              </CardDescription>

              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">License: </span>
                  <Badge variant="secondary">{therapist.licenseType}</Badge>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Focus Areas:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {therapist.focusAreas.slice(0, 3).map((area) => (
                      <Badge key={area} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Languages:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {therapist.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-green-600 font-medium">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {therapist.availability}
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Book Session
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TherapistDirectory;
