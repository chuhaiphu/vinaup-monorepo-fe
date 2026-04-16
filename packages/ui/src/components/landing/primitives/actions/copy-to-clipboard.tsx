'use client';
import { UnstyledButton } from '@mantine/core';

export function CopyToClipboard({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  return (
    <UnstyledButton onClick={() => navigator.clipboard.writeText(content)}>
      {children}
    </UnstyledButton>
  );
}
