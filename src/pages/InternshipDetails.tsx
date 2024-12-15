import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInternshipDetails } from "@/hooks/useInternshipDetails";
import {
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  Loader2,
  MapPin,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { JobPosting } from "@/hooks/useJobPostings";

export default function InternshipDetails() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid internship ID</div>;
  }

  const { data: internship, isLoading, error } = useInternshipDetails(id);

  if (error) {
    toast.error("Error loading internship details");
    return <div>Error loading internship details</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!internship) {
    return <div>Internship not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <HeaderSection internship={internship} />
      <DescriptionSection internship={internship} />
      {internship.requirements && internship.requirements.length > 0 && (
        <RequirementsSection internship={internship} />
      )}
    </div>
  );
}

function HeaderSection({ internship }: { internship: JobPosting }) {
  return (
    <Card className="border-2 border-primary/10">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{internship.title}</h1>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-x-3">
                  <Building2 className="w-6 h-6 shrink-0" />
                  <span className="text-lg">
                    {internship.companies?.name || "Company name unavailable"}
                  </span>
                </div>
                {internship.companies?.website && (
                  <div className="flex items-center gap-x-3 text-muted-foreground">
                    <Globe className="w-4 h-4 shrink-0" />
                    <a
                      href={internship.companies.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {internship.companies.website}
                    </a>
                  </div>
                )}
                {internship.companies?.city && (
                  <div className="flex items-center gap-x-3 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{internship.companies.city}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  {internship.hours === 80 ? "Full-time" : "Part-time"}
                </span>
              </div>
              {internship.home_office && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>Remote</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  Posted {new Date(internship.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {internship.tags && (
              <div className="flex flex-wrap gap-2">
                {internship.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={() => toast.success("Applied!")}
            >
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DescriptionSection({ internship }: { internship: JobPosting }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">
          {internship.description}
        </p>
      </CardContent>
    </Card>
  );
}

function RequirementsSection({ internship }: { internship: JobPosting }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {internship.requirements?.map((req, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">{req}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
