// Initialize the Share Page Links
let SHARE_RESUME_PAGE = 'https://mohdsaquib.com/content/projects/resumeproject.html';

// Copies the link to Clipboard
function copy() {
    var tempInput = document.createElement("input");
    tempInput.value = SHARE_RESUME_PAGE;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

document.querySelector("#shareButton").addEventListener("click", copy);