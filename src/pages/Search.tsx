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
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Search() {
  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [duration, setDuration] = useState("");
  const [field, setField] = useState("");
  const [experienceLevel, setExperienceLevel] = useState([0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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

  const handleFilterAdd = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleFilterRemove = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Search Section */}
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
              {/* Search Query Input */}
              <div className="flex-1 relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, company, or keyword..."
                  className="pl-10"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>

              {/* Location Input */}
              <div className="relative md:w-[260px]">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>

              {/* Search Button */}
              <Button className="md:w-[120px]">
                <SearchIcon className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-sm text-muted-foreground">
                Quick filters:
              </span>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleFilterAdd("Remote")}
              >
                Remote
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleFilterAdd("Full-time")}
              >
                Full-time
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleFilterAdd("3 months")}
              >
                3 months
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleFilterAdd("No experience")}
              >
                No experience
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="w-4 h-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Type */}
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

              {/* Industry */}
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select value={field} onValueChange={setField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">
                      Software Engineering
                    </SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="design">UI/UX Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
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

              {/* Experience Level */}
              <div className="space-y-4">
                <Label>Experience Level</Label>
                <Slider
                  value={experienceLevel}
                  onValueChange={setExperienceLevel}
                  max={4}
                  step={1}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
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

        {/* Search Results */}
        <div className="md:col-span-3 space-y-6">
          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <Card>
              <CardContent className="py-3">
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.map((filter) => (
                    <Badge
                      key={filter}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {filter}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => handleFilterRemove(filter)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {results.map((result) => (
            <Link key={result.id} to={`/internships/${result.id}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{result.role}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{result.company}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground">
                      {result.description}
                    </p>

                    {/* Details */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{result.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span>{result.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{result.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Posted {result.postedDate}</span>
                      </div>
                    </div>

                    {/* Skills/Requirements */}
                    <div className="flex flex-wrap gap-2">
                      {result.requirements.map((req, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            handleFilterAdd(req);
                          }}
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
        </div>
      </div>
    </div>
  );
}
