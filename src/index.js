// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const URL = "http://localhost:3000/quotes"
const quoteList = document.querySelector("#quote-list")
document.addEventListener("DOMContentLoaded", function(event){
  renderQuoteList();
  let form = document.querySelector("#new-quote-form")
  form.addEventListener("submit",function(e){
    e.preventDefault()
    let data = {"quote": e.target.querySelector("#new-quote").value,"author":e.target.querySelector("#author").value}
    post(data).then(res => {
      quoteList.append(renderQuote(res))
    })
  })
})
/*html <li class='quote-card'>
 <blockquote class="blockquote">
  <p class="mb-0">Lorem ipsum</p>
  <footer class="blockquote-footer">Someone famous</footer>
  <br> <button class='btn-success'>Likes: <span>0</span></button>
  <button class='btn-danger'>Delete</button>
 </blockquote>
</li>
*/
function renderQuoteList(){
  get(URL).then(res => {
    res.forEach(function(quote){
      quoteList.append(renderQuote(quote))
    })
  })
}

function renderQuote(quote){
  let li = document.createElement("li")
  li.className += "quote-card "
  li.innerHTML = `
  <blockquote class="blockquote">
   <p class="mb-0">${quote.quote}</p>
   <footer class="blockquote-footer">${quote.author}</footer>
   <br> <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
   <button class='btn-danger'>Delete</button>
  </blockquote>
  `
  let like_button = li.querySelector(".btn-success")
  let likes = like_button.querySelector("span")

  like_button.addEventListener("click", function(){
    let num = parseInt(likes.innerHTML)
    patch(quote, num+1).then(res => {
      likes.innerHTML = res.likes
    })
  })

  let delete_button = li.querySelector(".btn-danger")
  delete_button.addEventListener("click", function(){
    delete_btn(quote).then(res => {
      li.parentElement.removeChild(li)
    })
  })


  return li
}

function get(path){
  return fetch(`${path}`).then(res => res.json())
}

function getPatchData(data){
  return {
    "likes": data
  }
}

function getPostData(data){
  return {
    "quote": data.quote,
    "likes": 1,
    "author": data.author
  }
}

function post(data){
  return fetch(URL,{
    method: "POST",
    headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
    body: JSON.stringify(getPostData(data)),
  }).then(response => response.json());
}

function patch(data, num){
  return fetch(`${URL}/${data.id}`,{
    method: "PATCH",
    headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    body: JSON.stringify(getPatchData(num)),
  }).then(response => response.json());
}

function delete_btn(data){
  return fetch(`${URL}/${data.id}`,{
    method: "DELETE",
  }).then(response => response.json());
}
