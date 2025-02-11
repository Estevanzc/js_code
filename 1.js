var string = "estevan"
for (var i = 0; i <= string.length-1; i++) {
    var char = string[i]
    var char_num = string.match(new RegExp(char, "g"))
    if (char_num && char_num.length == 1) {
        console.log(char)
        break;
    }
}
