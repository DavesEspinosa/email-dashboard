import { Prisma } from "@prisma/client";
import { prisma } from "prisma/client";

export function createEmail(data: Prisma.EmailCreateInput) {
  try {
    return prisma.email.create({
      data,
    });
  } catch (error) {
    throw new Error("Failed to create email");
  }
}

export function getEmails() {
  try {
    return prisma.email.findMany();
  } catch (error) {
    throw new Error("Failed to fetch emails");
  }
}

export function getEmailById(emailId: string) {
  try {
    return prisma.email.findUnique({
      where: {
        id: emailId,
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch email with ID: ${emailId}`);
  }
}

export function updateEmailReadStatus(emailId: string, read: boolean) {
  try {
    return prisma.email.update({
      where: {
        id: emailId,
      },
      data: {
        read,
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to update read status for email with ID: ${emailId}`
    );
  }
}

export async function createTag(tag: string, emailId: string) {
  try {
    const email = await prisma.email.findUnique({
      where: {
        id: emailId,
      },
    });

    if (email) {
      const currentTags = email.tags;
      let updatedTags = currentTags; 

      if (updatedTags && !updatedTags.split(",").includes(tag)) {
        updatedTags = `${updatedTags}, ${tag}`; 
      } else if (!updatedTags) {
        updatedTags = tag; 
      }

      return await prisma.email.update({
        where: {
          id: emailId,
        },
        data: {
          tags: updatedTags, 
        },
      });

    }

    throw new Error("Email not found.");
  } catch (error) {
    throw new Error("Failed to create or update tag for email");
  }
}
