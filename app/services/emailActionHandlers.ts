import { updateEmailReadStatus, createTag, createEmail } from "./emailService";

export async function handleUpdateReadStatus(formData: FormData) {
  const emailId = formData.get("emailId") as string;
  const read = formData.get("read") as string;
  return await updateEmailReadStatus(emailId, JSON.parse(read));
}

export async function handleCreateTag(
  formData: FormData,
  selectedEmail: string | null
) {
  const tag = formData.get("tag") as string;
  return await createTag(tag, selectedEmail as string);
}

export async function handleCreateEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const body = formData.get("body") as string;
  return await createEmail({ name, email, subject, body });
}
