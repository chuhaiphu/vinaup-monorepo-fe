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

interface DetailItem {
  label: string;
  value: string | number;
}

interface AdminEmailNotificationProps {
  title: string;
  previewText: string;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  details?: DetailItem[];
  notes?: string;
}

export const AdminEmailNotification = ({
  title,
  previewText,
  description,
  customerName,
  customerEmail,
  customerPhone,
  details = [],
  notes,
}: AdminEmailNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '20px 0 48px', maxWidth: '600px' }}>
          <Heading style={{ color: '#333', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
            {title}
          </Heading>
          <Text style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>
            {description}
          </Text>
          
          <Section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
            <Text style={{ color: '#333', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
              Customer Information
            </Text>
            <Text style={{ color: '#555', fontSize: '14px', margin: '5px 0' }}>
              <strong>Name:</strong> {customerName}
            </Text>
            <Text style={{ color: '#555', fontSize: '14px', margin: '5px 0' }}>
              <strong>Email:</strong> {customerEmail}
            </Text>
            <Text style={{ color: '#555', fontSize: '14px', margin: '5px 0' }}>
              <strong>Phone:</strong> {customerPhone}
            </Text>
          </Section>

          {details.length > 0 && (
            <>
              <Hr style={{ borderColor: '#e6ebf1', margin: '20px 0' }} />

              <Section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <Text style={{ color: '#333', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  Details
                </Text>
                {details.map((detail, index) => (
                  <Text key={index} style={{ color: '#555', fontSize: '14px', margin: '5px 0' }}>
                    <strong>{detail.label}:</strong> {detail.value}
                  </Text>
                ))}
              </Section>
            </>
          )}

          {notes && (
            <>
              <Hr style={{ borderColor: '#e6ebf1', margin: '20px 0' }} />

              <Section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <Text style={{ color: '#333', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  Notes
                </Text>
                <Text style={{ color: '#555', fontSize: '14px', margin: '5px 0', whiteSpace: 'pre-wrap' }}>
                  {notes}
                </Text>
              </Section>
            </>
          )}

          <Text style={{ color: '#999', fontSize: '12px', marginTop: '30px' }}>
            This email was sent from Jena Hair Admin Panel
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminEmailNotification;
