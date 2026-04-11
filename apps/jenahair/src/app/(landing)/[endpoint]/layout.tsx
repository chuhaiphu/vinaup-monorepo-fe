import { Container } from "@mantine/core";
import { ReactNode, Suspense } from "react";
import classes from "./layout.module.scss";

export default function DynamicEndpointLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <Container size="xl" mb="xl" classNames={{ root: classes.dynamicEndpointContainer }}>
        {children}
      </Container>
    </Suspense>
  );
}

