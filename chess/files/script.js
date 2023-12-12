var board = document.getElementById("board")
var side = document.getElementsByClassName("side")
var revive_window = document.getElementById("revive_screen")
var revive_items = document.getElementById("revive_items")
var player = true
var tab = []
var pices = [{ class: "fa-solid fa-chess-pawn", id2: "solid", id1: "pawn", li: 1, co: 0 }, { class: "fa-solid fa-chess-pawn", id2: "solid", id1: "pawn", li: 1, co: 1 }, { class: "fa-solid fa-chess-pawn", id2: "solid", id1: "pawn", li: 1, co: 2 }, { class: "fa-solid fa-chess-pawn", id2: "solid", id1: "pawn", li: 1, co: 3 }, { class: "fa-solid fa-chess-pawn", id2: "solid", id1: "pawn", li: 1, co: 4 }, { class: "fa-solid fa-chess-pawn", id2: "solid", id1: "pawn", li: 1, co: 5 }, { class: "fa-solid fa-chess-pawn", id2: "solid", id1: "pawn", li: 1, co: 6 }, { class: "fa-solid fa-chess-pawn", id2: "solid", id1: "pawn", li: 1, co: 7 }, { class: "fa-solid fa-chess-rook", id2: "solid", id1: "rook", li: 0, co: 0 }, { class: "fa-solid fa-chess-knight", id2: "solid", id1: "knight", li: 0, co: 1 }, { class: "fa-solid fa-chess-bishop", id2: "solid", id1: "bishop", li: 0, co: 2 }, { class: "fa-solid fa-chess-king", id2: "solid", id1: "king", li: 0, co: 3 }, { class: "fa-solid fa-chess-queen", id2: "solid", id1: "queen", li: 0, co: 4 }, { class: "fa-solid fa-chess-bishop", id2: "solid", id1: "bishop", li: 0, co: 5 }, { class: "fa-solid fa-chess-knight", id2: "solid", id1: "knight", li: 0, co: 6 }, { class: "fa-solid fa-chess-rook", id2: "solid", id1: "rook", li: 0, co: 7 }, { class: "fa-regular fa-chess-pawn", id2: "regular", id1: "pawn", li: 6, co: 0 }, { class: "fa-regular fa-chess-pawn", id2: "regular", id1: "pawn", li: 6, co: 1 }, { class: "fa-regular fa-chess-pawn", id2: "regular", id1: "pawn", li: 6, co: 2 }, { class: "fa-regular fa-chess-pawn", id2: "regular", id1: "pawn", li: 6, co: 3 }, { class: "fa-regular fa-chess-pawn", id2: "regular", id1: "pawn", li: 6, co: 4 }, { class: "fa-regular fa-chess-pawn", id2: "regular", id1: "pawn", li: 6, co: 5 }, { class: "fa-regular fa-chess-pawn", id2: "regular", id1: "pawn", li: 6, co: 6 }, { class: "fa-regular fa-chess-pawn", id2: "regular", id1: "pawn", li: 6, co: 7 }, { class: "fa-regular fa-chess-rook", id2: "regular", id1: "rook", li: 7, co: 0 }, { class: "fa-regular fa-chess-knight", id2: "regular", id1: "knight", li: 7, co: 1 }, { class: "fa-regular fa-chess-bishop", id2: "regular", id1: "bishop", li: 7, co: 2 }, { class: "fa-regular fa-chess-king", id2: "regular", id1: "king", li: 7, co: 3 }, { class: "fa-regular fa-chess-queen", id2: "regular", id1: "queen", li: 7, co: 4 }, { class: "fa-regular fa-chess-bishop", id2: "regular", id1: "bishop", li: 7, co: 5 }, { class: "fa-regular fa-chess-knight", id2: "regular", id1: "knight", li: 7, co: 6 }, { class: "fa-regular fa-chess-rook", id2: "regular", id1: "rook", li: 7, co: 7 }]
var enemy = 0
var friend = 0
var clicked
for (var li = 0; li <= 7; li++) {
    tab.push([])
    for (var co = 0; co <= 7; co++) {
        var element = document.createElement("div")
        element.classList.add("board_unity")
        element.dataset.li = li
        element.dataset.co = co
        element.addEventListener("click", function () {
            play(this)
        })
        if (li % 2 != 0) {
            if (co % 2 == 0) {
                element.style.backgroundColor = "grey"
            } else {
                element.style.backgroundColor = "white"
            }
        } else {
            if (co % 2 == 0) {
                element.style.backgroundColor = "white"
            } else {
                element.style.backgroundColor = "grey"
            }
        }
        tab[li].push(element)
        board.appendChild(element)
    }
}
for (var i in pices) {
    var element = document.createElement("i")
    element.className = pices[i].class
    element.dataset.id1 = pices[i].id1
    element.dataset.id2 = pices[i].id2
    if (pices[i].id1 == "pawn") {
        element.dataset.fplay = 0
    }
    tab[Number(pices[i].li)][Number(pices[i].co)].appendChild(element)
}
function cleaner() {
    for (var li in tab) {
        for (var co in tab[li]) {
            if (li % 2 != 0) {
                if (co % 2 == 0) {
                    tab[li][co].style.backgroundColor = "grey"
                } else {
                    tab[li][co].style.backgroundColor = "white"
                }
            } else {
                if (co % 2 == 0) {
                    tab[li][co].style.backgroundColor = "white"
                } else {
                    tab[li][co].style.backgroundColor = "grey"
                }
            }
        }
    }
}
function verifyer(id2, li, co, attack, attack_pawn) {
    if (tab[li][co].children[0] == undefined && !attack) {
        tab[li][co].style.backgroundColor = "blue"
    } else if (tab[li][co].children[0] != undefined && tab[li][co].children[0].dataset.id2 != id2 && attack) {
        tab[li][co].style.backgroundColor = "blue"
        enemy++
    } else if (tab[li][co].children[0] != undefined && tab[li][co].children[0].dataset.id2 == id2 && attack) {
        friend++
    } else if (tab[li][co].children[0] == undefined && attack && attack_pawn) {
        tab[li][co].style.backgroundColor = "blue"
        if (enemy == 1) {
            enemy++
        }
    }
}
function pawn(id2, li, co) {
    var element = tab[li][co].children[0]
    if (id2 == "regular") {
        if (li > 0) {
            verifyer(id2, li - 1, co, false, true)
            if (co > 0) {
                verifyer(id2, li - 1, co - 1, true, false)
            }
            if (co < 7) {
                verifyer(id2, li - 1, co + 1, true, false)
            }
            if (element.dataset.fplay == 0 && li > 1 && tab[li-1][co].children[0] == undefined) {
                verifyer(id2, li - 2, co, false, true)
            }
        }
    } else {
        if (li < 7) {
            verifyer(id2, li + 1, co, false, true)
            if (co > 0) {
                verifyer(id2, li + 1, co - 1, true, false)
            }
            if (co < 7) {
                verifyer(id2, li + 1, co + 1, true, false)
            }
            if (element.dataset.fplay == 0 && li < 6 && tab[li+1][co].children[0] == undefined) {
                verifyer(id2, li + 2, co, false, true)
            }
        }
    }
}
function knight(id2, li, co) {
    if (li > 1) {
        if (co > 0) {
            verifyer(id2, li - 2, co - 1, true, true)
        }
        if (co < 7) {
            verifyer(id2, li - 2, co + 1, true, true)
        }
    }
    if (co > 1) {
        if (li > 0) {
            verifyer(id2, li - 1, co - 2, true, true)
        }
        if (li < 7) {
            verifyer(id2, li + 1, co - 2, true, true)
        }
    }
    if (li < 6) {
        if (co > 0) {
            verifyer(id2, li + 2, co - 1, true, true)
        }
        if (co < 7) {
            verifyer(id2, li + 2, co + 1, true, true)
        }
    }
    if (co < 6) {
        if (li > 0) {
            verifyer(id2, li - 1, co + 2, true, true)
        }
        if (li < 7) {
            verifyer(id2, li + 1, co + 2, true, true)
        }
    }
}
function rook(id2, li, co) {
    if (li > 0) {
        for (var i = li - 1; i >= 0; i--) {
            if (enemy == 0 && friend == 0) {
                verifyer(id2, i, co, true, true)
            }
        }
        enemy = 0
        friend = 0
    }
    if (li < 7) {
        for (var i = li + 1; i <= 7; i++) {
            if (enemy == 0 && friend == 0) {
                verifyer(id2, i, co, true, true)
            }
        }
        enemy = 0
        friend = 0
    }
    if (co > 0) {
        for (var i = co - 1; i >= 0; i--) {
            if (enemy == 0 && friend == 0) {
                verifyer(id2, li, i, true, true)
            }
        }
        enemy = 0
        friend = 0
    }
    if (co < 7) {
        for (var i = co + 1; i <= 7; i++) {
            if (enemy == 0 && friend == 0) {
                verifyer(id2, li, i, true, true)
            }
        }
        enemy = 0
        friend = 0
    }
}
function bishop(id2, li, co) {
    if (li > 0 && co > 0) {
        for (var i1 = li - 1, i2 = co - 1; i1 >= 0 && i2 >= 0; i1--, i2--) {
            if (enemy == 0 && friend == 0) {
                verifyer(id2, i1, i2, true, true)
            }
        }
        enemy = 0
        friend = 0
    }
    if (li > 0 && co < 7) {
        for (var i1 = li - 1, i2 = co + 1; i1 >= 0 && i2 <= 7; i1--, i2++) {
            if (enemy == 0 && friend == 0) {
                verifyer(id2, i1, i2, true, true)
            }
        }
        enemy = 0
        friend = 0
    }
    if (li < 7 && co < 7) {
        for (var i1 = li + 1, i2 = co + 1; i1 <= 7 && i2 <= 7; i1++, i2++) {
            if (enemy == 0 && friend == 0) {
                verifyer(id2, i1, i2, true, true)
            }
        }
        enemy = 0
        friend = 0
    }
    if (li < 7 && co > 0) {
        for (var i1 = li + 1, i2 = co - 1; i1 <= 7 && i2 > 0; i1++, i2--) {
            if (enemy == 0 && friend == 0) {
                verifyer(id2, i1, i2, true, true)
            }
        }
        enemy = 0
        friend = 0
    }
}
function king(id2, li, co) {
    if (li > 0) {
        verifyer(id2, li - 1, co, true, true)
        if (co > 0) {
            verifyer(id2, li - 1, co - 1, true, true)
        }
        if (co < 7) {
            verifyer(id2, li - 1, co + 1, true, true)
        }
    }
    if (li < 7) {
        verifyer(id2, li + 1, co, true, true)
        if (co > 0) {
            verifyer(id2, li + 1, co - 1, true, true)
        }
        if (co < 7) {
            verifyer(id2, li + 1, co + 1, true, true)
        }
    }
    if (co > 0) {
        verifyer(id2, li, co - 1, true, true)
    }
    if (co < 7) {
        verifyer(id2, li, co + 1, true, true)
    }
}
function next_play(clicked, element) {
    if (element.children[0] != undefined) {
        if (element.children[0].dataset.id1 == "king") {
            alert("ganhaste")
        }
        if (element.children[0].dataset.id2 == "solid") {
            side[0].appendChild(element.children[0])
        } else {
            side[1].appendChild(element.children[0])
        }
    }
    if (clicked.dataset.id1 == "pawn" && clicked.dataset.fplay == 0) {
        clicked.dataset.fplay = 1
    }
    element.appendChild(clicked)
    if (player) {
        player = false
    } else {
        player = true
    }
    cleaner()
    if (element.dataset.li == 0 && clicked.dataset.id1 == "pawn" && clicked.dataset.id2 == "regular") {
        revive(clicked, element, true)
    } else if (element.dataset.li == 7 && clicked.dataset.id1 == "pawn" && clicked.dataset.id2 == "solid") {
        revive(clicked, element, false)
    }
}
function revive(clicked, element, pice_id2) {
    var open_menu = false
    var to_revive = false
    if (pice_id2) {
        pice_id2 = 1
    } else {
        pice_id2 = 0
    }
    for (var i = 0; i <= side[pice_id2].children.length - 1; i++) {
        var revive_pice = side[pice_id2].children[i]
        switch (revive_pice.dataset.id1) {
            case "queen":
                to_revive = true
                break
            case "bishop":
                to_revive = true
                break
            case "knight":
                to_revive = true
                break
        }
    }
    if (to_revive) {
        revive_screen.style.display = "flex"
        revive_screen.style.animation = "show_re_menu 0.25s forwards"
        for (var i = 0; i <= side[pice_id2].children.length - 1; i++) {
            var revive_pice = side[pice_id2].children[i]
            if (revive_pice.dataset.id1 == "queen" || revive_pice.dataset.id1 == "bishop" || revive_pice.dataset.id1 == "knight") {
                revive_pice.addEventListener("click", want_revive)
                revive_items.appendChild(revive_pice)
            }
        }
    }
}
function want_revive() {
    revive_this(this)
}
function revive_this(element) {
    var side_number
    var son_count
    var location = clicked.parentNode
    if (element.dataset.id2 == "regular") {
        side_number = 1
    } else {
        side_number = 0
    }
    element.removeEventListener("click", want_revive)
    side[side_number].appendChild(location.children[0])
    location.appendChild(element)
    son_count = revive_items.children.length - 1
    for (var i = 0; i <= son_count; i++) {
        revive_items.children[0].removeEventListener("click", want_revive)
        side[side_number].appendChild(revive_items.children[0])
    }
    revive_screen.style.animation = "unshow_re_menu 0.25s ease"
    setTimeout(() => {
        revive_screen.style.display = "none"
    }, 250);
}
function close_revive(element) {
    element = element.parentNode.parentNode.children[1].children[0].children[0]
    var side_number
    var son_count = revive_items.children.length - 1
    if (element.dataset.id2 == "regular") {
        side_number = 1
    } else {
        side_number = 0
    }
    for (var i = 0; i <= son_count; i++) {
        revive_items.children[0].removeEventListener("click", want_revive)
        side[side_number].appendChild(revive_items.children[0])
    }
    revive_screen.style.animation = "unshow_re_menu 0.25s ease"
    setTimeout(() => {
        revive_screen.style.display = "none"
    }, 250);
}
function play(element) {
    if (element.style.backgroundColor == "blue") {
        next_play(clicked, element)
    } else if (player && element.children[0].dataset.id2 == "regular" || !player && element.children[0].dataset.id2 == "solid") {
        cleaner()
        var li = Number(element.dataset.li)
        var co = Number(element.dataset.co)
        element = element.children[0]
        clicked = element
        if (element.dataset.id1 == "pawn") {
            pawn(element.dataset.id2, li, co)
        } else if (element.dataset.id1 == "knight") {
            knight(element.dataset.id2, li, co)
        } else if (element.dataset.id1 == "rook") {
            rook(element.dataset.id2, li, co)
        } else if (element.dataset.id1 == "bishop") {
            bishop(element.dataset.id2, li, co)
        } else if (element.dataset.id1 == "queen") {
            rook(element.dataset.id2, li, co)
            enemy = 0
            friend = 0
            bishop(element.dataset.id2, li, co)
        } else if (element.dataset.id1 == "king") {
            king(element.dataset.id2, li, co)
        }
        enemy = 0
        friend = 0
    } else {
        if (player) {
            alert("vez de P1")
        } else {
            alert("vez de P2")
        }
    }
}