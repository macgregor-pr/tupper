 // This is used to plot the formula.
 function displayFormula() {
    var k = bigInt(document.forms["plotFormula"]["k"].value);
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

        var baseXPower = bigInt(2);
        for (x = 0; x < 106; x++){
            for (y = k; y.lesser(k.plus(17)); y.plus(1)){
                var power = baseXPower;
                for (i = bigInt(0); i.lesser(y.mod(17)); i.plus(1)){
                    power = power.times(2);
                }
                console.log(power);
                var test_val = bigInt(y).divide(17).divide(power).valueOf();
                console.log(test_val);
                //test_val = Math.floor((Math.floor(y/17) / power) % 2);
                //var test = Math.floor(y/17);
                //console.log(test);
                //console.log(test_val);
                if (test_val > 0.5){
                    context.fillRect(60 + x*6, 126 - (y.minus(k).valueOf())*6, 6, 6);
                }
            }
            for (j = 0; j < 17; j++){
                baseXPower = baseXPower.times(2);
            }
        }
    }
}