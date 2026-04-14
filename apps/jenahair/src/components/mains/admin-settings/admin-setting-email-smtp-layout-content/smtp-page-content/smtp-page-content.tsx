'use client';

import { use } from 'react';
import { ISmtpConfigResponse, ICreateSmtpConfig, IUpdateSmtpConfig } from '@/interfaces/smtp-config-interface';
import { Button, Divider, Group, NumberInput, Paper, PasswordInput, Stack, Switch, Text, TextInput, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './smtp-page-content.module.scss';
import { useState } from 'react';
import { saveSmtpConfigActionPrivate, sendTestEmailActionPrivate, updateSmtpConfigActionPrivate } from '@/actions/smtp-config-action';
import { ActionResponse } from '@/interfaces/_base-interface';

interface SmtpPageContentProps {
  smtpConfigPromise: Promise<ActionResponse<ISmtpConfigResponse | null>>;
}

export default function SmtpPageContent({ smtpConfigPromise }: SmtpPageContentProps) {
  const response = use(smtpConfigPromise);
  const smtpConfig = response.data ?? null;

  const [host, setHost] = useState(smtpConfig?.host || '');
  const [port, setPort] = useState<number | string>(smtpConfig?.port || 587);
  const [username, setUsername] = useState(smtpConfig?.username || '');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(smtpConfig?.secure || false);
  const [fromName, setFromName] = useState(smtpConfig?.fromName || '');
  const [fromEmail, setFromEmail] = useState(smtpConfig?.fromEmail || '');
  const [receiveEmail, setReceiveEmail] = useState(smtpConfig?.receiveEmail || '');
  const [isSendingTest, setIsSendingTest] = useState(false);

  const handleSaveSmtpConfig = async () => {
    if (!host || !port || !username || !fromName || !fromEmail) {
      notifications.show({ message: 'Please fill in all required fields', color: 'red' });
      return;
    }

    try {
      let result: ActionResponse<ISmtpConfigResponse>;

      if (smtpConfig?.id) {
        const updatePayload: IUpdateSmtpConfig = { host, port: Number(port), username, secure, fromName, fromEmail, receiveEmail: receiveEmail || null };
        if (password && password.length > 0) {
          updatePayload.password = password;
        }
        result = await updateSmtpConfigActionPrivate(smtpConfig.id, updatePayload);
      } else {
        if (!password) {
          notifications.show({ message: 'Password is required', color: 'red' });
          return;
        }
        const createPayload: ICreateSmtpConfig = { host, port: Number(port), username, password, secure, fromName, fromEmail, receiveEmail: receiveEmail || null };
        result = await saveSmtpConfigActionPrivate(createPayload);
      }

      if (result.success) {
        notifications.show({ message: 'SMTP configuration saved successfully', color: 'green', position: 'top-right' });
      } else {
        notifications.show({ message: result.error || 'Failed to save configuration', color: 'red', position: 'top-right' });
      }
    } catch (error) {
      console.error(error);
      notifications.show({ message: 'An unexpected error occurred', color: 'red' });
    }
  };

  const handleSendTestEmail = async () => {
    if (!receiveEmail) {
      notifications.show({ message: 'Please enter a receive email address', color: 'red' });
      return;
    }
    setIsSendingTest(true);
    try {
      const result = await sendTestEmailActionPrivate(receiveEmail);
      if (result.success) {
        notifications.show({ message: 'Test email sent successfully', color: 'green' });
      } else {
        notifications.show({ message: result.error || 'Failed to send test email', color: 'red' });
      }
    } catch (error) {
      notifications.show({ message: error instanceof Error ? error.message : 'Error sending test email', color: 'red' });
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <Stack gap={'md'}>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p={'sm'} gap={'md'}>
          <Group justify="space-between">
            <Text size="lg" fw={500}>SMTP Configuration</Text>
            <Button onClick={handleSaveSmtpConfig}>Save Changes</Button>
          </Group>

          <Group grow align="flex-start">
            <Stack gap={2}>
              <Text fw={500}>Host</Text>
              <TextInput placeholder="smtp.gmail.com" value={host} onChange={(e) => setHost(e.currentTarget.value)} />
            </Stack>
            <Stack gap={2}>
              <Text fw={500}>Port</Text>
              <NumberInput placeholder="587" value={port} onChange={(val) => setPort(val)} allowNegative={false} />
            </Stack>
          </Group>

          <Group grow align="flex-start">
            <Stack gap={2}>
              <Text fw={500}>Username</Text>
              <TextInput placeholder="email@example.com" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
            </Stack>
            <Stack gap={2}>
              <Text fw={500}>Password</Text>
              <PasswordInput placeholder="Leave blank to keep current password" onChange={(e) => setPassword(e.currentTarget.value)} autoComplete="new-password" />
            </Stack>
          </Group>

          <Stack gap={0}>
            <Group>
              <Text fw={500}>Secure Connection ({secure ? 'SSL' : 'TLS'})</Text>
              <Text c="dimmed">Require port {secure ? '465' : '587'}</Text>
            </Group>
            <Switch label={secure ? 'Enabled' : 'Disabled'} checked={secure} onChange={(e) => setSecure(e.currentTarget.checked)} />
          </Stack>

          <Divider my="sm" />

          <Text size="lg" fw={500}>Sender Information</Text>
          <Group grow align="flex-start">
            <Stack gap={2}>
              <Text fw={500}>From Name</Text>
              <TextInput placeholder="My Company Name" value={fromName} onChange={(e) => setFromName(e.currentTarget.value)} />
            </Stack>
            <Stack gap={2}>
              <Text fw={500}>From Email</Text>
              <TextInput placeholder="no-reply@example.com" value={fromEmail} onChange={(e) => setFromEmail(e.currentTarget.value)} />
            </Stack>
          </Group>

          <Stack gap={2}>
            <Group justify="space-between" align="flex-end">
              <Stack gap={2} style={{ flex: 1 }}>
                <Tooltip label="Email address to receive notifications" position="left-end">
                  <Text w={'fit-content'} fw={500}>Receive Email</Text>
                </Tooltip>
                <TextInput placeholder="support@example.com" value={receiveEmail} onChange={(e) => setReceiveEmail(e.currentTarget.value)} />
              </Stack>
              <Button onClick={handleSendTestEmail} loading={isSendingTest} variant="outline" disabled={!receiveEmail}>
                Send Test Email
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
