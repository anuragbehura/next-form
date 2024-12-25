"use client"

import React, {useEffect, useState} from 'react';
import { IForm } from "@/Model/formModel";
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';
import PublishFormBtn from './PublishFormBtn';
import Designer from './Designer';
import { DndContext, useSensor, MouseSensor, useSensors, TouchSensor } from "@dnd-kit/core";
import DragOverlayWrapper from './DragOverlayWrapper';
import useDesigner from "../hooks/useDesigner";
import {ImSpinner2} from "react-icons/im";
import { Input } from "./ui/input";
import { Link, Check } from 'lucide-react';

function FormBuilder({form}:{
    form: IForm
}) {

  const {setElements} = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, //10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (form.content) {
      try {
        const elements = JSON.parse(form.content);
        setElements(elements);
        const readyTimeout = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(readyTimeout);
      } catch (error) {
        console.error("Invalid JSON in form.content:", error);
      }
    } else {
      console.warn("form.content is undefined or empty");
    }
  }, [form, setElements]);

  if(!isReady){
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareURL = `${window.location.origin}/submit/${form.shareURL}`

  if (form.published) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div>
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              Form Published🥳🥳
            </h1>
            <h2 className="text-2xl">Share this form link</h2>
            <h3 className="text-sm text-muted-foreground border-b pb-10">
              Anyone can view🤩 & submit🥳 form with this link.
            </h3>
            <div className="my-4 flex gap-2 items-center w-full border-b pb-4">
      <button
        onClick={handleCopy}
        className="p-2 hover:bg-gray-100 rounded-lg border border-gray-50 transition-colors duration-200 flex items-center justify-center"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Link className="h-5 w-5 text-gray-50 hover:text-gray-700" />
        )}
      </button>
      <Input 
        className="w-full bg-gray-700 border-0 focus:ring-0 text-gray-200"
        readOnly 
        value={shareURL}
      />
    </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <DndContext sensors={sensors}>
    <main className="flex flex-col w-full h-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2 className="truncate font-medium">
                <span className="text-muted-foreground mr-2">Form:</span>
                {form.name}
            </h2>
            <div className="flex items-center gap-2">
                <PreviewDialogBtn />
                {!form.published && (
                  <>
                  <SaveFormBtn id={form._id} />
                  <PublishFormBtn id={form._id} />
                  </>
                )}
            </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-full bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
        <Designer />
        </div>
    </main>
    <DragOverlayWrapper />
    </DndContext>
  )
}

export default FormBuilder