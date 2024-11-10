// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

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
    </div>
  );
}
