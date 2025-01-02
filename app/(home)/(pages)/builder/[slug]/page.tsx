import { GetFormBySlug } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug;
  const form = await GetFormBySlug(slug);

  return {
    title: form?.name || 'Form Builder',
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const form = await GetFormBySlug(slug);

  if (!form) {
    throw new Error("form not found");
  }

  return <FormBuilder form={form} />;
}