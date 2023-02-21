// Read the CSV file and parse it into an array of objects
fetch('data.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n');
    const headers = rows[0].split(',');
    const tableData = rows.slice(1).map(row => {
      const rowData = row.split(',');
      return {
        PlaceName: rowData[0],
        PlaceNameModern: rowData[1],
        Latitude: rowData[2],
        Longitude: rowData[3],
        NameOfTraveler: rowData[4],
        YearOfTravel: rowData[5],
        Description: rowData[6],
        Citation: rowData[7],
        Hyperlink: rowData[8],
        Country: rowData[9],
        Region: rowData[10],
        Continent: rowData[11],
      };
    });

    // Create an HTML table with the headers and body
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create the header row
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
      const header = document.createElement('th');
      header.innerText = headerText;
      headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);

    // Populate the table with the data from the CSV file
    tableData.forEach(rowData => {
      const row = document.createElement('tr');
      Object.values(rowData).forEach(cellData => {
        const cell = document.createElement('td');
        cell.innerText = cellData;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });

    // Add the thead and tbody to the table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Add sorting functionality to the table
    Array.from(thead.querySelectorAll('th')).forEach(header => {
      header.addEventListener('click', () => {
        const column = header.dataset.column;
        const order = header.dataset.order === 'asc' ? 'desc' : 'asc';
        header.dataset.order = order;

        // Sort the table data
        tableData.sort((a, b) => {
          if (a[column] < b[column]) {
            return order === 'asc' ? -1 : 1;
          }
          if (a[column] > b[column]) {
            return order === 'asc' ? 1 : -1;
          }
          return 0;
        });

        // Re-populate the table with the sorted data
        tbody.innerHTML = '';
        tableData.forEach(rowData => {
          const row = document.createElement('tr');
          Object.values(rowData).forEach(cellData => {
            const cell = document.createElement('td');
            cell.innerText = cellData;
            row.appendChild(cell);
          });
          tbody.appendChild(row);
        });
      });
    });

    // Append the table to the DOM
    document.body.appendChild(table);
  });
