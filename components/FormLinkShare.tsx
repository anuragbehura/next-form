"use client";

import React, {useState, useEffect} from "react";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { ExternalLink } from 'lucide-react';

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
    const[mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; //avoiding window not defined error
    }

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;

    return (
        <div className="flex flex-grow gap-4 items-center">
            <Input value={shareLink} readOnly />
            <Button className="w-[250px]" onClick={() => {
                navigator.clipboard.writeText(shareLink);
                toast({
                    title: "Copied!🥳",
                    description: "Link copied to clipboard",
                })
            }}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Share link
            </Button>
        </div>
    )
};


export default FormLinkShare