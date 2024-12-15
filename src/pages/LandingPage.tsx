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
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Find Your Perfect Internship
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with leading companies and kickstart your career.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute w-5 h-5 left-2 top-2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for internships..."
              className="w-full pl-10 ring-4 focus-visible:ring-4"
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
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            Featured Internships
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredInternships.map((internship) => (
            <Card
              key={internship.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/internships/${internship.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{internship.role}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span>{internship.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{internship.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Example Profile Section */}
      <div className="container mx-auto px-4 py-12 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-foreground">
              Stand Out to Companies
            </h2>
            <p className="text-muted-foreground">
              Create your professional profile and get noticed by top companies
            </p>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Preview */}
                <div className="flex-1 w-full md:w-auto">
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-6 text-xl font-bold">
                          {exampleProfile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            {exampleProfile.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {exampleProfile.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{exampleProfile.university}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exampleProfile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full"
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
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    Create Your Professional Profile
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">
                        Showcase your skills and experience
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">
                        Get discovered by top companies
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">
                        Stand out from other candidates
                      </span>
                    </li>
                  </ul>
                  <div className="space-x-4">
                    <Button
                      onClick={() => navigate("/profile/example/view")}
                      variant="default"
                    >
                      View Example Profile
                    </Button>
                    <Button
                      onClick={() => navigate("/register")}
                      variant="outline"
                    >
                      Create Your Profile
                    </Button>
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
