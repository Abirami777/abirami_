let posts = JSON.parse(localStorage.getItem('posts')) || [];  // Load posts from Local Storage, or use an empty array
let currentUser = '';

// Function to save posts to Local Storage
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to render posts
function renderPosts() {
    let postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';  // Clear the container before rendering

    posts.forEach(post => {
        let postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.setAttribute('id', `post-${post.id}`);

        postDiv.innerHTML = `
            <p><strong>${post.author}:</strong> ${post.content}</p>
            <p><small>Posted on: ${post.timestamp}</small></p>
            <p>
        
                <span class="like-button" onclick="likePost(${post.id})"> <i class="fa fa-thumbs-up"></i></span> (<span id="like-count-${post.id}">${post.likes}</span>)
                 
                <span class="dislike-button" onclick="dislikePost(${post.id})"> <i class="fa fa-thumbs-down"></i></span> (<span id="dislike-count-${post.id}">${post.dislikes}</span>) </p>
<p><span class="comment-button" onclick="toggleComments(${post.id})"> <i class="fa fa-comment"></i></span> (<span id="comment-count-${post.id}">${post.comments.length}</span>)
            </p>
            <div class="comment-form">
                <input type="text" placeholder="Add a comment..." id="comment-input-${post.id}">
                <button onclick="addComment(${post.id})">Comment</button>
            </div>
            <ul class="comments" id="comments-${post.id}">
                ${post.comments.map(comment => `<li><strong>${comment.author}:</strong> ${comment.content}</li>`).join('')}
            </ul>
        
        
           <button class="delete-button" onclick="deletePost(${post.id})">Delete</button>  <!-- Delete button -->
        `;

        postsContainer.appendChild(postDiv);
    });
}

// Function to add a new post
function addPost() {
    let postContent = document.getElementById('newPostContent').value;
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];
    let newPost = {
        id: posts.length + 1,
        author: currentUser,
        content: postContent,
        likes: 0,
        dislikes: 0,
        comments: [],
        timestamp: new Date().toLocaleString(),
        image: ''
    };

    // If there's a file, read it as a data URL
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            newPost.image = e.target.result;  // Store the base64 image data
        posts.unshift(newPost);  // Add the new post at the beginning
        savePosts();  // Save posts to Local Storage
        renderPosts();  // Re-render the posts
        document.getElementById('newPostContent').value = '';  // Clear the input
            fileInput.value = '';  // Clear the file input
        };
        reader.readAsDataURL(file);  // Read the file
    } else {
        posts.unshift(newPost);  // Add the new post at the beginning if no file
        savePosts();  // Save posts to Local Storage
        renderPosts();  // Re-render the posts
        document.getElementById('newPostContent').value = '';  // Clear the input
        fileInput.value = '';  // Clear the file input
    }
}

// Function to like a post
function likePost(postId) {
    let post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        document.getElementById(`like-count-${postId}`).textContent = post.likes;
        savePosts();  // Save updated posts to Local Storage
    }
}

// Function to dislike a post
function dislikePost(postId) {
    let post = posts.find(p => p.id === postId);
    if (post) {
        post.dislikes += 1;
        document.getElementById(`dislike-count-${postId}`).textContent = post.dislikes;
        savePosts();  // Save updated posts to Local Storage
    }
}

// Function to toggle the visibility of comments
function toggleComments(postId) {
    let commentSection = document.getElementById(`comments-${postId}`);
    if (commentSection.style.display === 'none' || commentSection.style.display === '') {
        commentSection.style.display = 'block';
    } else {
        commentSection.style.display = 'none';
    }
}

// Function to add a comment to a post
function addComment(postId) {
    let commentInput = document.getElementById(`comment-input-${postId}`);
    let commentContent = commentInput.value.trim();
    if (commentContent) {
        let post = posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({author: currentUser, content: commentContent});
            savePosts();  // Save updated posts to Local Storage
            renderPosts();  // Re-render the posts to display the new comment
            commentInput.value = '';  // Clear the input
        }
    } else {
        alert('Please write a comment!');
    }
}

// Function to handle user login
function login() {
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();

    if (username && password) {
        currentUser = username;
        document.getElementById('loginMessage').textContent = `Logged in as ${username}`;
        document.getElementById('postSection').style.display = 'block';
        document.getElementById('username').style.display = 'none';
        document.getElementById('password').style.display = 'none';
        document.getElementById('loginButton').style.display = 'none';
    } else {
        alert('Please enter both username and password.');
    }
}
// Function to delete a post
function deletePost(postId) {
    // Confirm before deleting
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (confirmation) {
        // Find the index of the post to delete
        const postIndex = posts.findIndex(p => p.id === postId);
        
        if (postIndex !== -1) {
            posts.splice(postIndex, 1);  // Remove the post from the array
            savePosts();  // Save the updated posts to Local Storage
            renderPosts();  // Re-render the posts
        }
    }
}
// Attach event listener to the Login button
document.getElementById('loginButton').addEventListener('click', login);

// Attach event listener to the Post button
document.getElementById('postButton').addEventListener('click', addPost);

// Initial rendering of posts
renderPosts();
