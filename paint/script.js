var color = document.getElementsByClassName("colormenu")[0]
var size = document.getElementsByClassName("size")[0]
var sizemenu = document.getElementsByClassName("sizemenu")[0]
var unidade = document.getElementsByClassName("unidade")
var colormenu = document.getElementById("colormenu")
var controlz = document.getElementById("controlz")
var board = document.getElementsByClassName("board")[0]
var screen = document.getElementsByClassName("screen")[0]
var chat = document.getElementsByClassName("chat")[0]
var chattext = document.getElementById("chattext")
var numbers = [[4], [1, 3, 4, 5, 7], [0, 2, 4, 6, 8]]
var ccolor = "black"
var colors = ["black", "white", "orange", "red", "yellow", "green", "darkgreen", "lightgreen", "blue", "darkblue", "purple", "pink", "brown", "grey", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
var memory = []
var cores = []
var elements = []
var paints
var first = true
var colormset = true
var remove = false
var sizemenuseter = true
var paintmode = 0
var r = 127.5
var g = 127.5
var b = 127.5
var eraser = false
for (var li = 0; li <= 99; li++) {
    elements.push([])
    for (var co = 0; co <= 99; co++) {
        var element = document.createElement("div")
        element.classList.add("unidade")
        element.addEventListener("mousedown", function () {
            wpaint(this)
        })
        element.addEventListener("mouseup", function () {
            dwpaint(this)
        })
        element.addEventListener("mouseenter", function () {
            paint(this)
        })
        element.dataset.li = li
        element.dataset.co = co
        elements[li].push(element)
        board.appendChild(element)
    }
}
for (var i in colors) {
    var element = document.createElement("div")
    element.classList.add("unic")
    if (colors[i] != "") {
        element.style.backgroundColor = colors[i]
    }
    element.addEventListener("click", function () {
        changecolor(this)
    })
    cores.push(element)
    color.appendChild(element)
}
for (var i = 0; i <= 8; i++) {
    var element = document.createElement("div")
    element.dataset.li = i
    element.classList.add("son")
    if (i == 4) {
        element.style.backgroundColor = "black"
    }
    size.appendChild(element)
}
for (var i = 0; i <= 2; i++) {
    var element = document.createElement("div")
    element.dataset.li = i
    element.classList.add("uniop")
    element.addEventListener("click", function () {
        changesize(this)
    })
    for (var i2 = 0; i2 <= 8; i2++) {
        var son = document.createElement("div")
        son.classList.add("sizeson")
        element.appendChild(son)
    }
    for (var i3 in numbers[i]) {
        element.children[numbers[i][i3]].style.backgroundColor = "black"
    }
    sizemenu.appendChild(element)
}
cores[0].style.borderColor = "lightgreen"
function scale() {
    if (!colormset) {
        colormenu.style.animation = "closemenu 0.25s forwards"
        setTimeout(() => {
            colormenu.style.display = "none"
        }, 250);
        colormset = true
    }
    if (sizemenuseter) {
        sizemenu.style.display = "flex"
        sizemenu.style.animation = "opensmenu 0.25s forwards"
        sizemenuseter = false
    } else {
        sizemenu.style.animation = "closesmenu 0.25s forwards"
        setTimeout(() => {
            sizemenu.style.display = "none"
        }, 250);
        sizemenuseter = true
    }
}
function changesize(element) {
    for (var i = 0; i <= element.children.length - 1; i++) {
        size.children[i].style.backgroundColor = ""
    }
    for (var i in numbers[element.dataset.li]) {
        size.children[numbers[element.dataset.li][i]].style.backgroundColor = "black"
    }
    paintmode = element.dataset.li
    sizemenu.style.animation = "closesmenu 0.25s forwards"
    setTimeout(() => {
        sizemenu.style.display = "none"
    }, 250);
    sizemenuseter = true
}
function changecolor(element) {
    if (remove) {
        element.style.backgroundColor = ""
        chattext.innerHTML = ""
        chat.style.animation = "closemenu 0.25s forwards"
        setTimeout(() => {
            chat.style.display = "none"
        }, 250);
        remove = false
    } else {
        for (var i in cores) {
            cores[i].style.borderColor = "black"
        }
        element.style.borderColor = "lightgreen"
        if (element.style.backgroundColor != '') {
            ccolor = element.style.backgroundColor
        }
        console.log(ccolor)
    }
}
function wpaint(element) {
    paints = true
    memory = []
}
function dwpaint(element) {
    paints = false
}
function paint(element) {
    if (!first && paints) {
        element.style.backgroundColor = "white"
    } else if (paints) {
        painter(element)
    }
}
function painter(element) {
    eraser = true
    controlz.style.display = "inline"
    var li = Number(element.dataset.li)
    var co = Number(element.dataset.co)
    if (paints) {
        memor(element)
        element.style.backgroundColor = ccolor
    }
    if (paintmode == 1) {
        if (li < 99) {
            memor(elements[li + 1][co])
            elements[li + 1][co].style.backgroundColor = ccolor
        }
        if (li > 0) {
            memor(elements[li - 1][co])
            elements[li - 1][co].style.backgroundColor = ccolor
        }
        if (co < 99) {
            memor(elements[li][co + 1])
            elements[li][co + 1].style.backgroundColor = ccolor
        }
        if (co > 0) {
            memor(elements[li][co - 1])
            elements[li][co - 1].style.backgroundColor = ccolor
        }
    } else if (paintmode == 2) {
        if (li < 99) {
            memor(elements[li + 1][co])
            if (co < 99) {
                memor(elements[li + 1][co + 1])
                elements[li + 1][co + 1].style.backgroundColor = ccolor
            }
            if (co > 0) {
                memor(elements[li + 1][co - 1])
                elements[li + 1][co - 1].style.backgroundColor = ccolor
            }
        }
        if (li > 0) {
            memor(elements[li - 1][co])
            if (co < 99) {
                memor(elements[li - 1][co + 1])
                elements[li - 1][co + 1].style.backgroundColor = ccolor
            }
            if (co > 0) {
                memor(elements[li - 1][co - 1])
                elements[li - 1][co - 1].style.backgroundColor = ccolor
            }
        }
    }
}
function memor(element) {
    var there = true
    for (var i in memory) {
        if (element.dataset.li == memory[i].li && element.dataset.co == memory[i].co) {
            there = false
        }
    }
    if (there) {
        var elemem = {}
        elemem.li = element.dataset.li
        elemem.co = element.dataset.co
        elemem.unicolor = element.style.backgroundColor
        memory.push(elemem)
    }
    console.log(memory)
}
function limpa(element) {
    if (element.id == "eraser") {
        if (first) {
            element.style.border = "2px solid lightgreen"
            first = false
        } else {
            element.style.border = "none"
            first = true
        }
    } else if (element.id == "cleaner") {
        for (var i = 0; i < unidade.length; i++) {
            unidade[i].style.backgroundColor = "white"
        }
        controlz.style.display = "none"
        memory = []
    }
}
function back() {
    if (eraser) {
        for (var i in memory) {
            elements[Number(memory[i].li)][Number(memory[i].co)].style.backgroundColor = memory[i].unicolor
        }
        controlz.style.display = "none"
        eraser = false
        memory = []
    }
}
function addc() {
    if (!sizemenuseter) {
        sizemenu.style.animation = "closesmenu 0.25s forwards"
        setTimeout(() => {
            sizemenu.style.display = "none"
        }, 250);
        sizemenuseter = true
    }
    if (colormset) {
        colormenu.style.display = "flex"
        colormenu.style.animation = "openmenu 0.25s forwards"
        moveu(false)
        colormset = false
    } else {
        colormenu.style.animation = "closemenu 0.25s forwards"
        setTimeout(() => {
            colormenu.style.display = "none"
        }, 250);
        colormset = true
    }
}
function moveu(element) {
    if (element.id == "r") {
        r = element.value
    } else if (element.id == "g") {
        g = element.value
    } else if (element.id == "b") {
        b = element.value
    }
    screen.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
}
function create() {
    console.log(cores)
    var can = true
    for (var i in cores) {
        if (cores[i].style.backgroundColor == "" && can) {
            cores[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`
            colormenu.style.animation = "closemenu 0.25s forwards"
            setTimeout(() => {
                colormenu.style.display = "none"
            }, 250);
            can = false
        }
    }
    if (can) {
        chat.style.display = "flex"
        chat.style.animation = "openmenu 0.25s forwards"
        setTimeout(() => {
            chattext.innerHTML = "não tens espaço para adcoinar cores, por favor, clique na cor que desejas remover"
        }, 250);
        remove = true
    }
}