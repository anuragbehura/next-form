"use client";

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import {MdTextFields} from "react-icons/md"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "@/hooks/useDesigner";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { cn } from "@/lib/utils";
import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement:FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator field",
    },



    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponents,

    validate: () => true,
};

function DesignerComponent({
    elementInstance
}: {elementInstance: FormElementInstance;}) {
    return (
    <div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
            Separator field
        </Label>
        <Separator />
    </div>
    );
}

function FormComponent({
    elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
    return (
      <Separator />
    )
};

function PropertiesComponents({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    return (
      <p>No properties for this element</p>
    )
};

