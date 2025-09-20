import Link from 'next/link';
import { Building, Facebook, Twitter, Instagram } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/updates" className="text-sm text-muted-foreground hover:text-foreground">Updates</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="/help-center" className="text-sm text-muted-foreground hover:text-foreground">Help Center</Link></li>
            </ul>
          </div>
          <div>
             <h3 className="font-semibold mb-4">Service</h3>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">Services</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              </ul>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center gap-2">
                <Building className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">CityPulse</h1>
            </div>
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} CityPulse. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
                Tech Park Kolkata
            </p>
          </div>
          <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram size={20} />
              </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
