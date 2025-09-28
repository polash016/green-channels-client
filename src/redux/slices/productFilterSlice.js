import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "",
  subcategoryId: "",
  nestedCategoryId: "",
  searchTerm: "",
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.subcategoryId = "";
      state.nestedCategoryId = "";
    },
    setSubcategory: (state, action) => {
      state.subcategoryId = action.payload;
      state.nestedCategoryId = "";
    },
    setNestedCategory: (state, action) => {
      state.nestedCategoryId = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = "";
      state.subcategoryId = "";
      state.nestedCategoryId = "";
      state.searchTerm = "";
    },
    setFiltersFromUrl: (state, action) => {
      const { categoryId, subcategoryId, nestedCategoryId } = action.payload;

      // Clear all filters first
      state.selectedCategory = "";
      state.subcategoryId = "";
      state.nestedCategoryId = "";

      // Set the appropriate filter based on URL
      if (nestedCategoryId) {
        state.nestedCategoryId = nestedCategoryId;
      } else if (subcategoryId) {
        state.subcategoryId = subcategoryId;
      } else if (categoryId) {
        state.selectedCategory = categoryId;
      }
    },
  },
});

export const {
  setCategory,
  setSubcategory,
  setNestedCategory,
  setSearchTerm,
  clearFilters,
  setFiltersFromUrl,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;
