import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMK Farmasi Al Amin Dukuhturi",
  description: "Website Resmi SMK Farmasi Al Amin Dukuhturi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={geist.className}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            success: {
              style: {
                background: '#166534',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '12px',
                padding: '14px 20px',
              },
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              style: {
                background: '#7f1d1d',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '12px',
                padding: '14px 20px',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}