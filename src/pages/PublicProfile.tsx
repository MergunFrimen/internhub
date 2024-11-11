import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  Mail,
  MapPin,
  User,
  Github,
  Linkedin,
  ExternalLink,
  Eye,
  Download,
} from "lucide-react";

export default function PublicProfile() {
  // Animation state
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // This would normally be fetched from an API based on the profile ID
  const profile = {
    name: "John Doe",
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

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-100 text-green-800 border-green-300";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <Card className="mb-8 overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute -bottom-16 left-8">
            <div className="bg-white rounded-full p-1">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-8 text-4xl font-bold text-white">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
          </div>
        </div>
        <CardContent className="pt-20 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {profile.title}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
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

      {/* About Section */}
      <Card
        className={`mb-8 transform transition-all duration-300 hover:shadow-lg ${
          activeSection === "about" ? "scale-[1.02]" : ""
        }`}
        onMouseEnter={() => setActiveSection("about")}
        onMouseLeave={() => setActiveSection(null)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {profile.about}
          </p>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card
        className={`mb-8 transform transition-all duration-300 hover:shadow-lg ${
          activeSection === "skills" ? "scale-[1.02]" : ""
        }`}
        onMouseEnter={() => setActiveSection("skills")}
        onMouseLeave={() => setActiveSection(null)}
      >
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getSkillColor(
                  skill.level
                )} transform transition-all duration-300 hover:scale-105`}
              >
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

      {/* Projects Section */}
      <Card
        className={`mb-8 transform transition-all duration-300 hover:shadow-lg ${
          activeSection === "projects" ? "scale-[1.02]" : ""
        }`}
        onMouseEnter={() => setActiveSection("projects")}
        onMouseLeave={() => setActiveSection(null)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Featured Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {profile.projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300"
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
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
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
                    {project.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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

      {/* Experience Section */}
      <Card
        className={`mb-8 transform transition-all duration-300 hover:shadow-lg ${
          activeSection === "experience" ? "scale-[1.02]" : ""
        }`}
        onMouseEnter={() => setActiveSection("experience")}
        onMouseLeave={() => setActiveSection(null)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.experience.map((exp, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                <p className="text-muted-foreground">
                  {exp.company} • {exp.period}
                </p>
              </div>
              <p className="text-muted-foreground mb-4">{exp.description}</p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Social Links */}
      <div className="flex justify-center gap-4">
        <a
          href={`https://${profile.links.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-all duration-300 hover:scale-110"
        >
          <Button variant="outline" size="icon">
            <Github className="w-5 h-5" />
          </Button>
        </a>
        <a
          href={`https://${profile.links.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-all duration-300 hover:scale-110"
        >
          <Button variant="outline" size="icon">
            <Linkedin className="w-5 h-5" />
          </Button>
        </a>
      </div>
    </div>
  );
}
