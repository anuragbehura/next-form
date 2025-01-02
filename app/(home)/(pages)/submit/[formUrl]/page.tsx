import React from 'react'
import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";

type tParams = Promise<{ formUrl: string }>;
async function SubmitPage(props: { params: tParams }) {

  const {formUrl} = await props.params;

    const form = await GetFormContentByUrl(formUrl); 

    if (!form) {
      throw new Error("Form not found");
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent formUrl={formUrl} content={formContent} />
  )
}

export default SubmitPage