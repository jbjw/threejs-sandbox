// utils library

console.log("utils.js loaded")
export function wrapArray(arr, cols) {
	const newArr = []
	// newArr[0] = []
	let col = 0
	let row = 0
	// console.log
	newArr[0] = []
	for (let i = 0; i < arr.length; i++) {
		console.log(`${i}`)

		if (col > cols-1) {
			console.log("end of row")
			row++
			newArr[row] = []
			// newArr.push([])
			col = 0
			newArr[row][col] = arr[i]
			col++
		} else {
			newArr[row][col] = arr[i]
			col++
		}
	}
	return newArr
}

export function unwrapArray(arr) {
	const newArr = []
	for (let i = 0; i++; i < arr.length) {
		// arr[i]
		for (let j = 0; j++; j < arr[i].length) {
			newArr.push(arr[i][j])
		}
	}
	return newArr
}

export function randint(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export function randomColor() {
	return new THREE.Color(`rgb(${randint(0,255)}, ${randint(0,255)}, ${randint(0,255)})`)
}

Math.sqrt()

export function chooseColor() {
	var colors = [
		new THREE.Color("rgb(100, 100, 100)"),
		new THREE.Color("rgb(150, 0, 0)"),
		new THREE.Color("rgb(0, 150, 0)"),
		new THREE.Color("rgb(0, 0, 150)"),
	]
	return colors.choose()
}
