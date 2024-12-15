import { useNavigate } from "react-router-dom";
import {
  Search,
  UserCircle,
  Building2,
  ArrowRight,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Background3D from "@/components/Background3d";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedInternshipsSection />
      <ProfileExampleSection />
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();

  return (
    <>
      <Background3D />
      <div className="container mx-auto px-4 py-16 md:py-40 md:pb-32 max-w-3xl text-center space-y-6 md:space-y-10">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Find Your Perfect Internship
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Connect with leading companies and kickstart your career.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto bg-background">
          <Search className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for internships..."
            className="w-full pl-10 py-4 md:py-6 text-base md:text-lg ring-4 focus-visible:ring-4"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/search");
              }
            }}
          />
        </div>
        <Button
          size="lg"
          className="px-8 py-6 text-lg"
          onClick={() => navigate("/search")}
        >
          Browse Internships
        </Button>
      </div>
    </>
  );
}

function FeaturedInternshipsSection() {
  const featuredInternships = [
    {
      id: 1,
      role: "Software Development Intern",
      company: "TechCorp",
      location: "Remote",
    },
    {
      id: 2,
      role: "Data Science Intern",
      company: "DataTech",
      location: "Hybrid",
    },
    {
      id: 3,
      role: "UI/UX Design Intern",
      company: "DesignCo",
      location: "On-site",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Featured Internships
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Explore our hand-picked opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {featuredInternships.map((internship) => (
            <FeaturedInternship key={internship.id} {...internship} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedInternship({
  id,
  role,
  company,
  location,
}: {
  id: number;
  role: string;
  company: string;
  location: string;
}) {
  const navigate = useNavigate();

  return (
    <Card
      className="bg-primary-foreground hover:ring-4 transition-shadow cursor-pointer"
      onClick={() => navigate(`/internships/${id}`)}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg md:text-xl leading-tight">
          {role}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-4 h-4 shrink-0" />
            <span className="text-sm md:text-base">{company}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm md:text-base">{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileExampleSection() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        <div className="text-center space-y-3 md:space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Stand Out to Companies
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Create your professional profile and get noticed by top companies
            looking for talented individuals like you
          </p>
        </div>

        <ProfileExample />
      </div>
    </div>
  );
}

function ProfileExample() {
  const navigate = useNavigate();

  const exampleProfile = {
    name: "John Doe",
    title: "Computer Science Student",
    university: "Faculty of Informatics, MUNI",
    skills: ["React", "TypeScript", "Node.js"],
    imageUrl: "/api/placeholder/400/400",
  };

  return (
    <Card className="border-2">
      <CardContent className="p-4 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Profile Preview */}
          <div className="flex-1 w-full">
            <Card className="bg-primary-foreground">
              <CardContent className="p-4 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="bg-primary text-primary-foreground rounded-full p-6 md:p-8 text-xl md:text-2xl font-bold">
                    {exampleProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg md:text-xl text-foreground">
                      {exampleProfile.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {exampleProfile.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">
                    {exampleProfile.university}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exampleProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-secondary text-secondary-foreground text-xs md:text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="flex-1 text-center md:text-left">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Create Your Professional Profile
              </h3>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-center gap-3">
                  <UserCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">
                    Showcase your skills and experience
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">
                    Get discovered by top companies
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">
                    Stand out from other candidates
                  </span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => navigate("/register")}
                  variant="default"
                  className="w-full md:flex-1"
                >
                  Create Your Profile
                </Button>
                <Button
                  onClick={() => navigate("/profile/example/view")}
                  variant="outline"
                  className="w-full md:flex-1"
                >
                  View Example Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
