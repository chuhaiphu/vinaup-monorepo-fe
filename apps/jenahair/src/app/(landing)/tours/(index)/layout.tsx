import { Container } from "@mantine/core";

export default function ToursPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container size={'xl'} mb={'xl'}>
      {children}
    </Container>
  )
}