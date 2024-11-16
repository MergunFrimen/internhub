import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">InternHub</h3>
            <p className="text-sm text-foreground">
              Connecting students with exciting internship opportunities in the
              tech industry.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-sm text-foreground">
                  Find Internships
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-sm text-foreground">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-foreground">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
              >
                {/* <Linkedin className="w-5 h-5" /> */}
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
              >
                {/* <Twitter className="w-5 h-5" /> */}
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
              >
                {/* <Facebook className="w-5 h-5" /> */}
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
              >
                {/* <Instagram className="w-5 h-5" /> */}
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground"
              >
                {/* <Github className="w-5 h-5" /> */}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-foreground">
          <p>© {new Date().getFullYear()} For education purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
