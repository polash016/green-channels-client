import React from "react";
import { EmployeeTable } from "../../../components/Dashboard/EmployeeTable";
import { getEmployees } from "@/lib/api";

const EmployeesPage = async () => {
  const employeesData = await getEmployees();

  return (
    <div className="container mx-auto px-4 py-8">
      <EmployeeTable initialEmployees={employeesData?.data || []} />
    </div>
  );
};

export default EmployeesPage;
