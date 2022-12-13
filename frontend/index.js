const postsList = document.querySelector('.posts-list');
const showPosts = document.querySelector('.showPosts');

postsList.style.display = 'none';

showPosts.addEventListener('click', () => {
    if (showPosts.innerHTML == 'Показать все посты') { 
        fetch('http://localhost:4444/posts')
            .then(response => response.json())
            .then(data => {
                for (let item of data) {
                    postsList.appendChild(createPost(
                        item.title, item.text, item.createdAt, item.updatedAt, item.viewCount, item.tags
                    ));
                }
            });
        postsList.style.display = 'block';
        showPosts.innerHTML = 'Скрыть посты';
    } else {
        postsList.style.display = 'none';
        showPosts.innerHTML = 'Показать все посты';
    }
});

function createPost(title, text, createdAt, updatedAt, views, tags) {
    let li = document.createElement('li');
    li.setAttribute('class', 'post-item');
    li.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
        <p class="description">Создано: ${createdAt}</p>
        <p class="description">Обновлено: ${updatedAt}</p>
        <p class="description">Просморов: ${views}</p>
        <p class="tags">Тэги: ${tags[0]}, ${tags[1]}</p>
    `;
    return li;
};

