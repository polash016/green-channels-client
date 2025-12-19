import { CategoryTable } from "@/components/Dashboard/CategoryTable";
import { getCategories } from "@/lib/api";
import React from "react";

const CategoriesPage = async () => {
  const categoriesData = await getCategories({ limit: 1000 });

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryTable initialCategories={categoriesData?.data || []} />
    </div>
  );
};

export default CategoriesPage;
