import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  JobPosting,
  JobPostingsFilters,
  PaginationParams,
  SortingParams,
  useJobPostings,
} from "@/hooks/use-postings";
import {
  ArrowRight,
  ArrowUpDown,
  Building2,
  Calendar,
  Filter,
  MapPin,
  Search as SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [filters, setFilters] = useState<JobPostingsFilters>({});
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingParams>({
    field: "created_at",
    direction: "descending",
  });

  const {
    data: jobPostingsResponse,
    isLoading,
    error,
  } = useJobPostings({
    filters: filters,
    pagination: pagination,
    sorting: sorting,
  });

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="bg-destructive/10 text-destructive">
          <CardContent className="pt-6">
            <p>Error loading internships. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <SearchSection filters={filters} />
      <div className="grid md:grid-cols-4 gap-6">
        <FiltersSection />
        <div className="md:col-span-3 gap-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="h-48" />
                </Card>
              ))}
            </div>
          ) : (
            <SearchResults results={jobPostingsResponse?.data || []} />
          )}
        </div>
      </div>
    </div>
  );
}

function SearchSection({ filters }: { filters: JobPostingsFilters }) {
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
                value={filters.search}
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground h-4 w-4" />
            </div>

            <div className="relative md:w-[260px]">
              <Input
                placeholder="Location"
                className="pl-10"
                value={filters.location}
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FiltersSection() {
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

function SearchResults({ results }: { results: JobPosting[] }) {
  console.log(results);
  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Link key={result.id} to={`/internships/${result.id}`}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{result.title}</h3>
                    <div className="flex items-center gap-2 text-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{result.field}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-foreground">{result.description}</p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Posted {new Date(result.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
