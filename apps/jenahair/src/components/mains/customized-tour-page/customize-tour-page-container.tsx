'use client';

import { submitCustomTourRequestActionPublic } from '@/actions/custom-tour-request-action';
import {
  VN_PROVINCES,
  HOTEL_TYPES,
  ROOM_TYPES,
  RECAPTCHA_SITE_KEY,
} from '@/constants';
import SubmitFormIcon from '@/components/icons/submit-form-icon.svg';
import {
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Select,
  Checkbox,
  MultiSelect,
  ActionIcon,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useState, useMemo, useRef } from 'react';
import classes from './customize-tour-page-container.module.scss';
import dayjs from 'dayjs';
import type { ITourCategoryResponse } from '@/interfaces/tour-category-interface';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { IoChevronDownOutline } from 'react-icons/io5';
import { ReCaptchaEnterprise, ReCaptchaEnterpriseHandle } from '@vinaup/ui/landing';

interface CustomizedTourPageContainerProps {
  tourCategoriesData: ITourCategoryResponse[];
}

export default function CustomizedTourPageContainer({
  tourCategoriesData,
}: CustomizedTourPageContainerProps) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaEnterpriseHandle>(null);

  // Form state
  const [startDate, setStartDate] = useState<Date | null>(
    dayjs().set('hour', 0).set('minute', 0).set('second', 0).toDate()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    dayjs().set('hour', 0).set('minute', 0).set('second', 0).add(1, 'day').toDate()
  );
  const [hotelType, setHotelType] = useState<string | null>('3-star');
  const [roomType, setRoomType] = useState<string | null>('superior');
  const [adultCount, setAdultCount] = useState<string>('1');
  const [childCount, setChildCount] = useState<string>('0');
  const [selectedTourCategoryIds, setSelectedTourCategoryIds] = useState<string[]>(
    []
  );
  const [destinations, setDestinations] = useState<string[]>([]);

  const treeManager = useMemo(() => {
    if (tourCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(tourCategoriesData);
  }, [tourCategoriesData]);

  const flatTourCategories = treeManager?.toFlatListWithoutRoot() || [];

  // Quantity options for select dropdown
  const quantityOptions = Array.from({ length: 56 }, (_, i) => ({
    value: i.toString(),
    label: i.toString(),
  }));

  // Date validation
  const isDateRangeInvalid = !!(
    startDate &&
    endDate &&
    dayjs(startDate).isAfter(dayjs(endDate))
  );

  const handleTourCategoryChange = (tourCategoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedTourCategoryIds([...selectedTourCategoryIds, tourCategoryId]);
    } else {
      setSelectedTourCategoryIds(
        selectedTourCategoryIds.filter((id) => id !== tourCategoryId)
      );
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await submitCustomTourRequestActionPublic(formData);

    if (result.success) {
      alert('Your custom tour request has been submitted successfully!');
      // Reset form
      setStartDate(
        dayjs().set('hour', 0).set('minute', 0).set('second', 0).toDate()
      );
      setEndDate(
        dayjs()
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .add(1, 'day')
          .toDate()
      );
      setHotelType('3-star');
      setRoomType('superior');
      setAdultCount('1');
      setChildCount('0');
      setSelectedTourCategoryIds([]);
      setDestinations([]);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } else {
      alert(result.error || 'Request submission failed. Please try again.');
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  return (
    <Paper
      shadow="xs"
      p={'md'}
      ml={{ base: '0rem', md: '5rem', lg: '10rem' }}
      mr={{ base: '0rem', md: '5rem', lg: '10rem' }}
      className={classes.customTourPaper}
    >
      <Stack gap={'lg'}>
        {/* Your itinerary */}
        <Stack gap={2}>
          <Text size="lg" fw={500} c={'var(--vinaup-blue-link)'}>
            Your itinerary
          </Text>
          {isDateRangeInvalid && (
            <Text size="sm" c="red" mt={-8}>
              Start date must be before end date
            </Text>
          )}
        </Stack>

        <Grid>
          <GridCol span={6}>
            <DateTimePicker
              name="startDateDisplay"
              label="Specific start date"
              placeholder="Select start date"
              valueFormat="DD/MM/YYYY HH:mm A"
              size="md"
              value={startDate}
              onChange={(value) => setStartDate(dayjs(value).toDate())}
              classNames={{
                input: classes.formInput,
                label: classes.formLabel,
              }}
              error={isDateRangeInvalid}
              required
              withAsterisk
            />
          </GridCol>
          <GridCol span={6}>
            <DateTimePicker
              valueFormat="DD/MM/YYYY HH:mm A"
              name="endDateDisplay"
              label="And end date"
              placeholder="Select end date"
              size="md"
              value={endDate}
              onChange={(value) => setEndDate(dayjs(value).toDate())}
              classNames={{
                input: classes.formInput,
                label: classes.formLabel,
              }}
              error={isDateRangeInvalid}
              required
              withAsterisk
            />
          </GridCol>
          <GridCol span={6}>
            <Select
              label="Type your hotel"
              placeholder="Select hotel type"
              size="md"
              data={HOTEL_TYPES}
              value={hotelType}
              onChange={setHotelType}
              classNames={{
                input: classes.formInput,
                label: classes.formLabel,
              }}
            />
          </GridCol>
          <GridCol span={6}>
            <Select
              label="Room Preference"
              placeholder="Select room type"
              size="md"
              data={ROOM_TYPES}
              value={roomType}
              onChange={setRoomType}
              classNames={{
                input: classes.formInput,
                label: classes.formLabel,
              }}
            />
          </GridCol>
          <GridCol span={6}>
            <Group gap="sm" align="center">
              <Select
                data={quantityOptions}
                value={adultCount}
                onChange={(value) => setAdultCount(value || '1')}
                classNames={{
                  root: classes.quantitySelect,
                  input: classes.quantitySelectInput,
                  option: classes.quantitySelectOption,
                }}
                allowDeselect={false}
                rightSection={
                  <IoChevronDownOutline color="var(--vinaup-blue-link)" size={20} />
                }
              />
              <Text size="md">Number of Adults</Text>
            </Group>
          </GridCol>
          <GridCol span={6}>
            <Group gap="sm" align="center">
              <Select
                data={quantityOptions}
                value={childCount}
                onChange={(value) => setChildCount(value || '0')}
                classNames={{
                  root: classes.quantitySelect,
                  input: classes.quantitySelectInput,
                  option: classes.quantitySelectOption,
                }}
                allowDeselect={false}
                rightSection={
                  <IoChevronDownOutline color="var(--vinaup-blue-link)" size={20} />
                }
              />
              <Text size="md">Number of Children</Text>
            </Group>
          </GridCol>
        </Grid>

        {/* Tour styles */}
        <Stack gap={2}>
          <Text size="lg" fw={500} c={'var(--vinaup-blue-link)'}>
            Tour styles
          </Text>
          <Grid>
            {flatTourCategories.map((category) => (
              <GridCol key={category.id} span={6}>
                <Checkbox
                  label={category.title}
                  checked={selectedTourCategoryIds.includes(category.id)}
                  onChange={(e) =>
                    handleTourCategoryChange(category.id, e.currentTarget.checked)
                  }
                  classNames={{
                    label: classes.checkboxLabel,
                  }}
                />
              </GridCol>
            ))}
          </Grid>
        </Stack>

        {/* Destinations */}
        <Stack gap={2}>
          <Text size="lg" fw={500} c={'var(--vinaup-blue-link)'}>
            Destinations
          </Text>
          <MultiSelect
            placeholder="Select destinations"
            size="md"
            data={VN_PROVINCES.map((p) => ({ value: p, label: p }))}
            value={destinations}
            onChange={setDestinations}
            searchable
            hidePickedOptions
            nothingFoundMessage="Not found"
            classNames={{
              input: classes.formInput,
            }}
          />
        </Stack>

        <Stack gap={2}>
          <Text size="lg" fw={500} c={'var(--vinaup-blue-link)'}>
            How&apos;s your trip planning?
          </Text>
          <Textarea
            name="customerNotes"
            placeholder="Tell us about your trip plans..."
            size="md"
            minRows={6}
            classNames={{
              input: classes.formInput,
            }}
          />
        </Stack>

        <form action={handleSubmit}>
          <Stack gap="md">
            <Group
              justify="space-between"
              classNames={{ root: classes.yourInformationGroup }}
            >
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
                  label="Your Email"
                  placeholder="Enter your email"
                  type="email"
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
                  name="specialRequests"
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

            <input
              type="hidden"
              name="startDate"
              value={startDate?.toISOString() || ''}
            />
            <input
              type="hidden"
              name="endDate"
              value={endDate?.toISOString() || ''}
            />
            <input type="hidden" name="adultCount" value={adultCount} />
            <input type="hidden" name="childCount" value={childCount} />
            <input
              type="hidden"
              name="destinations"
              value={JSON.stringify(destinations)}
            />
            <input
              type="hidden"
              name="tourCategoryIds"
              value={JSON.stringify(selectedTourCategoryIds)}
            />
            <input type="hidden" name="hotelType" value={hotelType || ''} />
            <input type="hidden" name="roomType" value={roomType || ''} />
            <input type="hidden" name="captchaToken" value={captchaToken ?? ''} />

            <Group justify="space-between">
              <ReCaptchaEnterprise
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                action="custom_tour_request_submit"
              />
              <Group>
                {captchaToken && <Text>Send</Text>}
                <ActionIcon
                  type="submit"
                  size="xl"
                  variant="outline"
                  color="#00E1FF"
                  disabled={!captchaToken || isDateRangeInvalid}
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
