import GithubIcon from "./icons/GithubIcon";

export default function Footer() {
  return (
    <footer className="bg-background flex flex-row justify-center items-center gap-x-4 p-4">
      <span className="text-sm text-foreground">
        For educational purposes only
      </span>
      <a
        href="https://github.com/MergunFrimen/internhub/"
        target="_blank"
        rel="noopener noreferrer"
        className="h-4 w-4 text-foreground"
      >
        <GithubIcon />
      </a>
    </footer>
  );
}
