import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Providers";
import CheckRoute from "@/components/CheckRoute";
import { TaskProvider } from "@/contexts/taskContext";
import { UserProvider } from "@/contexts/userContext";

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
      <body className={inter.className}>
        <AuthProvider>
          <UserProvider>
            <TaskProvider>
              <main>
                {/* <CheckRoute>{children}</CheckRoute> */}
                {children}
              </main>
            </TaskProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
