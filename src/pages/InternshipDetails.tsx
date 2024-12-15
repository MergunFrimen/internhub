import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { useInternshipDetails } from "@/hooks/useInternshipDetails";
import { JobPosting } from "@/hooks/useJobPostings";
import {
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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
      {internship.tags && internship.tags.length > 0 && (
        <TechnologiesSection internship={internship} />
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
              <Link
                to={`/companies/${internship.id}`}
                className="flex items-center gap-x-3"
              >
                <Building2 className="w-6 h-6 shrink-0" />
                <span className="text-lg">{internship.field}</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-y-2">
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-4 h-4" />
                <span>Full-time</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Remote</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
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
            <Button size="lg" className="w-full md:w-auto">
              Apply Now
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

function TechnologiesSection({ internship }: { internship: JobPosting }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technologies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {internship.tags?.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-base px-3 py-1"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
