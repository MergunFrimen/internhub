import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <Chat />
        </div>
      </main>
    </div>
  );
}
