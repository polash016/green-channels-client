"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, KeyRound, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { getMyProfile } from "@/lib/api";
import ChangePasswordModal from "./ChangePasswordModal";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const router = useRouter();

  // Fetch user profile client-side
  useEffect(() => {
    let mounted = true;
    
    async function fetchProfile() {
      try {
        setError(null);
        const data = await getMyProfile();
        if (mounted) {
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (mounted) {
          setError(error.message);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }
    
    fetchProfile();
    return () => { mounted = false; };
  }, []);

  // Retry profile fetch
  const retryFetch = () => {
    setIsLoading(true);
    setError(null);
    getMyProfile()
      .then(data => setUserProfile(data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      logout();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* User Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {isLoading ? "Loading..." : error ? "User" : userProfile?.data?.name || "User"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {isLoading ? "..." : error ? "Error loading profile" : userProfile?.data?.email || ""}
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 py-2 z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-700">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {userProfile?.data?.name || "User"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {userProfile?.data?.email || ""}
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleChangePassword}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <KeyRound className="w-4 h-4 mr-3" />
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
}
