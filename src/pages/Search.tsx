import Pagination from "@/components/Pagination";
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
import { Skeleton } from "@/components/ui/skeleton";
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
  Search as SearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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
    refetch,
    isError,
  } = useJobPostings({
    filters,
    pagination,
    sorting,
  });

  console.log("error", error);
  console.log("isError", isError);

  if (error) {
    toast.error("Error loading internships");
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Reset pagination when filters change
    setPagination((prev) => ({
      ...prev,
      page: 0,
    }));
  };

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-");
    setSorting({
      field: field as SortingParams["field"],
      direction: direction as SortingParams["direction"],
    });
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      await refetch();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, sorting, pagination, refetch]);

  return (
    <div className="container mx-auto py-8 px-4">
      <SearchSection filters={filters} onSearchChange={handleSearchChange} />
      <div className="grid md:grid-cols-4 gap-6">
        <FiltersSection
          filters={filters}
          onFilterChange={handleFilterChange}
          sorting={sorting}
          onSortChange={handleSortChange}
        />
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Skeleton className="h-48" />
                </Card>
              ))}
            </div>
          ) : (
            <SearchResults
              postings={jobPostingsResponse?.data || []}
              pagination={pagination}
              totalCount={jobPostingsResponse?.count || 0}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, page }))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SearchSection({
  filters,
  onSearchChange,
}: {
  filters: JobPostingsFilters;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
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
                name="search"
                value={filters.search || ""}
                onChange={onSearchChange}
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FiltersSection({
  filters,
  sorting,
  onSortChange,
}: {
  filters: JobPostingsFilters;
  onFilterChange: (field: string, value: string) => void;
  sorting: SortingParams;
  onSortChange: (value: string) => void;
}) {
  // const mapping = {
  //   all: "",
  //   finance: "Finance and Insurance",
  //   other: "Other",
  // };

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
          <Select
            value={`${sorting.field}-${sorting.direction}`}
            onValueChange={onSortChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at-descending">Most Recent</SelectItem>
              <SelectItem value="created_at-ascending">Oldest First</SelectItem>
              <SelectItem value="title-ascending">Title A-Z</SelectItem>
              <SelectItem value="title-descending">Title Z-A</SelectItem>
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
            <Label>Field</Label>
            <Select
              value={filters.field || ""}
              // onValueChange={(value) => onFilterChange("field", mapping[value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="finance">Finance and Insurance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SearchResults({
  postings,
  pagination,
  totalCount,
  onPageChange,
}: {
  postings: JobPosting[];
  pagination: PaginationParams;
  totalCount: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalCount / pagination.pageSize);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {postings.map((posting: JobPosting) => (
          <JobPostingPreview key={posting.id} posting={posting} />
        ))}
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function JobPostingPreview({ posting }: { posting: JobPosting }) {
  return (
    <Link key={posting.id} to={`/internships/${posting.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{posting.title}</h3>
                <div className="flex items-center gap-2 text-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{posting.field}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-foreground">{posting.description}</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  Posted {new Date(posting.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
