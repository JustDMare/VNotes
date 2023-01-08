import { useEditorStore } from "@/stores/editor";
import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainView,
    },
    {
      path: "/:id",
      name: "editor",
      component: MainView,
      beforeEnter(to) {
        const editorStore = useEditorStore();
        const noteId = <string>to.params.id;

        editorStore.fetchNote(noteId);
      },
    },
  ],
});

export default router;
