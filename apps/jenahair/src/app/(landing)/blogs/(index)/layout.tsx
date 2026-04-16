import { Container } from "@mantine/core";

export default function BlogsPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container size={'xl'} mb={'xl'}>
      {children}
    </Container>
  )
}

