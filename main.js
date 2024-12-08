document.getElementById('grid-form').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);

    createGrid(rows, columns);
}

function createGrid(rows, columns) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';

    const headerRow = document.createElement('div');
    headerRow.className = 'row';
    headerRow.appendChild(createHeaderSquare(''));
    for (let colIndex = 1; colIndex <= columns; colIndex++) {
        headerRow.appendChild(createHeaderSquare(colIndex));
    }
    gridContainer.appendChild(headerRow);

    for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.appendChild(createHeaderSquare(rowIndex));
        for (let colIndex = 1; colIndex <= columns; colIndex++) {
            const square = createSquare(rowIndex, colIndex);
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }
}

function createSquare(rowIndex, colIndex) {
    const square = document.createElement('div');
    square.className = 'square';
    square.textContent = `${rowIndex * colIndex}`;
    return square;
}

function createHeaderSquare(content) {
    const square = document.createElement('div');
    square.className = 'square header';
    square.textContent = content;
    return square;
}