import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Route Posts",
  description: "A simple social posts application built with Next.js and React"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <main className="container py-4">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
