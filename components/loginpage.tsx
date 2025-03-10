'use client';
import React, { useState } from "react";
import {Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import google from "@/public/logos/google.svg";
import facebook from "@/public/logos/facebook.svg";

interface LoginFormData {
    email: string;
    password: string;
}
interface LoginPageProps {
    onSignUpClick: () => void;
}

const LoginPage: React.FC<LoginPageProps> = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
      });
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempted with:', formData);
      };

      const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
      };
    
     
    
    return (
            <Card className = "w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
                    <CardDescription className="text-center">
                        Please sign in to continue
                    </CardDescription>
                </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name = "email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange = {handleChange}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name = "password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange = {handleChange}
                                    required
                                    className="w-full"
                                />
                            </div>
                            
                            <div className="text-right">
                                <Button
                                    variant="link"
                                    className="p-0 h-auto font-normal text-sm text-blue-600 hover:text-blue-800"
                                    onClick={() => console.log('Forgot password clicked')}
                                >
                                    Forgot password?
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full">
                            Sign In
                            </Button>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => console.log('Google Login clicked')}
                                    className="w-full"
                                    >
                                    <Image src={google} alt="Google" width={16} height={16} className = "mr-2" />
                                    Login with Google
                                    </Button>
                                
                                    <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => console.log('Facebook Login clicked')}
                                    className="w-full"
                                    >
                                    <Image src={facebook} alt="Facebook" width={16} height={16} className = "mr-2" />
                                   Login with Facebook
                                    </Button>
                                </div>
                            
                            <div className="text-center text-sm text-gray-600">
                            Not an existing user?{' '}
                            <Button
                                variant="link"
                                className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
                                onClick={() => onSignUpClick()}
                            >
                                Sign Up
                            </Button>
                            </div>
                        </CardFooter>
                    </form>
            </Card>
       
    );
};

export default LoginPage;