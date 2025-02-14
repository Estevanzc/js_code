var notes_list = ["a0", "a%230", "b0", "c1", "c%231", "d1", "d%231", "e1", "f1", "f%231", "g1", "g%231", "a1", "a%231", "b1", "c2", "c%232", "d2", "d%232", "e2", "f2", "f%232", "g2", "g%232", "a2", "a%232", "b2", "c3", "c%233", "d3", "d%233", "e3", "f3", "f%233", "g3", "g%233", "a3", "a%233", "b3", "c4", "c%234", "d4", "d%234", "e4", "f4", "f%234", "g4", "g%234", "a4", "a%234", "b4", "c5", "c%235", "d5", "d%235", "e5", "f5", "f%235", "g5", "g%235", "a5", "a%235", "b5", "c6", "c%236", "d6", "d%236", "e6", "f6", "f%236", "g6", "g%236", "a6", "a%236", "b6", "c7", "c%237", "d7", "d%237", "e7", "f7", "f%237", "g7", "g%237", "a7", "a%237", "b7", "c8"]
var notes_interval = [3, 28]
var notes_name = notes_list.slice(notes_interval[0], notes_interval[1])
var piano_keys = {
    white: ["a","s","d","f","c","g","v","h","b","j","n","k","m","l","ç"],
    black: ["q","w","e","r","t","y","u","i","o","p"],
    white_count: 0,
    black_count: 0
}
var key_map = {}
let body = document.getElementsByTagName("body")[0]
let piano = document.getElementById("piano")
let piano_profile = document.getElementById("piano_profile")
let white_key = document.getElementsByClassName("white_key")
let black_key = document.getElementsByClassName("black_key")
let profile_key = document.getElementsByClassName("profile_key")
let audios_library = document.getElementById("audios")
let audios = document.getElementsByTagName("audio")
let all_keys = document.getElementsByClassName("all_keys")
let interval_indicator = document.getElementById("interval_indicator").children[1]
let hover_indicator = document.getElementById("hover_indicator").children[1]
let note_click = false
function key_gen() {
    piano.innerHTML = ""
    audios_library.innerHTML = ""
    for (let i in notes_name) {
        i = Number(i)
        let note = notes_name[i]
        let is_white_key = note.match(/%23/g) ? false : true
        let piano_key_index
        if (is_white_key) {
            piano_key_index = piano_keys.white_count
            piano_keys.white_count ++
        } else {
            piano_key_index = piano_keys.black_count
            piano_keys.black_count ++
        }
        //console.log(`${is_white_key} => ${piano_key_index}`);
        
        //console.log(`${i} => ${is_white_key} => ${piano_key_index} => ${piano_keys[is_white_key ? "white" : "black"][piano_key_index]}`);
        
        let audio = document.createElement("audio")
        audio.id = note
        audio.setAttribute("src", `./audios/${i + notes_interval[0]}-${note}.ogg`)
        //console.log(`./audios/${i + notes_interval[0]}-${note}.ogg`);
        
        key_map[piano_keys[is_white_key ? "white" : "black"][piano_key_index]] = {
            id: i,
            audio: note,
            audio_time: null
        }
        
        let piano_key = document.createElement("div")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        piano_key.name = piano_keys[is_white_key ? "white" : "black"][piano_key_index]
        piano_key.dataset.note_name = note
        p1.innerHTML = piano_keys[is_white_key ? "white" : "black"][piano_key_index]
        p2.innerHTML = note.toLocaleUpperCase().replace(/%23/g, "#").replace(/[0-9]/g, "")
        piano_key.className = `piano_key ${is_white_key ? "white_key" : "black_key"} all_keys`
        piano_key.addEventListener("mousedown", function() {
            click_down(this)
        })
        piano_key.addEventListener("mouseup", function() {
            click_up(this)
        })
        piano_key.addEventListener("mouseenter", function() {
            cursor_enter(this)
        })
        piano_key.addEventListener("mouseleave", function() {
            cursor_leave(this)
        })
        piano_key.appendChild(p1)
        piano_key.appendChild(p2)
        piano.appendChild(piano_key)
        audios_library.appendChild(audio)
    }
    piano_keys.white_count = 0
    piano_keys.black_count = 0
    key_positionate()
    for (let i = 0; i <= profile_key.length-1; i ++) {
        let is_white_key = notes_list[i].match(/%23/g) ? false : true
        if (profile_key[i].classList.contains(`p_${is_white_key ? "white" : "black"}_hover`)) {
            profile_key[i].classList.remove(`p_${is_white_key ? "white" : "black"}_hover`)
        }
        if (profile_key[i].classList.contains(`p_${is_white_key ? "white" : "black"}_selected`)) {
            profile_key[i].classList.remove(`p_${is_white_key ? "white" : "black"}_selected`)
        }

        if (i >= notes_interval[0] && i <= notes_interval[1]-1) {
            profile_key[i].classList.add(`p_${is_white_key ? "white" : "black"}_selected`)
        }
    }
    interval_indicator.innerHTML = `${notes_list[notes_interval[0]].toLocaleUpperCase()} - ${notes_list[notes_interval[1]-1].toLocaleUpperCase()}`
}
for (let i in notes_list) {
    //profile_key profile_white_key
    let note_profile = document.createElement("div")
    note_profile.dataset.id = i
    note_profile.className = `profile_key profile_${notes_list[i].match(/%23/g) ? "black" : "white"}_key`
    note_profile.addEventListener("mouseenter", function() {
        interval_setter(this)
    })
    note_profile.addEventListener("mouseleave", function() {
        hover_remove()
    })
    note_profile.addEventListener("click", function() {
        key_gen()
    })
    piano_profile.appendChild(note_profile)
}
key_gen()

