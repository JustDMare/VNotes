import type { Component } from "vue";

export interface BaseCommand {
  name: string;
  icon: Component;
  execute: Executor;
  dataTest: string;
}
export type Executor = () => void;
