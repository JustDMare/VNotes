import type { Block } from "vnotes-types";
import { watch, onMounted, type Ref } from "vue";

export function useRenderBlockContent(block: Block, blockHTMLContent: Ref<HTMLElement | null>) {
  watch(
    () => block.content,
    (storeBlockContents) => {
      if (blockHTMLContent.value?.innerText !== storeBlockContents) {
        parseBlockContentAndRenderNodes();
      }
    }
  );
  onMounted(() => {
    parseBlockContentAndRenderNodes();
  });
  //DOCUMENTAR Y MENCIONAR EN LA DOCOUMENTACION COMO SE HA TRABAJADO CON LOS NODOS PARA
  //QUE SE PUEDA MOVER EL FOCO DE UN BLOQUE A OTRO. MENCIONAR QUE SE HA HECHO ASI YA QUE
  //EL BEHAVIOUR POR DEFECTO ES QUE SE RENDERICE TODO EN UN MISMO NODO COSA QUE
  //DIFICULTABA MOVER EL FOCO YA QUE SHIFT + ENTER HACIA QUE LOS BLOCKS SE RENDERIZASEN DE
  //MANERA DIFERENTE A COMO SE RENDERIZABAN AL VENIR DE LA BASE DE DATOS.
  function parseBlockContentAndRenderNodes() {
    const contentToParse = block.content;

    if (contentToParse === "") {
      return;
    }

    if (blockHTMLContent.value) {
      blockHTMLContent.value.innerHTML = ""; // Clear the HTML to trigger the re-render.
      const contentForTextNodes = contentToParse.split("\n");
      createBlockTextNodes(contentForTextNodes);
    }
  }

  //Documentar
  function createBlockTextNodes(contentForTextNodes: string[]) {
    contentForTextNodes.forEach((nodeContent, index) => {
      if (blockHTMLContent.value === null) {
        return;
      }
      nodeContent = removeRepeatedZeroWidthCharInNode(nodeContent);
      nodeContent = removeLeadingZeroWidthSpaceInNonEmptyNode(nodeContent);

      const textNode = document.createTextNode(nodeContent);
      blockHTMLContent.value.appendChild(textNode);
      if (index < contentForTextNodes.length - 1) {
        const lineBreakNode = document.createTextNode("\n");
        blockHTMLContent.value.append(lineBreakNode);
      }
    });
  }

  //Documentar
  function removeRepeatedZeroWidthCharInNode(nodeContent: string) {
    if (nodeContent.includes("\u200B")) {
      const firstZeroWidthCharIndex = 0; //Only the first one is not deleted
      nodeContent = nodeContent.replace(/\u200B/g, (emptyChar, index) =>
        index === firstZeroWidthCharIndex ? emptyChar : ""
      );
    }
    return nodeContent;
  }
  function removeLeadingZeroWidthSpaceInNonEmptyNode(nodeContent: string) {
    if (nodeContent !== "\u200B" && nodeContent.startsWith("\u200B")) {
      nodeContent = nodeContent.slice(1);
    }
    return nodeContent;
  }
}
