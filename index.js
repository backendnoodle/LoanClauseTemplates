const templates = {
    spouses: {
        id: 'spouses', //value must be the same as property name
        displayString: 'Spouses', //used as display label in clause options
        containerDivId: 'spousesDiv', //div id that contains all the textboxes for user input
        clause: 'SPS. <Juan dela Cruz & Maria dela Cruz>, Filipinos, both of legal age and with residence address at <Cebu City>.' // "<>" will be replaced with textbox
    },
    single: {
        id: 'single',
        displayString: 'Single',
        containerDivId: 'singleDiv',
        clause: '<Juan dela Cruz>, Filipino, single, of legal age and with residence address at <Cebu City>.'
    },
    singleWithCoPB: {
        id: 'singleWithCoPB',
        displayString: 'Single with Co-PB',
        containerDivId: 'singleWithCoPBDiv',
        clause: '<Juan dela Cruz>, and <Maria dela Cruz>, Filipinos, both single, of legal age and with residence address at <Cebu City>.'
    },
    singleWithCoPBAnd2CoMaker: {
        id: 'singleWithCoPBAnd2CoMaker',
        displayString: 'Single with Co-PB & Co-Maker',
        containerDivId: 'singleWithCoPBAnd2CoMakerDiv',
        clause: '<Juan dela Cruz>, Filipino, single, of legal age and with residence address at <Cebu City> and <SPS. Juan dela Cruz & Maria dela Cruz>, <Filipino/both Filipinos>, <single>, of legal age and with residence address at <Cebu City>, and <SPS. Juan dela Cruz & Maria dela Cruz>, <Filipino/both Filipinos>, <single>, of legal age and with residence address at <Cebu City>.'
    },
    widow: {
        id: 'widow',
        displayString: 'Widow/Widower',
        containerDivId: 'widowDiv',
        clause: '<Juan dela Cruz>, Filipino, <widow/widower>, of legal age and with residence address at <Cebu City>.'
    },
    corpBorrower: {
        id: 'corpBorrower',
        displayString: 'Corp Borrower',
        containerDivId: 'corpBorrowerDiv',
        clause: '<JUAN CRUZ INC.>, a corporation duly organized and existing under Philippines laws with principal office address at <Cebu City>.'
    },
    marriedToAForeigner: {
        id: 'marriedToAForeigner',
        displayString: 'Married to a foreigner',
        containerDivId: 'marriedToAForeignerDiv',
        clause: 'SPS. <Maden San & Tom Cruise>, Filipino and <American/Canadian>, respectively, both of legal age and with residence address at <Cebu City>.'
    },
    marriedToAForeignerRem: {
        id: 'marriedToAForeignerRem',
        displayString: 'Married to a foreigner (REM)',
        containerDivId: 'marriedToAForeignerRemDiv',
        clause: '<Maden San>, Filipino, married to <Tom Cruise>, <American/Canadian>, both of legal age and with residence address at <Cebu City>.'
    },
    spaLocallyNotarized: {
        id: 'spaLocallyNotarized',
        displayString: 'SPA - Locally Notarized',
        containerDivId: 'spaLocallyNotarizedDiv',
        clause: '<Juan dela Cruz> represented by <his/her/their> duly designated Atty-in-Fact <Juan dela Cruz>, by virtue of Special Power of Attorney dated <December 20, 2020> for and in <Cebu City> notarized by Atty. <Maria dela Cruz> as Doc. No. <481>; Page No. <98>; Book No. <09>; Series of <2020>.'
    },
    spaConsularized: {
        id: 'spaConsularized',
        displayString: 'SPA - Consularized',
        containerDivId: 'spaConsularizedDiv',
        clause: '<Juan dela Cruz> represented by <his/her/their> duly designated Atty-in-Fact <Juan dela Cruz>, by virtue of Special Power of Attorney dated <March 15, 2021> authenticated by <Maria dela Cruz>, <Consul>, <Consulate General of the Philippines>, <Sydney, New South Wales, Australia> as Doc. No. <1182>; Page No. <24>; Book No. <1>; Fee Paid: <AU$45.00>; O.R No.<SA9273474>; Service no. <232872-2>; Series of <2021>.'
    },
    spaApostille: {
        id: 'spaApostille',
        displayString: 'SPA - Apostille',
        containerDivId: 'spaApostilleDiv',
        clause: '<Juan dela Cruz> represented by <his/her/their> duly designated Attorney-in-Fact, <Juan dela Cruz>, by virtue of Special Power of Attorney dated <February 2, 2024>, notarized by <Maria dela Cruz>, acting in the capacity of a Notary Public, <Rovanienmi, Finland> and certified by <Juana dela Cruz>, Notary Public, <Rovanienmi, Finland> with Apostille No. <47/2024> dated <February 15, 2023>.'
    },
    laCollateralHouseAndLot: {
        id: 'laCollateralHouseAndLot',
        displayString: 'LA - Collateral Address (For House & Lot)',
        containerDivId: 'laCollateralHouseAndLotDiv',
        clause: 'One (1) parcel of land and improvements located at <Cebu City> covered by TCT No. <14>.'
    },
    laCollateralCondominium: {
        id: 'laCollateralCondominium',
        displayString: 'LA - Collateral Address (For Condominium)',
        containerDivId: 'laCollateralCondominiumDiv',
        clause: 'One (1) condominium unit located at <Cebu City> covered by CCT No. <14>.'
    },
    laCollateralLotOnly: {
        id: 'laCollateralLotOnly',
        displayString: 'LA - Collateral Address (For Lot only)',
        containerDivId: 'laCollateralLotOnlyDiv',
        clause: 'One (1) parcel of land located at <Cebu City> covered by TCT No. <14>.'
    },
}

