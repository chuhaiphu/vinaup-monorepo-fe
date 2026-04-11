'use client';

import { RECAPTCHA_SITE_KEY } from "@/constants";
import {
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
  ActionIcon,
} from "@mantine/core";
import { useState, useRef, ReactNode } from "react";
import { ReCaptchaEnterprise, ReCaptchaEnterpriseHandle } from '@vinaup/ui/landing';
import SubmitFormIcon from "@/components/icons/submit-form-icon.svg";
import classes from './contact-form.module.scss';

interface ContactFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  nameFieldName?: string;
  emailFieldName?: string;
  phoneFieldName?: string;
  notesFieldName?: string;
  notesLabel?: string;
  notesPlaceholder?: string;
  hiddenFields?: ReactNode;
  phoneEmailLayout?: 'inline' | 'stacked';
  disableSubmit?: boolean;
  showTitle?: boolean;
}

export default function ContactForm({
  onSubmit,
  nameFieldName = 'customerName',
  emailFieldName = 'customerEmail',
  phoneFieldName = 'customerPhone',
  notesFieldName = 'specialRequests',
  notesLabel = 'Special Requests',
  notesPlaceholder = 'Enter any special requests',
  hiddenFields,
  phoneEmailLayout = 'inline',
  disableSubmit = false,
  showTitle = true,
}: ContactFormProps) {

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaEnterpriseHandle>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await onSubmit(formData);
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
    formRef.current?.reset();
  };

  const phoneSpan = phoneEmailLayout === 'inline' ? 6 : 12;
  const emailSpan = phoneEmailLayout === 'inline' ? 6 : 12;

  return (
    <form ref={formRef} action={handleSubmit}>
      <Stack gap={'lg'}>
        {/* Your information */}
        <Stack gap={2}>
          {showTitle && (
          <Group justify="space-between" classNames={{ root: classes.yourInformationGroup }} mb={'sm'}>
              Your information
            </Group>
          )}
          <Grid>
            <GridCol span={phoneSpan}>
              <TextInput
                name={phoneFieldName}
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
            <GridCol span={emailSpan}>
              <TextInput
                name={emailFieldName}
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
                name={nameFieldName}
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
                name={notesFieldName}
                classNames={{
                  input: classes.formInput,
                  label: classes.formLabel,
                }}
                label={notesLabel}
                placeholder={notesPlaceholder}
                size="md"
                minRows={4}
              />
            </GridCol>
          </Grid>
        </Stack>

        {/* Hidden fields from parent */}
        {hiddenFields}

        {/* Hidden field for captcha token */}
        <input type="hidden" name="captchaToken" value={captchaToken ?? ''} />

        <Group justify="space-between">
          <ReCaptchaEnterprise
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
            action="contact_form_submit"
          />
          <Group>
            {captchaToken && (
              <Text fw={500}>Send</Text>
            )}
            <ActionIcon
              type="submit"
              size="xl"
              variant="outline"
              color="#00E1FF"
              disabled={!captchaToken || disableSubmit}
            >
              <SubmitFormIcon width={32} height={32} />
            </ActionIcon>
          </Group>
        </Group>
      </Stack>
    </form>
  );
}

