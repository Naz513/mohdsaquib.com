// Initialize All the API Endpoints
let VIEWS_API = "https://yuyt8wuyrg.execute-api.us-east-1.amazonaws.com/test/views";
let BLOG_DATA_API = "https://yuyt8wuyrg.execute-api.us-east-1.amazonaws.com/test/blogcounts";
let SHARES_API = "https://yuyt8wuyrg.execute-api.us-east-1.amazonaws.com/test/shares";
let LIKES_API = "https://yuyt8wuyrg.execute-api.us-east-1.amazonaws.com/test/likes";

// Pulls in the Number of View Counts
fetch(VIEWS_API)
    .then(function (response) {
        return response.json()
    }).then(function (myJson) {
        console.log("Visitor Count: " + myJson.body.ViewsCount);
        document.querySelector('#visits').innerHTML = myJson.body.ViewsCount
    })

// Pulls in all the API Resources Data
fetch(BLOG_DATA_API)
    .then(function (response) {
        return response.json()
    }).then(function (myJson) {
        console.log("Visitor Count: " + myJson.body.ViewsCount);
        document.querySelector('#visits').innerHTML = myJson.body.ViewsCount
        console.log("Shares Count: " + myJson.body.Shares);
        document.querySelector('#shares').innerHTML = myJson.body.Shares
        console.log("Likes Count: " + myJson.body.Likes);
        document.querySelector('#likes').innerHTML = myJson.body.Likes
    })

// Increments Shares Count by 1 every click
// Limits Click to only 1 time
function shareFunction() {
    fetch(SHARES_API)
        .then(function (response) {
            return response.json()
        }).then(function (myJson) {
            console.log("Shares Count: " + myJson.body.Shares);
            document.querySelector('#shares').innerHTML = myJson.body.Shares
        })
};
document.getElementById('shareButton').addEventListener("click", function (event) {
    shareFunction();
}, { once: true });

// Increments Likes Count by 1 every click
// Limits Click to only 1 time
function likesFunction() {
    fetch(LIKES_API)
        .then(function (response) {
            return response.json()
        }).then(function (myJson) {
            console.log("Likes Count: " + myJson.body.Likes);
            document.querySelector('#likes').innerHTML = myJson.body.Likes
        })
};
document.getElementById('likesButton').addEventListener("click", function (event) {
    likesFunction();
}, { once: true });