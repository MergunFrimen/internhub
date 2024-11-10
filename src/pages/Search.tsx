import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Search() {
  // Mock search results
  const results = [
    {
      id: 1,
      role: "Software Development Intern",
      company: "TechCorp",
      location: "Remote",
      postedDate: "2024-03-15",
    },
    {
      id: 2,
      role: "Data Science Intern",
      company: "DataTech",
      location: "Hybrid",
      postedDate: "2024-03-14",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <Input
          type="text"
          placeholder="Search for internships..."
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <Link key={result.id} to={`/internships/${result.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{result.role}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{result.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{result.location}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Posted on {result.postedDate}
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
