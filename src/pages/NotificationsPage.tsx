import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  BriefcaseIcon,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  User,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationType = "application" | "message" | "profile" | "system";
type NotificationStatus = "unread" | "read";
type NotificationPriority = "high" | "medium" | "low";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  actionUrl?: string;
  actionLabel?: string;
}

export default function NotificationsPage() {
  // Mock notifications data - would be fetched from an API
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      type: "application",
      title: "Interview Scheduled",
      message:
        "Your interview with TechCorp for Software Development Intern position has been scheduled for tomorrow at 2 PM.",
      timestamp: "2024-03-15T14:00:00Z",
      status: "unread",
      priority: "high",
      actionUrl: "/applications/123",
      actionLabel: "View Details",
    },
    {
      id: "2",
      type: "message",
      title: "New Message from HR",
      message:
        "You have a new message from SecureNet HR regarding your application.",
      timestamp: "2024-03-14T10:30:00Z",
      status: "unread",
      priority: "medium",
      actionUrl: "/messages/456",
      actionLabel: "Read Message",
    },
    {
      id: "3",
      type: "profile",
      title: "Profile Review Reminder",
      message:
        "Complete your profile to increase visibility to potential employers.",
      timestamp: "2024-03-13T09:15:00Z",
      status: "read",
      priority: "low",
      actionUrl: "/profile",
      actionLabel: "Update Profile",
    },
    {
      id: "4",
      type: "system",
      title: "Application Deadline Approaching",
      message:
        "The application deadline for Data Science Intern position at DataTech is in 2 days.",
      timestamp: "2024-03-12T16:45:00Z",
      status: "read",
      priority: "medium",
      actionUrl: "/internships/789",
      actionLabel: "View Position",
    },
  ]);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "application":
        return <BriefcaseIcon className="w-5 h-5" />;
      case "message":
        return <MessageSquare className="w-5 h-5" />;
      case "profile":
        return <User className="w-5 h-5" />;
      case "system":
        return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityStyles = (priority: NotificationPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        status: "read" as NotificationStatus,
      }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" as NotificationStatus }
          : notification
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline" onClick={markAllAsRead}>
          Mark All as Read
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-red-50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium">High Priority</span>
            </div>
            <span className="text-xl font-bold">
              {notifications.filter((n) => n.priority === "high").length}
            </span>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Unread</span>
            </div>
            <span className="text-xl font-bold">
              {notifications.filter((n) => n.status === "unread").length}
            </span>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-medium">Actions Taken</span>
            </div>
            <span className="text-xl font-bold">12</span>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="font-medium">Pending</span>
            </div>
            <span className="text-xl font-bold">5</span>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={cn(
              "transition-all hover:shadow-md",
              notification.status === "unread" && "bg-blue-50"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "p-2 rounded-full",
                    getPriorityStyles(notification.priority)
                  )}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    {notification.actionUrl && (
                      <Button variant="default" size="sm">
                        {notification.actionLabel}
                      </Button>
                    )}
                    {notification.status === "unread" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
