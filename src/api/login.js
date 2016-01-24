import fetch from 'isomorphic-fetch';

export function login(username, password, guestToken) {
  return fetch(`/api/login`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      token: guestToken,
    }),
  })
  .then(response => {
    if (response.status >= 401) {
      throw new Error(response.body);
    }
    return response;
  });
}

export function getToken() {
  return localStorage.getItem('guest_token');
}

