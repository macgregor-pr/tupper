 var draw_grid_colored = new Array(106);
 for (var i = 0; i < 106; i++){
    draw_grid_colored[i] = new Array(17);
    for (var j = 0; j < 17; j++){
        draw_grid_colored[i][j] = false;
    }
 }

 // This is used to plot the formula.
 function displayFormula() {

    var plotting_canvas = document.getElementById("plot");
    var plotting_context = plotting_canvas.getContext("2d");
    plotting_context.clearRect(0, 0, plotting_canvas.width, plotting_canvas.height);

    drawAxes();

    // Fill in the grid.
    for (var i = 0; i < 106; i++){
        for (var j = 0; j < 17; j++){
            if (draw_grid_colored[i][j]){
                plotting_context.fillRect(60 + i*6, 30 + j*6, 6, 6);
            }
        }
    }
}

// Called when the user clicks on the plotting canvas.
function drawClick(event){

    // Determine where the user clicked.
    // Position code credit to http://miloq.blogspot.co.uk/2011/05/coordinates-mouse-click-canvas.html
    var x = new Number();
    var y = new Number();
    var drawing_canvas = document.getElementById("plot");

    x = event.clientX + document.body.scrollLeft;
    y = event.clientY + document.body.scrollTop;

    x -= drawing_canvas.offsetLeft;
    y -= drawing_canvas.offsetTop;

    // Subtract the offset within the canvas
    x -= 60;
    y -= 30

    var cell_x = Math.floor(x / 6);
    var cell_y = Math.floor(y / 6);

    if (cell_x >= 0 && cell_x <= 105 && cell_y >= 0 && cell_y <= 16){
        // Invert the cell which was clicked on.
        draw_grid_colored[cell_x][cell_y] = (draw_grid_colored[cell_x][cell_y] == false);

        // Redraw the grid.
        displayFormula();

        // Calculate the new k value.
        var k = calculateK();
        var k_textarea = document.getElementById("k");
        k_textarea.value = k;
    }
}

// Called when the 'clear grid' button is pressed.
function clearGrid(){
    for (var i = 0; i < 106; i++){
        for (var j = 0; j < 17; j++){
            draw_grid_colored[i][j] = false;
        }
    }
    displayFormula();
    var k_textarea = document.getElementById("k");
    k_textarea.value = "0";
}

// Called when the 'invert grid' button is pressed.
function invertGrid(){
    for (var i = 0; i < 106; i++){
        for (var j = 0; j < 17; j++){
            // For each element in the grid.

            // Invert the value of the element.
            draw_grid_colored[i][j] = (draw_grid_colored[i][j] == false);
        }
    }
    // Redraw the grid.
    displayFormula();

    // Recalculate the correct k value.
    var k = calculateK();
    var k_textarea = document.getElementById("k");
    k_textarea.value = k;
}

function updateGridFromTextArea(){
     try {
        // Calculate the string for the lower and higher multiples of 17.
        if (document.getElementById("k").value.indexOf("e") == -1){
            var input = bigInt(document.getElementById("k").value);
            var remainder = input.mod(17);
            var k = input.divide(17);
            var lower_string = k.toString(2);
            var higher_string = k.add(1).toString(2);
        } else {
            throw "Could not parse textarea.";
        }
    } catch(err){
        throw "Could not parse textarea.";   
    }

    // Loop over columns
    for (x = 0; x < 106; x++){

        // Remove the unused values for this column in the higher string.
        if (remainder > 0){
            if (higher_string.length >= (17 - remainder)){
               higher_string = higher_string.slice(0, -(17 - remainder));
            } else {
                higher_string = "";
            }
        }

        // Loop over the row in the column
        for (y = 0; y < 17; y++){

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
    displayFormula();
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
    drawAxes();
    var plotting_canvas = document.getElementById("plot");
    plotting_canvas.addEventListener("mousedown", drawClick, false);
    var k_textarea = document.getElementById("k");
    k_textarea.value = "0";
}

window.onload = setUp;