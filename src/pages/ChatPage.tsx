import Chat from "@/components/Chat";

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Chat Room</h1>
        <p className="text-muted-foreground">
          Join the conversation with other users
        </p>
      </div>
      <Chat />
    </div>
  );
}
