'use client';
import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import LoginPage from "@/components/loginpage";
import SignupPage from "@/components/SignUp";

const AuthContainer: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const toggleAuth = () => {
        setIsLogin(!isLogin);
    };
    return (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-100 perspective-1000">
             <div className="w-full max-w-lg">
                <AnimatePresence mode="wait">
                    <motion.div
                    key={isLogin ? "login" : "signup"}
                    initial={{ rotateY: -90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {isLogin ? (
                        <LoginPage onSignUpClick={toggleAuth} />
                    ) : (
                        <SignupPage onLoginClick={toggleAuth} />  
                    )}
                    </motion.div>
                </AnimatePresence>
            
                </div>
        </div>
    );
};
export default AuthContainer;