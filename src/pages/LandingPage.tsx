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

export default function LandingPage() {
  const navigate = useNavigate();

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

  const exampleProfile = {
    name: "John Doe",
    title: "Computer Science Student",
    university: "Slovak University of Technology",
    skills: ["React", "TypeScript", "Node.js"],
    imageUrl: "/api/placeholder/400/400",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-40">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-foreground">
              Find Your Perfect Internship
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with leading companies and kickstart your career.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for internships..."
              className="w-full pl-10 py-6 text-lg ring-4 focus-visible:ring-4"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/search");
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Featured Internships */}
      <div className="container mx-auto px-4 py-24">
        <div className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Featured Internships
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our hand-picked opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredInternships.map((internship) => (
              <Card
                key={internship.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/internships/${internship.id}`)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl leading-tight">
                    {internship.role}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>{internship.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{internship.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Example Profile Section */}
      <div className="container mx-auto px-4 py-24 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Stand Out to Companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create your professional profile and get noticed by top companies
              looking for talented individuals like you
            </p>
          </div>

          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Profile Preview */}
                <div className="flex-1 w-full md:w-auto">
                  <Card>
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="bg-primary text-primary-foreground rounded-full p-8 text-2xl font-bold">
                          {exampleProfile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-xl text-foreground">
                            {exampleProfile.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {exampleProfile.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-5 h-5" />
                        <span>{exampleProfile.university}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exampleProfile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-secondary text-secondary-foreground text-sm px-4 py-1.5 rounded-full"
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
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-foreground">
                      Create Your Professional Profile
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <UserCircle className="w-6 h-6 text-primary shrink-0" />
                        <span className="text-muted-foreground">
                          Showcase your skills and experience
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-primary shrink-0" />
                        <span className="text-muted-foreground">
                          Get discovered by top companies
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ArrowRight className="w-6 h-6 text-primary shrink-0" />
                        <span className="text-muted-foreground">
                          Stand out from other candidates
                        </span>
                      </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => navigate("/profile/example/view")}
                        variant="default"
                        className="flex-1"
                        size="lg"
                      >
                        View Example Profile
                      </Button>
                      <Button
                        onClick={() => navigate("/register")}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                      >
                        Create Your Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
