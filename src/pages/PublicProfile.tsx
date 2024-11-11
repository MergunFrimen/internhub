import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  Mail,
  MapPin,
  User,
  Github,
  Linkedin,
} from "lucide-react";

export default function PublicProfile() {
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
      "JavaScript",
      "React",
      "Python",
      "Node.js",
      "SQL",
      "Git",
      "TypeScript",
      "TailwindCSS",
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description:
          "Built a full-stack e-commerce platform using React and Node.js",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "github.com/johndoe/ecommerce",
      },
      {
        name: "Machine Learning Model",
        description:
          "Developed a sentiment analysis model using Python and scikit-learn",
        technologies: ["Python", "scikit-learn", "NLTK"],
        link: "github.com/johndoe/sentiment-analysis",
      },
    ],
    experience: [
      {
        title: "Web Development Intern",
        company: "TechStart",
        period: "June 2023 - August 2023",
        description:
          "Developed and maintained web applications using React and Node.js",
      },
    ],
    links: {
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
    },
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="bg-primary text-primary-foreground rounded-full p-8 text-3xl font-bold">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
              <p className="text-lg text-muted-foreground mb-2">
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
            <div className="flex gap-2">
              <a
                href={`https://${profile.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={`https://${profile.links.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{profile.about}</p>
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">
                {profile.education.university}
              </h3>
              <p className="text-muted-foreground">
                {profile.education.degree} in {profile.education.field}
              </p>
              <p className="text-muted-foreground">
                Expected Graduation: {profile.education.graduationYear} • GPA:{" "}
                {profile.education.gpa}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {profile.education.relevantCourses.map((course, index) => (
                  <Badge key={index} variant="secondary">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {profile.projects.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <a
                    href={`https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <LinkIcon className="w-4 h-4" />
                    View Project
                  </a>
                </div>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                <p className="text-muted-foreground">
                  {exp.company} • {exp.period}
                </p>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
