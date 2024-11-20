import { posts } from './fakeDB.js'

const postContainerEl = document.getElementById('post-container')
let postImgEl = null

let postsHTML = []

const loadPosts = (event) => {
    const newPosts = posts;
    newPosts.forEach((post) => {
        postsHTML.push(
            `
            <div class="post" id="post-${postsHTML.length}">
                <header class="header-post">
                    <img class="post-avatar" src="${post.avatar}" alt="${post.username}-avatar">
                    <div class="post-info">
                        <h6 class="post-autor">${post.name}</h6>
                        <p class="post-location">${post.location}</p>
                    </div>
                </header>
                <main>
                    <img class="post-img" src="${post.post}" alt="post-img">
                    <div class="post-actions">
                        <img class="post-action" src="./img/like.svg" alt="like-icon">
                        <img class="post-action" src="./img/comment.svg" alt="comment-icon">
                        <img class="post-action" src="./img/share.svg" alt="send-icon">
                    </div>
                    <div class="post-likes">
                        <p class="post-likes-number"><strong>${post.likes} likes</strong></p>
                    </div>
                    <div class="post-description">
                        <p class="post-comment-text"><strong>${post.username}</strong> ${post.comment}</p>
                    </div>
                </main>
            </div>
            <hr>
            `
        )
    })
    postContainerEl.innerHTML = postsHTML.join('')
    postImgEl = postContainerEl.getElementsByClassName('post-img')
    addListenLikes()
}

window.addEventListener('load', loadPosts)

const likePost = () => {
    console.log("like")
}

function addListenLikes() {
    for (const element of postImgEl) {
        element.addEventListener('dblclick', likePost)
    }
}