import React from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from "react-icons/hi";

function SaveFormBtn() {
  return (
    <Button variant={"outline"} className="flex items-center justify-center gap-2 ">
        <HiSaveAs size={12}/>
        Save
    </Button>
  )
}

export default SaveFormBtn