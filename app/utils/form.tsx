import { createServerFn } from "@tanstack/react-start";
import { getFormData } from "@tanstack/react-form/start";

export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
  async () => {
    return getFormData();
  },
);
