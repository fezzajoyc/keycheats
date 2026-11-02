import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KeyCheats — keyboard shortcut sheets",
    short_name: "KeyCheats",
    description:
      "Searchable, printable keyboard shortcut sheets for VS Code, macOS, Windows, Chrome and GitHub.",
    start_url: "/en",
    display: "standalone",
    background_color: "#16161a",
    theme_color: "#1e1b4b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
