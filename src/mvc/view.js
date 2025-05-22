export default class View {
  constructor() {
    // Get DOM elements
    this.linksTextAreaElement = document.querySelector("#links-textarea");
    this.directLinkTextAreaElement = document.querySelector("#direct-links-textarea");
    this.previewLinkTextAreaElement = document.querySelector("#preview-links-textarea");
    this.generateLinkButton = document.querySelector("#generate-link-button");
    this.directLinksCopyButton = document.querySelector("#direct-links-copy-button");
    this.previewLinksCopyButton = document.querySelector("#preview-links-copy-button");
    this.detectedLinkCount = document.querySelector("#detected-link-count");
  }

  // Enable or disable copy buttons
  disableCopyToClipboardButtons(bool) {
    this.directLinksCopyButton.disabled = bool;
    this.previewLinksCopyButton.disabled = bool;
  }

  // Enable or disable generate button
  disableGenerateButton(bool) {
    this.generateLinkButton.disabled = bool;
  }

  // Show how many valid links were detected
  setDetectedLink(val) {
    this.detectedLinkCount.textContent = val;
  }

  // Set the result text areas with generated links
  setOutput(links) {
    this.directLinkTextAreaElement.value = links.directLinks;
    this.previewLinkTextAreaElement.value = links.previewLinks;
  }
}
