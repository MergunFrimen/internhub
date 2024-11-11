import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Calendar,
  BriefcaseIcon,
  Clock,
  GraduationCap,
  Users,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function InternshipDetails() {
  // Mock data - in real app, fetch based on id
  const internship = {
    title: "Software Development Intern",
    company: {
      id: 1,
      name: "TechCorp",
      logo: "/api/placeholder/80/80",
    },
    location: "Remote",
    type: "Full-time",
    duration: "3 months",
    startDate: "June 2024",
    salary: "€1,200/month",
    applicationDeadline: "April 30, 2024",
    description:
      "Join our engineering team and work on cutting-edge projects using modern technologies. You'll have the opportunity to contribute to real-world applications while learning from experienced developers.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong programming fundamentals",
      "Experience with modern web technologies",
      "Good problem-solving skills",
      "Ability to work in a team environment",
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with senior developers on project implementation",
      "Participate in code reviews and team meetings",
      "Debug and fix software issues",
      "Write clean, maintainable code",
    ],
    benefits: [
      "Flexible working hours",
      "Professional development opportunities",
      "Mentorship program",
      "Modern equipment provided",
      "Team building events",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Git", "AWS"],
    spots: 3,
    applicants: 45,
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header Section */}
      <Card className="border-2 border-primary/10">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{internship.title}</h1>
                <Link
                  to={`/companies/${internship.company.id}`}
                  className="flex items-center gap-3 text-lg text-primary hover:underline"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  {internship.company.name}
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BriefcaseIcon className="w-4 h-4" />
                  <span>{internship.type}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {/* <DollarSign className="w-4 h-4" /> */}
                  <span>{internship.salary}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {internship.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-orange-600">
                  <Calendar className="w-4 h-4" />
                  <span>Apply by {internship.applicationDeadline}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>
                    {internship.spots} positions • {internship.applicants}{" "}
                    applicants
                  </span>
                </div>
              </div>
              <Button size="lg" className="w-full md:w-auto">
                Apply Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {internship.description}
              </p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internship.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5" />
                Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internship.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                    <span className="text-muted-foreground">{resp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internship.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
