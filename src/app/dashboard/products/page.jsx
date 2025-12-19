import React from "react";
import { ProductTable } from "../../../components/Dashboard/ProductTable";
import { getProducts } from "@/lib/api";

const ProductsPage = async () => {
  const productsData = await getProducts({ limit: 1000 });

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductTable initialProducts={productsData?.data || []} />
    </div>
  );
};

export default ProductsPage;
