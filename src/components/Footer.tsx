import { Link } from "react-router-dom";
import GithubIcon from "./icons/GithubIcon";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-background flex flex-col justify-center items-center gap-4 p-4 mt-16 md:flex-row">
      <a
        href="https://github.com/MergunFrimen/internhub/"
        target="_blank"
        rel="noopener noreferrer"
        className="h-4 w-4 text-foreground"
      >
        <GithubIcon />
      </a>
      <span className="text-sm text-foreground">
        For educational purposes only.
      </span>
      <Button variant="default" size="sm">
        <Link to="/chat">Leave a review</Link>
      </Button>
    </footer>
  );
}
