import { Container } from "@mantine/core";
import classes from './layout.module.scss';

export default function ToursPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container size={'xl'} mb={'xl'} classNames={{
      root: classes.toursPageLayout
    }}>
      {children}
    </Container>
  )
}