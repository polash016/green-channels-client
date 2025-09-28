"use client";

import { CategoryTable } from "@/components/Dashboard/CategoryTable";
import React from "react";

const CategoriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryTable />
    </div>
  );
};

export default CategoriesPage;
