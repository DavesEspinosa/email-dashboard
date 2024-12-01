import { Email } from "@prisma/client"
import {formatDistanceToNow} from "date-fns/formatDistanceToNow"
import { cn } from "~/lib/utils"

import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"
import { useNavigate, useLocation, useSearchParams } from "@remix-run/react"


export function EmailList({emails}: {emails: Email[]}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("selected");

  const updateParam = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <ScrollArea className="h-[500px] w-[450px] rounded-md border-r p-4">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {emails.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              filter === item.id && "bg-muted"
            )}
            onClick={() =>
              updateParam("selected", item.id.toString())
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    filter === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.body.substring(0, 300)}
            </div>
            {item.tags?.length ? (
              <div className="flex items-center gap-2">
                {item.tags.split(",").map((label) => (
                  <Badge key={label} variant='default'>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  )}

