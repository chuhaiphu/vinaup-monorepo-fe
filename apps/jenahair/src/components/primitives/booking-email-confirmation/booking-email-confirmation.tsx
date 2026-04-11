import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface BookingEmailConfirmationProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourId: string;
  totalPrice: number;
  adultCount: number;
  childCount: number;
}

export const BookingEmailConfirmation = ({
  customerName,
  customerEmail,
  customerPhone,
  tourId,
  totalPrice,
  adultCount,
  childCount,
}: BookingEmailConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Booking Received from {customerName}</Preview>
      <Body>
        <Container>
          <Heading>New Booking Notification</Heading>
          <Text>
            You have received a new booking request.
          </Text>
          <Section>
            <Text>Customer Information</Text>
            <Text><strong>Name:</strong> {customerName}</Text>
            <Text><strong>Email:</strong> {customerEmail}</Text>
            <Text><strong>Phone:</strong> {customerPhone}</Text>
          </Section>
          <Hr />
          <Section>
            <Text>Booking Details</Text>
            <Text><strong>Tour ID:</strong> {tourId}</Text>
            <Text><strong>Adults:</strong> {adultCount}</Text>
            <Text><strong>Children:</strong> {childCount}</Text>
            <Text><strong>Total Price:</strong> {totalPrice.toLocaleString()} VND</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingEmailConfirmation;