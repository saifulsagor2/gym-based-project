import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";

export const metadata: Metadata = {
    title: "FitLog",
    description: "Train hard. Log honest.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>

                <PlanProvider>

                    <Navbar />

                    <main className="site-content">
                        {children}
                    </main>

                    <Footer />

                </PlanProvider>

            </body>
        </html>
    );
}