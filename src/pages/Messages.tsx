import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";

// Types for our messages
interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface Chat {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  lastActive: string;
  messages: Message[];
}

export default function ChatView() {
  // Mock data - in a real app, this would come from a backend
  const [chats] = useState<Chat[]>([
    {
      id: "1",
      name: "TechCorp HR",
      role: "HR Manager",
      lastActive: "Active now",
      messages: [
        {
          id: "1",
          content:
            "Hi! Thank you for your application to the Software Development Intern position.",
          sender: "TechCorp HR",
          timestamp: "2024-03-15T10:00:00Z",
          isCurrentUser: false,
        },
        {
          id: "2",
          content:
            "We were impressed with your profile and would like to schedule an interview.",
          sender: "TechCorp HR",
          timestamp: "2024-03-15T10:01:00Z",
          isCurrentUser: false,
        },
        {
          id: "3",
          content:
            "Thank you! I'm very interested in the position. When would be a good time for the interview?",
          sender: "You",
          timestamp: "2024-03-15T10:05:00Z",
          isCurrentUser: true,
        },
      ],
    },
    {
      id: "2",
      name: "DataTech Recruiter",
      role: "Technical Recruiter",
      lastActive: "Last active 2h ago",
      messages: [
        {
          id: "1",
          content:
            "Hello! I noticed your profile and think you'd be a great fit for our Data Science internship.",
          sender: "DataTech Recruiter",
          timestamp: "2024-03-14T15:00:00Z",
          isCurrentUser: false,
        },
      ],
    },
  ]);

  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);
  const [newMessage, setNewMessage] = useState("");

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // const message: Message = {
    //   id: Date.now().toString(),
    //   content: newMessage,
    //   sender: "You",
    //   timestamp: new Date().toISOString(),
    //   isCurrentUser: true,
    // };

    // In a real app, this would be handled by a backend
    setNewMessage("");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat List */}
        <div className="col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-4">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedChat?.id === chat.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback>
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">
                              {chat.name}
                            </h3>
                            <span className="text-xs">
                              {formatTime(
                                chat.messages[chat.messages.length - 1]
                                  .timestamp
                              )}
                            </span>
                          </div>
                          <p className="text-sm truncate">
                            {chat.messages[chat.messages.length - 1].content}
                          </p>
                          <p className="text-xs mt-1">{chat.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="col-span-8">
          <Card className="h-full">
            {selectedChat ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedChat.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.role}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(100vh-24rem)] p-4">
                    <div className="space-y-4">
                      {selectedChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isCurrentUser
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] ${
                              message.isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            } rounded-lg p-3`}
                          >
                            <p>{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <form
                      onSubmit={handleSendMessage}
                      className="flex items-center gap-2"
                    >
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow"
                      />
                      <Button type="submit" size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="h-full flex items-center justify-center text-muted-foreground">
                Select a chat to start messaging
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
