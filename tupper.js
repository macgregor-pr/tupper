 // This is used to plot the formula.
 function displayFormula() {
    // Currently rounds down to the nearest multiple of 17.
    var k = bigInt(document.forms["plotFormula"]["k"].value).divide(17).toString(2);
    if (false){
        alert("Please enter a number.");   
    } else {
        var plotting_canvas = document.getElementById("plot");
        var context = plotting_canvas.getContext("2d");
        context.clearRect(0, 0, plotting_canvas.width, plotting_canvas.height);

        // Size of canvas is 736 x 182.

        // Draw the axes.
        context.beginPath();
        context.moveTo(50, 20);
        context.lineTo(50, 142);
        context.lineTo(706, 142);
        context.stroke();

        // Draw axes markers.
        context.beginPath();
        context.moveTo(40, 30);
        context.lineTo(50, 30);
        context.stroke();
        context.beginPath();
        context.moveTo(40, 132);
        context.lineTo(50, 132);
        context.stroke();
        context.beginPath();
        context.moveTo(60, 152);
        context.lineTo(60, 142);
        context.stroke();
        context.beginPath();
        context.moveTo(696, 152);
        context.lineTo(696, 142);
        context.stroke();

        // Draw the axes labels.
        context.font = "13px Arial";
        context.fillText("k + 17", 0, 35);
        context.fillText("k", 30, 137);
        context.fillText("0", 56, 166);
        context.fillText("106", 685, 166);

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
                    context.fillRect(60 + x*6, 126 - (y)*6, 6, 6);
                }
            }
        }
    }
}