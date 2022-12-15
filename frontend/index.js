const postsList = document.querySelector('.posts-list');
const showPosts = document.querySelector('.showPosts');
const paginationBlock = document.querySelector('.pagination-block');

postsList.style.display = 'none';

let posts = [];
fetch('http://localhost:4444/posts')
    .then(response => response.json())
    .then(data => {
        for (let item of data) {
            posts.push(item);
        }
        createPaginationButtons(posts.length);
        goToPage();
    });
    
showPosts.addEventListener('click', () => {
    if (showPosts.innerHTML == 'Показать все посты') {
        postsList.style.display = 'block';
        showPosts.innerHTML = 'Скрыть посты';
    } else {
        postsList.style.display = 'none';
        showPosts.innerHTML = 'Показать все посты';
    }
});

function createPost(title, text, createdAt, updatedAt) {
    let li = document.createElement('li');
    li.setAttribute('class', 'post-item');
    li.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
        <p class="description">Создано: ${createdAt}</p>
        <p class="description">Обновлено: ${updatedAt}</p>
    `;
    return li;
};

function createPaginationButtons(postsLength) {
    const pagesCount = Math.ceil(postsLength / 5);
    paginationBlock.innerHTML = '';
    for (let i = 1; i <= pagesCount; i++) {
        let item = document.createElement('button');
        item.setAttribute('class', 'pagination-item');
        item.setAttribute('value', i);
        item.innerHTML = i;
        paginationBlock.appendChild(item);
    }
  }

function showPostOnPage(start, end) {
    postsList.innerHTML = '';
    while (start < end) {
        postsList.appendChild(
            createPost(
                posts[start].title, posts[start].text, posts[start].createdAt, posts[start].updatedAt
            ));
        start++;
    }
}
  
function goToPage() {
    paginationBlock.addEventListener('click', (event) => {
        if (event.target.className == 'pagination-item') {
            const y = event.target.value;
            let start = 5 * (y - 1);
            let end = 5 * y;
            postsList.style.display = 'block';
            showPosts.innerHTML = 'Скрыть посты';
            showPostOnPage(start, end);
        }
    }) 
}