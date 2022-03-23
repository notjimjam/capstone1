const postFeed = document.querySelector('#post-feed')

// function createNewPost() {
//     let postDiv = document.createElement('div')
//     postDiv.innerHTML =
// }

function clearFeed() {
    postFeed.innerHTML = ''
}

function loadPosts() {
    clearFeed()

    axios.get('/posts')
    .then(res => {
        const dataArr = res.data
        console.log(dataArr)

    }) .catch(err => console.log(err))
}

