var form_inputs = document.getElementsByClassName("form_inputs")
var input_interact = document.getElementsByClassName("input_interact")
var user_notes_arm
var submit_continue = true
async function notes_taker() {
    user_notes_arm = await fetch("http://localhost/vs_codes/js_codes/notes_system/data_user.php?action=1")
    user_notes_arm = await user_notes_arm.json()
}
notes_taker()
function data_submit(element) {
    event.preventDefault()
    for (var i = 0; i <= form_inputs.length - 1; i++) {
        inputs_verifyer(form_inputs[i])
    }
    if (submit_continue) {
        if (!user_notes_arm[`${form_inputs[1].value}`]) {
            form_inputs[1].style.borderColor = "grey"
            form_inputs[1].parentNode.children[2].style.visibility = "hidden"
            submit_continue = true
        } else {
            form_inputs[1].style.borderColor = "red"
            form_inputs[1].parentNode.children[2].style.visibility = "visible"
            form_inputs[1].parentNode.children[2].innerHTML = "* email already exists"
            submit_continue = false
        }
        for (var i in user_notes_arm) {
            if (user_notes_arm[i].user_data[0] == form_inputs[0].value) {
                form_inputs[0].style.borderColor = "red"
                form_inputs[0].parentNode.children[2].style.visibility = "visible"
                form_inputs[0].parentNode.children[2].innerHTML = "* user name already exists"
                submit_continue = false
            }
        }
        if (submit_continue) {
            element.parentNode.parentNode.parentNode.submit()
        }
    }
}
function inputs_verifyer(element) {
    if (!form_inputs[1].value.match(/@gmail.com/) || form_inputs[1].value.length < 11) {
        if (element == form_inputs[1]) {
            form_inputs[1].style.borderColor = "red"
            form_inputs[1].parentNode.children[2].style.visibility = "visible"
            form_inputs[1].parentNode.children[2].innerHTML = "* uncurrect email"
        }
        submit_continue = false
    } else {
        form_inputs[1].style.borderColor = "grey"
        form_inputs[1].parentNode.children[2].style.visibility = "hidden"
        submit_continue = true
    }
    if (form_inputs[2].value.length == 0) {
        if (element == form_inputs[2]) {
            form_inputs[2].style.borderColor = "red"
            form_inputs[2].parentNode.children[2].style.visibility = "visible"
            form_inputs[2].parentNode.children[2].innerHTML = "* uncurrect password"
        }
        submit_continue = false
    } else {
        form_inputs[2].style.borderColor = "grey"
        form_inputs[2].parentNode.children[2].style.visibility = "hidden"
        submit_continue = true
    }
    if (form_inputs[0].value.length > 18 || form_inputs[0].value.length < 4) {
        if (element == form_inputs[0]) {
            form_inputs[0].style.borderColor = "red"
            form_inputs[0].parentNode.children[2].style.visibility = "visible"
            form_inputs[0].parentNode.children[2].innerHTML = `* user name length is ${form_inputs[0].value.length > 18 ? `higher than 18 characters` : `shorter than 4 characters`}`
        }
        submit_continue = false
    } else {
        form_inputs[0].style.borderColor = "grey"
        form_inputs[0].parentNode.children[2].style.visibility = "hidden"
        submit_continue = true
    }
}
function profile_interact(element) {
    var input_num = Number(element.dataset.input_num)
    input_num == 0 ? input_interact[input_num].style.backgroundImage = `url("${element.value}")` : input_interact[input_num].innerHTML = element.value
}