import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "PrepYatra",
  description: "Exam and placement prep platform — courses, prep logs, recruiter network, tutoring, and an AI interview buddy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