function click_down(element) {    
    note_click = true
    cursor_enter(element)
}
function click_up(element) {
    note_click = false
    let key = key_map[element.children[0].innerHTML.toLowerCase()]
    audio_stop(key)
}
function cursor_enter(element) {
    if (note_click) {
        let key = key_map[element.children[0].innerHTML.toLowerCase()]
        audio_player(key)
    }
}
function cursor_leave(element) {
    if (note_click) {
        let key = key_map[element.children[0].innerHTML.toLowerCase()]
        audio_stop(key)
    }
}
function audio_player(key) {
    let audio = audios[key.id]
    let piano_key = all_keys[key.id]
    if (audio.currentTime == 0) {
        audio.play()
    } else if (audio.ended) {
        audio.pause()
    }
    piano_key.classList.add(piano_key.classList.contains("white_key") ? "white_pressed" : "black_pressed")
}
function audio_stop(key) {
    let audio = audios[key.id]
    let piano_key = all_keys[key.id]
    piano_key.classList.remove(piano_key.classList.contains("white_key") ? "white_pressed" : "black_pressed")
    audio.pause()
    audio.currentTime = 0
}
function press_down(event) {
    if (!key_map[event.key.toLowerCase()]) {
        return
    }
    let key = key_map[event.key.toLowerCase()]
    audio_player(key)
}
function press_up(event) {
    if (!key_map[event.key.toLowerCase()]) {
        return
    }
    let key = key_map[event.key.toLowerCase()]
    audio_stop(key)
}

function find_white_key(note_name) {
    
    return all_keys[notes_name.findIndex(note => note == (note_name.replace(/%23/g, "")))]
}
function key_positionate() {
    for (let i = 0; i <= all_keys.length-1; i ++) {
        let note = all_keys[i]
        
        if (note.classList.contains("black_key")) {
            let white_note = find_white_key(note.dataset.note_name).getBoundingClientRect()
            note.style.top = `${piano.getBoundingClientRect().top}px`
            note.style.left = `${white_note.left + white_note.width - note.getBoundingClientRect().width / 2 + 1}px`
        }
    }
}
function interval_creater(element) {
    let note_id = Number(element.dataset.id)
    let note = notes_list[note_id]
    if (note.match(/%23/g)) {
        note_id --
    }
    if (note_id >= 63) {
        note_id = 63
    }
    notes_name = notes_list.slice(note_id, note_id + 25)
    notes_interval = [note_id, note_id + 25]
}
function interval_setter(element) {
    interval_creater(element)
    for (let i = 0; i <= profile_key.length-1; i ++) {
        let is_white_key = notes_list[i].match(/%23/g) ? false : true
        if (profile_key[i].classList.contains(`p_${is_white_key ? "white" : "black"}_hover`)) {
            profile_key[i].classList.remove(`p_${is_white_key ? "white" : "black"}_hover`)
        }
        if (i >= notes_interval[0] && i <= notes_interval[1]-1 && !profile_key[i].classList.contains(`p_${is_white_key ? "white" : "black"}_selected`)) {
            profile_key[i].classList.add(`p_${is_white_key ? "white" : "black"}_hover`)
        }
    }
    hover_indicator.innerHTML = `${notes_list[notes_interval[0]].toLocaleUpperCase()} - ${notes_list[notes_interval[1]-1].toLocaleUpperCase()}`
}
function interval_type(element) {
    if (element.value == 0) {
        if (piano_profile.getBoundingClientRect().height == 100) {
            piano_profile.style.display = "none"
            hover_indicator.parentNode.style.display = "none"
        }
        interval_creater({dataset: {id: 3}})
        key_gen()
    } else {
        if (piano_profile.getBoundingClientRect().height != 100) {
            piano_profile.style.display = "grid"
            hover_indicator.parentNode.style.display = "flex"
        }
    }
    key_positionate()
}
function hover_remove() {
    for (let i = 0; i <= profile_key.length-1; i ++) {
        let is_white_key = notes_list[i].match(/%23/g) ? false : true
        if (profile_key[i].classList.contains(`p_${is_white_key ? "white" : "black"}_hover`)) {
            profile_key[i].classList.remove(`p_${is_white_key ? "white" : "black"}_hover`)
        }
    }
    hover_indicator.innerHTML = `N/A`
}
