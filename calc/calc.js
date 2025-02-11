var keyboard = document.getElementsByClassName("buttons")[0]
var screen = document.getElementsByClassName("screen")[0]
for (var i = 9; i >= 0; i--) {
    var element = document.createElement("div")
    element.classList.add("unidade")
    element.addEventListener("click", function () {
        play(this)
    })
    element.innerHTML = i
    keyboard.appendChild(element)
}
function number(element) {
    switch (element) {
        case "0":
            return true
            break
        case "1":
            return true
            break
        case "2":
            return true
            break
        case "3":
            return true
            break
        case "4":
            return true
            break
        case "5":
            return true
            break
        case "6":
            return true
            break
        case "7":
            return true
            break
        case "8":
            return true
            break
        case "9":
            return true
            break
        default:
            return false
    }
}
function play(element) {
    if (number(element.innerHTML)) {
        if (screen.innerHTML == "" && element.innerHTML != 0 || screen.innerHTML != "") {
            screen.innerHTML += element.innerHTML
        }
    } else {
        if (element.innerHTML == "=") {
            if (number(screen.innerHTML.charAt(screen.innerHTML.length - 1))) {
                equals(screen)
            } else {
                alert("add a number after the operation")
            }
        } else if (screen.innerHTML == "" && element.innerHTML == "-" || screen.innerHTML != "" && number(screen.innerHTML.charAt(screen.innerHTML.length - 1))) {
            screen.innerHTML += element.innerHTML
        }
    }
}
function equals(element) {
    /*var i = 0
    var val = []
    var i2 = 0
    while (i <= element.innerHTML.length - 1) {
        if (i == 0) {
            if (element.innerHTML.charAt(i) == "-" || number(element.innerHTML.charAt(i))) {
                i++
            }
        } else if (i != 0) {
            if (number(element.innerHTML.charAt(i))) {
                i++
            } else {
                if (i == 1) {
                    val.push(Number(element.innerHTML.substring(0, i)))
                    i2 = i + 1
                } else {
                    val.push(Number(element.innerHTML.substring(i2, i)))
                    i2 = i + 1
                }
                val.push(element.innerHTML.charAt(i))
                i++
            }
            if (i == element.innerHTML.length - 1) {
                val.push(Number(element.innerHTML.substring(i2, i + 1)))
            }
        }
    }
    multidivide(val)
    plusminus(val)*/
    screen.style.justifyContent = "flex-end"
    //screen.innerHTML = val[0]
    screen.innerHTML = eval(element.innerHTML)
}
function op(element) {
    if (element.classList == "clear") {
        screen.innerHTML = ""
    } else {
        screen.innerHTML = screen.innerHTML.substring(0, screen.innerHTML.length - 1)
    }
    screen.style.justifyContent = "flex-start"
}
function multidivide(val) {
    for (var i in val) {
        i = Number(i)
        if (!number(val[i])) {
            if (val[i] != "+" && val[i] != "-") {
                if (val[i] == "*") {
                    val[i - 1] = val[i - 1] * val[i + 1]
                    val.splice(i, 2)
                    multidivide(val)
                } else if (val[i] == "/") {
                    val[i - 1] = val[i - 1] / val[i + 1]
                    val.splice(i, 2)
                    multidivide(val)
                }
            }
        }
    }
}
function plusminus(val) {
    for (var i in val) {
        i = Number(i)
        if (!number(val[i])) {
            if (val[i] == "+" || val[i] == "-") {
                if (val[i] == "+") {
                    val[i - 1] = val[i - 1] + val[i + 1]
                    val.splice(i, 2)
                    plusminus(val)
                } else if (val[i] == "-") {
                    val[i - 1] = val[i - 1] - val[i + 1]
                    val.splice(i, 2)
                    plusminus(val)
                }
            }
        }
    }
}