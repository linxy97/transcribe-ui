import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Transcription UI",
  description: "Transcribe using Whisper. Open source.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
