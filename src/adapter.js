class Adapter{
  constructor(baseURL){
    this.baseURL = baseURL
  }

  getQuotes(){
    return fetch(this.baseURL)
      .then(res => res.json())
  }

  postQuote(newQuoteData){
    return fetch(this.baseURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newQuoteData)
    }).then(res => res.json())
  }

  postLikes(likes, id){
    return fetch(`${this.baseURL}/${id}`,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PATCH",
    body: JSON.stringify({likes: likes})
    }).then(res => res.json())
      .then(json => {return json})
  }

  patchQuote(id, quoteData){
    return fetch(`${this.baseURL}/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(quoteData)
    }).then(res => res.json())
    .then(json => {return json})
  }

  deleteQuote(id){
    return fetch(`${this.baseURL}/${id}`,{
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: "DELETE"
    }).then(res => res.json())
      .then(json => {return json})
  }

  getTestConnection(){
    return new Promise((resolve, reject) => resolve(alert("Connected")))
  }
}