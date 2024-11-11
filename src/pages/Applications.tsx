// src/pages/Applications.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Applications() {
  const applications = [
    {
      id: 1,
      company: "TechCorp",
      role: "Software Development Intern",
      location: "Remote",
      status: "Under Review",
      appliedDate: "2024-03-15",
    },
    {
      id: 2,
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
          <Link to={`/applications/${app.id}`}>
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{app.role}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{app.company}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
