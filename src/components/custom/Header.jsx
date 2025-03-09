import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="w-14 h-14" />
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-lg">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          <Link to="/#how-it-works" className="hover:text-blue-400 transition">How It Works</Link>
          <Link to="/#FAQ" className="hover:text-blue-400 transition">FAQs</Link>
        </nav>

        {/* User Button or Sign-In */}
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link to="/auth/sign-in">
            <Button className="bg-blue-500 hover:bg-blue-600 transition">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
