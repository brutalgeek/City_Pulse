"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockUser } from '@/lib/mock-data';

export default function UserLoginPage() {
    const router = useRouter();

    const handleSignIn = () => {
        // Simulate a successful login
        // In a real app, you would validate credentials against a backend.
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAuthority', 'false');
        localStorage.setItem('userName', mockUser.name);
        router.push('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">User Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required defaultValue={mockUser.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required defaultValue="password" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full" onClick={handleSignIn}>Sign In</Button>
                    <p className="mt-4 text-xs text-center text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="#" className="underline">
                            Sign up
                        </Link>
                    </p>
                    <Link href="/" passHref>
                       <Button variant="link" className="mt-4">Back to Home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
