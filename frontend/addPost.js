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
  fetch('http://localhost:4444/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      title: postTitle.value,
      text: postText.value,
    })
  });
  console.log({
    title: postTitle.value,
    text: postText.value,
  });
  hideForm();
});

function hideForm() {
  addPostForm.style.display = 'none';
  showPosts.disabled = false;
  addPost.disabled = false;
}

function showForm() {
  addPostForm.style.display = 'block';
  showPosts.disabled = true;
  addPost.disabled = true;
}