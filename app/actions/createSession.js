"use server";
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function createSession(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "please fill out all fields",
    };
  }

  //Get Account instance
  const { account } = await createAdminClient();

  try {
    //Generate a Session
    const session = await account.createEmailPasswordSession(email, password);

    //Create Cookie
    cookies().set("appwrite-session", session.secret, {
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log("Auth Error: ", error);
    return {
      error: "Invalid email or password",
    };
  }
  return {
    success: true,
  };
}

export default createSession;
