import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  BriefcaseIcon,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageCircleMore,
  Star,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function UserProfile() {
  const isMobile = useIsMobile();

  const profile = {
    firstName: "John",
    lastName: "Doe",
    title: "Computer Science Student",
    location: "Bratislava, Slovakia",
    email: "john.doe@example.com",
    about:
      "Final year Computer Science student at Slovak University of Technology with a passion for software development and machine learning. Looking for opportunities to apply my skills in a real-world environment.",
    education: {
      university: "Slovak University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationYear: "2025",
      gpa: "3.8",
      relevantCourses: [
        "Data Structures and Algorithms",
        "Machine Learning",
        "Web Development",
        "Database Systems",
      ],
    },
    skills: [
      { name: "JavaScript", level: "Advanced", years: 3 },
      { name: "React", level: "Advanced", years: 2 },
      { name: "Python", level: "Intermediate", years: 2 },
      { name: "Node.js", level: "Intermediate", years: 2 },
      { name: "SQL", level: "Intermediate", years: 1 },
      { name: "Git", level: "Advanced", years: 3 },
      { name: "TypeScript", level: "Intermediate", years: 1 },
      { name: "TailwindCSS", level: "Advanced", years: 2 },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform using React and Node.js",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "https://www.amazon.com/",
        highlights: [
          "Implemented secure payment processing",
          "Achieved 98% test coverage",
          "Reduced load time by 40%",
        ],
      },
      {
        name: "Machine Learning Model",
        description:
          "Developed a sentiment analysis model using Python and scikit-learn",
        technologies: ["Python", "scikit-learn", "NLTK"],
        link: "https://claude.ai/",
        highlights: [
          "Achieved 92% accuracy",
          "Processed 1M+ tweets",
          "Implemented real-time analysis",
        ],
      },
    ],
    experience: [
      {
        title: "Web Development Intern",
        company: "TechStart",
        period: "June 2023 - August 2023",
        description:
          "Developed and maintained web applications using React and Node.js",
        achievements: [
          "Reduced bug backlog by 45%",
          "Implemented 3 major features",
          "Mentored 2 junior developers",
        ],
      },
    ],
    links: {
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
    },
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Hero Section */}
      <Card className="border-none">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow space-y-4">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="bg-secondary text-foreground rounded-full p-8 text-3xl font-bold">
                  {`${profile.firstName[0]}${profile.lastName[0]}`}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h1>
                  <p className="text-xl text-muted-foreground">
                    {profile.title}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={`https://${profile.links.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://${profile.links.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => toast.success("Downloaded CV")}
              >
                <Download className="w-4 h-4" /> Download CV
              </Button>
              <Button className="gap-2" asChild>
                <Link to="/chat">
                  <MessageCircleMore className="w-4 h-4" /> Contact
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList
          className={cn(
            "justify-start ml-5",
            isMobile && "w-[calc(100%-44px)]"
          )}
        >
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* About */}
          <Card className="border-none">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{profile.about}</p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {skill.level} • {skill.years}{" "}
                      {skill.years === 1 ? "year" : "years"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Featured Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {profile.projects.map((project) => (
                  <div
                    key={project.name}
                    className="p-6 rounded-xl border bg-card"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <a
                        href={`${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Trophy className="w-4 h-4 text-primary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          {/* Work Experience */}
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.experience.map((exp) => (
                <div key={exp.title} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BriefcaseIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-muted-foreground">
                        {exp.company} • {exp.period}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Trophy className="w-4 h-4 text-primary" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          {/* Education */}
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {profile.education.degree} in {profile.education.field}
                    </h3>
                    <p className="text-muted-foreground">
                      {profile.education.university} • Expected{" "}
                      {profile.education.graduationYear}
                    </p>
                    <p className="text-muted-foreground">
                      GPA: {profile.education.gpa}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.education.relevantCourses.map((course) => (
                      <Badge key={course} variant="secondary">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
