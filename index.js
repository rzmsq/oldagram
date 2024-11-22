import { posts } from './fakeDB.js'

const postContainerEl = document.getElementById('post-container')
let postImgEl = null

let postsHTML = []

const getNumbersOnly = (str) => str.replace(/[^0-9]/g, '')

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
                    <img class="post-img" id="${postsHTML.length}" src="${post.post}" alt="post-img">
                    <div class="post-actions">
                        <img class="post-action" id="like-${postsHTML.length}" src="./img/like.svg" alt="like-icon">
                        <img class="post-action" src="./img/comment.svg" alt="comment-icon">
                        <img class="post-action" src="./img/share.svg" alt="send-icon">
                    </div>
                    <div class="post-likes">
                        <p class="post-likes-number" id="count-like-${postsHTML.length}"><strong>${post.likes}</strong></p>
                        <p class="post-likes-text"><strong> likes</strong></p>
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

function updateDB(ind, countLikes) {
    postsHTML[ind] = postContainerEl.children.item(ind).innerHTML
    posts[ind].likes = countLikes
}

const likePost = (el) => {
    const ind = parseInt(getNumbersOnly(el.getAttribute('id')))
    const postLikeEl = document.getElementById(`like-${ind}`);
    const postLikeCountEl = document.getElementById(`count-like-${ind}`);

    let totalLikes = postLikeCountEl.children.item(0)
    let likeImg = null

    if (!postLikeEl) {
        return
    } else {
        if (postLikeEl.getAttribute('src') === './img/like.svg') {
            likeImg = './img/like-red.svg'
            totalLikes.innerHTML++
        } else {
            likeImg = './img/like.svg'
            totalLikes.innerHTML--
        }
        postLikeEl.setAttribute('src', likeImg)
    }

    updateDB(ind, totalLikes.innerHTML)
}

function addListenLikes() {
    for (const element of postImgEl) {
        element.addEventListener('dblclick', () => likePost(element))
    }
    const foo = postContainerEl.getElementsByClassName('post-action')
    for (const element of foo) {
        if (element.getAttribute('src') === './img/like.svg') {
            element.addEventListener('click', () => likePost(element))
        }
    }
}