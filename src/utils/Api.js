class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._autorization = headers.authorization;
    this._contentType = headers['Content-Type'];
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._autorization
      }
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse)
  }

  giveUserInfo(name, info) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        about: info
      })
    })
      .then(this._checkResponse)
  }

  giveCardInfo(place, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: place,
        link: link
      })
    })
      .then(this._checkResponse)
  }

  changeLikeStatus(cardId, isLiked) {
    if(isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._autorization,
          'Content-Type': this._contentType
        }
      })
        .then(this._checkResponse)
    }
    else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._autorization,
          'Content-Type': this._contentType
        }
      })
        .then(this._checkResponse)
    }
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse)
  }

  giveAvatarInfo(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._autorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'a36e0e0d-a48a-4afd-9e5d-855c3e7f30f4',
    'Content-Type': 'application/json'
  }
});

export default api;