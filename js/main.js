//execute script when window is loaded
window.onload = function(){
    
    //SVG dimension variables
    var w = 900, h = 500;
    
    //container block
    var container = d3.select("body")  //get the <body> element from the DOM
        .append("svg") //put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") //always assign a class (as a block name) for styling and future selection
        .style("background-color", "rgba(0,0,0,0.2)"); //only put a semicolon at the end of the block!

    //innerRect block
    var innerRect = container.append("rect") //put a new rect in the svg
        .datum(400) //a single value is a datum
        .attr("width", function(d){
            return d * 2; //400 * 2 = 800
        }) //rectangle width
        .attr("height", function(d){
            return d; //400 //d is the data parameter
        }) //rectangle height
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color

    console.log(innerRect);
};