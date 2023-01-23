import type { Block } from "vnotes-types";
import { watch, onMounted, type Ref } from "vue";

export function useBlockRenderContent(
  block: Block,
  blockHTMLContent: Ref<HTMLElement | null>
) {
  //TODO: Documentar que este watch comprueba los cambios que
  //puedan venir de la store central para sustituir los datos actuales por los heredados
  // Sirve como failsafe para guardar los datos previos en caso de error.
  /*TODO: Mencionarlo en la documentacion y en la presentacion. Mencionar tambien que se
   debe a que la prop, al ser un objeto y Vue no es capaz de impedir que se cambien sus
   propiedades (ni lanzar warnings), se debe usar un atributo no reactivo para guardar el
   estado inicial y compararlo con el actual. Ademas, si fuese reactivo, el problema seria
   que al cambiar el estado inicial, el componente se renderiza otra vez, lo que hace que
   se resetee el foco del input al principio de la linea. 
   */
  watch(
    () => block.content,
    (storeBlockContents) => {
      if (blockHTMLContent.value?.innerText !== storeBlockContents) {
        parseBlockContent();
      }
    }
  );
  onMounted(() => {
    parseBlockContent();
  });
  //DOCUMENTAR Y MENCIONAR EN LA DOCOUMENTACION COMO SE HA TRABAJADO CON LOS NODOS PARA
  //QUE SE PUEDA MOVER EL FOCO DE UN BLOQUE A OTRO. MENCIONAR QUE SE HA HECHO ASI YA QUE
  //EL BEHAVIOUR POR DEFECTO ES QUE SE RENDERICE TODO EN UN MISMO NODO COSA QUE
  //DIFICULTABA MOVER EL FOCO YA QUE SHIFT + ENTER HACIA QUE LOS BLOCKS SE RENDERIZASEN DE
  //MANERA DIFERENTE A COMO SE RENDERIZABAN AL VENIR DE LA BASE DE DATOS.
  function parseBlockContent() {
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

  // Helper functions

  //Documentar
  function createBlockTextNodes(contentForTextNodes: string[]) {
    contentForTextNodes.forEach((nodeContent, index) => {
      if (blockHTMLContent.value === null) {
        return;
      }
      removeRepeatedEmptyCharInNode(nodeContent);

      const textNode = document.createTextNode(nodeContent);
      blockHTMLContent.value.appendChild(textNode);
      if (index < contentForTextNodes.length - 1) {
        const lineBreakNode = document.createTextNode("\n");
        blockHTMLContent.value.append(lineBreakNode);
      }
    });
  }

  //Documentar
  function removeRepeatedEmptyCharInNode(nodeContent: string) {
    if (nodeContent.includes("\u200B")) {
      const firstEmptyCharIndex = nodeContent.indexOf("\u200B");
      nodeContent = nodeContent.replace(/\u200B/g, (emptyChar, index) =>
        index === firstEmptyCharIndex ? emptyChar : ""
      );
      if (nodeContent !== "\u200B") {
        nodeContent = nodeContent.replace(/\u200B/g, "");
      }
    }
  }
}
