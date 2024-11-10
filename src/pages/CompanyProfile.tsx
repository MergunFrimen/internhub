// src/pages/CompanyProfile.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Globe, MapPin, Users } from "lucide-react";
import { useParams } from "react-router-dom";

export default function CompanyProfile() {
  useParams();

  // Mock company data - in real app, fetch based on id
  const company = {
    name: "TechCorp",
    description:
      "Leading technology company focused on innovation and cutting-edge solutions.",
    industry: "Software Development",
    location: "Remote",
    website: "https://techcorp.example.com",
    employees: "1000-5000",
    openings: [
      {
        id: 1,
        title: "Software Development Intern",
        department: "Engineering",
        type: "Full-time",
      },
      {
        id: 2,
        title: "UI/UX Design Intern",
        department: "Design",
        type: "Part-time",
      },
    ],
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{company.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">{company.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-600" />
                <span>{company.industry}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-600" />
                <a
                  href={company.website}
                  className="text-blue-600 hover:underline"
                >
                  Company Website
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                <span>{company.employees} employees</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Open Positions</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {company.openings.map((opening) => (
          <Card key={opening.id}>
            <CardHeader>
              <CardTitle>{opening.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-gray-600">
                  Department: {opening.department}
                </div>
                <div className="text-gray-600">Type: {opening.type}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
