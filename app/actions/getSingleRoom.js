"use server";

import { createAdminClinet } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClinet();

    //Fetch roooms
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASES,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id
    );

    //Revalidate cache for this path
    revalidatePath("/", "layout");

    return room;
  } catch (error) {
    console.log("Failed to get room", error);
    redirect("/error");
  }
}

export default getSingleRoom;
