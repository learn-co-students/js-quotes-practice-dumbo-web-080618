class Adapter{
  constructor(baseURL){
    this.baseURL = baseURL
  }

  get(path){
    return fetch(path).then(res => res.json())
  }

  getQuotes(){
    return this.get(this.baseURL)
  }

  createQuote(data){
    return fetch(this.baseURL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json());
  }

  deleteQuote(id){
    return fetch(this.baseURL + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then (res => res.json())
  }

  editQuote(id, data){
    return fetch(this.baseURL + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }
}
