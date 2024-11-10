// src/pages/Applications.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, Calendar, MapPin } from "lucide-react";

export default function Applications() {
  const applications = [
    {
      company: "TechCorp",
      role: "Software Development Intern",
      location: "Remote",
      status: "Under Review",
      appliedDate: "2024-03-15",
    },
    {
      company: "SecureNet",
      role: "Frontend Developer Intern",
      location: "Bratislava",
      status: "Interview Scheduled",
      appliedDate: "2024-03-10",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      <div className="space-y-4">
        {applications.map((app, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl">{app.role}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{app.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{app.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Applied on {app.appliedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="font-medium text-blue-600">
                    {app.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
