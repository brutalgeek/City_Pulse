"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function AuthorityLoginPage() {
    const router = useRouter();

    const handleSignIn = () => {
        // Simulate a successful login
        // In a real app, you would validate credentials against a backend.
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAuthority', 'true');
        router.push('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Administrative Login</CardTitle>
                    <CardDescription>
                        Enter your official credentials to access the management portal.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="official@city.gov" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full" onClick={handleSignIn}>Sign In</Button>
                     <Link href="/" passHref>
                       <Button variant="link" className="mt-4">Back to Home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
