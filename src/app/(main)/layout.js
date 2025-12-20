import { ThemeProvider } from "@/components/ThemeProvider";
import ResponsiveNavbar from "@/components/NavBar/ResponsiveNavbar";
import { Footer } from "@/components/Footer";
import { Prefetch } from "@/components/Prefetch";
import { getCategoriesForNavbar } from "@/lib/api";
import "../globals.css";

export default async function MainLayout({ children }) {
  // Fetch categories for navbar
  const categoriesData = await getCategoriesForNavbar();
  const categories = categoriesData?.data || [];

  return (
    <ThemeProvider>
      <Prefetch />
      <ResponsiveNavbar initialCategories={categories} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
