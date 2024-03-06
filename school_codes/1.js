var btn0 = document.getElementById("btn")
var btn1 = document.getElementById("btn2")
var conteudo = document.getElementsByClassName("conteudo")[0]
var tittle = document.getElementsByTagName("h1")[0]
btn0.addEventListener("click", function() {
    tittle.classList.add("titulo")
    tittle.innerText = "Hello World"
    alert(document.documentElement.lang)
})
btn1.addEventListener("click", function() {
    tittle.classList.remove("titulo")
    var p = document.createElement("p")
    p.innerHTML = "user_name => estevan"
    conteudo.appendChild(p)
})
btn1.addEventListener("mouseenter", function() {
    entrou(this)
})
function entrou(element) {
    element.style.color = "blue"
}