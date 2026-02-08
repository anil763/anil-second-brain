import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Second Brain",
  description: "Personal knowledge base and idea explorer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-slate-100">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
