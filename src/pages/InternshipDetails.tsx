import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, BriefcaseIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function InternshipDetails() {
  useParams();

  // Mock data - in real app, fetch based on id
  const internship = {
    title: "Software Development Intern",
    company: {
      id: 1, // Added company ID for the link
      name: "TechCorp",
    },
    location: "Remote",
    type: "Full-time",
    duration: "3 months",
    description:
      "Join our engineering team and work on cutting-edge projects...",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong programming fundamentals",
      "Experience with modern web technologies",
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with senior developers",
      "Participate in code reviews",
    ],
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl">{internship.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-5 h-5" />
              <Link
                to={`/companies/${internship.company.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {internship.company.name}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BriefcaseIcon className="w-5 h-5" />
              <span>{internship.type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{internship.duration}</span>
            </div>
          </div>
          <Button className="mt-6 w-fit">Apply Now</Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{internship.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              {internship.requirements.map((req, index) => (
                <li key={index} className="text-gray-600">
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              {internship.responsibilities.map((resp, index) => (
                <li key={index} className="text-gray-600">
                  {resp}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
