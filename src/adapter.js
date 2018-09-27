class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  get(path) {
    return fetch(path).then(res => res.json())
  }

  getQuotes() {
    return this.get(this.baseURL)
  }

  createQuote(data) {
    return fetch((this.baseURL), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

   addLikes(quoteId, data) {
    return fetch((this.baseURL + `/${quoteId}`), {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  deleteLike(quoteId) {
   return fetch((this.baseURL + `/${quoteId}`), {
     method: "DELETE"
   }).then(res => res.json())
 }


}
