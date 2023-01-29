import { useUserSpaceStore } from "@/stores/user-space";
import { useEditorStore } from "@/stores/editor";
import { createRouter as createVueRouter, createWebHistory, type Router } from "vue-router";
import MainView from "@/views/MainView.vue";
import LandingView from "@/views/LandingView.vue";
import type { App } from "vue";
import { createAuthGuard } from "@auth0/auth0-vue";

export function createRouter(app: App): Router {
  const router = createVueRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "landing",
        component: LandingView,
      },
      {
        path: "/workspace",
        name: "workspace",
        component: MainView,
      },
      {
        path: "/workspace/:id",
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
  router.beforeEach((to, from) => {
    if (to.name !== "landing") {
      const authPromise = createAuthGuard(app);
      Promise.resolve(authPromise(to));
      const userSpaceStore = useUserSpaceStore();
      userSpaceStore.fetchAllUserSpaceContent();
    }
  });
  return router;
}
