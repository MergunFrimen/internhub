import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { useMemo } from "react";

export default function PublicProfile() {
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
        link: "github.com/johndoe/ecommerce",
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
        link: "github.com/johndoe/sentiment-analysis",
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
    <div className="container mx-auto py-8 flex flex-col gap-y-8">
      <HeroSection profile={profile} />
      <AbouSection profile={profile} />
      <SkillsSection profile={profile} />
      <ProjectsSection profile={profile} />
      <ExperienceSection profile={profile} />
    </div>
  );
}

function HeroSection({ profile }: { profile: any }) {
  const initials = useMemo(
    () => `${profile.firstName[0]}${profile.lastName[0]}`,
    []
  );
  const fullname = useMemo(() => `${profile.firstName}${profile.lastName}`, []);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-24">
        <div className="absolute -bottom-16 left-8">
          <div className="bg-white rounded-full p-1">
            <div className="bg-primary rounded-full p-8 text-4xl font-bold text-white">
              {initials}
            </div>
          </div>
        </div>
      </div>
      <CardContent className="pt-20 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{fullname}</h1>
              <p className="text-xl text-foreground">{profile.title}</p>
            </div>
            <div className="flex flex-col flex-wrap gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={`https://${profile.links.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={`https://${profile.links.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Download CV
            </Button>
            <Button variant="default" className="gap-2">
              <Mail className="w-4 h-4" /> Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AbouSection({ profile }: { profile: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-foreground leading-relaxed">
          {profile.about}
        </p>
      </CardContent>
    </Card>
  );
}

function SkillsSection({ profile }: { profile: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.skills.map((skill: any, index: number) => (
            <div key={index} className="p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">{skill.name}</h3>
              <div className="flex justify-between text-sm">
                <span>{skill.level}</span>
                <span>
                  {skill.years} {skill.years === 1 ? "year" : "years"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectsSection({ profile }: { profile: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {profile.projects.map((project: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-gradient-to-br from-white to-gray-50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <a
                  href={`https://${project.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <p className="text-foreground mb-4">{project.description}</p>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: any, techIndex: number) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="space-y-2">
                  {project.highlights.map((highlight: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
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
  );
}

function ExperienceSection({ profile }: { profile: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience</CardTitle>
      </CardHeader>
      <CardContent>
        {profile.experience.map((exp: any, index: number) => (
          <div
            key={index}
            className="p-6 rounded-xl border bg-gradient-to-br transition-all duration-300"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
              <p className="text-foreground">
                {exp.company} • {exp.period}
              </p>
            </div>
            <p className="text-foreground mb-4">{exp.description}</p>
            <ul className="space-y-2">
              {exp.achievements.map((achievement: any, i: number) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
