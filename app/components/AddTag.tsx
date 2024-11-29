import { Form, useActionData } from "@remix-run/react";
import { Button } from "./ui/button";
import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";

export function AddTag() {
  const actionData = useActionData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsDialogOpen(false);
  }, [actionData]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="ml-auto"
          onClick={() => setIsDialogOpen(true)}
        >
          Add tag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tag</DialogTitle>
        </DialogHeader>
        <Form method="post">
          <div className="grid gap-4 py-5">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag" className="text-right">
                Tag
              </Label>
              <Input
                id="tag"
                name="tag"
                required
                className="col-span-3"
              />
            </div>
          </div>
          <input type="hidden" name="actionType" value="createTag" />
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
