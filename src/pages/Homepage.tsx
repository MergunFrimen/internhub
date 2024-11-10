import { useState } from "react";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  Award,
  Bell,
  Menu,
  User,
} from "lucide-react";

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredInternships = [
    {
      role: "Software Development Intern",
      company: "TechCorp",
      location: "Remote",
      type: "Part-time",
    },
    {
      role: "Cybersecurity Intern",
      company: "SecureNet",
      location: "Bratislava",
      type: "Full-time",
    },
    {
      role: "Frontend Developer Intern",
      company: "WebFlow",
      location: "Hybrid",
      type: "Flexible",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                InternPath
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Browse
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Companies
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Resources
              </a>
              <Bell className="w-5 h-5 text-gray-600" />
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="md:hidden flex items-center">
              <Menu className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Tech Internship
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover opportunities that match your skills and schedule
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search for internships, companies, or skills"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full hover:bg-gray-50">
              <Briefcase className="w-4 h-4" />
              <span>Role</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full hover:bg-gray-50">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full hover:bg-gray-50">
              <Clock className="w-4 h-4" />
              <span>Schedule</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full hover:bg-gray-50">
              <Award className="w-4 h-4" />
              <span>Experience Level</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Internships */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Internships
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredInternships.map((internship, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2">{internship.role}</h3>
              <p className="text-gray-600 mb-4">{internship.company}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{internship.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Active Internships</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Student Success Stories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
