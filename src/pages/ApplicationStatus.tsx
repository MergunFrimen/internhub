import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  LayoutDashboard,
  Mail,
  MapPin,
  MessagesSquare,
  User,
} from "lucide-react";

export default function ApplicationStatus() {
  // Mock data - In real app, fetch based on application ID
  const application = {
    id: "APP-2024-001",
    role: "Software Development Intern",
    company: {
      name: "TechCorp",
      logo: "/logo.png", // This would be a real logo URL
    },
    status: "Interview Scheduled", // Current status
    submittedDate: "2024-03-15",
    location: "Remote",
    type: "Full-time",
    duration: "3 months",
    timeline: [
      {
        id: 1,
        status: "Application Submitted",
        date: "2024-03-15",
        time: "14:30",
        completed: true,
      },
      {
        id: 2,
        status: "Application Reviewed",
        date: "2024-03-16",
        time: "10:15",
        completed: true,
      },
      {
        id: 3,
        status: "Interview Scheduled",
        date: "2024-03-20",
        time: "15:00",
        completed: true,
        details: "Technical Interview with Senior Developer",
      },
      {
        id: 4,
        status: "Interview Completed",
        completed: false,
      },
      {
        id: 5,
        status: "Final Decision",
        completed: false,
      },
    ],
    interviews: [
      {
        id: 1,
        type: "Technical Interview",
        date: "2024-03-20",
        time: "15:00",
        duration: "1 hour",
        interviewer: "John Smith",
        role: "Senior Developer",
        location: "Google Meet",
        meetingLink: "https://meet.google.com/xyz",
        preparation: [
          "Review your projects and be prepared to discuss them in detail",
          "Brush up on data structures and algorithms",
          "Prepare questions about the team and technology stack",
        ],
      },
    ],
    messages: [
      {
        id: 1,
        from: "HR Team",
        date: "2024-03-16",
        content:
          "Thank you for your application. We have reviewed your profile and would like to schedule a technical interview.",
      },
      {
        id: 2,
        from: "System",
        date: "2024-03-16",
        content:
          "Your interview has been scheduled for March 20, 2024 at 15:00.",
      },
    ],
    documents: [
      {
        id: 1,
        name: "Resume",
        date: "2024-03-15",
        status: "Submitted",
      },
      {
        id: 2,
        name: "Cover Letter",
        date: "2024-03-15",
        status: "Submitted",
      },
    ],
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Application Status</h1>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {application.status}
                </div>
              </div>
              <p className="text-muted-foreground">
                Application ID: {application.id}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <MessagesSquare className="w-4 h-4" />
                Messages
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </Button>
              <Button className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Position Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Position Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{application.role}</h3>
                  <p className="text-muted-foreground">
                    {application.company.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{application.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{application.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{application.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>Applied {application.submittedDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interview */}
          {application.interviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Interview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {application.interviews[0].type}
                      </h3>
                      <p className="text-muted-foreground">
                        {application.interviews[0].date} at{" "}
                        {application.interviews[0].time} ({" "}
                        {application.interviews[0].duration} )
                      </p>
                    </div>
                    <Button>Join Meeting</Button>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>
                      Interviewer: {application.interviews[0].interviewer} (
                      {application.interviews[0].role})
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Preparation Tips</h4>
                    <ul className="space-y-2">
                      {application.interviews[0].preparation.map(
                        (tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                            {tip}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-4 p-4 rounded-lg border"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{message.from}</span>
                        <span className="text-sm text-muted-foreground">
                          {message.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {application.timeline.map((event, index) => (
                  <div
                    key={event.id}
                    className="flex gap-4 pb-8 last:pb-0 relative"
                  >
                    {/* Vertical line */}
                    {index !== application.timeline.length - 1 && (
                      <div className="absolute left-[14px] top-[28px] w-0.5 h-full bg-gray-200" />
                    )}

                    {/* Status indicator */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        event.completed ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          event.completed ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </div>

                    {/* Status details */}
                    <div>
                      <h4
                        className={`font-medium ${
                          event.completed
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {event.status}
                      </h4>
                      {event.date && (
                        <p className="text-sm text-muted-foreground">
                          {event.date} {event.time}
                        </p>
                      )}
                      {event.details && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Submitted Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
