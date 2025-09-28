"use client";

import React from "react";
import { EmployeeTable } from "../../../components/Dashboard/EmployeeTable";

const EmployeesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <EmployeeTable />
    </div>
  );
};

export default EmployeesPage;
