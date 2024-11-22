// Create a simple in-memory store for comments
let comments = [];
let nextId = 1;


// Function to add a new comment
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

// Function to delete a comment
function deleteComment(id) {
    comments = comments.filter(comment => comment.id !== id);
    updateCommentsList();
}

// Function to show edit modal
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

// Function to save edited comment
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

// Function to close modal
function closeModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'none';
}

// Function to update comments list in the DOM
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

// Event Listeners
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


