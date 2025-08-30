import { createAuthClient } from "better-auth/svelte";
import { toast } from "svelte-sonner";

export const client = createAuthClient();

export async function signIn(provider: string) {
  try {
    if (!provider) return;

    await client.signIn.social(
      { provider },
      {
        onError: ({ error }) => {
          toast.error(error.message);
        },
      },
    );

    return;
  } catch (error: any) {
    toast.error(error.message || "An error occurred. Please try again later.");
  }
}

export const { signOut, useSession } = client;
