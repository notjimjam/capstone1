const postPage = document.querySelector('.post-page')


function clearPost() {
    postPage.innerHTML = ''
}

function onePost() {
    clearPost()

    fetch(`http://localhost:4003/posts/${post_id}`)
    .then(res => {
        return res.json()

    }) .then(dataArr => {
        console.log(dataArr)

        dataArr.forEach(item => {
            const title = document.querySelector('.post-title')
            const description = document.querySelector('.post-desc')

            title.innerText = item.title
            description.innerText = item.description

            // http://localhost:4003/post?id=
            // const parsedUrl = new URL(window.location.href);
            // console.log(parsedUrl.searchParams.get("id")); // "123"

            
        })

    })
}

onePost()