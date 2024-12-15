import { Button } from "@/components/ui/button";
import { Construction, Hammer, TrafficCone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WorkInProgress() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Construction icons */}
        <div className="flex justify-center gap-4">
          <TrafficCone className="h-16 w-16 text-red-500 animate-bounce" />
          <Construction className="h-16 w-16 text-yellow-500 animate-bounce delay-100" />
          <Hammer className="h-16 w-16 text-blue-500 animate-bounce delay-200" />
        </div>

        {/* Message */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            We're Working On It!
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            This page is under construction and will be available soon. Check
            back later for updates!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="min-w-32"
          >
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} className="min-w-32">
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
