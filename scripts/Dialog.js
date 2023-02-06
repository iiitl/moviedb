export default class Dialog {
  #dialogElement = null;
  #dialogContent = null;
  #isInDOM = null;

  /**
   * @param  {Document} document document instance
   * @param  {HTMLElement} htmlElement The HTML Element to embedded into the modal
   */
  constructor(document, htmlElement) {
    let dialogEl = document.createElement("dialog");
    let dialogCloseBtn = document.createElement("button");
    let dialogContent = document.createElement("div");
    dialogEl.classList.add("dialog");
    dialogCloseBtn.classList.add("dialog-close");
    dialogCloseBtn.innerHTML = "&times;";
    dialogCloseBtn.onclick = () => {
      dialogEl.close();

      // enable body scrolling as soon as the dialog closes
      enableBodyScroll();
    };
    dialogEl.appendChild(dialogCloseBtn);
    dialogEl.appendChild(dialogContent);
    dialogContent.appendChild(htmlElement);

    this.#dialogElement = dialogEl;
    this.#dialogContent = dialogContent;
    this.#isInDOM = false;
  }

  /**
   * @param  {HTMLElement} DOMNode The DOM element to append the dialog to
   */
  appendTo(DOMNode) {
    if (!this.#isInDOM) {
      DOMNode.appendChild(this.#dialogElement);
      this.#isInDOM = true;
    }
    return this;
  }

  /**
   * Returns the HTML Node of the dialog
   */
  getDialogNode() {
    return this.#dialogElement;
  }

  /**
   * Opens the dialog
   */
  showDialog() {
    if (!this.#dialogElement.open) this.#dialogElement.showModal();
  }

  /**
   * Closes the dialog
   */
  closeDialog() {
    if (this.#dialogElement.open) this.#dialogElement.close();
  }

  /**
   * Opens the dialog if its closed or closes it if its open
   */
  toggleDialog() {
    if (this.#dialogElement.open) this.#dialogElement.close();
    else this.#dialogElement.showModal();
    enableBodyScroll();

  }

  /**
   * @param  {HTMLElement} DOMNode
   */
  replaceContent(DOMNode) {
    // To clear all content in the dialog-content div
    this.#dialogContent.textContent = "";
    this.#dialogContent.appendChild(DOMNode);
    return this;
  }
}


// To enable body scrolling when the dialog box closes
function enableBodyScroll() {
  let bodyElement = document.querySelector('body');
  bodyElement.style.overflow = 'auto';
}