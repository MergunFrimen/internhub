import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpDown,
  Badge,
  Building2,
  Calendar,
  Filter,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
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

  const [selectedPosting, setSelectedPosting] = useState<JobPosting | null>(
    null
  );
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const handlePostingClick = (posting: JobPosting) => {
    if (selectedPosting?.id === posting.id) {
      // close currently preview posting
      setSelectedPosting(null);
      // setIsDetailsPanelOpen(false);
    } else {
      setSelectedPosting(posting);
      setIsDetailsPanelOpen(true);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Search Internships</h1>
        <p className="text-muted-foreground">
          Find the perfect internship opportunity
        </p>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] rounded-lg border"
      >
        {/* Search Panel */}
        <ResizablePanel defaultSize={selectedPosting ? 60 : 100}>
          <div className="p-6">
            {/* Search Controls */}
            <div className="mb-6">
              <SearchFiltersSheet
                filters={filters}
                sorting={sorting}
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                side={isMobile ? "bottom" : "left"}
              />
            </div>

            {/* Results */}
            {isLoading ? (
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-4",
                  !!isDetailsPanelOpen && ""
                )}
              >
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
                <div
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-2 gap-4",
                    !!isDetailsPanelOpen && ""
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
        </ResizablePanel>

        {/* Details Panel */}
        {isDetailsPanelOpen && (
          <ResizablePanel defaultSize={40}>
            <div className="relative h-full">
              <ScrollArea className="h-full">
                {selectedPosting && (
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {selectedPosting.title}
                        </h2>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{selectedPosting.field}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setIsDetailsPanelOpen(false);
                            setSelectedPosting(null);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-lg mb-2">Description</Label>
                        <p className="text-muted-foreground">
                          {selectedPosting.description}
                        </p>
                      </div>

                      {selectedPosting.requirements && (
                        <div>
                          <Label className="text-lg mb-2">Requirements</Label>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedPosting.requirements.map((req, index) => (
                              <li key={index} className="text-muted-foreground">
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedPosting.tags && (
                        <div>
                          <Label className="text-lg mb-2">Technologies</Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedPosting.tags.map((tag, index) => (
                              <Badge key={index}>{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-y-2 pt-4">
                        <Button variant="default" className="w-full" asChild>
                          <Link to={`/internships/${selectedPosting.id}`}>
                            Apply Now
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to={`/internships/${selectedPosting.id}`}>
                            View Full Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

function JobPostingCard({
  posting,
  isSelected,
  onClick,
}: {
  posting: JobPosting;
  isSelected: boolean;
  onClick: () => void;
}) {
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
                <Building2 className="w-4 h-4" />
                <span>{posting.field}</span>
              </div>
            </div>
            <Button variant="secondary" size="icon" asChild>
              <Link to={`/internships/${posting.id}`}>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <p className="text-foreground line-clamp-2">{posting.description}</p>

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
