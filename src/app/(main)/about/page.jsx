import { getEmployees } from "@/lib/api";
import { Employee } from "@/components/Employee/Employee";
import OurMission from "@/components/OurMission";
import React from "react";

export const metadata = {
  title: "About Us",
  description: "Learn about Green Channels Ltd., our mission, and the experienced team behind our textile sourcing and garment manufacturing excellence in Bangladesh.",
};

export default async function AboutPage() {
  const employeesData = await getEmployees({ limit: 1000 });
  const employees = employeesData?.data || [];

  return (
    <div className="bg-gradient-to-br from-blue-900/80 via-neutral-900 to-neutral-950 min-h-screen">
      <OurMission />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Employee employees={employees} />
      </div>
    </div>
  );
}
