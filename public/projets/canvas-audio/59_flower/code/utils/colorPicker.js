function colorPicker(canvas) {
	var colors = [
		["FFE7D0", "F0433a", "540032", "820333", "c9283e"],
		["060A18","DFF5F2", "46B7B9", "87DFD6", "DFF5F2"],
		["FFDBDE","F54EA2", "A94CAF", "7B3B8C", "41228E"],
		["DAFFF7","331940", "5E366A", "0CCA98", "00FFCC"],
	];

	var random = Math.floor(Math.random()*4);

	return colors[random]
}