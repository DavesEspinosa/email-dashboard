import type { MetaFunction } from "@remix-run/node";
import { CreateEmail } from "~/components/CreateEmail";
import { Mail } from "~/components/Mail";
import { createEmail, createTag, getEmailById, getEmails, updateEmailReadStatus } from "~/services/emailService";

export const meta: MetaFunction = () => {
  return [
    { title: "Kabilio email App" },
    { name: "description", content: "Welcome to Kabilio!" },
  ];
};

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const selectedEmail = searchParams.get("selected");

  const emails = await getEmails();
  const email = selectedEmail ? await getEmailById(selectedEmail) : null;

  return {
    emails,
    email,
  };
}

export async function action({ request }: { request: Request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const selectedEmail = searchParams.get("selected");

  const formData = await request.formData();
  const actionType = formData.get("actionType") as string;

  if (actionType === "updateReadStatus") {
    const emailId = formData.get("emailId") as string;
    const read = formData.get("read") as string;
  
    return await updateEmailReadStatus(emailId, JSON.parse(read) );
  }

  if (actionType === "createTag") {
    const tag = formData.get("tag") as string;
    return await createTag(tag, selectedEmail as string);
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const body = formData.get("body") as string;

  return await createEmail({ name, email, subject, body });
}

export default function Index() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="w-[90vw] h-[60vh] border rounded-xl shadow-xl bg-white p-8">
        <Mail />
      </div>
      <div className="fixed bottom-8 right-5">
        <CreateEmail />
      </div>
    </div>
  );
}
