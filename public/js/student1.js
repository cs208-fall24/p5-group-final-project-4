/**
 * @author: Hector Mendez-Garcia
 * @date: 11/22/2024 3:43 PM
 * @description: Handles comment functionality for the Egyptology program website
 * 
 * @version 1.0
 */

/** Array to store all comments */
let comments = [];

/** Counter for generating unique comment IDs */
let nextId = 1;

/**
 * Adds a new comment to the comments array
 * @param {Event} event - The form submission event
 * @listens submit
 */
function addComment(event) {
    event.preventDefault();
    
    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');
    
    const newComment = {
        id: nextId++,
        author: authorInput.value,
        content: contentInput.value,
        timestamp: new Date()
    };
    
    comments.push(newComment);
    updateCommentsList();
    
    // Reset form
    authorInput.value = '';
    contentInput.value = '';
}

/**
 * Deletes a comment from the comments array
 * @param {number} id - ID of the comment to delete
 */
function deleteComment(id) {
    comments = comments.filter(comment => comment.id !== id);
    updateCommentsList();
}

/**
 * Displays the edit modal for a specific comment
 * @param {number} id - ID of the comment to edit
 */
function editComment(id) {
    const comment = comments.find(c => c.id === id);
    if (!comment) return;
    
    const modal = document.getElementById('edit-modal');
    const editId = document.getElementById('edit-id');
    const editAuthor = document.getElementById('edit-author');
    const editContent = document.getElementById('edit-content');
    
    editId.value = comment.id;
    editAuthor.value = comment.author;
    editContent.value = comment.content;
    
    modal.style.display = 'block';
}

/**
 * Saves changes to an edited comment
 * @param {Event} event - The form submission event
 * @listens submit
 */
function saveEditedComment(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('edit-id').value);
    const author = document.getElementById('edit-author').value;
    const content = document.getElementById('edit-content').value;
    
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex !== -1) {
        comments[commentIndex] = {
            ...comments[commentIndex],
            author,
            content
        };
    }
    
    closeModal();
    updateCommentsList();
}

/**
 * Closes the edit modal
 */
function closeModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'none';
}

/**
 * Updates the comments display in the DOM
 * Handles both the main comments list and random comments on index page
 */
function updateCommentsList() {
    const commentsList = document.getElementById('comments-list');
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<li>No comments yet!</li>';
        return;
    }
    
    const commentsHTML = comments.map(comment => `
        <li class="comment-item" data-id="${comment.id}">
            <p class="comment-author">${comment.author}</p>
            <p class="comment-text">${comment.content}</p>
            <div class="comment-actions">
                <button class="edit-btn" onclick="editComment(${comment.id})">Edit</button>
                <button class="delete-btn" onclick="deleteComment(${comment.id})">Delete</button>
            </div>
        </li>
    `).join('');
    
    commentsList.innerHTML = commentsHTML;
    
    // Update the index page comments if it exists
    const indexCommentsList = document.querySelector('#index-comments-list');
    if (indexCommentsList) {
        const randomComments = [...comments]
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);
            
        indexCommentsList.innerHTML = randomComments.map(comment => `
            <li>
                <p><strong>${comment.author}:</strong> ${comment.content}</p>
            </li>
        `).join('');
    }
}

/**
 * Initializes the page interactivity once the DOM is fully loaded
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const editForm = document.getElementById('edit-form');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    if (commentForm) {
        commentForm.addEventListener('submit', addComment);
    }
    
    if (editForm) {
        editForm.addEventListener('submit', saveEditedComment);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Initial render
    updateCommentsList();
});

