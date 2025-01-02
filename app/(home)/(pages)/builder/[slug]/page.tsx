import { GetFormBySlug } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';

// Define the expected params type
interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BuilderPage({
  params,
}: PageProps) {
  const { slug } = params;
  const form = await GetFormBySlug(slug);

  if (!form) {
    throw new Error("form not found");
  }

  return <FormBuilder form={form} />;
}