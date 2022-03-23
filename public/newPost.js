const { default: axios } = require("axios")

function submitPost() {
    const newPost = document.querySelector('#new-post')
    
    const postData = {
        image: document.querySelector('#image').value,
        title: document.querySelector('#title').value,
        description: document.querySelector('#desc').value,

    }

    axios.post('/posts', postData)
    .then(res => console.log(res.data))
}