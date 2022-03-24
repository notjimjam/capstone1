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
           
            title.innerText = item.title
            // http://localhost:4003/post?id=544
            // const parsedUrl = new URL(window.location.href);
            // const id = parsedUrl.searchParams.get("id")
            postFeed.appendChild(post)

            window.location.search // ?id=544
        })
    }) 
    .catch(err => console.log(err))
}


loadPosts()