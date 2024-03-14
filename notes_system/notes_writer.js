var user_notes_arm
var user_menu_window = document.getElementById("user_menu_window")
var second_interact_window = document.getElementById("second_interact_window")
var menu_arrow = document.getElementById("user_menu").children[0]
var user_profile = document.getElementById("user_profile")
var notes_list = document.getElementById("notes_list")
var menu_arrow_setter = true
async function notes_taker(action) {
    if (action == 0) {
        user_notes_arm = await fetch(`http://localhost/vs_codes/js_codes/notes_system/data_user.php?action=3`)
        user_notes_arm = await user_notes_arm.json()/*
                if (!user_notes_arm) {
                    window.location.href = "http://localhost/vs_codes/js_codes/notes_system/login.html"
                }*/
        user_profile.children[0].children[0].style.backgroundImage = `url("${user_notes_arm.user_data[3]}")`
        user_profile.children[1].children[0].innerHTML = user_notes_arm.user_data[0]
        user_profile.children[1].children[1].innerHTML = user_notes_arm.user_data[2]
        for (var i in user_notes_arm["user_notes"]) {
            var user_note = user_notes_arm["user_notes"][i]
            var note_unity = document.createElement("div")
            note_unity.dataset.note_num = i
            note_unity.id = "note_unity"
            var note_data = document.createElement("div")
            note_data.id = "note_data"
            var note_content = document.createElement("div")
            note_content.id = "note_content"
            var p0 = document.createElement("p")
            var p1 = document.createElement("p")
            var p2 = document.createElement("p")
            var i0 = document.createElement("i")
            var i1 = document.createElement("i")
            i0.className = "fa-solid fa-pen"
            i1.className = "fa-solid fa-trash"
            i0.dataset.option = 0
            i1.dataset.option = 1
            i0.addEventListener("click", function () {
                note_option(this)
            })
            i1.addEventListener("click", function () {
                note_option(this)
            })
            p0.innerHTML = user_note[0]
            note_content.appendChild(p0)
            var note_description = document.createElement("div")
            note_description.id = "note_description"
            var note_buttons = document.createElement("div")
            note_buttons.id = "note_buttons"
            var note_author = document.createElement("div")
            note_author.id = "note_author"
            var note_date = document.createElement("div")
            note_date.id = "note_date"
            p1.innerHTML = `Published by <strong>${user_note[2] ? "notes_system" : user_notes_arm["user_data"][0]}</strong>`
            p2.innerHTML = user_note[1]
            note_author.appendChild(p1)
            note_date.appendChild(p2)
            note_buttons.appendChild(i0)
            note_buttons.appendChild(i1)
            note_description.appendChild(note_author)
            note_description.appendChild(note_date)
            note_data.appendChild(note_description)
            note_data.appendChild(note_buttons)
            note_unity.appendChild(note_data)
            note_unity.appendChild(note_content)
            notes_list.appendChild(note_unity)
        }
    }
}
notes_taker(0)
function open_user_menu(element) {
    if (menu_arrow_setter) {
        user_menu_window.style.display = "flex"
        user_menu_window.style.animation = "user_menu_show 0.25s forwards"
        menu_arrow.style.rotate = "180deg"
        menu_arrow_setter = false
    } else {
        user_menu_window.style.animation = "user_menu_unshow 0.25s forwards"
        menu_arrow.style.rotate = "0deg"
        menu_arrow_setter = true
        setTimeout(() => {
            user_menu_window.style.display = "none"
        }, 250);
    }
}
function changing(element) {
    var note_input = element.parentNode.parentNode.children[0].children[0].children[1].children[0]
    note_input.innerHTML = element.value
}
function change_note(element) {
    var note = element.parentNode.parentNode.children[0].children[0]
    if (element.id == "confirm_action") {
        var key_words = ["user_email", "note_num", "action_num", "note"]
        var key_data = [0, 0, Number(element.dataset.action_num), 0]
        fetch(`http://localhost/vs_codes/php_codes/notes_system/data_user.php?action=4&user_email=${user_notes_arm[`user_data`][2]}&note_num=${note.dataset.note_num}${note}`)
    }
}
function note_option(element) {
    var note = element.parentNode.parentNode.parentNode
    var option_number = Number(element.dataset.option)
    var option_window = second_interact_window.children[option_number]
    var note_copy = option_window.children[0].children[0].children[0]
    second_interact_window.style.display = "flex"
    second_interact_window.style.zIndex = 2
    second_interact_window.style.animation = "second_window_show 0.25s forwards"
    option_window.style.display = "flex"
    console.log(option_number)
    if (option_number <= 1) {
        note_copy.dataset.note_num = note.dataset.note_num
        note = user_notes_arm[`user_notes`][Number(note.dataset.note_num)]
        note_copy.children[0].children[0].children[0].children[0].innerHTML = `Published by <strong>${user_notes_arm["user_data"][0]}</strong>`
        note_copy.children[0].children[0].children[1].children[0].innerHTML = note[1]
        note_copy.children[1].children[0].innerHTML = note[0]
        note_copy.parentNode.parentNode.children[1].children[1].value = note[0]
    }
}
