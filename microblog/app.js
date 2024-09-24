// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', loadFeed);

// Function to create a new post
function createPost() {
    const content = document.getElementById('post-content').value.trim();
    if (!content) {
        alert("Post cannot be empty!");
        return;
    }

    const post = {
        content,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: []
    };

    // Save the post in localStorage
    const posts = getPosts();
    posts.push(post);
    savePosts(posts);

    // Clear the textarea
    document.getElementById('post-content').value = '';

    // Reload the feed
    loadFeed();
}

// Function to load and display the feed
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const posts = getPosts();

    posts.forEach((post, index) => {
        const postDiv = createPostElement(post, index);
        feed.appendChild(postDiv);
    });
}

// Helper function to create post element
function createPostElement(post, index) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `<p>${post.content} <small>(${post.timestamp})</small></p>`;

    const likeBtn = createButton(`Like (${post.likes})`, () => {
        post.likes++;
        updatePost(index, post);
    });
    postDiv.appendChild(likeBtn);

    const commentsList = createCommentsList(post.comments);
    postDiv.appendChild(commentsList);

    const commentInput = document.createElement('input');
    commentInput.placeholder = 'Write a comment...';

    const submitCommentButton = createButton('Submit Comment', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            post.comments.push(commentText);
            updatePost(index, post);
            loadFeed(); // Refresh feed to show the new comment
        }
    });

    postDiv.appendChild(commentInput);
    postDiv.appendChild(submitCommentButton);

    // Show/hide comments section
    const toggleCommentsButton = createButton('Show Comments', () => {
        const commentsSection = postDiv.querySelector('.comments-list');
        if (commentsSection.style.display === 'none' || !commentsSection.style.display) {
            commentsSection.style.display = 'block';
            toggleCommentsButton.textContent = 'Hide Comments';
        } else {
            commentsSection.style.display = 'none';
            toggleCommentsButton.textContent = 'Show Comments';
        }
    });
    postDiv.appendChild(toggleCommentsButton);
  

    return postDiv;
}

// Helper function to create comments list
function createCommentsList(comments) {
    const commentsList = document.createElement('div');
    commentsList.classList.add('comments-list');

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.textContent = comment;
        commentsList.appendChild(commentDiv);
    });

    return commentsList;
}

// Helper function to create a button
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

// Helper function to get posts from localStorage
function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

// Helper function to save posts to localStorage
function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Helper function to update a post in localStorage
function updatePost(index, updatedPost) {
    const posts = getPosts();
    posts[index] = updatedPost;
    savePosts(posts);
    loadFeed(); // Reload the feed to reflect changes
}
