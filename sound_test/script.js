var notes_name = [
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "a1",
    "b1",
    "c2",
    "d2",
    "e2",
    "f2",
    "g2",
    "a2",
    "b2",
    "c3",
    "c%231",
    "d%231",
    "f%231",
    "g%231",
    "a%231",
    "c%232",
    "d%232",
    "f%232",
    "g%232",
    "a%232",
]
var piano_keys = ["a","s","d","f","c","g","v","h","b","j","n","k","m","l","ç","q","w","e","r","t","y","u","i","o","p"]
var key_map = {}
let body = document.getElementsByTagName("body")[0]
let piano = document.getElementById("piano")
let white_key = document.getElementsByClassName("white_key")
let black_key = document.getElementsByClassName("black_key")
for (let i in notes_name) {
    i = Number(i)
    let note = notes_name[i]
    let audio = document.createElement("audio")
    audio.id = note
    audio.setAttribute("src", `./audios/${i+1}-${note}.ogg`)
    key_map[piano_keys[i]] = {
        id: i,
        audio: note,
        audio_time: null
    }
    let piano_key = document.createElement("div")
    let p1 = document.createElement("p")
    let p2 = document.createElement("p")
    piano_key.name = piano_keys[i]
    piano_key.dataset.note_name = note
    p1.innerHTML = piano_keys[i]
    p2.innerHTML = note.toLocaleUpperCase().replace(/%23/g, "#").replace(/[0-9]/g, "")
    piano_key.className = `piano_key ${note.match(/%23/g) ? "black_key" : "white_key"} all_keys`
    piano_key.appendChild(p1)
    piano_key.appendChild(p2)
    piano.appendChild(piano_key)
    body.appendChild(audio)
}
let audios = document.getElementsByTagName("audio")
let all_keys = document.getElementsByClassName("all_keys")

function press_down(event) {
    if (!key_map[event.key]) {
        return
    }
    let key = key_map[event.key]
    let audio = audios[key.id]
    let piano_key = all_keys[key.id]
    if (audio.currentTime == 0) {
        audio.play()
    } else if (audio.ended) {
        audio.pause()
    }
    piano_key.classList.add(piano_key.classList.contains("white_key") ? "white_pressed" : "black_pressed")
}
function press_up(event) {
    if (!key_map[event.key]) {
        return
    }
    let key = key_map[event.key]
    let audio = audios[key.id]
    let piano_key = all_keys[key.id]
    piano_key.classList.remove(piano_key.classList.contains("white_key") ? "white_pressed" : "black_pressed")
    audio.pause()
    audio.currentTime = 0
}

function find_white_key(note_name) {
    
    return all_keys[notes_name.findIndex(note => note == (note_name.replace(/%23/g, "")))]
}
for (let i = 0; i <= all_keys.length-1; i ++) {
    let note = all_keys[i]
    
    if (note.classList.contains("black_key")) {
        let white_note = find_white_key(note.dataset.note_name).getBoundingClientRect()
        note.style.top = `${piano.getBoundingClientRect().top}px`
        note.style.left = `${white_note.left + white_note.width - note.getBoundingClientRect().width / 2 + 1}px`
    }
}
