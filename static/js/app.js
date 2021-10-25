// Function for chosing Test Subject ID Number in dropdown menu (optionChanged)
function optionChanged(idNum) {
    console.log(idNum);

    // Read in samples.json with D3 library
    d3.json("samples.json").then(function(data) {

        // Pull metadata values for matching subject ID Number
        metadata = Object.values(data.metadata.filter(function(findMeta) {
            return findMeta.id.toString() == idNum;
        }));
        metadata = metadata[0];
        console.log(metadata);

        // Pull sample values for matching subject ID Number
        samples = Object.values(data.samples.filter(function(findSample) {
            return findSample.id.toString() == idNum;
        }));
        samples = samples[0];
        console.log(samples);

        // Sort samples by sample_values in descending order
        samples.sample_values.sort(function sortFunction(a, b) {
            return b - a;
        });

        // Slice the top 10 values for sample_values, otu_ids, and otu_labels
        sample_values = samples.sample_values.slice(0, 10).reverse();
        otu_ids = samples.otu_ids.slice(0, 10).reverse();
        otu_labels = samples.otu_labels.slice(0, 10).reverse();
        console.log(sample_values, otu_ids, otu_labels);


        // Create horizontal bar chart with top 10 OTUs found for the subject
        // -- lables on y axis for horizontal chart
        var barGraph = [{
            x: sample_values,
            y: otu_ids.map(function(otuID) {return `OTU ${otuID}`;}),
            type: "bar",
            orientation: "h",
            hoverinfo: "text",
            hovertext: otu_labels
        }];

        Plotly.newPlot("bar", barGraph);

        d3.select("#sample-metadata").html("");
        Object.entries(metadata).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
        });

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
    optionChanged("940");

});