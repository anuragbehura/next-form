import { GetFormBySlug } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';

interface PageParams {
  slug: string;
}

// Get the auto-generated PageProps type from Next.js
type Props = {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page(props: Props) {
  const form = await GetFormBySlug(props.params.slug);

  if (!form) {
    throw new Error("form not found");
  }

  return <FormBuilder form={form} />;
}

// Add type annotations for Next.js to generate proper types
export type GenerateMetadata = {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
};