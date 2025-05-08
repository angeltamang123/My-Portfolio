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
import { Button } from "@/components/ui/button";
import api from "@/lib/adminAxiosInstance"; // Custom axios instance for request and response interception
import { toast } from "sonner";

export function DeleteDialog({ id, apiEndPoint, updateAction }) {
  const handleDelete = async () => {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${apiEndPoint}/${id}`
    );
    if (response.status == 200) {
      toast.success("Deleted", {
        description: "Item Deleted!",
        classNames: {
          description: "!text-black",
        },
      });
      if (updateAction) updateAction();
    } else {
      toast.error("Something went wrong!!", {
        description: `${response.data}`,
        classNames: {
          description: "!text-black",
        },
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          variant="outline"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
