import { ThemeProvider } from "@/components/ThemeProvider";
import ResponsiveNavbar from "@/components/NavBar/ResponsiveNavbar";
import { Footer } from "@/components/Footer";
import "../globals.css";

export default function MainLayout({ children }) {
  return (
    <ThemeProvider>
      <ResponsiveNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
