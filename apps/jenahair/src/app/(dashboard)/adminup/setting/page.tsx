import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  redirect('/adminup/setting/overview');
}

