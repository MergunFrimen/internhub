// src/pages/CompanyDirectory.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function CompanyDirectory() {
  const companies = [
    {
      id: 1,
      name: "TechCorp",
      location: "Remote",
      industry: "Software Development",
      openPositions: 5,
      description: "Leading technology company focused on innovation",
    },
    {
      id: 2,
      name: "SecureNet",
      location: "Bratislava",
      industry: "Cybersecurity",
      openPositions: 3,
      description: "Cybersecurity solutions provider",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Company Directory</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <Link key={company.id} to={`/companies/${company.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-600">{company.description}</p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Users className="w-4 h-4" />
                    <span>{company.openPositions} Open Positions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
