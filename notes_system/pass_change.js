var user_notes_arm
var submit_continue = true
var form_inputs = document.getElementsByClassName("form_inputs")
async function notes_taker() {
    user_notes_arm = await fetch(`http://localhost/vs_codes/js_codes/notes_system/data_user.php?action=1`)
    user_notes_arm = await user_notes_arm.json()
}
notes_taker()
function data_submit(element) {
    for (var i = 0; i <= form_inputs.length - 1; i++) {
        inputs_verifyer(form_inputs[i])
    }
    if (user_notes_arm[`${form_inputs[0].value}`]) {
        element.parentNode.parentNode.parentNode.submit()
    } else {
        form_inputs[0].style.borderColor = "red"
        form_inputs[0].parentNode.children[2].style.visibility = "visible"
        form_inputs[0].parentNode.children[2].innerHTML = `* email doesn't exist`
        submit_continue = false
    }
}
function inputs_verifyer(element) {
    if (!form_inputs[0].value.match(/@gmail.com/) || form_inputs[0].value.length < 11) {
        if (element == form_inputs[0]) {
            form_inputs[0].style.borderColor = "red"
            form_inputs[0].parentNode.children[2].style.visibility = "visible"
            form_inputs[0].parentNode.children[2].innerHTML = `* uncorrect email`
        }
        submit_continue = false
    } else {
        form_inputs[0].style.borderColor = "grey"
        form_inputs[0].parentNode.children[2].style.visibility = "hidden"
        submit_continue = true
    }
    if (form_inputs[1].value.length == 0) {
        if (element == form_inputs[1]) {
            form_inputs[1].style.borderColor = "red"
            form_inputs[1].parentNode.children[2].style.visibility = "visible"
            form_inputs[1].parentNode.children[2].innerHTML = "* uncurrect password"
        }
        submit_continue = false
    } else {
        form_inputs[1].style.borderColor = "grey"
        form_inputs[1].parentNode.children[2].style.visibility = "hidden"
        submit_continue = true
    }
}