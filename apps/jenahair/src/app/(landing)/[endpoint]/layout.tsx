import { ReactNode } from 'react';

export default function DynamicEndpointLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
