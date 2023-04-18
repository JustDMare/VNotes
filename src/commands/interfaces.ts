import type { Component } from "vue";

export interface BaseCommand {
  name: string;
  icon: Component;
  execute: Executor;
}
export type Executor = () => void;
