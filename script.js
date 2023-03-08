const tools = document.querySelectorAll("[data-tool]")
const inputColor = document.querySelector(".input-color")
const inputBrushSize = document.querySelector(".input-brush-size")
const clearButton = document.querySelector(".clear-button")
const canvasContainer = document.querySelector(".canvas-container")

const canvas = document.querySelector(".canvas")

const ctx = canvas.getContext("2d")

ctx.lineWidth = 5
canvas.width = canvasContainer.clientWidth
canvas.height = (canvas.width / 16) * 9

let isDrawing = false
let selectedTool = "brush"
let color = "#000000"

function startDraw() {
	if (!selectedTool) return
	isDrawing = true
	ctx.beginPath()
}

function draw(e) {
	if (!isDrawing) return

	ctx.strokeStyle = color

	if (selectedTool === "eraser") {
		ctx.strokeStyle = "#ffffff"
	}

	const mouse = {
		x: e.offsetX ?? e.touches[0].pageX,
		y: e.offsetY ?? e.touches[0].pageY,
	}

	ctx.lineTo(mouse.x, mouse.y)
	ctx.stroke()
}

function stopDraw() {
	isDrawing = false
}

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", stopDraw)
canvas.addEventListener("touchstart", startDraw)
canvas.addEventListener("touchmove", draw)
canvas.addEventListener("touchend", stopDraw)

tools.forEach((tool) => {
	tool.addEventListener("click", () => {
		selectedTool = tool.dataset.tool
		tools.forEach((tool) => tool.classList.remove("selected"))
		tool.classList.add("selected")
	})
})

window.addEventListener("resize", () => {
	canvas.width = canvasContainer.clientWidth
	canvas.height = (canvas.width / 16) * 9
})

inputColor.addEventListener("change", (e) => {
	color = e.target.value
	inputBrushSize.style.accentColor = color
})

inputBrushSize.addEventListener("change", (e) => {
	ctx.lineWidth = e.target.value
})

clearButton.addEventListener("click", (e) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
})
