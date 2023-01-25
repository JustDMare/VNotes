import { useEditorStore } from "@/stores/editor";
import { createRouter as createVueRouter, createWebHistory, type Router } from "vue-router";
import MainView from "@/views/MainView.vue";
import type { App } from "vue";

export function createRouter(app: App): Router {
  return createVueRouter({
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
}
