import { Suspense } from "react";

export default async function CustomizedTourLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>{children}</Suspense>
  );
}