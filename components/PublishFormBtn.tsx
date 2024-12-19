import React from 'react'
import { Button } from './ui/button'
import { CloudUpload } from "lucide-react";

function PublishFormBtn() {
  return (
    <Button className="gap-2 text-white bg-gradient-to-r from-indigo-700 to-cyan-400">
      <CloudUpload size={16} />
      Publish
    </Button>
  );
}

export default PublishFormBtn