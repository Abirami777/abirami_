// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded',()=>
    {
    loadFeed();
    });
    

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
const likeBtn=document.createElement('button');
likeBtn.textContent=Like(${post.likes});
likeBtn.classList.add('like-btn');
likeBtn.onclick=function(){
    posts[index].likes++;
    localStorage.setItem('posts',JSON.stringify(posts));
    loadfeed();
};
    postDiv.appendChild(likeBtn);
    feed.appendChild(postDiv);
};
}
