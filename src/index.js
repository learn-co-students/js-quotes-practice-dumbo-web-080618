// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', () => {
  const baseURL = `http://localhost:3000/quotes`
  const adapter = new Adapter(baseURL)
  const newQuoteForm = document.querySelector('#new-quote-form')

  newQuoteForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const newQuote = {
      quote: evt.target.querySelector('input#new-quote').value,
      author: evt.target.querySelector('input#author').value,
      likes: 0
    }

    if (newQuote.quote != "" && newQuote.author != ""){
      adapter.postQuote(newQuote)
      alert(`New Submission Successful`)
      new Quote(newQuote, adapter)
    } else {
      alert('Invalid Submission, try again.')
    }
  })

  adapter.getQuotes()
    .then(res => 
      res.forEach(quoteObj => {
        new Quote(quoteObj, adapter)
      }))
})
// Submitting the form should create a new quote.
// Whether you chooose to optimistically render or not, the new quote render without having to refresh the page.
// Hitting the delete button should delete the respective quote.
// Hitting the like button will increase the number of likes for this particular comment.