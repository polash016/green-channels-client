import { CSRTable } from "@/components/Dashboard/CSRTable";
import { getCSRs } from "@/lib/api";
import React from "react";

const CSRPage = async () => {
  const csrsData = await getCSRs();

  return (
    <div className="container mx-auto px-4 py-8">
      <CSRTable initialCSRs={csrsData?.data || []} />
    </div>
  );
};

export default CSRPage;
