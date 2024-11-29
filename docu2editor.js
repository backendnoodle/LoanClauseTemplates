const canvas = document.getElementById('canvas');
const uploadButton = document.getElementById('uploadButton');
const addTextboxButton = document.getElementById('addTextboxButton');

// Handle image upload and set as background
uploadButton.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            canvas.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

// Add a new draggable textbox
addTextboxButton.addEventListener('click', () => {
    const numberInput = document.getElementById('numberInput');
    // Get the value from the input
    const count = parseInt(numberInput.value);
    // Ensure the value is within the allowed range
    if (count < 1 || count > 15) {
        alert('Please enter a number between 1 and 15.');
        return;
    }

    for (let i = 1; i <= count; i++) {
        const textbox = document.createElement('textarea');
        textbox.classList.add('textbox');
        textbox.placeholder = "Text here.."

        const textboxContainer = document.createElement('div');
        textboxContainer.classList.add('draggable-container');
        textboxContainer.style.top = `${10 + (i * 5)}% `;

        textboxContainer.appendChild(textbox);
        canvas.appendChild(textboxContainer);

        textboxContainer.addEventListener('click', (e) => {
            // Enable dragging for the textbox
            makeDraggable(textboxContainer, textbox);

            // Enable removal on right-click
            enableRemovalOnRightClick(textboxContainer);

        });

        editFontSize(textboxContainer);
    }
});

function editFontSize(element) {
    element.addEventListener('dblclick', (e) => {
        const newFontSize = prompt('Enter the new font size (e.g., 16px):', '16px');
        if (newFontSize) {
            element.style.fontSize = newFontSize; // Change the font size of the clicked textarea
        }
    });
}

// Function to make an element draggable
function makeDraggable(textboxContainer, textbox) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0;

    textboxContainer.addEventListener('mousedown', (e) => {
        if (isInResizeArea(e, textbox)) {
            return;
        }
        isDragging = true;

        const canvasRect = canvas.getBoundingClientRect();
        const containerRect = textboxContainer.getBoundingClientRect();

        // Calculate the offset of the cursor relative to the container element
        offsetX = e.clientX - containerRect.left;
        offsetY = e.clientY - containerRect.top;

        // Record the initial cursor position and element's offset
        startX = e.clientX - canvasRect.left - offsetX;
        startY = e.clientY - canvasRect.top - offsetY;

        textboxContainer.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const canvasRect = canvas.getBoundingClientRect();
            // Calculate the new position of the element relative to the canvas
            const newX = e.clientX - canvasRect.left - offsetX;
            const newY = e.clientY - canvasRect.top - offsetY;

            // Ensure the element stays within the canvas bounds
            textboxContainer.style.left = `${Math.max(0, Math.min(newX, canvas.offsetWidth - textboxContainer.offsetWidth))}px`;
            textboxContainer.style.top = `${Math.max(0, Math.min(newY, canvas.offsetHeight - textboxContainer.offsetHeight))}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        textboxContainer.style.cursor = 'grab';
    });
}

function enableRemovalOnRightClick(element) {
    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        element.remove();
    });
}

// Helper to check if the cursor is near the resize corner
function isInResizeArea(event, element) {
    const rect = element.getBoundingClientRect();
    const resizeMargin = 10; // Margin around the edges for resize detection
    return (
        event.clientX > rect.right - resizeMargin &&
        event.clientY > rect.bottom - resizeMargin
    );
}