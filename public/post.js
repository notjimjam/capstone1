
const postPage = document.querySelector('.post-page')
const div = document.querySelector('.single-post')


function clearPost() {
    postPage.innerHTML = ''
}

function onePost() {
    clearPost()

    // http://localhost:4003/posts?id=
    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id")); // "123"
    const id = parsedUrl.searchParams.get("id")

    window.location.search // ?id=544

    fetch(`http://localhost:4003/posts/${id}`)
    .then(res => {
        return res.json()

    }) .then(dataArr => {
        console.log(dataArr)

        dataArr.forEach(item => {

            const postTitle = document.querySelector('.post-title')
            const postDescription = document.querySelector('.post-desc')

            postTitle.innerText = item.title
            postDescription.innerText = item.description
            postPage.appendChild(div)
            
        })

    })
    .catch(err => console.log(err))
}

onePost()