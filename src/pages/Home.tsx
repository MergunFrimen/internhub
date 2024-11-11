import { useNavigate } from "react-router-dom";
import { Search, UserCircle, Building2, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect Tech Internship
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with leading tech companies and kickstart your career
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for internships or companies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => {
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
        <h2 className="text-2xl font-bold mb-6">Featured Internships</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredInternships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/internships/${internship.id}`)}
            >
              <h3 className="font-semibold mb-2">{internship.role}</h3>
              <p className="text-gray-600">{internship.company}</p>
              <p className="text-gray-500 text-sm mt-2">
                {internship.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Example Profile Section */}
      <div className="container mx-auto px-4 py-12 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Stand Out to Companies</h2>
            <p className="text-gray-600">
              Create your professional profile and get noticed by top companies
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Preview */}
              <div className="flex-1 w-full md:w-auto">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-6 text-xl font-bold">
                      {exampleProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {exampleProfile.name}
                      </h3>
                      <p className="text-gray-600">{exampleProfile.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span>{exampleProfile.university}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exampleProfile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-4">
                  Create Your Professional Profile
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <UserCircle className="w-5 h-5 text-blue-600" />
                    <span>Showcase your skills and experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>Get discovered by top companies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    <span>Stand out from other candidates</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
