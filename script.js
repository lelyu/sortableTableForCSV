// Author@Le Lyu
var tabulate = function (data, columns) {
  var table = d3.select('body').append('table')
  var thead = table.append('thead')
  var tbody = table.append('tbody')

  thead.append('tr')
    .selectAll('th')
    .data(columns)
    .enter()
    .append('th')
    .text(function (d) { return d })

  var rows = tbody.selectAll('tr')
      .data(data)
      .enter()
    .append('tr')

  var cells = rows.selectAll('td')
      .data(function(row) {
          return columns.map(function (column) {
              return { column: column, value: row[column] }
        })
      })
    .enter()
    .append('td')
    .text(function (d) { return d.value })
    .attr('title', function (d) {
      if (d.column === 'Description') {
        return d.value;
      }
    });

  // Add a select element for sorting the table
  var select = d3.select('body')
    .append('div')
    .attr('class', 'sort-select')
    .append('label')
    .attr('for', 'sort-by')
    .text('Sort by:')
    .append('select')
    .attr('id', 'sort-by')
    .on('change', function() {
      var selectedColumn = d3.select(this).property('value');
      if (selectedColumn === 'default') {
        // Don't sort the table
      } else {
        tbody.selectAll('tr')
          .sort(function (a, b) {
            return d3.ascending(a[selectedColumn], b[selectedColumn]);
          })
      }
    });

  // Add options to the select element for each column
  select.append('option')
    .attr('value', 'default')
    .text('default');
  select.selectAll('option:not(:first-child)')
    .data(columns)
    .enter()
    .append('option')
    .attr('value', function(d) { return d; })
    .text(function(d) { return d; });


  return table;
}

  
  
  d3.csv('data_2_14_2023.csv',function (data) {
    var columns = ['PlaceName', 'PlaceNameModern', 'Latitude', 'Longitude', 'NameOfTraveler', 'YearOfTravel', 'Description', 'Citation', 'Hyperlink', 'Country', 'Region', 'Continent'];
    tabulate(data, columns);
  });
  