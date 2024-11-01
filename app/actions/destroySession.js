"use server";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function destroySession() {
  //retrive the sesion cookie
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    return {
      error: "No Session cookie found",
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);
    //Clear Cookie Session
    await account.deleteSession("current");
    //Clear Session Cookie
    cookies().delete("appwrite-session");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error deleting session",
    };
  }
  return {
    success: true,
  };
}

export default destroySession;
