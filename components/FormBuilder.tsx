"use client"

import React, { useEffect, useState } from 'react';
import { IForm } from "@/Model/formModel";
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';
import PublishFormBtn from './PublishFormBtn';
import Designer from './Designer';
import { DndContext, useSensor, MouseSensor, useSensors, TouchSensor } from "@dnd-kit/core";
import DragOverlayWrapper from './DragOverlayWrapper';
import useDesigner from "../hooks/useDesigner";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Copy, Check, MoveLeft, MoveRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import Link from 'next/link';
import Confetti from 'react-confetti';

function FormBuilder({ form }: {
  form: IForm
}) {

  const { setElements, setSelectedElement } = useDesigner();
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
        if (isReady) return;
        const elements = JSON.parse(form.content);
        setElements(elements);
        setSelectedElement(null);
        setIsReady(true);
        const readyTimeout = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(readyTimeout);
      } catch (error) {
        console.error("Invalid JSON in form.content:", error);
      }
    } else {
      console.warn("form.content is undefined or empty");
    }
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
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
      toast({
        title: "Copied!🥳",
        description: "Link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareURL = `${window.location.origin}/submit/${form.shareURL}`

  if (form.published) {
    return (
      <>
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              Form Published🥳🥳
            </h1>
            <h2 className="text-2xl">Copy & share this form link</h2>
            <h3 className="text-sm text-muted-foreground border-b pb-10">
              Anyone can view🤩 & submit🥳 form with this link.
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input
                className="w-full bg-gray-700 border-0 focus:ring-0 text-gray-200"
                readOnly
                value={shareURL}
              />
              <Button
              onClick={handleCopy}
              className={`
              flex items-center gap-2 w-full mt-2 transform transition-all duration-200
              ${copied 
              ? 'bg-gradient-to-r from-green-500 to-green-400 text-white'
              : 'bg-gradient-to-r from-indigo-700 to-cyan-400 text-white'
              }
              `}
              >
              {copied ? (
              <Check className="w-4 h-4" />
              ) : (
              <Copy className="w-4 h-4" />
              )}
              <span className="font-medium">
              {copied ? 'Copied!' : 'Copy'}
              </span>
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/dashboard"} className="gap-2">
                  <MoveLeft />
                  Back to dashboard
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/${form.slug}`} className="gap-2">
                  Form details
                  <MoveRight  />
                </Link>
              </Button>
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