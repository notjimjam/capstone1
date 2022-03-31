const postFeed = document.querySelector('.post-feed')
const template = document.querySelector("#post")



function clearFeed() {
    postFeed.innerHTML = ''
}

function loadPosts() {
    clearFeed()

    fetch('/posts')
    .then(res => {
        return res.json()

    }) .then(dataArr => {
        console.log(dataArr)
        
        dataArr.forEach(item => {
            const post = template.content.cloneNode(true)
            const title = post.querySelector(".title")
            const postLink = post.querySelector('.post-link') 
            const postImage = post.querySelector('.home-image')


            postLink.href =`/public/post?id=${item.id}`
           
            title.innerText = item.title
            postImage.src = item.image

            postFeed.appendChild(post)
        })
    }) 
    .catch(err => console.log(err))
}


loadPosts()