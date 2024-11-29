import { Form, useActionData } from "@remix-run/react";
import { Button } from "./ui/button";
import { DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import {
  Plus,
} from "lucide-react"

export function CreateEmail() {
  const actionData = useActionData(); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    setIsDialogOpen(false); 
  }, [actionData])
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-12 h-12" size='icon' onClick={() => setIsDialogOpen(true)}><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader >
          <DialogTitle>Compose Email</DialogTitle>
          <DialogDescription>
            Fill out the fields below to send a new email.
          </DialogDescription>
        </DialogHeader>
        <Form method="post">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                className="col-span-3"
                placeholder="Sender's Name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                required
                type="email"
                className="col-span-3"
                placeholder="Recipient's Email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                required
                className="col-span-3"
                placeholder="Email Subject"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="body" className="text-right">
                Body
              </Label>
              <Textarea  id="body"
                name="body"
                required
                className="col-span-3 h-32 p-2 border rounded-md"
                placeholder="Email Body" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send Email</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
