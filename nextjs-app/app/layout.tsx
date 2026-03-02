// Minimal layout - static HTML files in /public handle their own structure
// This layout is only used for any Next.js app routes (which we don't have)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
