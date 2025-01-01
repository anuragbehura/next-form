"use client";

import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import { Label } from "../ui/label";
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

function DesignerComponent() {
    return (
    <div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
            Separator field
        </Label>
        <Separator />
    </div>
    );
}

function FormComponent() {
    return (
      <Separator />
    )
};

function PropertiesComponents() {
    return (
      <p>No properties for this element</p>
    )
};

