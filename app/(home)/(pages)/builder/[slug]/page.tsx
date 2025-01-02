import { GetFormBySlug } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import React from 'react';

async function BuilderPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // Destructure the slug from params
  const form = await GetFormBySlug(slug);
  if (!form) {
    throw new Error("form not found");
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
