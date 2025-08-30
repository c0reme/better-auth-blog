<script lang="ts" module>
  function i18n(code?: Message) {
    if (code === "BAD_REQUEST") return "An error occurred. Please try again later.";
    if (code === "CONFLICT") return "You are already logged in.";
    return "An error occurred. Please try again later.";
  }
</script>

<script lang="ts">
  import type { Message, RegisterSchema } from "~/lib/schema";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as Card from "./ui/card";
  import * as Form from "./ui/form";
  import { Input } from "./ui/input";
  import { Button } from "./ui/button";
  import { Toaster } from "./ui/sonner";
  import { registerSchema } from "~/lib/schema";
  import { actions } from "astro:actions";
  import { toast } from "svelte-sonner";
  import { GithubIcon } from "@lucide/svelte";
  import { signIn } from "../auth-client";

  let { sv }: { sv: SuperValidated<RegisterSchema, Message> } = $props();

  const sf = superForm(sv, {
    validators: zodClient(registerSchema),
    onError: () => toast.error(i18n()),
    onUpdated: ({ form: f }) => {
      if (!f.valid) toast.error(i18n(f.message));
    },
  });

  const { enhance, form, submitting } = sf;
</script>

<div class="flex flex-col gap-6">
  <Card.Root>
    <form method="POST" action={actions.register} use:enhance novalidate>
      <Card.Header class="text-center mb-6">
        <Card.Title class="text-xl">Hello 👋</Card.Title>
        <Card.Description>Register with an email and password</Card.Description>
      </Card.Header>
      <Card.Content class="flex flex-col gap-4">
        <div class="grid gap-2">
          <Form.Field form={sf} name="name">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Name</Form.Label>
                <Input {...props} type="text" bind:value={$form.name} required />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
          <Form.Field form={sf} name="email">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Email</Form.Label>
                <Input {...props} type="email" bind:value={$form.email} required />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
          <Form.Field form={sf} name="password">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Password</Form.Label>
                <Input {...props} type="password" bind:value={$form.password} required />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
          <Form.Field form={sf} name="repassword">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Re-enter Password</Form.Label>
                <Input {...props} type="password" bind:value={$form.repassword} required />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
        <Form.Button class="w-full" disabled={$submitting}>Register</Form.Button>
        <div
          class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
        >
          <span class="bg-card text-muted-foreground relative z-10 px-2">Or</span>
        </div>
        <Button onclick={() => signIn("github")} variant="outline" class="w-full">
          <GithubIcon /> Login with Github
        </Button>
      </Card.Content>
    </form>
  </Card.Root>
</div>
<Toaster />
