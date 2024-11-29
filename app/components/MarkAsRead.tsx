import { useFetcher } from "@remix-run/react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { Email } from "@prisma/client";

export function MarkAsRead({ email }: { email: Email }) {
  const fetcher = useFetcher();
  const [isRead, setIsRead] = useState(email.read);

  const handleMarkAsRead = (checked: boolean) => {
    setIsRead(checked);
    if (!email) return;
    fetcher.submit(
      {
        emailId: email.id,
        read: checked,
        actionType: "updateReadStatus",
      },
      {
        method: "put",
        action: "/emails",
      }
    );
  };

  return (
    <Label
      htmlFor="mark-as-read"
      className="flex items-center gap-2 text-xs font-normal"
    >
      <Switch
        checked={isRead}
        onCheckedChange={handleMarkAsRead}
        id="mark-as-read"
        aria-label="Mark as read"
      />
      {isRead ? "Marked as read" : "Mark as unread"}
    </Label>
  );
}
