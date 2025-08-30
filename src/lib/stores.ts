import { writable } from "svelte/store";

export type Theme = "light" | "dark" | "auto";

const storedTheme =
  typeof localStorage !== "undefined"
    ? (localStorage.getItem("theme") as Theme)
    : null;

export const theme = writable<Theme>(storedTheme ?? "auto");

theme.subscribe((value) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("theme", value);
  }

  const isDark =
    value === "dark" ||
    (value === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
});
