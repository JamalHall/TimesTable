document.getElementById('grid-form').addEventListener('submit', handleFormSubmit);

document.querySelectorAll('input[type="number"]').forEach(adjustInputWidth);

function adjustInputWidth(input) {
    input.style.width = `${Math.max(2, input.value.length)}ch`;
}

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
    square.addEventListener('mouseover', () => highlightRowAndColumn(rowIndex, colIndex));
    square.addEventListener('mouseout', () => removeHighlight());
    return square;
}

function createHeaderSquare(content) {
    const square = document.createElement('div');
    square.className = 'square header';
    square.textContent = content;
    return square;
}

function highlightRowAndColumn(rowIndex, colIndex) {
    const gridContainer = document.getElementById('grid-container');
    const rows = gridContainer.getElementsByClassName('row');
    const hoverInfo = document.getElementById('hover-info');
    hoverInfo.textContent = ` ${rowIndex} X ${colIndex} = ${rowIndex * colIndex}`;

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const squares = row.getElementsByClassName('square');
        if (i === rowIndex) {
            for (let j = 1; j <= colIndex; j++) {
                squares[j].classList.add('highlight');
            }
        } else if (i <= rowIndex) {
            squares[colIndex].classList.add('highlight');
        }
    }
}

function removeHighlight() {
    const gridContainer = document.getElementById('grid-container');
    const highlightedSquares = gridContainer.getElementsByClassName('highlight');
    while (highlightedSquares.length > 0) {
        highlightedSquares[0].classList.remove('highlight');
    }
    const hoverInfo = document.getElementById('hover-info');
    hoverInfo.textContent = '';
}
