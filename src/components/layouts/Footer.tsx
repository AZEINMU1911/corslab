import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-roxy-black text-white pt-24 pb-12 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <h2 className="text-2xl font-medium tracking-tight">
              ROXY COSLAB.
            </h2>
            <p className="text-roxy-graphite text-lg font-light max-w-sm">
              Manufacturing excellence where global standards meet your unique
              brand vision.
            </p>
          </div>

          {/* Spacer */}
          <div className="md:col-span-3" />

          {/* Links Column */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-mono text-xs tracking-widest text-roxy-graphite uppercase">
              Company
            </h4>
            <ul className="space-y-4">
              {["About", "Services", "Process", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials / Legal */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-mono text-xs tracking-widest text-roxy-graphite uppercase">
              Connect
            </h4>
            <ul className="space-y-4">
              {["Instagram", "LinkedIn", "WhatsApp", "Email"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-roxy-graphite">
            © 2025 ROXY COSLAB. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <span className="font-mono text-xs text-roxy-graphite cursor-pointer hover:text-white">
              Privacy Policy
            </span>
            <span className="font-mono text-xs text-roxy-graphite cursor-pointer hover:text-white">
              Terms of Service
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
