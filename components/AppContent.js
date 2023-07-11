import Box from "./Box";

export default function AppContent({ children }) {
  return (
    <main className="grow">
      <Box className="h-full">{children}</Box>
    </main>
  );
}
