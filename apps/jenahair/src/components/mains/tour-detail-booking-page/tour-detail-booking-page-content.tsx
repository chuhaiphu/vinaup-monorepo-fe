'use client';

import { submitBookingActionPublic } from "@/actions/booking-action";
import BookingTable, { BookingItem } from "@/components/tables/booking-table/booking-table";
import { Grid, GridCol, Group, Image, Paper, Stack, Text, TextInput, Textarea, ActionIcon } from "@mantine/core";
import { useState, useRef } from "react";
import { ReCaptchaEnterprise, ReCaptchaEnterpriseHandle } from '@vinaup/ui/landing';
import type { ITourResponse } from "@/interfaces/tour-interface";
import SubmitFormIcon from "@/components/icons/submit-form-icon.svg";
import classes from './tour-detail-booking-page-content.module.scss';
import { RECAPTCHA_SITE_KEY } from "@/constants";

interface TourDetailBookingPageContentProps {
  tourData: ITourResponse;
}

export default function TourDetailBookingPageContent({ tourData }: TourDetailBookingPageContentProps) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaEnterpriseHandle>(null);

  const [bookingItems, setBookingItems] = useState<BookingItem[]>([
    {
      id: '1',
      type: 'Adults',
      description: 'From 11 years old',
      price: tourData.discountPrice > 0 ? tourData.discountPrice : tourData.price,
      quantity: 1,
    },
    {
      id: '2',
      type: 'Children',
      description: 'From 3 - 10 years old',
      price: tourData.childPrice,
      quantity: 0,
    },
  ]);

  const totalPrice = bookingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: string, quantity: number) => {
    const newBookingItems = bookingItems.map(item => item.id === id ? { ...item, quantity } : item);
    setBookingItems(newBookingItems);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await submitBookingActionPublic(formData);

    if (result.success) {
      alert('Booking submitted successfully!');
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } else {
      alert(result.error || 'Booking submission failed. Please try again.');
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  return (
    <Paper shadow="xs" p={'md'} ml={{ base: '0rem', md: '5rem', lg: '10rem' }} mr={{ base: '0rem', md: '5rem', lg: '10rem' }} className={classes.bookingPaper}>
      <Stack gap={'md'}>
        <Group>
          <Image
            src={tourData.mainImageUrl || "/images/image-placeholder.png"}
            alt={tourData.title || ''}
            h={64}
            w={64}
            fit="contain"
          />
          <Stack gap={0}>
            <Text size="lg" c={'var(--vinaup-blue-link)'}>
              {tourData.title || ''}
            </Text>
            <Text size="md" c={'var(--vinaup-medium-dark-gray)'}>
              {tourData.durationDays || ''} days
            </Text>
          </Stack>
        </Group>
        <BookingTable bookingItems={bookingItems} onQuantityChange={handleQuantityChange} />
        <Grid>
          <GridCol span={8}></GridCol>
          <GridCol span={4}>
            <Stack>
              <Group justify="space-between" pr={'xs'}>
                <Text fw={500}>Total (VND)</Text>
                <Text fw={500}>{formatPrice(totalPrice)}</Text>
              </Group>
            </Stack>
          </GridCol>
        </Grid>
        <form action={handleSubmit}>
          <Stack gap="md">
            <Group justify="space-between" classNames={{ root: classes.yourInformationGroup }}>
              Your Information
            </Group>
            <Grid>
              <GridCol span={6}>
                <TextInput
                  name="customerPhone"
                  classNames={{
                    input: classes.formInput,
                    label: classes.formLabel,
                  }}
                  label="Your Phone / Whatsapp"
                  placeholder="Enter your phone number"
                  size="md"
                  required
                  withAsterisk
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  name="customerEmail"
                  classNames={{
                    input: classes.formInput,
                    label: classes.formLabel,
                  }}
                  type="email"
                  label="Your Email"
                  placeholder="Enter your email"
                  size="md"
                  required
                  withAsterisk
                />
              </GridCol>
              <GridCol span={12}>
                <TextInput
                  name="customerName"
                  classNames={{
                    input: classes.formInput,
                    label: classes.formLabel,
                  }}
                  label="Your name"
                  placeholder="Enter your name"
                  size="md"
                  required
                  withAsterisk
                />
              </GridCol>
              <GridCol span={12}>
                <Textarea
                  name="customerNotes"
                  classNames={{
                    input: classes.formInput,
                    label: classes.formLabel,
                  }}
                  label="Special Requests"
                  placeholder="Enter any special requests"
                  size="md"
                  minRows={4}
                />
              </GridCol>
            </Grid>

            <input type="hidden" name="tourId" value={tourData.id} />
            <input type="hidden" name="adultCount" value={bookingItems[0].quantity} />
            <input type="hidden" name="childCount" value={bookingItems[1].quantity} />
            <input type="hidden" name="adultPrice" value={bookingItems[0].price} />
            <input type="hidden" name="childPrice" value={bookingItems[1].price} />
            <input type="hidden" name="totalPrice" value={totalPrice} />
            <input type="hidden" name="captchaToken" value={captchaToken ?? ''} />

            <Group justify="space-between">
              <ReCaptchaEnterprise
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                action="booking_submit"
              />
              <Group>
                {captchaToken && (
                  <Text>Send</Text>
                )}
                <ActionIcon
                  type="submit"
                  size="xl"
                  variant="outline"
                  color="#00E1FF"
                  disabled={!captchaToken}
                >
                  <SubmitFormIcon width={32} height={32} />
                </ActionIcon>
              </Group>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
