'use client';
import { UnstyledButton } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export function CopyToClipboard({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    Notifications.show({
      title: 'Copy thành công',
      message: content,
      color: 'green',
    });
  };
  return <UnstyledButton onClick={handleCopy}>{children}</UnstyledButton>;
}
