import { Separator } from "./ui/separator";

import { MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {  useLoaderData, useSearchParams } from "@remix-run/react";
import { AddTag } from "./AddTag";
import { loader } from "~/routes/emails";
import { MarkAsRead } from "./MarkAsRead";

export function MailDisplay() {
  const { email } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const emailIdSelected = searchParams.get("selected");



  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2 pl-0">
        <Separator orientation="vertical" />
        <Button variant="ghost" size="icon" disabled={!email}>
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </div>
      <Separator />
      {!email && (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
      {email?.id === emailIdSelected && (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={email.name} />
                <AvatarFallback>
                  {email.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{email.name}</div>
                <div className="line-clamp-1 text-xs">{email.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {email.email}
                </div>
              </div>
            </div>
            {email.createdAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(email.createdAt), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {email.body}
          </div>
          <div className="p-4">
            <div className="grid gap-4">
              <div className="flex items-center">
                <MarkAsRead key={email.id} email={email} />
                <AddTag />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
