import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Providers";
import { TaskProvider } from "@/contexts/taskContext";
import ToastComp from "@/components/ToastComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taskify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="halloween" lang="en">
      <body data-theme="halloween" className={inter.className}>
        <AuthProvider>
            <TaskProvider>
              <main data-theme="halloween">
                {children}
                <ToastComp />
              </main>
            </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
