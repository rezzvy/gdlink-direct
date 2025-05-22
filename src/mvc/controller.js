export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Used to track copy feedback timeout
    this.directTimeout = null;
    this.previewTimeout = null;
  }

  init() {
    // Handle input change in the links textarea
    this.view.linksTextAreaElement.addEventListener("input", (e) => {
      this.model.value = e.target.value;
      const status = this.model.checkInput();

      // Enable/disable generate button based on input
      this.view.disableGenerateButton(e.target.value.length === 0);

      // Update count of detected links
      this.view.setDetectedLink(status.length);
    });

    // Handle click on generate button
    this.view.generateLinkButton.addEventListener("click", (e) => {
      const status = this.model.checkInput();
      const links = this.model.generateLinks();

      this.view.setOutput(links);
      this.view.disableCopyToClipboardButtons(!status.isReady);

      // Show alert if no valid links
      if (!status.isReady) {
        alert("No Google Drive link detected in the input. Please enter at least one valid Google Drive link.");
      }
    });

    // Handle copy button for direct links
    this.view.directLinksCopyButton.addEventListener("click", (e) => {
      this.copyToClipboard(this.view.directLinkTextAreaElement, e.currentTarget, this.directTimeout);
    });

    // Handle copy button for preview links
    this.view.previewLinksCopyButton.addEventListener("click", (e) => {
      this.copyToClipboard(this.view.previewLinkTextAreaElement, e.currentTarget, this.previewTimeout);
    });
  }

  // Copy text to clipboard with feedback
  copyToClipboard(textarea, button, timeout) {
    textarea.select();
    const copied = document.execCommand("copy");

    if (!copied) return alert("Failed to copy to the clipboard!");

    // Save original button content if not already saved
    if (!button.dataset.originalContent) button.dataset.originalContent = button.innerHTML;

    // Clear previous timeout
    if (timeout) clearTimeout(timeout);

    // Show feedback
    button.innerHTML = "Copied";

    // Reset button after 1 second
    timeout = setTimeout(() => {
      button.innerHTML = button.dataset.originalContent;
      timeout = null;
    }, 1000);
  }
}
