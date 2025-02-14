var array1 = [1, 2, 3, 4, 5, 6]
var array2 = [2, 4, 6]
for (var i in array1) {
    if (array1[i] % 2 == 0) {
        console.log(array2[i - (i > array2.length-1 ? array1.length - array2.length : 0)]);
    }
}
