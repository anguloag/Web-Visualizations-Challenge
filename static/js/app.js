// Function for chosing Test Subject ID Number in dropdown menu (optionChanged)
function optionChanged(idNum) {
    console.log(idNum);

    // Read in samples.json with D3 library
    d3.json("samples.json").then(function(data) {
        //console.log(data);

        // Pull metadata values for matching subject ID Number
        var metadata = Object.values(data.metadata.filter(function(dataset){
            return dataset.id.toString() == idNum;
        }));
        console.log(metadata);
        //metadata = metadata[0]

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
    
    // Use optionChanged function to set default plots
    optionChanged(data);

});