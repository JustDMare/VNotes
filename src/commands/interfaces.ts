import type { Component } from "vue";

export interface Command {
  icon: Component;
  name: string;
  execute: () => void;
  description: string;
  tag?: string;
}
