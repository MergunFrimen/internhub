import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function LogoLink() {
  return (
    <div className="flex justify-center gap-2 md:justify-start">
      <Link to="/" className="flex items-center space-x-2">
        <Logo />
        <span className="text-xl font-bold">InternHub</span>
      </Link>
    </div>
  );
}
