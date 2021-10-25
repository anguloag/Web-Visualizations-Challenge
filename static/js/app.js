// Function for chosing Test Subject ID Number in dropdown menu (optionChanged)
function optionChanged(value) {
    console.log(value);


    // Read in samples.jason with D3 library
    d3.json("samples.json").then(function(data) {
        console.log(data);


    });


}

// Read in samples.jason with D3 library
d3.json("samples.json").then(function(data) {
    console.log(data);

    var dropdownMenu = d3.select("#selDataset");

    // Create <option> elements for each ID number in "names"
    data.names.forEach(function(name) {
        dropdownMenu.append("option").text(name);
    });
    
    optionChanged(data);

});