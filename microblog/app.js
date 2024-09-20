// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', loadFeed);{
    let likes=0;
    const likeButton=document.getElementById('likeBtn');
    const likeCount=document.getElementById('likesCount');

    likeButton.addEventListener('click', function () => {
        likes++;
        likeCount.TextContent='Like(${likes})';
    });
}

function createPost() {
    const content = document.getElementById('post-content').value;
    if (content.trim() === '') {
        alert("Post cannot be empty!");
        return;
    }

    const post = {
        content: content,
        timestamp: new Date().toLocaleString()
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

function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.textContent = `${post.content} (Posted on ${post.timestamp})`;
        feed.appendChild(postDiv);
        
    });
}
