"use client";

import React from "react";
import {
  Package,
  Users,
  MessageSquare,
  FolderOpen,
  Award,
  BarChart3,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    {
      title: "Products",
      value: "0",
      icon: Package,
      href: "/dashboard/products",
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: "0",
      icon: FolderOpen,
      href: "/dashboard/categories",
      color: "bg-green-500",
    },
    {
      title: "CSR Icons",
      value: "0",
      icon: Award,
      href: "/dashboard/csr",
      color: "bg-purple-500",
    },
    {
      title: "Employees",
      value: "0",
      icon: Users,
      href: "/dashboard/employees",
      color: "bg-orange-500",
    },
    {
      title: "Contacts",
      value: "0",
      icon: MessageSquare,
      href: "/dashboard/contacts",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your website content and data from here
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link href="/dashboard/products">
              <Button className="w-full justify-start" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Manage Products
              </Button>
            </Link>
            <Link href="/dashboard/categories">
              <Button className="w-full justify-start" variant="outline">
                <FolderOpen className="w-4 h-4 mr-2" />
                Manage Categories
              </Button>
            </Link>
            <Link href="/dashboard/csr">
              <Button className="w-full justify-start" variant="outline">
                <Award className="w-4 h-4 mr-2" />
                Manage CSR Icons
              </Button>
            </Link>
            <Link href="/dashboard/employees">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Employees
              </Button>
            </Link>
            <Link href="/dashboard/contacts">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Contacts
              </Button>
            </Link>
            <Link href="/dashboard/reviews">
              <Button className="w-full justify-start" variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Manage Reviews
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm">
              Activity will appear here as you manage content
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
