import { Suspense } from "react";
import { Loader } from "@mantine/core";

export default function TourDetailBookingLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loader size={64} />}>
    {children}
  </Suspense>;
}