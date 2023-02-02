import type { Component } from "vue";

export interface PaletteCommand {
  icon: Component;
  name: string;
  execute: () => void;
  description: string;
  tag?: string;
}
