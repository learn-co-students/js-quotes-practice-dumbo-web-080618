const URL = "http://localhost:3000/quotes"

document.addEventListener("DOMContentLoaded", () => {
  const adapter = new Adapter(URL)

  adapter.getQuotes()
  .then((quotes) => {
    quotes.forEach(function(quote) {
      Quote.renderQuoteLi(quote)
    })
  })
  .then(() => {
    let createButton = document.querySelector("button[class='btn btn-primary']")
    createButton.addEventListener('click', (e) => {
      e.preventDefault()
      let newQuote = document.querySelector("#new-quote").value
      let newAuthor = document.querySelector("#author").value
      let newQuoteObj = new Quote(newQuote, newAuthor)
      adapter.createQuote(newQuoteObj).then((newQuoteObj) => {
        Quote.renderQuoteLi(newQuoteObj)
      })
    })
  })


    document.addEventListener('click', (e)=>{
      if (e.target.className === "btn-success") {
        let QuoteID = e.target.parentNode.id
        let c_likes = parseInt(e.target.parentNode.querySelector("span").innerText)
        c_likes += 1
        data = {"likes": c_likes}
        adapter.addLikes(QuoteID, data).then(() => {
          e.target.parentNode.querySelector("span").innerText = c_likes
        })
      }
      else if (e.target.className === "btn-danger") {
        let QuoteID = e.target.parentNode.id
        adapter.deleteLike(QuoteID).then(() => {
          e.target.parentNode.parentNode.remove()
        })
      }
    })



})
