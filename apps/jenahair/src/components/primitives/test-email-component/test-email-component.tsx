import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';

export const TestEmailComponent = () => {
  return (
    <Html>
      <Head />
      <Preview>SMTP Configuration Test Email</Preview>
      <Body>
        <Container>
          <Heading>SMTP Test Successful</Heading>
          <Text>
            If you are reading this email, your SMTP configuration is working correctly.
          </Text>
          <Text>
             Time sent: {new Date().toLocaleString()}
          </Text>
          <Text>
            Sent from Jena Hair Admin Panel
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TestEmailComponent;