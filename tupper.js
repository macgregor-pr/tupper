 var draw_grid_colored = new Array(106);
 for (var i = 0; i < 106; i++){
    draw_grid_colored[i] = new Array(17);
    for (var j = 0; j < 17; j++){
        draw_grid_colored[i][j] = false;
    }
 }

 // This is used to plot the formula.
 function displayFormula() {
    // Currently rounds down to the nearest multiple of 17.
    var k = bigInt(document.getElementById("k").value).divide(17).toString(2);
    if (false){
        alert("Please enter a number.");   
    } else {
        var plotting_canvas = document.getElementById("plot");
        var plotting_context = plotting_canvas.getContext("2d");
        plotting_context.clearRect(0, 0, plotting_canvas.width, plotting_canvas.height);

        drawAxes();

        for (x = 105; x >= 0; x--){
            for (y = 16; y >= 0; y--){
                var colour = false;
                if (k.length > 0){
                    if (k.substr(k.length - 1) == "1"){
                        colour = true;
                    }
                    k = k.slice(0, -1);
                }
                if (colour){
                    plotting_context.fillRect(60 + x*6, 126 - (y)*6, 6, 6);
                }
            }
        }
    }
}

function drawGrid(){
    var drawing_canvas = document.getElementById("draw");
    var drawing_context = drawing_canvas.getContext("2d");
    drawing_context.clearRect(0, 0, drawing_canvas.width, drawing_canvas.height);
    drawing_context.lineWidth = 1;

    // Size of canvas: 743 x 120

    drawing_context.beginPath();
    drawing_context.moveTo(0, 120);
    drawing_context.lineTo(0, 0);
    drawing_context.lineTo(743, 0);
    drawing_context.stroke();

    // Draw the vertical lines.
    for (i = 1; i < 107; i++){
        drawing_context.beginPath();
        drawing_context.moveTo(i*7, 0);
        drawing_context.lineTo(i*7, 120);
        drawing_context.stroke();
    }

    // Draw the horizontal lines.
    for (i = 1; i < 18; i++){
        drawing_context.beginPath();
        drawing_context.moveTo(0, i*7);
        drawing_context.lineTo(743, i*7);
        drawing_context.stroke();
    }

    // Fill in the grid.
    for (var i = 0; i < 106; i++){
        for (var j = 0; j < 17; j++){
            if (draw_grid_colored[i][j]){
                drawing_context.fillRect(i*7, j*7, 7, 7);
            }
        }
    }
}

function drawClick(event){
    // Position code credit to http://miloq.blogspot.co.uk/2011/05/coordinates-mouse-click-canvas.html
    var x = new Number();
    var y = new Number();
    var drawing_canvas = document.getElementById("draw");

    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

    x -= drawing_canvas.offsetLeft;
    y -= drawing_canvas.offsetTop;

    var cell_x = Math.floor(x / 7);
    var cell_y = Math.floor(y / 7);

    draw_grid_colored[cell_x][cell_y] = (draw_grid_colored[cell_x][cell_y] == false);

    // Redraw the grid.
    drawGrid();

    // Calculate the new k value.
    var binaryString = ""
    for (var i = 0; i < 106; i++){
        for (var j = 16; j >= 0; j--){
            if (draw_grid_colored[i][j]){
                binaryString += "1";
            } else {
                binaryString += "0";
            }
        }
    }
    var k = bigInt(binaryString, 2).times(17).toString(10);
    var k_textarea = document.getElementById("k_textarea");
    k_textarea.value = k;
}

function drawAxes(){
    var plotting_canvas = document.getElementById("plot");
    var plotting_context = plotting_canvas.getContext("2d");
    plotting_context.clearRect(0, 0, plotting_canvas.width, plotting_canvas.height);

    // Size of canvas is 736 x 182.

    // Draw the axes.
    plotting_context.beginPath();
    plotting_context.moveTo(50, 20);
    plotting_context.lineTo(50, 142);
    plotting_context.lineTo(706, 142);
    plotting_context.stroke();

    // Draw axes markers.
    plotting_context.beginPath();
    plotting_context.moveTo(40, 30);
    plotting_context.lineTo(50, 30);
    plotting_context.stroke();
    plotting_context.beginPath();
    plotting_context.moveTo(40, 132);
    plotting_context.lineTo(50, 132);
    plotting_context.stroke();
    plotting_context.beginPath();
    plotting_context.moveTo(60, 152);
    plotting_context.lineTo(60, 142);
    plotting_context.stroke();
    plotting_context.beginPath();
    plotting_context.moveTo(696, 152);
    plotting_context.lineTo(696, 142);
    plotting_context.stroke();

    // Draw the axes labels.
    plotting_context.font = "13px Arial";
    plotting_context.fillText("k + 17", 0, 35);
    plotting_context.fillText("k", 30, 137);
    plotting_context.fillText("0", 56, 166);
    plotting_context.fillText("106", 685, 166);
}

function setUp(){
    drawGrid();
    drawAxes();
    var drawing_canvas = document.getElementById("draw");
    drawing_canvas.addEventListener("mousedown", drawClick, false);
    var k_textarea = document.getElementById("k_textarea");
    k_textarea.value = "0";
}

window.onload = setUp;