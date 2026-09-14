import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Pokémon",
  description: "For Charles Schwab",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
