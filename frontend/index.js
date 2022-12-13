const postsList = document.querySelector('.posts-list');
const showPosts = document.querySelector('.showPosts');

postsList.style.display = 'none';

let posts = [];

fetch('http://localhost:4444/posts')
    .then(response => response.json())
    .then(data => {
        for (let item of data) {
            posts.push(item);
        }
    });

showPosts.addEventListener('click', () => {
    if (showPosts.innerHTML == 'Показать все посты') {
        for (let item of posts) {
            postsList.appendChild(createPost(
                item.title, item.text, item.createdAt, item.updatedAt, item.viewCount
            ));
        }
        postsList.style.display = 'block';
        showPosts.innerHTML = 'Скрыть посты';
        
    } else {
        postsList.style.display = 'none';
        showPosts.innerHTML = 'Показать все посты';
    }
});

function createPost(title, text, createdAt, updatedAt, views) {
    let li = document.createElement('li');
    li.setAttribute('class', 'post-item');
    li.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
        <p class="description">Создано: ${createdAt}</p>
        <p class="description">Обновлено: ${updatedAt}</p>
        <p class="description">Просморов: ${views}</p>
    `;
    return li;
};

