var gradient = document.getElementById("gradient")
var temp_input = document.getElementById("grad_temp").children[1]
var intens_input = document.getElementById("grad_intensity").children[1]
var temp_indicator = document.getElementById("temp_value")
var fire_colors = [
    ["#990000","#9F0600","#A40B00","#AA1100","#B01700","#B51D00","#BB2200","#C12800","#C62E00","#CC3400","#D23900","#D73F00","#DD4500","#E34A00","#E85000","#EE5600","#F45C00","#F96100","#FF6700","#FF6F06","#FF780B","#FF8011","#FF8917","#FF911C","#FF9A22","#FFA228","#FFAB2D","#FFB333","#FFBB39","#FFC43E","#FFCC44","#FFD54A","#FFDD4F","#FFE655","#FFEE5B","#FFF660","#FFFF66"],
    ["#FFFF66", "#FFFF70", "#FFFF7A", "#FFFF84", "#FFFF8E", "#FFFF98", "#FFFFA2", "#FFFFAC", "#FFFFB6", "#FFFFC0","#FFFFCA", "#FFFFD4", "#FFFFDE", "#FFFFE8", "#FFFFF2", "#FFFFFC", "#FFFFFF", "#FCFEFF", "#F9FDFF", "#F6FCFF","#F3FBFF", "#F0FAFF", "#EDFAFF", "#EAF9FF", "#E7F8FF", "#E4F7FF", "#E2F6FF", "#E0F6FF", "#DEF5FF", "#DCF4FF","#DAF3FF", "#D8F2FF", "#D6F1FF", "#D4F0FF", "#D2EFFF", "#D0EEFF", "#CEEDFF"],
    ['#4a0080', '#4a1186', '#4a1c8c', '#4a2692', '#4a2e98', '#4a369d', '#4a3da2', '#4a44a7', '#4b4bac', '#4b52b0', '#4c59b4', '#4e60b9', '#4f66bc', '#516dc0', '#5473c4', '#5679c7', '#5a80ca', '#5d86cd', '#618cd0', '#6692d3', '#6a99d6', '#709fd8', '#75a5db', '#7babdd', '#81b1e0', '#88b7e2', '#8fbde4', '#96c3e7', '#9dc9e9', '#a5ceec', '#add4ee', '#b5daf1', '#bde0f3', '#c5e5f6', '#ceebf9', '#d7f0fc', '#e0f6ff'],
]
var fire_color_value = 0
var fire_value = []
for (var i = 0; i <= 49; i ++) {
    var line = []
    var li = i
    for (var i2 = 0; i2 <= 49; i2 ++) {
        var co = i2
        line.push({li: li, co: co, value: i == 49 ? 36 : 0})
        var fire_unity = document.createElement("div")
        fire_unity.className = "fire_unity"
        gradient.appendChild(fire_unity)
    }
    fire_value.push(line)
}
var fire_unity = document.getElementsByClassName("fire_unity")
var fire_intensity = 7
var measure = false
var wind_value = 1
function on_measure() {
    measure = true
}
function off_measure() {
    measure = false
}
function intensity(element) {
    if (measure) {
        fire_intensity = Number(element.value) / 100
    }
}
function temp_conversor(temp_value) {
    var temp_value = (temp_value / 2000 * 23000) + 2500
    if (temp_type == 1) {
        temp_value = (temp_value - 273)
    } else if (temp_type == 2) [
        temp_value = ((temp_value - 273) / 5 * 9) + 32
    ]
    return temp_value.toFixed(2)
}
var temp_type = 0
function temperature(element) {
    var temp = Number(element.value)
    var intensity_value = temp > 1000 ? temp - (Number.parseInt(temp / 1000) * 1000) : temp
    if (measure) {
        intensity({value: intensity_value})
        intens_input.value = intensity_value
        fire_color_value = Number.parseInt(temp / 1000)
    }
    temp_indicator.innerHTML = `${temp_conversor(temp)}°`
}
function wind_change(element) {
    wind_value = Number(element.value)
}
function temp_change(element) {
    var temp = Number(temp_input.value)
    temp_type = Number(element.value)
    temp_indicator.innerHTML = `${temp_conversor(temp)}°`
}
function sum_value_calc(value) {
    var new_value
    if (value < 10) {
        new_value = Math.floor(Math.random() * 3) == 0 ? 0 : (Math.floor(Math.random() * (10 - fire_intensity)) + 1)
    } else {
        new_value = Math.floor(Math.random() * (10 - fire_intensity)) + 1
    }
    return new_value
}
function value_calc() {
    for (var fire of fire_value[49]) {
        for (var i = 48; i >= 0; i --) {
            var beforeFireUnityValue = fire_value[i+1][fire.co + wind_value > 49 ? 0 : fire.co + wind_value].value
            var sum_value = sum_value_calc(beforeFireUnityValue)
            fire_value[i][fire.co].value = beforeFireUnityValue - Number(sum_value)
        }
    }
}
function fire_render() {
    for (var i in fire_value) {
        for (fire of fire_value[i]) {
            fire_unity[fire.co + (fire.li * 50)].style.backgroundColor = fire.value < 0 ? "black" : fire_colors[fire_color_value][fire.value]
        }
    }
}
setInterval(() => {
    value_calc()
    fire_render()
}, 100);

