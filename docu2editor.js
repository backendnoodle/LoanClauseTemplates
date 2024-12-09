document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('#canvas');
    const uploadButton = document.querySelector('#uploadButton');
    const addTextboxButton = document.querySelector('#addTextboxButton');
    const remTctButton = document.querySelector('#generateRemTct');
    const remCctButton = document.querySelector('#generateRemCct');

    const popup = document.querySelector('#popup');
    const overlay = document.querySelector('#overlay');
    const fontSizeInput = document.querySelector('#fontSizeInput');
    const okButton = document.querySelector('#okButton');
    const cancelButton = document.querySelector('#cancelButton');

    let selectedTextbox;
    let adjustmentPxTop = 0.50; //use to add or subtract 'currentTop' of all textboxes onbeforeprint and afterprint
    let adjustmentPxLeft = 1; //use to add or subtract 'currentLeft' of all textboxes onbeforeprint and afterprint

    const remTctTemplate =
        `
        \t\t\t\tTRANSFER CERTIFICATION OF TITLE
        \t\t\t\t\tNO. 
        \t\t\tREGISTRY OF DEEDS FOR \n
        LOT NO.\t\t\t:\t, BLOCK NO. , PLAN NO: 
        PORTION OF\t\t:\t
        LOCATION\t\t:\t
        AREA\t\t\t:\t SQUARE METERS, MORE OR LESS
        `;
    const remCctTemplate =
        `
        \t\t\t\tCONDOMINIUM CERTIFICATE OF TITLE
        \t\t\t\t\tNO. 
        \t\t\tREGISTRY OF DEEDS FOR \n
        ("PROJECT DETAILS")\n
        LOCATION\t\t\t:\t
        UNIT NO.\t\t\t:\t
        FLOOR AREA\t\t\t:\t 
        `;

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
            const textboxContainer = document.createElement('div');
            textboxContainer.classList.add('draggable-container');
            textboxContainer.dataset.rotation = '0';
            textboxContainer.style.left = `100px`;
            textboxContainer.style.top = `${100 + (i * 50)}px`;

            const textbox = document.createElement('textarea');
            textbox.classList.add('textbox');
            textbox.spellcheck = false;
            textbox.placeholder = "Text here.."
            textbox.style.fontSize = "0.625em";

            const containerControls = document.createElement('div');
            containerControls.classList.add('container-controls');

            const leftArrow = document.createElement('button');
            leftArrow.textContent = "<";
            leftArrow.style.margin = '2px';
            leftArrow.name = 'leftBtn';
            containerControls.appendChild(leftArrow);

            const rightArrow = document.createElement('button');
            rightArrow.textContent = ">";
            rightArrow.style.margin = '2px';
            rightArrow.name = 'rightBtn';
            containerControls.appendChild(rightArrow);

            textboxContainer.appendChild(containerControls);
            textboxContainer.appendChild(textbox);
            fragment.appendChild(textboxContainer);

            containerControls.addEventListener('click', containerControlsEventHandler);

            textboxContainer.addEventListener('click', textboxEventHandler);
            textboxContainer.addEventListener('dblclick', textboxEventHandler);
            textboxContainer.addEventListener('contextmenu', textboxEventHandler);
            textboxContainer.addEventListener('mousedown', textboxEventHandler);
            textboxContainer.addEventListener('mouseover', textboxEventHandler);
            textboxContainer.addEventListener('mouseleave', textboxEventHandler);
            textboxContainer.addEventListener('keydown', textboxEventHandler);
        }

        canvas.appendChild(fragment);

    });

    // Add a new draggable textbox
    remTctButton.addEventListener('click', () => {
        // Utilize DocumentFragment in creating the elements so we only need to update the DOM once
        const fragment = new DocumentFragment();
        const textboxContainer = document.createElement('div');
        textboxContainer.classList.add('draggable-container');
        textboxContainer.dataset.rotation = '0';
        textboxContainer.style.left = `100px`;
        textboxContainer.style.top = `150px`;

        const textbox = document.createElement('textarea');
        textbox.classList.add('textbox', 'rem-template');
        textbox.spellcheck = false;
        textbox.style.fontSize = "0.625em";
        textbox.value = remTctTemplate;

        const containerControls = document.createElement('div');
        containerControls.classList.add('container-controls');

        const leftArrow = document.createElement('button');
        leftArrow.textContent = "<";
        leftArrow.style.margin = '2px';
        leftArrow.name = 'leftBtn';
        containerControls.appendChild(leftArrow);

        const rightArrow = document.createElement('button');
        rightArrow.textContent = ">";
        rightArrow.style.margin = '2px';
        rightArrow.name = 'rightBtn';
        containerControls.appendChild(rightArrow);

        textboxContainer.appendChild(containerControls);
        textboxContainer.appendChild(textbox);
        fragment.appendChild(textboxContainer);

        containerControls.addEventListener('click', containerControlsEventHandler);

        textboxContainer.addEventListener('click', textboxEventHandler);
        textboxContainer.addEventListener('dblclick', textboxEventHandler);
        textboxContainer.addEventListener('contextmenu', textboxEventHandler);
        textboxContainer.addEventListener('mousedown', textboxEventHandler);
        textboxContainer.addEventListener('mouseover', textboxEventHandler);
        textboxContainer.addEventListener('mouseleave', textboxEventHandler);
        textboxContainer.addEventListener('keydown', textboxEventHandler);

        canvas.appendChild(fragment);

    });

    // Add a new draggable textbox
    remCctButton.addEventListener('click', () => {
        // Utilize DocumentFragment in creating the elements so we only need to update the DOM once
        const fragment = new DocumentFragment();
        const textboxContainer = document.createElement('div');
        textboxContainer.classList.add('draggable-container');
        textboxContainer.dataset.rotation = '0';
        textboxContainer.style.left = `100px`;
        textboxContainer.style.top = `150px`;

        const textbox = document.createElement('textarea');
        textbox.classList.add('textbox', 'rem-template');
        textbox.spellcheck = false;
        textbox.style.fontSize = "0.625em";
        textbox.value = remCctTemplate;

        const containerControls = document.createElement('div');
        containerControls.classList.add('container-controls');

        const leftArrow = document.createElement('button');
        leftArrow.textContent = "<";
        leftArrow.style.margin = '2px';
        leftArrow.name = 'leftBtn';
        containerControls.appendChild(leftArrow);

        const rightArrow = document.createElement('button');
        rightArrow.textContent = ">";
        rightArrow.style.margin = '2px';
        rightArrow.name = 'rightBtn';
        containerControls.appendChild(rightArrow);

        textboxContainer.appendChild(containerControls);
        textboxContainer.appendChild(textbox);
        fragment.appendChild(textboxContainer);

        containerControls.addEventListener('click', containerControlsEventHandler);

        textboxContainer.addEventListener('click', textboxEventHandler);
        textboxContainer.addEventListener('dblclick', textboxEventHandler);
        textboxContainer.addEventListener('contextmenu', textboxEventHandler);
        textboxContainer.addEventListener('mousedown', textboxEventHandler);
        textboxContainer.addEventListener('mouseover', textboxEventHandler);
        textboxContainer.addEventListener('mouseleave', textboxEventHandler);
        textboxContainer.addEventListener('keydown', textboxEventHandler);

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
            case 'mouseover':
                showContainerControls(event);
                break;
            case 'mouseleave':
                hideContainerControls(event);
                break;
            case 'mousedown':
                if (isInResizeArea(event)) {
                    return;
                }
                makeDraggable(event);
                break;
            case 'keydown':
                handleArrowKeys(event);
                break;
            case 'dblclick':
                openPopup(event.target);
                break;
            case 'contextmenu':
                enableRemovalOnRightClick(event.currentTarget);
                event.preventDefault();
                break;
            default:
                break;
        }
    }

    function handleArrowKeys(event) {
        const draggableContainer = event.currentTarget;
        const step = 2; // Distance to move in px for each key press
        const currentLeft = parseFloat(draggableContainer.style.left || 0, step);
        const currentTop = parseFloat(draggableContainer.style.top || 0, step);
        if (event.shiftKey) {
            switch (event.key) {
                case 'ArrowUp':
                    draggableContainer.style.top = `${currentTop - step}px`;
                    break;
                case 'ArrowDown':
                    draggableContainer.style.top = `${currentTop + step}px`;
                    break;
                case 'ArrowLeft':
                    draggableContainer.style.left = `${currentLeft - step}px`;
                    break;
                case 'ArrowRight':
                    draggableContainer.style.left = `${currentLeft + step}px`;
                    break;
                default:
                    return; // Ignore other keys
            }
        }
        else if (event.altKey) {
            switch (event.key) {
                case 'l':
                case 'L':
                    event.target.style.textAlign = 'start';
                    break;
                case 'e':
                case 'E':
                    event.target.style.textAlign = 'center';
                    break;
                case 'r':
                case 'R':
                    event.target.style.textAlign = 'end';
                    break;
                case 'j':
                case 'J':
                    event.target.style.textAlign = 'justify';
                    break;
                default:
                    break;
            }
        }
        else { return; }

        event.preventDefault();

    }

    function containerControlsEventHandler(event) {
        switch (event.type) {
            case 'click':
                let buttonClicked = event.target;
                let currentRotation = parseInt(buttonClicked.offsetParent.dataset.rotation);
                if (buttonClicked.name === 'rightBtn') {
                    currentRotation += 90;
                }
                if (buttonClicked.name === 'leftBtn') {
                    currentRotation -= 90;
                }
                buttonClicked.offsetParent.style.transform = `rotate(${currentRotation}deg)`; //draggable-container div
                buttonClicked.offsetParent.dataset.rotation = `${currentRotation}`; //update rotation
                break;
            default:
                break;
        }
    }

    function showContainerControls(event) {
        let containerControl = event.currentTarget.childNodes[0];
        containerControl.style.visibility = 'visible';
    }

    function hideContainerControls(event) {
        let containerControl = event.currentTarget.childNodes[0];
        containerControl.style.visibility = 'hidden';
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

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const canvasRect = canvas.getBoundingClientRect();
                // Calculate the new position of the element relative to the canvas
                const newX = e.clientX - canvasRect.left - offsetX;
                const newY = e.clientY - canvasRect.top - offsetY;

                // Allow element beyond canvas bounds
                textboxContainer.style.left = `${newX}px`;
                textboxContainer.style.top = `${newY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
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

    //move down all textboxes before printing (scaling issue)
    window.onbeforeprint = (event) => {
        adjustPositionOfAllContainers(event);
    };

    //return previous top position of all textboxes after printing (scaling issue)
    window.onafterprint = (event) => {
        adjustPositionOfAllContainers(event);
    };

    function adjustPositionOfAllContainers(event) {
        const textboxContainers = document.getElementsByClassName("draggable-container");
        for (let i = 0; i < textboxContainers.length; i++) {
            const textboxContainer = textboxContainers[i];
            const currentLeft = parseFloat(textboxContainer.style.left);
            const currentTop = parseFloat(textboxContainer.style.top);

            if (event.type === "beforeprint") {
                textboxContainer.style.top = `${currentTop + adjustmentPxTop}px`; //move down
                textboxContainer.style.left = `${currentLeft + adjustmentPxLeft}px`; //move right
            }

            if (event.type === "afterprint") {
                textboxContainer.style.top = `${currentTop - adjustmentPxTop}px`;
                textboxContainer.style.left = `${currentLeft - adjustmentPxLeft}px`;
            }
        }
    }
});