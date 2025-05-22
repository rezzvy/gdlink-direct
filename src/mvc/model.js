export default class Model {
  constructor() {
    this.value = ""; // Stores the current input from textarea
  }

  // Extracts the Google Drive file ID from a URL
  extractDriveFileId(url) {
    const match = url.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
    return match ? match[1] : null;
  }

  // Checks how many valid Google Drive links are in the input
  checkInput(value = this.value) {
    const vals = value.split("\n");
    let status = { isReady: false, length: 0 };

    if (vals) {
      vals.forEach((val) => {
        if (!this.extractDriveFileId(val)) return;
        status.length += 1;
      });

      status.isReady = status.length !== 0;
    }

    return status;
  }

  // Converts Google Drive links to direct and preview links
  generateLinks(value = this.value) {
    const vals = value.split("\n");
    let directLinks = "";
    let previewLinks = "";

    if (vals) {
      vals.forEach((val) => {
        const fileID = this.extractDriveFileId(val);
        if (!fileID) return;

        directLinks += `https://drive.google.com/uc?export=download&id=${fileID}\n`;
        previewLinks += `https://lh3.googleusercontent.com/d/${fileID}\n`;
      });
    }

    return { directLinks, previewLinks };
  }
}
