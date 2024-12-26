import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { Loader2 } from "lucide-react"; // Using Loader2 instead of FaIcons for consistency
import { toast } from "@/hooks/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PublishFormBtnProps {
  id: number;
}

function PublishFormBtn({ id }: PublishFormBtnProps) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description: "Your form is now live.🥳",
      });
      router.refresh();
    } catch (error) {
      console.error(error); 
      toast({
        title: "Error",
        description: "Something went wrong.",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-indigo-700 to-cyan-400">
          <CloudUpload className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form.
            <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(() => publishForm());
            }}
          >
            {loading ? (
              <>
                Publishing...<Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Publish"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
