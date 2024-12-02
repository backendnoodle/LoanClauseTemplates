document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('#canvas');
    const uploadButton = document.querySelector('#uploadButton');
    const addTextboxButton = document.querySelector('#addTextboxButton');

    const popup = document.querySelector('#popup');
    const overlay = document.querySelector('#overlay');
    const fontSizeInput = document.querySelector('#fontSizeInput');
    const okButton = document.querySelector('#okButton');
    const cancelButton = document.querySelector('#cancelButton');

    let selectedTextbox;

    cancelButton.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    okButton.addEventListener('click', applyFontSize);

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
        const numberInput = document.querySelector('#numberInput');
        // Get the value from the input
        const count = parseInt(numberInput.value);
        // Ensure the value is within the allowed range
        if (count < 1 || count > 15) {
            alert('Please enter a number between 1 and 15.');
            return;
        }

        // Utilize DocumentFragment in creating the elements so we only need to update the DOM once
        const fragment = new DocumentFragment();
        for (let i = 1; i <= count; i++) {
            const textbox = document.createElement('textarea');
            textbox.classList.add('textbox');
            textbox.spellcheck = false;
            textbox.placeholder = "Text here.."
            textbox.style.fontSize = "0.625em";

            const textboxContainer = document.createElement('div');
            textboxContainer.classList.add('draggable-container');
            textboxContainer.style.top = `${10 + (i * 5)}% `;

            textboxContainer.appendChild(textbox);
            fragment.appendChild(textboxContainer);

            textboxContainer.addEventListener('click', textboxEventHandler);
            textboxContainer.addEventListener('dblclick', textboxEventHandler);
            textboxContainer.addEventListener('contextmenu', textboxEventHandler);
            textboxContainer.addEventListener('mousedown', textboxEventHandler);
        }

        canvas.appendChild(fragment);
    });

    function openPopup(elementClicked) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        selectedTextbox = elementClicked;
    }

    // Hide popup and overlay
    function closePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    function applyFontSize() {
        const fontSize = parseInt(fontSizeInput.value, 10);
        if (fontSize >= 8 && fontSize <= 16) {
            selectedTextbox.style.fontSize = `${fontSize / 16}em`;
            closePopup();
        }
        else {
            alert('Please enter a valid number between 8 and 16.');
        }
    }

    function textboxEventHandler(event) {
        switch (event.type) {
            case 'mousedown':
                if (isInResizeArea(event)) {
                    return;
                }
                makeDraggable(event);
                break;
            case 'dblclick':
                openPopup(event.target);
                break;
            case 'contextmenu':
                enableRemovalOnRightClick(event.target);
                event.preventDefault();
                break;
            default:
                break;
        }
    }

    // Function to make an element draggable
    function makeDraggable(event) {
        let textboxContainer = event.currentTarget;
        let isDragging = false;
        let offsetX = 0, offsetY = 0;
        isDragging = true;

        const canvasRect = canvas.getBoundingClientRect();
        const containerRect = textboxContainer.getBoundingClientRect();

        // Calculate the offset of the cursor relative to the container element
        offsetX = event.clientX - containerRect.left;
        offsetY = event.clientY - containerRect.top;

        // Record the initial cursor position and element's offset
        startX = event.clientX - canvasRect.left - offsetX;
        startY = event.clientY - canvasRect.top - offsetY;

        textboxContainer.style.cursor = 'grabbing';

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const canvasRect = canvas.getBoundingClientRect();
                // Calculate the new position of the element relative to the canvas
                const newX = e.clientX - canvasRect.left - offsetX;
                const newY = e.clientY - canvasRect.top - offsetY;

                // Ensure the element stays within the canvas bounds
                // textboxContainer.style.left = `${Math.max(0, Math.min(newX, canvas.offsetWidth - textboxContainer.offsetWidth))}px`;
                // textboxContainer.style.top = `${Math.max(0, Math.min(newY, canvas.offsetHeight - textboxContainer.offsetHeight))}px`;

                // Allow element beyond canvas bounds
                textboxContainer.style.left = `${newX}px`;
                textboxContainer.style.top = `${newY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            textboxContainer.style.cursor = 'grab';
        });
    }

    function enableRemovalOnRightClick(element) {
        element.remove();
    }

    // Helper to check if the cursor is near the resize corner
    function isInResizeArea(event) {
        const rect = event.srcElement.getBoundingClientRect();
        const resizeMargin = 10; // Margin around the edges for resize detection
        return (
            event.clientX > rect.right - resizeMargin &&
            event.clientY > rect.bottom - resizeMargin
        );
    }
});