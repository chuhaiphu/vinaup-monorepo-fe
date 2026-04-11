'use client';
import {
  Button,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Container,
  Stack,
} from '@mantine/core';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { localSignInActionPrivate } from '@/actions/auth-action';
import { notifications } from '@mantine/notifications';
import { Route } from 'next';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/adminup';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await localSignInActionPrivate({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      router.push(callbackUrl as Route);
    } else {
      setError(result.error || 'Invalid email or password');
      notifications.show({
        title: 'Login Failed',
        message: result.error || 'Invalid email or password',
        color: 'red',
        position: 'top-center',
      });
    }

    setLoading(false);
  };

  return (
    <Container size="xs" my={80}>
      <Stack w="100%" gap="lg">
        <Title order={2} ta="center">
          Welcome back!
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Username"
              type="text"
              placeholder="Your username"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {error && (
              <Text c="red" size="sm">
                {error}
              </Text>
            )}

            <Button type="submit" loading={loading} fullWidth>
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}

export default function LoginPage() {
  return (
    // use Suspense to avoid hydration error because of useSearchParams
    <Suspense fallback={<>Loading...</>}>
      <LoginForm />
    </Suspense>
  );
}
