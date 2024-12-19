import React from 'react'
import { Button } from './ui/button'
import { ScanEye } from "lucide-react";

function PreviewDialogBtn() {
  return (
    <Button variant={"outline"} className="flex items-center gap -2">
      <ScanEye size={20} />
      Preview
    </Button>
  );
}

export default PreviewDialogBtn