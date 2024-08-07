'use strict';

const GET = 'GET';
const POST = 'POST';

/** Class implements AJAX requests. */
class Ajax {
  /**
   * Constructor for an ajax class.
   * @param {*} auth
   * @param {*} routes
   */
  initialize(auth, routes) {
    this.auth = auth;
    this.routes = routes;
  }

  /**
   * Make a POST request.
   * @param {URL} url - The request path.
   * @param {URLSearchParams} body - The request body.
   * @param {function} callback - The callback function.
   */
  async post(url, body, callback) {
    const init = {
      method: POST,
      mode: 'cors',
      credentials: 'include',
      cache: 'default',
      body: JSON.stringify(body),
    };

    await this.#ajax(url, callback, init);
  }

  /**
   * Make a POST request with multipart/form-data.
   * @param {URL} url - The request path.
   * @param {FormData} body - The request body.
   * @param {Function} callback - The callback function.
   */
  async postMultipart(url, body, callback) {
    const init = {
      method: POST,
      mode: 'cors',
      credentials: 'include',
      cache: 'default',
      body: body,
    };

    await this.#ajax(url, callback, init);
  }

  /**
   * Make a GET request.
   * @param {URL} url - The request path.
   * @param {function} callback - The callback function.
   * @param {string} params
   */
  async get(url, callback) {
    const init = {
      method: GET,
      mode: 'cors',
      credentials: 'include',
      cache: 'default',
    };

    await this.#ajax(url, callback, init);
  }

  /**
   * Make scheme of the AJAX request.
   * @param {URL} url - The relative request path.
   * @param {function} callback - The callback function.
   * @param {object} init - Options of the request.
   */
  async #ajax(url, callback, init) {
    await fetch(url, init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => callback(data))
      .catch((err) => console.log(err));
  }
}

export default new Ajax();
