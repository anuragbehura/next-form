import { GetFormBySlug } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';

// This should be in a file named page.tsx inside the [slug] directory
export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params;
  const form = await GetFormBySlug(slug);

  if (!form) {
    throw new Error("form not found");
  }

  return <FormBuilder form={form} />;
}