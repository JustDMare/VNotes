import type { BaseCommand } from "../interfaces";

export interface PaletteCommand extends BaseCommand {
  description: string;
  tag?: string;
}
