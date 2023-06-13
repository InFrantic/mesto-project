///servak

export const config = {
  basicUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "826428a0-055f-4d25-b211-48bad9e30bcd",
    "content-type": "application/json",
  },
};

function onResponse(res) {
  return res.ok
    ? res.json()
    : res.json().then((data) => Promise.reject(`Ошибка${data.status}`));
}

export function getAllData() {
  return Promise.all([userData(), getAllCards()]);
}

export function userData() {
  return fetch(`${config.basicUrl}/users/me`, {
    headers: config.headers,
  }).then(onResponse);
}

export function getAllCards() {
  return fetch(`${config.basicUrl}/cards`, {
    headers: config.headers,
  }).then(onResponse);
}

export function editUserProfile(nameInput, jobInput) {
  return fetch(`${config.basicUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then(onResponse);
}

export function addCard(data) {
  return fetch(`${config.basicUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(onResponse);
}

export function deleteCard(data) {
  return fetch(`${config.basicUrl}/cards/${data}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(onResponse);
}

export function changelikeStatus(data, isLike) {
  return fetch(`${config.basicUrl}/cards/likes/${data}`, {
    method: isLike ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(onResponse);
}

export function changeAvatar(profileAvatar) {
  return fetch(`${config.basicUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar.value,
    }),
  }).then(onResponse);
}
