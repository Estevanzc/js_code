var form_inputs = document.getElementsByClassName("input")
var error_window = document.getElementById("error_window")
var error_list = document.getElementById("error_list")
var input_rules = [[true, false, 3], [true, true, 11], [true, false, 3], [true, false, 8]]
var submit_continue = [0, 0, 0, 0]
var input_error_list = []
var finded_error = true
function input_enter(element) {
    element.parentNode.children[2].style.display = "flex"
}
function input_leave(element) {
    element.parentNode.children[2].style.display = "none"
}
function input_verifyer(element, event) {
    event.preventDefault()
    for (var i = 0; i <= form_inputs.length - 1; i++) {
        //console.log(i)
        var input = form_inputs[i].children[1]
        input.parentNode.classList.remove("error")
        var input_num = Number(input.dataset.input_num)
        var valid = true
        if (input_rules[input_num][0] && input.value.length == 0) {
            submit_continue[input_num] = false
            input.parentNode.classList.add("error")
            input_error_list.push(`input [${input.id}] é obrigatório`)
        } else {
            submit_continue[input_num] = true
        }
        if (input_rules[input_num][1]) {
            var word = input.value
            if (word.length != 0) {
                for (var i1 = 0; i1 <= word.length - 1; i1++) {
                    if (!Number(word[i1])) {
                        valid = false
                    }
                }
            } else {
                valid = false
            }
            if (valid && submit_continue[input_num] == 0) {
                submit_continue[input_num] = true
            } else if (!valid) {
                submit_continue[input_num] = false
                input.parentNode.classList.add("error")
                input_error_list.push(`input [${input.id}] deve conter apenas números`)
            }
        }
        if (Number(input.value.length) < input_rules[input_num][2]) {
            submit_continue[input_num] = false
            input.parentNode.classList.add("error")
            input_error_list.push(`input [${input.id}] deve possuir mínimo de ${input_rules[input_num][2]} caracteres`)
        } else if (Number(input.value.length) >= input_rules[input_num][2] && valid) {
            submit_continue[input_num] = true
        }
    }
    if (submit_continue.every(function (input_rule) { return input_rule })) {
        element.submit()
    } else {
        console.log(input_error_list);
        if (finded_error) {
            finded_error = false
            error_window.style.display = "flex"
            error_window.style.animation = "window_show 0.25s forwards"
            setTimeout(() => {
                for (var i = 0; i <= error_window.children.length-1; i ++) {
                    error_window.children[i].style.display = "inline"
                }
            }, 250);
        }
        var child_num = error_list.children.length-1
        for (var i = 0; i <= child_num; i ++) {
            error_list.removeChild(error_list.children[0])
        }
        for (var i in input_error_list) {
            var li = document.createElement("li")
            li.innerHTML = input_error_list[i]
            error_list.appendChild(li)
        }
        for (var i in submit_continue) {
            submit_continue[i] = 0
        }
        input_error_list = []
    }
}