import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-gray-300 border-t border-green-900/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              VoteSmart Africa
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering African citizens with the knowledge and tools to
              participate confidently in democracy.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Mail, label: "Email" },
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-green-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3">
              {[
                { name: "Features", href: "#features" },
                { name: "How It Works", href: "#how-it-works" },
                { name: "Countries", href: "#" },
                { name: "Elections Calendar", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                "Voting Guide",
                "Research Center",
                "Blog",
                "FAQ",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Data Protection",
                "Contact Us",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-green-900/30 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear}{" "}
            <span className="text-green-500 font-medium">
              VoteSmart Africa
            </span>
            . All rights reserved. Building stronger democracies across Africa.
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-950/40 via-black to-black blur-3xl opacity-70" />
    </footer>
  );
};

export default Footer;
