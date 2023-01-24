import { computed, type Ref } from "vue";

export function useIsContentEmpty(content: Ref<string>) {
  const isContentEmpty = computed(() => {
    if (content.value === "" || content.value === "\u200B" || content.value === "\n") {
      return true;
    }
    return false;
  });
  return isContentEmpty;
}
