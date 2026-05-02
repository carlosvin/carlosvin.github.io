"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const COLOR_SCHEME_STORAGE_KEY = "carlosvin-color-scheme";

export function ColorSchemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-mantine-color-scheme");
    setColorScheme(current === "dark" ? "dark" : "light");
    setIsMounted(true);
  }, []);

  const nextScheme = colorScheme === "dark" ? "light" : "dark";

  function onToggle() {
    document.documentElement.setAttribute("data-mantine-color-scheme", nextScheme);
    window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, nextScheme);
    setColorScheme(nextScheme);
  }

  if (!isMounted) {
    return <ActionIcon variant="subtle" color="gray" size="lg" aria-hidden />;
  }

  return (
    <Tooltip label={`Switch to ${nextScheme} mode`}>
      <ActionIcon
        variant="subtle"
        color="gray"
        size="lg"
        aria-label="Toggle color scheme"
        onClick={onToggle}
      >
        {colorScheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </ActionIcon>
    </Tooltip>
  );
}
