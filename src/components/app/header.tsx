"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Building, PlusCircle, LogOut, User, LayoutDashboard, ChevronDown } from 'lucide-react';
import { ReportIssueDialog } from './report-issue-dialog';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthority, setIsAuthority] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd check a token or session.
    // For this prototype, we'll use localStorage to persist state across page loads.
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const authorityStatus = localStorage.getItem('isAuthority') === 'true';
    const storedUserName = localStorage.getItem('userName');
    setIsLoggedIn(loggedInStatus);
    setIsAuthority(authorityStatus);
    setUserName(storedUserName);
  }, [pathname]); // Rerun on page navigation

  const handleReportClick = () => {
    if (!isLoggedIn) {
      router.push('/login/user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAuthority');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setIsAuthority(false);
    setUserName(null);
    if (pathname === '/profile' || pathname === '/admin') {
        router.push('/');
    } else {
        router.refresh();
    }
  };

  const isLoginPage = pathname.startsWith('/login');

  if (isLoginPage) {
    return null; // Don't show the header on login pages
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-auto flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">CityPulse</h1>
        </Link>
        <nav className="flex items-center gap-4">
            {isLoggedIn ? (
                <>
                    {isAuthority ? (
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <span>Admin</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/admin" passHref>
                                <DropdownMenuItem>
                                    <LayoutDashboard className="mr-2" />
                                    Dashboard
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2" />
                                Logout
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                      <>
                        <ReportIssueDialog />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{userName}</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/profile" passHref>
                                <DropdownMenuItem>
                                    <User className="mr-2" />
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2" />
                                Logout
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                </>
            ) : (
                 <>
                    <Button onClick={handleReportClick}>
                        <PlusCircle className="mr-2" />
                        Report New Issue
                    </Button>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <Link href="/login/user" passHref>
                            <Button variant="outline" className="pl-10">User Login</Button>
                        </Link>
                    </div>
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <Link href="/login/authority" passHref>
                           <Button variant="outline" className="pl-10">Administrative Login</Button>
                        </Link>
                    </div>
                </>
            )}
        </nav>
      </div>
    </header>
  );
}
