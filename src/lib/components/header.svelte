<script lang="ts">
  import * as DropdownMenu from "./ui/dropdown-menu";
  import * as Avatar from "./ui/avatar";
  import { Separator } from "./ui/separator";
  import { Button } from "./ui/button";
  import { signOut, useSession } from "~/lib/auth-client";
  import Logo from "~/assets/logo.svelte";
  import { Eclipse, LogOut, Moon, SearchIcon, Sun } from "@lucide/svelte";
  import { theme } from "~/lib/stores";

  const session = useSession();
  const { data } = session.value ?? { data: null };
</script>

<header class="bg-background sticky top-0 z-50 w-full">
  <div class="mx-auto max-w-screen-xl px-4">
    <div class="flex h-16 w-full items-center justify-between gap-2 **:data-[slot=separator]:h-4">
      <Button
        href="/"
        variant="ghost"
        size="icon"
        class="flex size-10 items-center justify-center rounded-md"
      >
        <Logo class="size-8" />
      </Button>
      <nav class="hidden items-center gap-0.5 *:font-semibold lg:flex">
        <Button href="/about" variant="ghost">About</Button>
        <Button href="/blogs" variant="ghost">Blogs</Button>
      </nav>
      <div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
        <Button variant="outline"><SearchIcon /></Button>
        <Separator orientation="vertical" />
        {#if data?.user}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar.Root class="mx-2">
                <Avatar.Image src={data.user.image} alt={data.user.name} />
                <Avatar.Fallback>{data.user.name.match(/\b(\w)/g)?.join("")}</Avatar.Fallback>
              </Avatar.Root>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <DropdownMenu.Item
                  onclick={() => signOut()}
                  variant="destructive"
                  class="flex items-center"
                >
                  <LogOut /> Logout
                </DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        {:else}
          <div class="flex items-center gap-2">
            <Button href="/register" variant="secondary">Register</Button>
            <Button href="/login">Login</Button>
          </div>
        {/if}
        <Separator orientation="vertical" />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <Moon class="hidden dark:flex" />
              <Sun class="flex dark:hidden" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.RadioGroup
              bind:value={$theme}
              onValueChange={(value: any) => theme.set(value)}
            >
              <DropdownMenu.RadioItem value="light" class="flex items-center gap-2">
                <Sun /> Light
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="dark" class="flex items-center gap-2">
                <Moon /> Dark
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="auto" class="flex items-center gap-2">
                <Eclipse /> System
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </div>
</header>
