//begin script when window loads
window.onload = setMap();

//set up chloropleth map
function setMap() {
    //map frame dimensions
    var width = 1000,
        height = 1000;

    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create custom conic equal area projection
    var projection = d3.geoConicEqualArea()
        .parallels([33, 45])
        .scale(5600)
        .translate([-270, 780])
        .rotate([120, 0])
        .center([-10, 34]);

    //create a path generator using the projection
    var path = d3.geoPath().projection(projection);

    //use Promise.all to parallelize asynchronous data loading
    var promises = [];
    promises.push(d3.csv("data/Cali_County_Data.csv")); //load attributes from csv
    promises.push(d3.json("data/Surrounding_Cali_States_Provinces.topojson"));
    promises.push(d3.json("data/California_Counties.topojson")); //load choropleth spatial data
    Promise.all(promises).then(callback);

    function callback(data) {
        var csvData = data[0],
            caliCounties = data[2],
            surrounding = data[1];

        console.log("csvData: ", csvData);
        console.log("California Counties topojson: ", caliCounties);
        console.log("Surrounding States topojson: ", surrounding);

        //translate topoJSONs back to GeoJSON
        var californiaCounties = topojson.feature(caliCounties, caliCounties.objects.California_Counties).features;
        var surroundingStates = topojson.feature(surrounding, surrounding.objects.Surrounding_Cali_States_Provinces).features;

            // create graticule generator
            var graticule = d3.geoGraticule()
            .step([5, 5]); //place graticule lines every 5 degrees of longitude and latitude

        //create graticule background
        var gratBackground = map.append("path")
            .datum(graticule.outline()) //bind graticule background
            .attr("class", "gratBackground") //assign class for styling
            .attr("d", path) //project graticule

        //create graticule lines
        var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
            .data(graticule.lines()) //bind graticule lines to each element to be created
            .enter() //create an element for each datum
            .append("path") //append each element to the svg as a path element
            .attr("class", "gratLines") //assign class for styling
            .attr("d", path); //project graticule lines

        //add California counties to map
        var counties = map.selectAll(".counties")
            .data(californiaCounties) //pass in the reconverted GeoJSON
            .enter()
            .append("path")
            .attr("class", function(d) {
                return "counties " + d.properties.NAME_ALT;
            })
            .attr("d", path);

        var states = map.selectAll(".states")
            .data(surroundingStates)
            .enter()
            .append("path")
            .attr("class", function(d) {
                return "states " + d.properties.name; //name of the name field is "name"
            })
            .attr("d", path);            


    }
};