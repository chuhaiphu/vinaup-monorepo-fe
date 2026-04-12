import MantineConfigProviderContainer from './mantine-config-provider-container';

export function MantineConfigProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MantineConfigProviderContainer>{children}</MantineConfigProviderContainer>
  );
}
