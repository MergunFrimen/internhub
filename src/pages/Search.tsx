import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useJobPostings } from "@/hooks/useJobPostings";
import { usePagination } from "@/hooks/usePagination";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useSorting } from "@/hooks/useSorting";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  MapPin,
  Search,
  SquareArrowOutUpRightIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  JobPosting,
  JobPostingsFilters,
  SortingParams,
} from "@/hooks/useJobPostings";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationControls from "@/components/Pagination";
import Background3D from "@/components/Background3d";
import Pagination from "@/components/Pagination";

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <Background3D />
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Search Internships
        </h1>
        <p className="text-muted-foreground">
          Find the perfect internship opportunity
        </p>
      </div>
      <Layout />
    </div>
  );
}

interface LayoutProps {
  filters: JobPostingsFilters;
  sorting: SortingParams;
  jobPostingsResponse:
    | {
        data: JobPosting[];
        count: number;
      }
    | null
    | undefined;
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
  };
  selectedPosting: JobPosting | null;
  isDetailsPanelOpen?: boolean;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (field: string, value: string) => void;
  handleSortChange: (value: string) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
  handlePostingClick: (posting: JobPosting) => void;
  handleCloseDetails: () => void;
}

function Layout() {
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

  const [selectedPosting, setSelectedPosting] = useState<JobPosting | null>(
    null
  );
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(true);

  // Add this effect to select the first result when data loads
  useEffect(() => {
    if (
      jobPostingsResponse?.data &&
      jobPostingsResponse.data.length > 0 &&
      !selectedPosting
    ) {
      setSelectedPosting(jobPostingsResponse.data[0]);
    }
  }, [jobPostingsResponse?.data]);

  useSearchResults(filters, pagination, sorting, refetch);

  if (error) {
    toast.error("Error loading internships");
  }

  const handlePostingClick = (posting: JobPosting) => {
    setSelectedPosting(posting);
    setIsDetailsPanelOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedPosting(null);
  };

  const sharedProps = {
    filters,
    sorting,
    jobPostingsResponse,
    isLoading,
    pagination,
    selectedPosting,
    isDetailsPanelOpen,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
    handlePostingClick,
    handleCloseDetails,
  };

  const isMobile = useIsMobile();

  if (isMobile) return <MobileSearchLayout {...sharedProps} />;
  return <DesktopSearchLayout {...sharedProps} />;
}

