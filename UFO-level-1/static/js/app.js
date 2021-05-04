// from data.js
var tableData = data;
var ufoSighting = "";

// YOUR CODE HERE!
// select the table body
var tbody = d3.select("tbody");

// select the user input form field
var dateSelect = d3.select("#datetime");

// select the filter table button
var filterButton = d3.select("#filter-btn");

// select the 'Reset Table' button
var resetButton = d3.select("#reset-btn");

// function to clear the table body to prepare for the new data display
function clearTable() {
	tbody.html("");
};

// create a function to reset the table to default
function resetTable() {
	// clear the current data
	clearTable();
	
	// use for each and obj values to populate the initial table
	data.forEach(() => {
		var row = tbody.append("tr");
		Object.values(ufoSighting).forEach(value => {
			var cell = row.append("td");
			cell.text(value);
			cell.attr("class", "table-style");
		}); // inner forEach close
	}); // outer forEach close

// populate the filter date from the dropdown menu
// create an array to store dates for option values
// using set to get unique values and then making  an arry from the set
	var dates = Array.from(new Set(data.map(sighting => sighting.datetime)));
	dates.forEach(date => {
		var option = dateSelect.append("option");
		option.text(date);
	});
};	// resetTable close

function updateFilterTable() {
	let change = d3.select(this);
	let elementvalue = change.property("value");
	let filterid = change.attr("id");
	if (elementvalue) {
		filters[filterid] = elementvalue;
	} else {
		delete filters[filterid];
	}
	filterTable();
};

// create a function to update table according to the date input by the user
function filterTable() {
	// prevent the page from refreshing
	d3.event.preventDefault();
	// get the user input for filtering
	var inputDate = dateSelect.property("value");
	var filteredData = data;
	
	// if there is a date input, filter the table according to the date
	if (inputDate) {
		filteredData = filteredData.filter(sighting => sighting.datetime ==  inputDate);
	}
	
	// reset the table
	clearTable();
	
	// use for each and object value to populate the tbody with filtered data
	filteredData.forEach((ufoSighting) => {
		// create a new row for each sighting object
		var row = tbody.append("tr");
		Object.values(ufoSighting).forEach(value => {
			// create a new cell for each item in the object
			var cell = row.append("td");
			// populate the td text with the value
			cell.text(value);
			cell.attr("class", "table-style");
		}); // inner for each close
	}); // outer for each close
}; // close for filterTable function

// initially populate the table by default
resetTable();

// use the on function in d3 to attach a click event to the handelr function for filterButton
filterButton.on("click", filterTable);

// use the on function in d3 to attach a click event to the handler function for resetButton
resetButton.on("click", resetTable);