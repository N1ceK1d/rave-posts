let user = {
    name: 'John',
    surname: 'Smith'
  };

let response = await fetch('http://localhost:4444/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(post)
  });