export function MobileSearchLayout({
  filters,
  sorting,
  jobPostingsResponse,
  isLoading,
  pagination,
  selectedPosting,
  handleSearchChange,
  handleFilterChange,
  handleSortChange,
  handlePageChange,
  handlePageSizeChange,
  handlePostingClick,
  handleCloseDetails,
}: LayoutProps) {
  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <div className="mb-6">
        <SearchFiltersSheet
          filters={filters}
          sorting={sorting}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          side="bottom"
        />
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-48 animate-pulse bg-muted" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Result Count */}
          <div className="text-sm text-muted-foreground">
            Found {jobPostingsResponse?.count || 0} internships
          </div>

          {/* Grid container for cards */}
          <div className="grid grid-cols-1 gap-4">
            {jobPostingsResponse?.data.map((posting) => (
              <JobPostingCard
                key={posting.id}
                posting={posting}
                isSelected={selectedPosting?.id === posting.id}
                onClick={() => handlePostingClick(posting)}
              />
            ))}
          </div>

          {/* Mobile Details Sheet */}
          <Sheet
            open={!!selectedPosting}
            onOpenChange={(open) => !open && handleCloseDetails()}
            modal
          >
            <SheetContent side="bottom" className="h-[90vh] px-2">
              <ScrollArea className="h-full pb-5 mt-6">
                {selectedPosting && <JobDetails posting={selectedPosting} />}
              </ScrollArea>
            </SheetContent>
          </Sheet>

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

export function DesktopSearchLayout({
  filters,
  sorting,
  jobPostingsResponse,
  isLoading,
  pagination,
  selectedPosting,
  isDetailsPanelOpen,
  handleSearchChange,
  handleFilterChange,
  handleSortChange,
  handlePageChange,
  handlePageSizeChange,
  handlePostingClick,
  handleCloseDetails,
}: LayoutProps) {
  return (
    <div className="flex">
      {/* Main content area */}
      <div
        className={cn(
          "flex-1 min-w-0",
          isDetailsPanelOpen ? "max-w-[40%]" : "w-full"
        )}
      >
        <div className="mb-6">
          <SearchFiltersSheet
            filters={filters}
            sorting={sorting}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            side="left"
          />
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-5 bg-muted w-36" />

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-36 bg-muted" />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Result Count */}
            <div className="text-sm text-muted-foreground">
              Found {jobPostingsResponse?.count || 0} internships
            </div>

            {/* Grid container for cards */}
            <div
              className={cn(
                "grid grid-cols-1 gap-4",
                isDetailsPanelOpen && "grid-cols-1"
              )}
            >
              {jobPostingsResponse?.data.map((posting) => (
                <JobPostingCard
                  key={posting.id}
                  posting={posting}
                  isSelected={selectedPosting?.id === posting.id}
                  onClick={() => handlePostingClick(posting)}
                />
              ))}
            </div>

            <PaginationControls
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

      {/* Details Panel */}
      {isDetailsPanelOpen && (
        <div className="w-[60%] pl-6">
          <div className="sticky top-6">
            <div className="relative">
              <ScrollArea className="h-[calc(100vh-6rem)]">
                {selectedPosting ? (
                  <div className="pr-6">
                    <div className="flex justify-end items-start mb-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCloseDetails}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <JobDetails posting={selectedPosting} />
                  </div>
                ) : (
                  jobPostingsResponse?.count !== 0 && (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Select a job posting to view details
                    </div>
                  )
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface JobPostingCardProps {
  posting: JobPosting;
  isSelected: boolean;
  onClick: () => void;
}

export function JobPostingCard({
  posting,
  isSelected,
  onClick,
}: JobPostingCardProps) {
  return (
    <Card
      className={cn(
        "bg-primary-foreground hover:ring-4 hover:shadow-md transition-shadow cursor-pointer",
        isSelected && "ring-4 ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{posting.title}</h3>
              <div className="flex items-center gap-2 text-foreground">
                <Building2 className="w-4 h-4 min-w-4" />
                <span>
                  {posting.companies?.name || "Company name unavailable"}
                </span>
              </div>
            </div>
          </div>

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
  );
}

interface SearchFiltersSheetProps {
  filters: JobPostingsFilters;
  sorting: SortingParams;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (field: string, value: string) => void;
  onSortChange: (value: string) => void;
  side?: "bottom" | "left";
}

function SearchFiltersSheet({
  filters,
  sorting,
  onSearchChange,
  onFilterChange,
  onSortChange,
  side = "left",
}: SearchFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="gap-2">
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

export function JobDetails({ posting }: { posting: JobPosting }) {
  return (
    <div className="space-y-6 ">
      <Card className="border-2 border-primary/10 border-none">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6">
            <div className="flex-grow space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{posting.title}</h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-x-3">
                    <Building2 className="w-6 h-6 shrink-0" />
                    <span className="text-lg">
                      {posting.companies?.name || "Company name unavailable"}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {posting.field}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    {posting.hours === 80 ? "Full-time" : "Part-time"}
                  </span>
                </div>
                {posting.home_office && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Remote</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Posted {new Date(posting.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {posting.tags && (
                <div className="flex flex-wrap gap-2">
                  {posting.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center lg:flex-row gap-2">
              <Button
                variant="default"
                size="lg"
                className="w-full md:w-auto"
                onClick={() => toast.success("Applied!")}
              >
                Apply Now
              </Button>
              <Button
                variant="ghost"
                size="default"
                className="w-full md:w-auto"
                asChild
              >
                <Link to={`/internships/${posting.id}`}>
                  <SquareArrowOutUpRightIcon className="w-4 h-4" />
                  <span>View Details</span>
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none">
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            {posting.description}
          </p>
        </CardContent>
      </Card>

      {posting.requirements && posting.requirements.length > 0 && (
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {posting.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
