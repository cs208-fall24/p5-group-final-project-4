/**
 * @author Nate Weddle
 * @date 11/30/2024 6:44 PM
 * @description Handles comment functionality for the Harry Potterology website
 * 
 * @version 1.0
 */

//Array to store comments
let comments = [];

//ID to assign to each comment, will increment after each added comment
let idNum = 1;

/**
 * Adds a new comment to the comments array
 * @param {Event} event - The form submission event
 */
function addComment(event) {
    event.preventDefault();

    let author = document.getElementById("author");
    let content = document.getElementById("content");

    let newComment = {
        id: idNum,
        author: author,
        content: content,
        timestamp: new Date()
    }

    comments.push(newComment);
    idNum++;
}

/**
 * Updates the comment that the user edited on the comments page
 * @param {comment} comment - comment to be edited
 */
function editComment(comment) {
    let author = document.getElementById("editauthor");
    let content = document.getElementById("editcontent");

    let index = comments.indexOf(comment);

    comments[index] = {
        ...comments[index],
        author,
        content
    }
}

/**
 * Deletes the comment that the user selects on the comments page
 * @param {comment} comment - comment to be deleted
 */
function deleteComment(comment) {
    let index = comments.indexOf(comment);
    comments.splice(index, 1);
}
