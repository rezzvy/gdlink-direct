const linksTextAreaElement = document.querySelector("#links-textarea");
const directTextAreaElement = document.querySelector("#direct-links-textarea");
const previewLinkTextAreaElement = document.querySelector("#preview-links-textarea");
const generateLinkButton = document.querySelector("#generate-link-button");

const directLinksCopyButton = document.querySelector("#direct-links-copy-button");
const previewLinksCopyButton = document.querySelector("#preview-links-copy-button");

const detectedLinkCount = document.querySelector("#detected-link-count");

let isLinkReady = false;

function extractDriveFileId(url) {
  const match = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
  return match ? match[1] : null;
}

function copyToClipboard(textarea, button, timeout) {
  textarea.select();
  const copied = document.execCommand("copy");

  if (!copied) {
    alert("Failed to copy to the clipboard!");
    return;
  }

  if (!button.dataset.originalContent) {
    button.dataset.originalContent = button.innerHTML;
  }

  button.innerHTML = "Copied";

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    button.innerHTML = button.dataset.originalContent;
    timeout = null;
  }, 1000);
}

linksTextAreaElement.addEventListener("input", (e) => {
  const vals = e.target.value.split("\n");
  let linkCount = 0;
  if (vals) {
    vals.forEach((val) => {
      if (extractDriveFileId(val)) {
        linkCount += 1;
      }
    });

    detectedLinkCount.textContent = linkCount;
  }

  isLinkReady = linkCount !== 0;
  generateLinkButton.disabled = e.target.value.length === 0;
});

generateLinkButton.addEventListener("click", (e) => {
  const links = linksTextAreaElement.value.split("\n");

  let directLinks = "";
  let previewLinks = "";

  links.forEach((link) => {
    const fileID = extractDriveFileId(link);
    if (!fileID) return;

    directLinks += `https://drive.google.com/uc?export=download&id=${fileID}\n`;
    previewLinks += `https://lh3.googleusercontent.com/d/${fileID}\n`;
  });

  directTextAreaElement.value = directLinks;
  previewLinkTextAreaElement.value = previewLinks;

  directLinksCopyButton.disabled = !isLinkReady;
  previewLinksCopyButton.disabled = !isLinkReady;

  if (!isLinkReady) {
    alert("No Google Drive link detected in the input. Please enter at least one valid Google Drive link.");
  }
});

let directLinksCopyTimeout;
let previewLinksCopyTimeout;

directLinksCopyButton.addEventListener("click", (e) => {
  copyToClipboard(directTextAreaElement, e.currentTarget, directLinksCopyTimeout);
});

previewLinksCopyButton.addEventListener("click", (e) => {
  copyToClipboard(previewLinkTextAreaElement, e.currentTarget, previewLinksCopyTimeout);
});
