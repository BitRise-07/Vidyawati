import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");

  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId },
    );

    if (!response?.data?.success) {
      toast.error("Could not fetch data");
      return [];
    }

    result = response?.data;
  } catch (err) {
    console.log("Error in fetching catalog page data", err);
    toast.error("Could not fetch data");
    return [];
  }
  toast.dismiss(toastId);
  return result;
};

export default getCatalogPageData;
