import type { Component } from "vue";

export interface NavigationItemOption {
  name: string;
  icon: Component;
  action: () => void;
}
