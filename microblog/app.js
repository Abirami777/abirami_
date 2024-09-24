// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});

// Function to create a new post
function createPost() {
    const content = document.getElementById('post-content').value;
    if (content.trim() === '') {
        alert("Post cannot be empty!");
        return;
    }

    const post = {
        content: content,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: [] // Initialize comments as an array
    };

    // Save the post in localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear the textarea
    document.getElementById('post-content').value = '';

    // Reload the feed
    loadFeed();
}

// Function to load and display the feed
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `<p>${post.content} <small>(${post.timestamp})</small></p>`;

        // Like button
        const likeBtn = document.createElement('button');
        likeBtn.textContent = `Like (${post.likes})`;
        likeBtn.classList.add('like-btn');
        likeBtn.onclick = function() {
            post.likes++;
            updatePost(index, post);
        };
        postDiv.appendChild(likeBtn);

        // Comment section
        const commentsList = document.createElement('div');
        commentsList.classList.add('comments-list');
        post.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.textContent = comment;
            commentsList.appendChild(commentDiv);
        });

        const commentInput = document.createElement('input');
        commentInput.placeholder = 'Write a comment...';
        const submitCommentButton = document.createElement('button');
        submitCommentButton.textContent = 'Submit Comment';

        submitCommentButton.onclick = function() {
            const commentText = commentInput.value.trim();
            if (commentText) {
                post.comments.push(commentText);
                updatePost(index, post);
                loadFeed(); // Refresh feed to show the new comment
            }
        };

        postDiv.appendChild(commentsList);
        postDiv.appendChild(commentInput);
        postDiv.appendChild(submitCommentButton);
        feed.appendChild(postDiv);
    });
}

// Helper function to update a post in localStorage
function updatePost(index, updatedPost) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[index] = updatedPost;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadFeed(); // Reload the feed to reflect changes
}

