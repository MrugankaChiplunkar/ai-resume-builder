import React from "react";
import { SignIn } from "@clerk/clerk-react";
import Header from "@/components/custom/Header";
import { Link } from "react-router-dom";

function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-600 to-black px-4">
      {/* Card Container */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md text-center flex flex-col items-center">
        
        {/* Logo */}
        <Link to="/">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-20 mb-4 hover:scale-110 transition-transform"
          />
        </Link>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
        <p className="text-gray-700 mb-5">Access your AI Resume Builder</p>

        {/* Clerk Sign-In Component */}
        <div className="w-full flex justify-center">
          <SignIn
            appearance={{
              elements: {
                card: "bg-white border border-gray-300 shadow-lg rounded-lg w-full",
                headerTitle: "text-gray-900 from black text-xl font-semibold",
                socialButtons: "flex flex-col gap-3",
                socialButtonsIconButton:
                  "bg-blue-100 border-blue-400 hover:bg-blue-200 text-gray-900 from black px-4 py-2 rounded-lg shadow-md transition-all",
                socialButtonsIcon: "text-blue-900",
                formFieldLabel: "text-black-800",
                formFieldInput: "text-black-1000 from black bg-gray-300 border-gray-400 rounded-md",
                formButtonPrimary:
                  "bg-gradient-to-r from-blue via-gray-600 to-black hover:bg-gradient-to-r from-blue via-gray-900 to-black text-white font-medium py-2 rounded-md shadow-md transition-all",
              },
            }}
            afterSignInUrl="/dashboard"
          />
        </div>

        {/* Sign-Up Link */}
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/sign-up" className="text-blue-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
