const SERVER = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001';
const HEADERS = { headers: {
  'Authorization': 'Lorem ipsum',
  'Content-Type': 'application/json',
  Accept: 'application/json'}
};

// This method retrieves the list of posts (by category if not empty).
export const loadPosts = (category = '') => {
  const url = category === '' ?
    `${SERVER}/posts` :
    `${SERVER}/:${category}/posts`;

  return fetch(url, HEADERS)
    .then(checkStatus)
    .then(res => (res.ok ? res.json() : []))
    .catch(() => []);
}

// This method retrieved the list of categories.
export const loadCategories = () => {
  const url = `${SERVER}/categories`;

  return fetch(url, HEADERS)
    .then(checkStatus)
    .then(res => (res.ok ? res.json() : []))
    .catch(() => []);
}

// This method updates a post
export const updatePost = (postId, updatedFields) => {
  const url = `${SERVER}/posts/${postId}`;

  return fetch(url, {...HEADERS, method: 'put', body: JSON.stringify(updatedFields)})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method deletes a post
export const deletePost = postId => {
  const url = `${SERVER}/posts/${postId}`;

  return fetch(url, {...HEADERS, method: 'delete'})
    .then(checkStatus)
    .catch(error => console.log(error));
}

// This method loads the comments  a post
export const loadComments = postId => {
  const url = `${SERVER}/posts/${postId}/comments`;

  return fetch(url, HEADERS)
  .then(checkStatus)
  .then(res => (res.ok ? res.json() : []))
  .catch(() => []);
}

// This method handles response status
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
