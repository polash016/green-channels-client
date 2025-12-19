import React from "react";
import { ReviewTable } from "../../../components/Dashboard/ReviewTable";
import { getReviews } from "@/lib/api";

const ReviewsPage = async () => {
  const reviewsData = await getReviews();

  return (
    <div className="container mx-auto px-4 py-8">
      <ReviewTable initialReviews={reviewsData?.data || []} />
    </div>
  );
};

export default ReviewsPage;
