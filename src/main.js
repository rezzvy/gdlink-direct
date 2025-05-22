const linksTextAreaElement = document.querySelector("#links-textarea");
const directTextAreaElement = document.querySelector("#direct-links-textarea");
const previewLinkTextAreaElement = document.querySelector("#preview-links-textarea");
const generateLinkButton = document.querySelector("#generate-link-button");

const detectedLinkCount = document.querySelector("#detected-link-count");

function extractDriveFileId(url) {
  const match = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
  return match ? match[1] : null;
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
});

generateLinkButton.addEventListener("click", (e) => {
  const links = linksTextAreaElement.value.split("\n");

  let directLinks = "";
  let previewLinks = "";

  links.forEach((link) => {
    const fileID = extractDriveFileId(link);
    if (!fileID) return;

    directLinks += `https://drive.google.com/uc?export=download&id=${fileID}\n`;
    previewLinks += `https://lh3.googleusercontent.com/d/${fileID}}\n`;
  });

  directTextAreaElement.value = directLinks;
  previewLinkTextAreaElement.value = previewLinks;
});
