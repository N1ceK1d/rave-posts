const closeFormButton = document.querySelector('.close');
const addPostButton = document.querySelector('.add');
const addPostForm = document.querySelector('.add-post-form');
const addPost = document.querySelector('.addPost');

addPostForm.style.display = 'none';

const postTitle = document.querySelector('.post-title');
const postText = document.querySelector('.post-text');

closeFormButton.addEventListener('click', () => {
  hideForm();
});

addPost.addEventListener('click', () => {
  showForm();
  postsList.style.display = 'none';
  showPosts.innerHTML = 'Показать все посты';
});

addPostButton.addEventListener('click', () => {
  fetch('http://localhost:4444/posts', { // post-запрос на отправку данных, которые пользователь вводит
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      title: postTitle.value,
      text: postText.value,
    })
  })
  .then(response => response.json())
  .then(response => posts.push(response)); // добавляем результат запроса в массив
  hideForm();
});

function hideForm() { // скрывет форму создания поста
  addPostForm.style.display = 'none';
  showPosts.disabled = false;
  addPost.disabled = false;
}

function showForm() { // показывает форму создания поста
  addPostForm.style.display = 'block';
  showPosts.disabled = true;
  addPost.disabled = true;
}