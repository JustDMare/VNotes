<script lang="ts" setup>
import getCommandList from "@/commands/command-list";
import type { PaletteCommand } from "@/commands/interfaces";
import { useEditorStore } from "@/stores/editor";
import { computed, ref, shallowRef, watch } from "vue";
import { matchSorter } from "match-sorter";

const editorStore = useEditorStore();

const emit = defineEmits(["commandListChanged"]);
const props = defineProps({
  showCommandPalette: { type: Boolean, required: true },
});

const commands = shallowRef<PaletteCommand[]>(getCommandList());
const blockContentBeforeCommand = ref("");
const searchTerm = ref("");
const highlightedCommandIndex = ref(0);

//TODO: Bug: If the new type of block is the same as the previous one, doesn't delete the
//search term. It should delete it. (Add to testing findings?)
function executeCommand(command: PaletteCommand) {
  command.execute();
  if (editorStore.blockOpeningCommandPalette) {
    editorStore.blockOpeningCommandPalette.content = blockContentBeforeCommand.value;
  }
  editorStore.setCommandPaletteOpen(false);
}

const filteredCommands = computed(() => {
  if (searchTerm.value === "") {
    return commands.value;
  }
  return matchSorter(commands.value, searchTerm.value, {
    keys: ["name", "tag", "description"],
  });
});

function handleSpecialKeys(event: KeyboardEvent) {
  if (event.code === "Escape" || event.code === "Tab") {
    editorStore.setCommandPaletteOpen(false);
  }
  if (event.code === "Space" && !filteredCommands.value.length) {
    editorStore.setCommandPaletteOpen(false);
  }
  if (event.code === "Enter") {
    event.preventDefault();
    if (filteredCommands.value.length) {
      executeCommand(filteredCommands.value[highlightedCommandIndex.value]);
    }
  }
  if (event.code === "Backspace" && searchTerm.value === "") {
    editorStore.setCommandPaletteOpen(false);
  }
  if (event.code === "ArrowDown" || event.code === "ArrowUp") {
    handleArrowKeys(event);
  }
}
function handleArrowKeys(event: KeyboardEvent) {
  if (event.code === "ArrowDown") {
    event.preventDefault();
    if (filteredCommands.value.length > highlightedCommandIndex.value + 1) {
      highlightedCommandIndex.value++;
    }
  }
  if (event.code === "ArrowUp") {
    event.preventDefault();
    if (highlightedCommandIndex.value > 0) {
      highlightedCommandIndex.value--;
    }
  }
  document.querySelector(".selected")?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}
/*TODO: Document. Mention that it doesn't support more complex interactions like
 * copy/paste, adding or removing chars in the middle of the term, etc. It does support
 * selecting from the end (like with shift + left arrow) to delete multiple chars.
 * Checking all interactions adds too much complexity and it's not worth it. Also, doesn't
 * support "Delete" key. Once again, too much complexity to be worth it.
 */
function handleKeypress(event: KeyboardEvent) {
  const elements = Array.from(document.getElementsByClassName("cmd-palette__command"));
  if (elements.length) {
    elements.forEach((element) => {
      (element as HTMLElement).style.pointerEvents = "none";
    });
  }

  if (event.key.length === 1 && event.key !== "/") {
    searchTerm.value += event.key;
  }
  if (event.code === "Backspace") {
    handleBackspace();
  }
  function handleBackspace() {
    let numberOfCharsToDelete = 1;
    const selection = window.getSelection();
    if (selection && selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      if (range.startOffset !== range.endOffset) {
        numberOfCharsToDelete = range.endOffset - range.startOffset;
      }
    }
    searchTerm.value = searchTerm.value.slice(0, -numberOfCharsToDelete);
  }
}

function handleMouseRegainedControl() {
  const elements = Array.from(document.getElementsByClassName("cmd-palette__command"));
  if (elements.length) {
    elements.forEach((element) => {
      (element as HTMLElement).style.pointerEvents = "auto";
    });
  }
}
function onShowingCommandList() {
  document.addEventListener("keydown", handleSpecialKeys);
  document.addEventListener("keydown", handleKeypress);
  document.addEventListener("mousemove", handleMouseRegainedControl);
  document.addEventListener("mousedown", handleMouseRegainedControl);
  if (editorStore.blockOpeningCommandPalette) {
    blockContentBeforeCommand.value = editorStore.blockOpeningCommandPalette.content;
  }
}
function onHidingCommandList() {
  document.removeEventListener("keydown", handleSpecialKeys);
  document.removeEventListener("keydown", handleKeypress);
  document.removeEventListener("mousemove", handleMouseRegainedControl);
  document.removeEventListener("mousedown", handleMouseRegainedControl);
  searchTerm.value = "";
  blockContentBeforeCommand.value = "";
  commands.value = getCommandList();
}

watch(
  () => props.showCommandPalette,
  (showCommandPalette) => {
    if (showCommandPalette) {
      onShowingCommandList();
    }
    if (!showCommandPalette) {
      onHidingCommandList();
    }
  }
);
watch(
  () => filteredCommands.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      highlightedCommandIndex.value = 0;
      emit("commandListChanged");
    }
  }
);
</script>

<template>
  <div v-if="filteredCommands.length">
    <div v-for="(command, index) in filteredCommands" :key="command.name">
      <button
        @click="executeCommand(command)"
        :title="command.description"
        class="cmd-palette__command"
        :class="{ selected: index === highlightedCommandIndex }"
        @mouseover="highlightedCommandIndex = index"
      >
        <component :is="command.icon" />
        <span class="cmd-palette__command__name">{{ command.name }}</span>
      </button>
    </div>
  </div>
  <div v-else>
    <p class="cmd-palette__no-command">
      {{ $t("commandPalette.noCommands") }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.cmd-palette__command {
  display: flex;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 0.5rem;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
  &.selected,
  &:hover {
    background-color: var(--color-base-80);
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
  &__name {
    font-size: 0.875rem;
  }
}
.cmd-palette__no-command {
  font-size: 0.875rem;
  color: var(--color-base-30);
  padding: 4px;
}
</style>
