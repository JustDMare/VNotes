<script lang="ts" setup>
import getCommandList from "@/commands/command-list";
import type { Command } from "@/commands/interfaces";
import { useEditorStore } from "@/stores/editor";
import { computed, nextTick, ref, shallowRef, watch } from "vue";
import { matchSorter } from "match-sorter";

const editorStore = useEditorStore();

let { x, y } = { x: 0, y: 0 };
const showCommandPalette = ref(false);
const commands = shallowRef<Command[]>(getCommandList());
const blockContentBeforeCommand = ref("");
const searchTerm = ref("");

const cmdPalette = ref<HTMLElement | null>(null);

const MAX_HEIGHT = 200; //TODO: Improve this
const highlightedCommandIndex = ref(0);
const isPositionedOnTop = ref(false);

function executeCommand(command: Command) {
  command.execute();
  if (editorStore.blockOpeningCommandPalette) {
    editorStore.blockOpeningCommandPalette.content =
      blockContentBeforeCommand.value;
  }
  editorStore.setCommandPaletteOpen(false);
}
function getCommandPaletteHeight() {
  if (cmdPalette.value) {
    console.log(cmdPalette.value.getBoundingClientRect().height);
    return cmdPalette.value.getBoundingClientRect().height;
  }
  return 0;
}
const filteredCommands = computed(() => {
  if (searchTerm.value === "") {
    return commands.value;
  }
  return matchSorter(commands.value, searchTerm.value, {
    keys: ["name", "tag", "description"],
  });
});
//TODO: RESET SCROLL ON CREATION
//IMPROVE STYLING

//TODO: Document. Should improve to displace the dialog if it doesn't fit on the screen.
function getCommandPaletteCoordinates() {
  let { x, y } = { x: 0, y: 0 };
  let dialogHeight = MAX_HEIGHT;
  if (cmdPalette.value && cmdPalette.value.getBoundingClientRect().height > 0) {
    console.log("Rects" + cmdPalette.value.getBoundingClientRect().height);
    console.log("offset" + cmdPalette.value.offsetHeight);
    console.log("client" + cmdPalette.value.clientHeight);
    console.log("computed" + getCommandPaletteHeight());
    dialogHeight = cmdPalette.value.getBoundingClientRect().height;
  }
  console.log(dialogHeight);
  const selection = window.getSelection();
  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.left;
      if (
        rect.top + rect.height + dialogHeight > window.innerHeight ||
        isPositionedOnTop.value
      ) {
        isPositionedOnTop.value = true;
        y = rect.top - dialogHeight;
      } else {
        y = rect.top + rect.height;
      }
    } else {
      selection.collapseToStart();
      const element: HTMLElement = selection.focusNode as HTMLElement;
      x = element.getBoundingClientRect().left;
      const clientRectTop = element.getBoundingClientRect().top;
      const clientRectHeight = element.getBoundingClientRect().height;
      if (
        clientRectTop + clientRectHeight + dialogHeight > window.innerHeight ||
        isPositionedOnTop.value
      ) {
        isPositionedOnTop.value = true;
        y = clientRectTop - dialogHeight;
      } else {
        y = clientRectTop + clientRectHeight;
      }
    }
  }
  return { x, y };
}

