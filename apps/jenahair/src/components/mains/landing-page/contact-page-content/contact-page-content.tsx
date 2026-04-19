'use client';

import { IAppConfigResponse } from '@/interfaces/app-config-interface';
import { Grid, GridCol, Stack, Text, Group } from '@mantine/core';
import { FaEnvelope, FaClock } from 'react-icons/fa';
import { VinaupLocationIcon as LocationIcon } from '@vinaup/ui/cores';
import WhatsappIcon from '@/components/icons/whatsapp-icon.svg';
import ContactForm from '@/components/forms/contact-form/contact-form';
import { submitCustomerContactActionPublic } from '@/actions/customer-contact-action';
import classes from './contact-page-content.module.scss';

interface ContactPageContentProps {
  appConfig: IAppConfigResponse | undefined;
}

export default function ContactPageContent({ appConfig }: ContactPageContentProps) {
  const handleContactSubmit = async (formData: FormData) => {
    const result = await submitCustomerContactActionPublic(formData);
    if (result.success) {
      alert('Your contact request has been submitted successfully!');
    } else {
      alert(result.error || 'Submission failed. Please try again.');
    }
  };

  const contactItems = [
    {
      icon: <FaEnvelope size={24} />,
      label: 'Email',
      value: appConfig?.emailContact,
    },
    {
      icon: <WhatsappIcon width={24} height={24} />,
      label: 'Phone & Whatsapp',
      value: appConfig?.phoneContact,
    },
    {
      icon: <LocationIcon size={24} fill="white" />,
      label: 'Location',
      value: appConfig?.addressContact,
    },
    {
      icon: <FaClock size={24} />,
      label: 'Working hours',
      value: 'Online 24/7',
    },
  ];

  return (
    <Grid gap={{ base: 'xl', md: 48 }} align="stretch">
      <GridCol span={{ base: 12, md: 4 }}>
        <div className={classes.contactInfoCard}>
          <Text className={classes.contactInfoTitle}>Thông tin liên hệ</Text>
          <Stack gap="xl" mt="xl">
            {contactItems.map((item) => (
              <Group key={item.label} gap="md" align="center" wrap="nowrap">
                <div className={classes.iconWrapper}>{item.icon}</div>
                <Stack gap={2}>
                  <Text className={classes.itemLabel}>{item.label}</Text>
                  <Text className={classes.itemValue}>
                    {item.value ?? 'Đang cập nhật'}
                  </Text>
                </Stack>
              </Group>
            ))}
          </Stack>
        </div>
      </GridCol>

      <GridCol span={{ base: 12, md: 8 }}>
        <ContactForm
          onSubmit={handleContactSubmit}
          nameFieldName="name"
          emailFieldName="email"
          phoneFieldName="phone"
          notesFieldName="notes"
          notesLabel="Tin nhắn"
          notesPlaceholder="Nhập nội dung tin nhắn"
          phoneEmailLayout="inline"
        />
      </GridCol>
    </Grid>
  );
}
