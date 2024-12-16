import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { supabaseClient } from "@/lib/supabase-client";

interface ChatMessage {
  id: string;
  content: string;
  created_at: string;
  username: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [isSettingUsername, setIsSettingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState("");

  // Load username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("chat-username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setIsSettingUsername(true);
    }
  }, []);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabaseClient
        .from("chat_messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabaseClient
      .channel("chat_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const scrollArea = document.querySelector(".scroll-area-viewport");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !username) return;

    setIsLoading(true);

    const { error } = await supabaseClient.from("chat_messages").insert([
      {
        content: newMessage.trim(),
        username: username,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
    } else {
      setNewMessage("");
    }

    setIsLoading(false);
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUsername.trim()) return;

    const finalUsername = tempUsername.trim();
    localStorage.setItem("chat-username", finalUsername);
    setUsername(finalUsername);
    setIsSettingUsername(false);
  };

  if (isSettingUsername) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Choose Your Username</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <Input
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              placeholder="Enter your username..."
              required
              minLength={3}
              maxLength={20}
            />
            <Button type="submit" className="w-full">
              Join Chat
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-none">
      <CardHeader className="flex flex-row items-center justify-between px-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Chatting as:</span>
          <span className="font-semibold">{username}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsSettingUsername(true);
              setTempUsername("");
            }}
          >
            Change
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <ScrollArea className="h-[400px] p-4 rounded-lg border">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.username === username
                    ? "bg-primary text-primary-foreground ml-8"
                    : "bg-muted mr-8"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{message.username}</span>
                  <span className="text-xs opacity-75">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
