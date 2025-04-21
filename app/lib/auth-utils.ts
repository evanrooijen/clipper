import { auth } from "./auth";
import { getHeaders } from "@tanstack/react-start/server";

export const getCurrentUser = async () => {
  const currentUser = await auth.api.getSession({
    // @ts-expect-error Types are not correct
    headers: await getHeaders(),
  });
  return currentUser;
};
