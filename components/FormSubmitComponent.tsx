"use client";

import React, { useCallback, useRef, useState } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { toast } from "../hooks/use-toast";
import {ImSpinner2} from "react-icons/im";
import { SubmitForm } from "@/actions/form";

interface SubmissionResponse {
    success: boolean;
    data?: {
        id: string;
        formId: string;
        content: string;
        createdAt?: string;
        updatedAt?: string;
    };
    error?: string;
}

function FormSubmitComponent({
    formUrl,
    content
}: {
    content: FormElementInstance[];
    formUrl: string;
}) {
    const formValues = useRef<{ [key: string]: string }>({});
    const formErrors = useRef<{ [key: string]: boolean }>({});
    const [renderKey, setRenderKey] = useState(new Date().getTime());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateForm: () => boolean = useCallback(() => {
        formErrors.current = {}; // Reset errors at start of validation
        let isValid = true;

        for (const field of content) {
            const actualValue = formValues.current[field.id] || "";
            const valid = FormElements[field.type].validate(field, actualValue);

            if (!valid) {
                formErrors.current[field.id] = true;
                isValid = false;
            }
        }

        if (!isValid) {
            setRenderKey(new Date().getTime());
        }

        return isValid;
    }, [content]);

    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value;
    }, []);

    const submitForm = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            // Validate form
            if (!validateForm()) {
                toast({
                    title: "Validation Error",
                    description: "Please check the form for errors",
                    variant: "destructive",
                });
                return;
            }

            // Submit form
            const jsonContent = JSON.stringify(formValues.current);
            const result = await SubmitForm(formUrl, jsonContent) as SubmissionResponse;

            if (result.success && result.data) {
                setSubmitted(true);
                toast({
                    title: "Success",
                    description: "Form submitted successfully",
                });
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('Form submission error:', error);
            toast({
                title: "Error",
                description: "Failed to submit form. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted){
        return (
            <div className="flex justify-center w-full h-full items-center p-8">
                <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
                    <h1 className="text-2xl font-bold">Form submitted</h1>
                    <p className="text-muted-foreground">
                        Thank you for submitting the form, you can close this page now.
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
                {content.map((element) => {
                    const FormElement = FormElements[element.type].formComponent;
                    return (
                        <FormElement key={element.id} elementInstance={element} submitValue={submitValue} isInvalid={formErrors.current[element.id]} defaultValue={formValues.current[element.id]} />
                    )
                })}
                <Button
                    className="mt-8"
                    onClick={submitForm}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ImSpinner2 className="animate-spin" />
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </div>
    )
}

export default FormSubmitComponent