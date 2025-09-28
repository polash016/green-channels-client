"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LogOut,
  Home,
  Package,
  Users,
  MessageSquare,
  FolderOpen,
  Award,
} from "lucide-react";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { logout } from "@/lib/auth";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      // Call logout function from auth utility
      logout();
      // The logout function will handle the redirect
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback redirect
      router.push("/login");
    } finally {
      setLoggingOut(false);
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Categories", href: "/dashboard/categories", icon: FolderOpen },
    { name: "CSR Icons", href: "/dashboard/csr", icon: Award },
    { name: "Employees", href: "/dashboard/employees", icon: Users },
    { name: "Contacts", href: "/dashboard/contacts", icon: MessageSquare },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-neutral-800 shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h2>
          </div>
          <nav className="mt-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {navigation.find((item) => item.href === pathname)?.name ||
                  "Dashboard"}
              </h1>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-60"
              >
                <LogOut className="w-4 h-4" />
                <span>{loggingOut ? "Logging out..." : "Logout"}</span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
