
import { GetFormBySlug } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import React from 'react';

type tParams = Promise<{ slug: string }>;
async function BuilderPage(props: { params: tParams }) {
  const { slug } = await props.params;
  // console.log("Slug received in BuilderPage:", slug);
  const form = await GetFormBySlug(slug);
  if (!form) {
    throw new Error("form not found");
  }
  return (
    <FormBuilder form={form} />
  )
}

export default BuilderPage