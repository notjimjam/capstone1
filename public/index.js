const postFeed = document.querySelector('.post-feed')
const template = document.querySelector("#post")

// function createNewPost() {
//     let postDiv = document.createElement('div')
//     postDiv.innerHTML =
// }

function clearFeed() {
    postFeed.innerHTML = ''
}

function loadPosts() {
    clearFeed()

    fetch('http://localhost:4003/posts')
    .then(res => {
        return res.json()

    }) .then(dataArr => {
        console.log(dataArr)
        
        dataArr.forEach(item => {
            const post = template.content.cloneNode(true)
            const title = post.querySelector(".title")
            const postLink = post.querySelector('.post-link') 


            postLink.href =`/public/post.html?id=${item.id}`
           
            title.innerText = item.title

            postFeed.appendChild(post)
        })
    }) 
    .catch(err => console.log(err))
}


loadPosts()