for (let key in templates) {
    let template = templates[key];
    initializeClauseOptions(template); //create elements based on templates object
    initializeTemplates(template); //create textboxes based on templates object
}
function initializeClauseOptions(template) {
    
    var newDiv = document.createElement('div');
    var newRadio = document.createElement('input');
    newRadio.type = 'radio';
    newRadio.id = template.id;
    newRadio.name = 'clause';
    newRadio.value = template.id;
    if(template.id == Object.keys(templates)[0]) {
        newRadio.checked = true;
    }

    var newLabel = document.createElement('label');
    newLabel.setAttribute('for', template.id);
    newLabel.textContent = "  " + template.displayString;

    newDiv.appendChild(newRadio);
    newDiv.appendChild(newLabel);

    var fieldSetElement = document.getElementById('clauseOptionsFieldSet');
    fieldSetElement.appendChild(newDiv);
}
function initializeTemplates(template) {
    var formDiv = document.getElementById('formDiv');
    let clause = template.clause;

    // Split the clause into parts based on '<' and '>'
    let parts = clause.split(/(<|>)/);

    let newContainerDiv = document.createElement('div');
    newContainerDiv.id = template.containerDivId;
    newContainerDiv.classList.add('hidden');
    if(template.id == Object.keys(templates)[0]) {
        newContainerDiv.classList.remove('hidden');
    }

    let newHeader = document.createElement('h4');
    let headerText = document.createTextNode(template.displayString);
    newHeader.appendChild(headerText);

    newContainerDiv.appendChild(newHeader);

    let counterForId = 0; // Counter for generating unique IDs

    try {
        for(i = 0; i < parts.length; i++) {
            if(parts[i].startsWith('>') || parts[i+1].endsWith('>')) {
                continue;
            }
            // If the part starts with '<' and ends with '>', it's a placeholder
            if(parts[i].startsWith('<') && parts[i+2].endsWith('>')) {
                let input = document.createElement('input');
                input.type = 'text';
                input.id = template.id + '_' + counterForId++; // Assign a unique ID
                input.classList.add('textbox');
                input.placeholder = parts[i+1];
                newContainerDiv.appendChild(input); // Append the input element to the container
            }
            else {
                // Otherwise, create a text node with the original part
                let textNode = document.createTextNode(parts[i]);
                newContainerDiv.appendChild(textNode); // Append the text node to the container
            }
        }
    } catch (error) {
        if(i == (parts.length-1)) {
            let textNode = document.createTextNode(parts[i]);
            newContainerDiv.appendChild(textNode); // Append the text node to the container
        }
        console.log(error);
    }

    formDiv.appendChild(newContainerDiv);
}

hideOrDisplay();
function hideOrDisplay() {
    document.querySelectorAll('input[name="clause"]').forEach(radio => {
        radio.addEventListener('change', function(){
            hideAllInputs();
            for(let key in templates) {
                let template = templates[key];
                if(this.value == template.id) {
                    console.log(template.id);
                    const container = document.getElementById(template.containerDivId);
                    clearInputs(container);
                    container.classList.remove('hidden');
                    break;
                }
            }
        });
    });
}

function generateClause() {
    var clauseType = document.querySelector('input[name="clause"]:checked').value;
    document.getElementById('copyToClipboardBtn').innerText = 'Copy to Clipboard';
    
    for(let key in templates) {
        let template = templates[key];
        if(clauseType == template.id) {
            let clauseWithUserInputs = '';
            let clause = template.clause;
            // Split the clause into parts based on '<' and '>'
            let parts = clause.split(/(<|>)/);
            let counterForId = 0; // Counter for generating unique IDs
            let allTextboxesInAContainer = document.getElementById(template.containerDivId).querySelectorAll('input[type="text"]');
            try {
                for(i = 0; i < parts.length; i++) {
                    if(parts[i].startsWith('>') || parts[i+1].endsWith('>')) {
                        continue;
                    }
                    if(parts[i].startsWith('<') && parts[i+2].endsWith('>')) {
                        if(isStringAPersonsNameOrAddress(parts[i+1])) {
                            clauseWithUserInputs += "<span class='emphasize'>";
                            clauseWithUserInputs += document.getElementById(allTextboxesInAContainer[counterForId].id).value;
                            clauseWithUserInputs += "</span>";
                        }
                        else {
                            clauseWithUserInputs += document.getElementById(allTextboxesInAContainer[counterForId].id).value;
                        }
                        counterForId++;
                    }
                    else {
                        clauseWithUserInputs += parts[i];
                    }
                }
            } catch (error) {
                if(i == (parts.length-1)) {
                    clauseWithUserInputs += parts[i];
                }
                console.log(error);
            }

            updateResult(clauseWithUserInputs);
            break;
        }
    }
}

function isStringAPersonsNameOrAddress(str) {
    if(str.includes("Juan") ||
        str.includes("Maria") ||
        str.includes("Tom") ||
        str.includes("Maden") ||
        str.includes("Cebu")
        ) {
        return true;
    }
    return false;
}
function updateResult(clause) {
    document.getElementById('result').innerHTML = clause;
}

function hideAllInputs() {
    for(let key in templates) {
        let template = templates[key];
        document.getElementById(template.containerDivId).classList.add('hidden');
    }

    document.getElementById('copyToClipboardBtn').innerText = 'Copy to Clipboard';
}

function clearInputs(container) {
    const inputs = container.querySelectorAll('input[type="text"]');
    inputs.forEach(input => { input.value = ''; });
}

function copyToClipboard() {
    const paragraph = document.getElementById('result');
    const textToCopy = paragraph.innerText;

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    // Provide feedback to the user
    document.getElementById('copyToClipboardBtn').innerText = 'Copied!';
}
