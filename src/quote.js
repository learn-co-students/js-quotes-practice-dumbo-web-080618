class Quote {
  constructor(quote, author, likes=0) {
    this.quote = quote
    this.author = author
    this.likes = likes
  }

  static createQuoteLi(authorObj){
    let li = document.createElement("li")
    li.class = "quote-card"
    // li.id = authorObj.id
    li.innerHTML = `<blockquote id=${authorObj.id} class="blockquote"> <p class="mb-0">${authorObj.quote}</p> <footer class="blockquote-footer">${authorObj.author}</footer> <br> <button class='btn-success'>Likes: <span>${authorObj.likes}</span></button> <button class='btn-danger'>Delete</button> </blockquote>`
    return li
  }

  static renderQuoteLi(authorObj){
    let body = document.querySelector("body")
    let li = this.createQuoteLi(authorObj)
    body.append(li)

  }
}
