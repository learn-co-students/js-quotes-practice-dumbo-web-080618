class Quote{
  constructor({id, quote, likes, author}, adapter){
    this.id = id
    this.quote = quote
    this.likes = likes
    this.author = author
    this.adapter = adapter
    this.getQuoteCard()
  }

  getQuoteCard(){
    const quoteList = document.querySelector('ul#quote-list')
    const li = document.createElement('li')

  li.innerHTML = 
    `<blockquote class="blockquote"><p class="mb-0">${this.quote}</p><footer class="blockquote-footer">${this.author}</footer><form style="display: none"><div class="form-group"><label for="edit-quote">Edit Quote</label><input type="text" name="quote" class="form-control" value="${this.quote}"></div><div class="form-group"><label for="Author">Author</label><input type="text" class="form-control" name="author" value="${this.author}"></div><button type="submit" class="btn btn-primary">Submit</button></form><br><button class='btn-success'>Likes: <span>${this.likes}</span></button> <button class='btn-warning'>Edit</button> <button class='btn-danger'>Delete</button></blockquote><br>`
 
    li.className = 'quote-card'
    li.dataset.id = this.id

    let likeButton = li.querySelector('button.btn-success')
      .addEventListener('click', (e) => this.addLikes(e))
    
    let deleteButton = li.querySelector('button.btn-danger')
      .addEventListener('click', (e) => this.deleteQuote(e))

    let editButton = li.querySelector('button.btn-warning')
      .addEventListener('click', (e) => this.editQuote(e))

    let submit = li.querySelector('form')
      .addEventListener('submit', (e) => this.updateQuote(e))

    quoteList.append(li)
    return li
  }

  addLikes(e){
    let span = e.target.querySelector('span')
    this.likes += 1
    span.innerText = this.likes
    this.adapter.postLikes(this.likes, this.id)
  }

  deleteQuote(e){
    e.target.parentElement.parentElement.remove()
    this.adapter.deleteQuote(this.id)
  }

  editQuote(event){
    let form = event.target.parentElement.querySelector('form')

    if(form.style.display == 'block'){
    form.style.display = 'none'
    } else {
    form.style.display = 'block'
    }
  }

  updateQuote(e){
    e.preventDefault()
    const editedQuote = {
      quote: event.target.quote.value,
      author: event.target.author.value
    }
    this.adapter.patchQuote(this.id, editedQuote)
      .then(res => {
        this.quote = event.target.quote.value
        this.author = event.target.author.value
        this.editQuote(e)
      })
  }
}