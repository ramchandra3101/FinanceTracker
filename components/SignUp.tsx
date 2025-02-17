'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import facebook from "@/public/logos/facebook.svg";
import google from "@/public/logos/google.svg";
import Image from "next/image";
import { on } from 'events';


interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignupPageProps {
    onLoginClick: () => void;
}
const SignupPage: React.FC<SignupPageProps> = ({ onLoginClick }) => {
    const [formData, setFormData] = useState<SignupFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Partial<SignupFormData>>({});

    const validateForm = ():boolean => {
        const newErrors: Partial<SignupFormData> = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } 

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
        console.log('Signup attempted with:', formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear the error for the field if it exists
        if(errors[name as keyof SignupFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    return (
        
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                <CardDescription className="text-center">
                    Sign up to get started
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className = "grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value= {formData.firstName}
                                onChange = {handleChange}
                                className = {errors.firstName ? 'border-red-500' : ''}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'border-red-500' : ''}
                            />
                            {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName}</p>
                            )}
                        </div>
                    </div>
                    <div className = "grid grid-cols-1">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div className = "grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'border-red-500' : ''}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'border-red-500' : ''}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">or continue with</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => console.log('Google signup clicked')}
                        className="w-full"
                        >
                        <Image src={google} alt="Google" width={16} height={16} className = "mr-2" />
                        Sign up with Google
                        </Button>
                    
                        <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => console.log('Facebook signup clicked')}
                        className="w-full"
                        >
                        <Image src={facebook} alt="Facebook" width={16} height={16} className = "mr-2" />
                        Sign up with Facebook
                        </Button>
                    </div>
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Button
                            variant="link"
                            className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
                            onClick={() => onLoginClick()}
                        >
                            Log in
                        </Button>
                    </p>
                </CardFooter>
            </form>
        </Card>
        
    )

}
export default SignupPage;