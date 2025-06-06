import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  HelpCircle,
  Rocket,
} from "lucide-react";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-around items-center">

        {/* Brand Name with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="text-2xl sm:text-3xl font-bold text-white tracking-wide hover:text-blue-400 transition">
            AI Resume 
          </Link>
        </motion.div>

        {/* Navigation Links with Icons + Animations */}
        <nav className="hidden sm:flex gap-6 text-md items-center">
          {[
            { to: "/", label: "Home", Icon: Home },
            { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
            { to: "/#how-it-works", label: "How It Works", Icon: Rocket },
            { to: "/#FAQ", label: "FAQs", Icon: HelpCircle },
          ].map(({ to, label, Icon }, index) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <Icon size={18} className="text-blue-400" />
              <Link to={to} className="hover:text-blue-400 transition">
                {label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Auth Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link to="/auth/sign-in">
              <Button className="bg-blue-500 hover:bg-blue-600 transition shadow-sm">
                Get Started
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
