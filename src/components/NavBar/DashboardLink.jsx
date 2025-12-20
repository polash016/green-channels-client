"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";

export function DashboardLink() {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateUser = () => {
      const userInfo = getUserInfo();
      setUser(userInfo);
    };

    updateUser();

    // Listen for auth changes (login/logout)
    const handleStorageChange = (e) => {
      if (e.key === "accessToken") {
        updateUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Check periodically for same-tab changes
    const interval = setInterval(updateUser, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!isClient || !user?.id) {
    return null;
  }

  return (
    <Link
      href="/dashboard"
      className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white transition-colors duration-200"
    >
      Dashboard
    </Link>
  );
}

export function MobileDashboardLink({ onClose }) {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateUser = () => {
      const userInfo = getUserInfo();
      setUser(userInfo);
    };

    updateUser();

    const handleStorageChange = (e) => {
      if (e.key === "accessToken") {
        updateUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(updateUser, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!isClient || !user?.id) {
    return null;
  }

  return (
    <a
      href="/dashboard"
      onClick={onClose}
      className="relative text-neutral-600 dark:text-neutral-300"
    >
      <span className="block">Dashboard</span>
    </a>
  );
}
