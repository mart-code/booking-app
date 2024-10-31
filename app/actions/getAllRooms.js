"use server";

import { createAdminClinet } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getAllRooms() {
  try {
    const { databases } = await createAdminClinet();

    //Fetch roooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASES,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    );

    //Revalidate cache for this path
    revalidatePath("/", "layout");

    return rooms;
  } catch (error) {
    console.log("Failed to get rooms", error);
    redirect("/error");
  }
}

export default getAllRooms;
