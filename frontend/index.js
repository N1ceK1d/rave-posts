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
        const postsLength = Math.ceil(posts.length / 5);
        console.log(posts.length / 5);
        console.log(postsLength);
        createPaginationButtons(1, 10);
        let start = 1;
        let end = 10;
        paginationBlock.addEventListener('click', (event) => {
            if (event.target.value == '>') {
                start += postsLength % 10;
                end += postsLength % 10;
                if (end >= postsLength) {
                    start = 1;
                    end = 10;
                }
                console.log('>');
                console.log(`start: ${start} - end: ${end}`);
                createPaginationButtons(start, end);
            } else if (event.target.value == '<') {
                start -= postsLength % 10;
                end -= postsLength % 10;
                if (start <= 0) {
                    start = 1;
                    end = 10;
                }
                console.log('<');
                console.log(`start: ${start} - end: ${end}`);
                createPaginationButtons(start, end);
            } else if (event.target.value == '>>') {
                start += postsLength - 10;
                end = postsLength - 1;
                if (end >= postsLength) {
                    start = 1;
                    end = 10;
                }
                console.log(`start: ${start} - end: ${end}`);
                console.log('>>');
                createPaginationButtons(start, end);
            } else if (event.target.value == '<<') {
                start = 1;
                end = 10;
                if (start <= 0) {
                    start = 1;
                    end = 10;
                }
                console.log(`start: ${start} - end: ${end}`);
                console.log('>>');
                createPaginationButtons(start, end);
            }
        });
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

function createPost(title, text, createdAt, updatedAt, author) {
    let li = document.createElement('li');
    li.setAttribute('class', 'post-item');
    li.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
        <p class="description">Создано: ${createdAt}</p>
        <p class="description">Обновлено: ${updatedAt}</p>
        <p class="description">Автор: ${author}</p>
    `;
    return li;
};

function createPaginationButtons(start, end) {
    paginationBlock.innerHTML = '';
    paginationBlock.appendChild(createDirectionButton('<<'));
    paginationBlock.appendChild(createDirectionButton('<'));
    let i = start;
    while (i <= end) {
        let item = document.createElement('button');
        item.setAttribute('class', 'pagination-item');
        item.setAttribute('value', i);
        item.innerHTML = i;
        paginationBlock.appendChild(item);
        i++;
    }
    paginationBlock.appendChild(createDirectionButton('>'));
    paginationBlock.appendChild(createDirectionButton('>>'));
  }

function createDirectionButton(str) {
    let btn = document.createElement('button');
    btn.setAttribute('class', 'button direction-btn');
    btn.setAttribute('value', str);
    btn.innerHTML = str;
    return btn; 
};

function showPostOnPage(start, end) {
    postsList.innerHTML = '';
    while (start < end) {
        postsList.appendChild(
            createPost(
                posts[start].title, posts[start].text, posts[start].createdAt, posts[start].updatedAt, posts[start].author
            ));
        start++;
    }
};
  
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
};