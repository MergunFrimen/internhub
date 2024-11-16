import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  MapPin,
  Calendar,
  Search as SearchIcon,
  Clock,
  Briefcase,
  Filter,
  X,
  ArrowRight,
  ArrowUpDown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Search() {
  const selectedFilters = ["Remote", "No experience"];

  // Mock internship results data
  const results = [
    {
      id: 1,
      role: "Software Development Intern",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      duration: "3 months",
      field: "Software Engineering",
      postedDate: "2024-03-15",
      description:
        "Join our engineering team to work on cutting-edge projects using modern technologies...",
      requirements: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      role: "Data Science Intern",
      company: "DataTech",
      location: "Hybrid",
      type: "Part-time",
      duration: "6 months",
      field: "Data Science",
      postedDate: "2024-03-14",
      description: "Help us analyze and interpret complex datasets...",
      requirements: ["Python", "SQL", "Machine Learning"],
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <SearchSection />
      <div className="grid md:grid-cols-4 gap-6">
        <FiltersSection />
        <div className="md:col-span-3 gap-y-6">
          <SelectedFilters selectedFilters={selectedFilters} />
          <SearchResults results={results} />
        </div>
      </div>
    </div>
  );
}

function SearchSection({}: {}) {
  const quickFilters = ["Remote", "No experience", "6 months"];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SearchIcon className="w-5 h-5" />
          Search Internships
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search by title, company, or keyword..."
                className="pl-10"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground h-4 w-4" />
            </div>

            <div className="relative md:w-[260px]">
              <Input placeholder="Location" className="pl-10" />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground h-4 w-4" />
            </div>

            <Button className="md:w-[120px]">
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-sm text-foreground">Quick filters:</span>
            {quickFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FiltersSection({}: {}) {
  const [jobType, setJobType] = useState("");
  const [duration, setDuration] = useState("");
  const [field, setField] = useState("");
  const [experienceLevel, setExperienceLevel] = useState([0]);

  return (
    <div className="flex flex-col space-y-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ArrowUpDown className="w-4 h-4 shrink-0" />
            Sort By
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="deadline">Application Deadline</SelectItem>
              <SelectItem value="company">Company Name</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-4 h-4 shrink-0" />
            Filters
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label>Job Type</Label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Industry</Label>
            <Select value={field} onValueChange={setField}>
              <SelectTrigger>
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software">Software Engineering</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-months">3 months</SelectItem>
                <SelectItem value="6-months">6 months</SelectItem>
                <SelectItem value="12-months">12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Experience Level</Label>
            <Slider
              value={experienceLevel}
              onValueChange={setExperienceLevel}
              max={4}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-foreground">
              {experienceLevel[0] === 0 && "No experience required"}
              {experienceLevel[0] === 1 && "Basic knowledge"}
              {experienceLevel[0] === 2 && "Some experience"}
              {experienceLevel[0] === 3 && "Intermediate"}
              {experienceLevel[0] === 4 && "Advanced"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SelectedFilters({ selectedFilters }: { selectedFilters: string[] }) {
  return (
    <>
      {selectedFilters.length > 0 && (
        <div className="py-3">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {filter}
                <X className="w-3 h-3 cursor-pointer" />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function SearchResults({ results }: { results: any[] }) {
  return (
    <>
      {results.map((result: any) => (
        <Link key={result.id} to={`/internships/${result.id}`}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{result.role}</h3>
                    <div className="flex items-center gap-2 text-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{result.company}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Description */}
                <p className="text-foreground">{result.description}</p>

                {/* Details */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{result.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{result.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{result.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {result.postedDate}</span>
                  </div>
                </div>

                {/* Skills/Requirements */}
                <div className="flex flex-wrap gap-2">
                  {result.requirements.map((req: any, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                    >
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
