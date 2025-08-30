<script lang="ts" module>
  function i18n(code?: Message) {
    if (code === "BAD_REQUEST") return "An error occurred. Please try again later.";
    if (code === "CONFLICT") return "You are already logged in.";
    return "An error occurred. Please try again later.";
  }
</script>

<script lang="ts">
  import type { Message, LoginSchema } from "~/lib/schema";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as Card from "./ui/card";
  import * as Form from "./ui/form";
  import { Input } from "./ui/input";
  import { Button } from "./ui/button";
  import { Toaster } from "./ui/sonner";
  import { loginSchema } from "~/lib/schema";
  import { actions } from "astro:actions";
  import { toast } from "svelte-sonner";
  import { GithubIcon } from "@lucide/svelte";
  import { signIn } from "../auth-client";

  let { sv }: { sv: SuperValidated<LoginSchema, Message> } = $props();

  const sf = superForm(sv, {
    validators: zodClient(loginSchema),
    onError: () => toast.error(i18n()),
    onUpdated: ({ form: f }) => {
      if (f.valid) toast.success(`Logged in as ${f.data.email}!`);
      else toast.error(i18n(f.message));
    },
  });

  const { enhance, form, submitting } = sf;
</script>

<div class="flex flex-col gap-6">
  <Card.Root>
    <form method="POST" action={actions.login} use:enhance novalidate>
      <Card.Header class="text-center mb-6">
        <Card.Title class="text-xl">Welcome back</Card.Title>
        <Card.Description>Login with your Github account</Card.Description>
      </Card.Header>
      <Card.Content class="flex flex-col gap-4">
        <Button onclick={() => signIn("github")} variant="outline" class="w-full">
          <GithubIcon /> Login with Github
        </Button>
        <div
          class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
        >
          <span class="bg-card text-muted-foreground relative z-10 px-2">Or</span>
        </div>
        <div class="grid gap-2">
          <Form.Field form={sf} name="email">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Email</Form.Label>
                <Input {...props} type="email" bind:value={$form.email} />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
          <Form.Field form={sf} name="password">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Password</Form.Label>
                <Input {...props} type="password" bind:value={$form.password} />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </Card.Content>
      <Card.Footer>
        <Form.Button class="w-full" disabled={$submitting}>Login</Form.Button>
      </Card.Footer>
    </form>
  </Card.Root>
</div>
<Toaster />
