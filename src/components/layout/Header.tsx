import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { getCachedSiteSettings } from '@/lib/api';
import { ClientHeader } from './ClientHeader';

export async function Header() {
  const siteSettings = await getCachedSiteSettings();
  const contactEmail = siteSettings.contactEmail || 'hello@writtenlyhub.com';

  return <ClientHeader contactEmail={contactEmail} />;
}
