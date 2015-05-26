 var draw_grid_colored = new Array(106);
 for (var i = 0; i < 106; i++){
    draw_grid_colored[i] = new Array(17);
    for (var j = 0; j < 17; j++){
        draw_grid_colored[i][j] = false;
    }
 }

 // This is used to plot the formula.
 function displayFormula() {
    try {
        // Calculate the string for the lower and higher multiples of 17.
        var input = bigInt(document.getElementById("k").value);
        var remainder = input.mod(17);
        var k = input.divide(17);
        var lower_string = k.toString(2);
        var higher_string = k.add(1).toString(2);
    } catch(err){
        alert("Please enter a valid number.");
        throw "Could not parse k.";   
    }
 
    var plotting_canvas = document.getElementById("plot");
    var plotting_context = plotting_canvas.getContext("2d");
    plotting_context.clearRect(0, 0, plotting_canvas.width, plotting_canvas.height);

    drawAxes();

    // Loop over columns, begining at the right side.
    for (x = 105; x >= 0; x--){

        // Remove the unused values for this column in the higher string.
        if (remainder > 0){
            if (higher_string.length >= (17 - remainder)){
               higher_string = higher_string.slice(0, -(17 - remainder));
            } else {
                higher_string = "";
            }
        }

        // Loop over the row in the column, beginning at the top.
        for (y = 16; y >= 0; y--){

            // Should this cell be coloured?
            var colour = false;

            if ((17 - y) <= remainder){
                // If we're in the region of the higher number.
                if (higher_string.length > 0){
                    if (higher_string.substr(higher_string.length - 1) == "1"){
                        colour = true;
                    }
                    higher_string = higher_string.slice(0, -1);
                }
            } else {
                // if we're in the region of the smaller number.
                if (lower_string.length > 0){
                    if (lower_string.substr(lower_string.length - 1) == "1"){
                        colour = true;
                    }
                    lower_string = lower_string.slice(0, -1);
                }
            }

            // Colour the cell if needed.
            if (colour){
                plotting_context.fillRect(60 + x*6, 126 - (y)*6, 6, 6);
            }
        }

        // Remove the unused values for this column in the lower string.
        if (remainder > 0){
            if (lower_string.length >= remainder){
                lower_string = lower_string.slice(0, -remainder);
            } else {
                lower_string = "";
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

// Called when the user clicks on the drawing canvas.
function drawClick(event){
    // Position code credit to http://miloq.blogspot.co.uk/2011/05/coordinates-mouse-click-canvas.html
    var x = new Number();
    var y = new Number();
    var drawing_canvas = document.getElementById("draw");

    x = event.clientX + document.body.scrollLeft;// + document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop;// + document.documentElement.scrollTop;

    x -= drawing_canvas.offsetLeft;
    y -= drawing_canvas.offsetTop;
    console.log("clientY: " + event.clientY + " bodyScroll: " + document.body.scrollTop + " elementScroll: " + document.documentElement.scrollTop);
    console.log("x: " + x + " y: " + y);
    var cell_x = Math.floor(x / 7);
    var cell_y = Math.floor(y / 7);

    draw_grid_colored[cell_x][cell_y] = (draw_grid_colored[cell_x][cell_y] == false);

    // Redraw the grid.
    drawGrid();

    // Calculate the new k value.
    var k = calculateK();
    var k_textarea = document.getElementById("k_textarea");
    k_textarea.value = k;
}

function clearGrid(){
    for (var i = 0; i < 106; i++){
        for (var j = 0; j < 17; j++){
            draw_grid_colored[i][j] = false;
        }
    }
    drawGrid();
    var k_textarea = document.getElementById("k_textarea");
    k_textarea.value = "0";
}

function invertGrid(){
    for (var i = 0; i < 106; i++){
        for (var j = 0; j < 17; j++){
            // For each element in the grid.

            // Invert the value of the element.
            draw_grid_colored[i][j] = (draw_grid_colored[i][j] == false);
        }
    }
    // Redraw the grid.
    drawGrid();

    // Recalculate the correct k value.
    var k = calculateK();
    var k_textarea = document.getElementById("k_textarea");
    k_textarea.value = k;
}

function updateGridFromTextArea(){
     try {
        // Calculate the string for the lower and higher multiples of 17.
        var input = bigInt(document.getElementById("k_textarea").value);
        var remainder = input.mod(17);
        var k = input.divide(17);
        var lower_string = k.toString(2);
        var higher_string = k.add(1).toString(2);
    } catch(err){
        throw "Could not parse textarea.";   
    }

    // Loop over columns, begining at the right side.
    for (x = 105; x >= 0; x--){

        // Remove the unused values for this column in the higher string.
        if (remainder > 0){
            if (higher_string.length >= (17 - remainder)){
               higher_string = higher_string.slice(0, -(17 - remainder));
            } else {
                higher_string = "";
            }
        }

        // Loop over the row in the column, beginning at the top.
        for (y = 16; y >= 0; y--){

            // Should this cell be coloured?
            var colour = false;

            if ((17 - y) <= remainder){
                // If we're in the region of the higher number.
                if (higher_string.length > 0){
                    if (higher_string.substr(higher_string.length - 1) == "1"){
                        colour = true;
                    }
                    higher_string = higher_string.slice(0, -1);
                }
            } else {
                // if we're in the region of the smaller number.
                if (lower_string.length > 0){
                    if (lower_string.substr(lower_string.length - 1) == "1"){
                        colour = true;
                    }
                    lower_string = lower_string.slice(0, -1);
                }
            }

            // Colour the cell if needed.
            draw_grid_colored[x][16 - y] = colour;
        }

        // Remove the unused values for this column in the lower string.
        if (remainder > 0){
            if (lower_string.length >= remainder){
                lower_string = lower_string.slice(0, -remainder);
            } else {
                lower_string = "";
            }
        }
    }

    // Redraw the grid.
    drawGrid();
}

// Calculate the correct k value for the grid in the
// draw_grid_colored array.
function calculateK(){
    var binaryString = "";
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
    return k;
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