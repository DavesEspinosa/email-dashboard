import { ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { EmailList } from "./EmailList";
import { useLoaderData } from "@remix-run/react";
import { MailDisplay } from "./MailDisplay";
import { loader } from "~/routes/emails";

interface MailProps {
  defaultLayout?: number[];
}

export function Mail({ defaultLayout = [32, 48] }: MailProps) {
  const { emails } = useLoaderData<typeof loader>();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full max-h-[800px] items-stretch"
    >
      <Tabs defaultValue="all">
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Inbox</h1>
          <TabsList className="ml-auto">
            <TabsTrigger
              value="all"
              className="text-zinc-600 dark:text-zinc-200"
            >
              All mail
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Unread
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        <TabsContent value="all" className="m-0">
          <EmailList emails={emails} />
        </TabsContent>
        <TabsContent value="unread" className="m-0">
          <EmailList emails={emails.filter((item) => !item.read)} />
        </TabsContent>
      </Tabs>
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <MailDisplay />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