function handleClickOutside(event: MouseEvent) {
  if (cmdPalette.value) {
    if (cmdPalette.value && !cmdPalette.value.contains(event.target as Node)) {
      editorStore.setCommandPaletteOpen(false);
    }
  }
}
function handleSpecialKeys(event: KeyboardEvent) {
  if (event.code === "Escape" || event.code === "Tab") {
    editorStore.setCommandPaletteOpen(false);
  }
  if (event.code === "Space" && !filteredCommands.value.length) {
    editorStore.setCommandPaletteOpen(false);
  }
  if (event.code === "ArrowDown") {
    if (filteredCommands.value.length > highlightedCommandIndex.value + 1) {
      highlightedCommandIndex.value++;
      document.querySelector(".selected")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      //TODO: Scroll to view
    }
  }
  if (event.code === "ArrowUp") {
    if (highlightedCommandIndex.value > 0) {
      highlightedCommandIndex.value--;
      document.querySelector(".selected")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }
  if (event.code === "Enter") {
    if (filteredCommands.value.length) {
      executeCommand(filteredCommands.value[highlightedCommandIndex.value]);
      editorStore.setCommandPaletteOpen(false);
    }
  }

  if (event.code === "Backspace" && searchTerm.value === "") {
    editorStore.setCommandPaletteOpen(false);
  }
}
/*TODO: Document. Mention that it doesn't support more complex interactions like copy/paste,
 * adding or removing chars in the middle of the term, etc.
 * It does support selecting from the end (like with shift + left arrow) to
 * delete multiple chars.
 * Checking all interactions adds too much complexity
 * and it's not worth it.
 * Also, doesn't support "Delete" key. Once again, too much complexity to be worth it.
 */
function handleKeypress(event: KeyboardEvent) {
  console.log(searchTerm.value);
  if (event.code === "Enter") {
    event.stopPropagation();
  }
  if (event.key.length === 1 && event.key !== "/") {
    searchTerm.value += event.key;
  }
  if (event.code === "Backspace") {
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
watch(
  () => filteredCommands.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      highlightedCommandIndex.value = 0;

      nextTick(() => {
        if (cmdPalette.value) {
          const { y } = getCommandPaletteCoordinates();
          console.log(y);
          cmdPalette.value.style.top = `${y}px`;
        }
      });

      //TODO: Scroll to start if needed
    }
  }
);

watch(
  () => cmdPalette.value?.clientHeight,
  (val) => {
    console.log("height" + val);
  },
  { immediate: true }
);

//TODO: Cleanup code (functions, files, etc.)
//TODO: Create the commands to be executed
watch(
  () => editorStore.commandPaletteOpen,
  (newVal: boolean, oldVal) => {
    if (newVal && newVal !== oldVal) {
      ({ x, y } = getCommandPaletteCoordinates());
      if (cmdPalette.value) {
        cmdPalette.value.style.left = `${x}px`;
        cmdPalette.value.style.top = `${y}px`;
      }
      if (editorStore.blockOpeningCommandPalette) {
        blockContentBeforeCommand.value =
          editorStore.blockOpeningCommandPalette.content;
      }
      showCommandPalette.value = true;
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleSpecialKeys);
      document.addEventListener("keydown", handleKeypress);
    } else if (newVal === false && newVal !== oldVal) {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleSpecialKeys);
      document.removeEventListener("keydown", handleKeypress);
      showCommandPalette.value = false;
      searchTerm.value = "";
      blockContentBeforeCommand.value = "";
      commands.value = getCommandList();
      cmdPalette?.value?.scrollTo(0, 0);
      isPositionedOnTop.value = false;
    }
  }
);
</script>

<template>
  <dialog :open="showCommandPalette" ref="cmdPalette" class="cmd-palette">
    <div v-if="filteredCommands.length">
      <div v-for="(command, index) in filteredCommands" :key="command.name">
        <button
          @click="executeCommand(command)"
          :title="command.description"
          class="cmd-palette__command"
          :class="{ selected: index === highlightedCommandIndex }"
          @mouseenter="highlightedCommandIndex = index"
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
  </dialog>
</template>
//TODO: ANIMATION
<style lang="scss" scoped>
.cmd-palette {
  position: absolute;
  padding: 0.5rem;
  border-radius: 6px;
  max-height: 200px;
  width: 250px;
  overflow-y: auto;
  background-color: var(--color-base-100);
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 10;
  transition: all 0.2s ease-in-out;
  &__command {
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
  &__no-command {
    font-size: 0.875rem;
    color: var(--color-base-30);
    padding: 4px;
  }
}
</style>
