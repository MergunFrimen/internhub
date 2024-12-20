import Background3D from "@/components/Background3d";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternshipDetails } from "@/hooks/useInternshipDetails";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Building2,
  Calendar,
  GraduationCap,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedInternshipsSection />
      <ProfileExampleSection />
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();

  return (
    <>
      <Background3D />
      <div className="container mx-auto px-4 py-16 md:py-40 md:pb-32 max-w-3xl text-center space-y-6 md:space-y-10">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Find Your Perfect Internship
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Connect with leading companies and kickstart your career.
          </p>
        </div>

        <Button
          size="lg"
          className="px-8 py-6 text-lg"
          onClick={() => navigate("/internships")}
        >
          Browse Internships
        </Button>
      </div>
    </>
  );
}

function FeaturedInternshipsSection() {
  const featuredInternships = [
    {
      id: "6756b9369466383100024fa4",
      role: "Data Scientist",
      company: "TODO",
      location: "TODO",
    },
    {
      id: "6756b9369466383100024fa5",
      role: "Environmental Consultant",
      company: "TODO",
      location: "TODO",
    },
    {
      id: "6756b9369466383100024fa7",
      role: "IT Business Analyst",
      company: "TODO",
      location: "TODO",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Featured Internships
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Explore our hand-picked opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {featuredInternships.map((internship) => (
            <FeaturedInternship key={internship.id} id={internship.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedInternship({ id }: { id: string }) {
  const navigate = useNavigate();
  const { data: internship, isLoading, error } = useInternshipDetails(id);

  if (error || !internship) return <>Error</>;

  if (isLoading) return <Skeleton className="h-48 bg-muted" />;

  return (
    <Card
      className={cn(
        "bg-primary-foreground hover:ring-4 hover:shadow-md transition-shadow cursor-pointer"
      )}
      onClick={() => navigate(`/internships/${id}`)}
    >
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{internship.title}</h3>
              <div className="flex items-center gap-2 text-foreground">
                <Building2 className="w-4 h-4 min-w-4" />
                <span>
                  {internship.companies?.name || "Company name unavailable"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                Posted {new Date(internship.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileExampleSection() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        <div className="text-center space-y-3 md:space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Stand Out to Companies
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Create your professional profile and get noticed by top companies
            looking for talented individuals like you
          </p>
        </div>

        <ProfileExample />
      </div>
    </div>
  );
}

function ProfileExample() {
  const navigate = useNavigate();

  const exampleProfile = {
    name: "John Doe",
    title: "Computer Science Student",
    university: "Faculty of Informatics, MUNI",
    skills: ["React", "TypeScript", "Node.js"],
    imageUrl: "/api/placeholder/400/400",
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-4 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Profile Preview */}
          <div className="flex-1 w-full">
            <Card className="bg-primary-foreground">
              <CardContent className="p-4 md:p-8 space-y-4 md:space-y-6">
                <div className="flex flex-row items-center gap-4 lg:gap-6">
                  <div className="bg-secondary text-foreground rounded-full p-8 text-3xl font-bold">
                    JD
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg md:text-xl text-foreground">
                      {exampleProfile.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {exampleProfile.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">
                    {exampleProfile.university}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exampleProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-secondary text-secondary-foreground text-xs md:text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="flex-1 text-center md:text-left">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Create Your Professional Profile
              </h3>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-center gap-3">
                  <UserCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">
                    Showcase your skills and experience
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">
                    Get discovered by top companies
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">
                    Stand out from other candidates
                  </span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => navigate("/profile/example/view")}
                  variant="secondary"
                  className="w-full md:flex-1"
                >
                  View Example Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
