import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  JobPosting,
  JobPostingsFilters,
  SortingParams,
  useJobPostings,
} from "@/hooks/useJobPostings";
import { usePagination } from "@/hooks/usePagination";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useSorting } from "@/hooks/useSorting";
import {
  ArrowRight,
  ArrowUpDown,
  Building2,
  Calendar,
  Filter,
  Search,
  Search as SearchIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function SearchPage() {
  const isMobile = useIsMobile();
  const { filters, handleSearchChange, handleFilterChange } =
    useSearchFilters();
  const { pagination, handlePageChange, handlePageSizeChange } =
    usePagination();
  const { sorting, handleSortChange } = useSorting();

  const {
    data: jobPostingsResponse,
    isLoading,
    error,
    refetch,
  } = useJobPostings({
    filters,
    pagination,
    sorting,
  });

  useSearchResults(filters, pagination, sorting, refetch);

  if (error) {
    toast.error("Error loading internships");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Search Internships</h1>
        <p className="text-muted-foreground">
          Find the perfect internship opportunity
        </p>
      </div>

      {/* Search Controls */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, company, or keyword..."
            className="pl-10"
            name="search"
            value={filters.search || ""}
            onChange={handleSearchChange}
          />
        </div>
        <SearchFiltersSheet
          filters={filters}
          sorting={sorting}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          side={isMobile ? "bottom" : "right"}
        />
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Skeleton className="h-48" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Result Count */}
          <div className="text-sm text-muted-foreground">
            Found {jobPostingsResponse?.count || 0} internships
          </div>

          <div className="space-y-4">
            {jobPostingsResponse?.data.map((posting) => (
              <JobPostingCard key={posting.id} posting={posting} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={Math.ceil(
              (jobPostingsResponse?.count || 0) / pagination.pageSize
            )}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </div>
  );
}

function JobPostingCard({ posting }: { posting: JobPosting }) {
  return (
    <Link to={`/internships/${posting.id}`}>
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

            <p className="text-foreground line-clamp-2">
              {posting.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
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

interface SearchFiltersSheetProps {
  filters: JobPostingsFilters;
  sorting: SortingParams;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (field: string, value: string) => void;
  onSortChange: (value: string) => void;
  side?: "bottom" | "right";
}

function SearchFiltersSheet({
  filters,
  sorting,
  onSearchChange,
  onFilterChange,
  onSortChange,
  side = "right",
}: SearchFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters & Sort
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className={side === "bottom" ? "h-[80vh]" : "w-[400px] sm:w-[540px]"}
      >
        <SheetHeader>
          <SheetTitle>Search Filters</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Search Input */}
          <div className="space-y-2">
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by title, company, or keyword..."
                className="pl-10"
                name="search"
                value={filters.search || ""}
                onChange={onSearchChange}
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort By
            </Label>
            <Select
              value={`${sorting.field}-${sorting.direction}`}
              onValueChange={onSortChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at-descending">
                  Most Recent
                </SelectItem>
                <SelectItem value="created_at-ascending">
                  Oldest First
                </SelectItem>
                <SelectItem value="title-ascending">Title A-Z</SelectItem>
                <SelectItem value="title-descending">Title Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Field Filter */}
          <div className="space-y-2">
            <Label>Field</Label>
            <Select
              value={filters.field || ""}
              onValueChange={(value) => onFilterChange("field", value)}
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
