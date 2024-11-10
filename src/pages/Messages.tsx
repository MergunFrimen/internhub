import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Messages() {
  const messages = [
    {
      id: 1,
      from: "TechCorp HR",
      subject: "Interview Invitation",
      preview: "We would like to invite you for an interview...",
      date: "2024-03-15",
      unread: true,
    },
    {
      id: 2,
      from: "DataTech Recruiter",
      subject: "Application Update",
      preview: "Thank you for your application. We are reviewing...",
      date: "2024-03-14",
      unread: false,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`hover:shadow-md transition-shadow cursor-pointer ${
              message.unread ? "bg-blue-50" : ""
            }`}
          >
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{message.from}</span>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
              <div className="font-medium">{message.subject}</div>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-gray-600 text-sm">{message.preview}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
