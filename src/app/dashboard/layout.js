"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Package,
  Users,
  MessageSquare,
  FolderOpen,
  Award,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserMenu from "@/components/Dashboard/UserMenu";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

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
          <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {navigation.find((item) => item.href === pathname)?.name ||
                  "Dashboard"}
              </h1>
              <UserMenu />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
