hideOrDisplay();

function hideOrDisplay() {
    document.querySelectorAll('input[name="clause"]').forEach(radio => {
        radio.addEventListener('change', function(){
            hideAllInputs();
            switch (this.value) {
                case 'spouses': {
                        console.log('spouses');
                        const container = document.getElementById('inputsForSpouses');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'single': {
                        console.log('single');
                        const container = document.getElementById('inputsForSingle');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'singleWithCoPB': {
                        console.log('singleWithCoPB');
                        const container = document.getElementById('inputsForSingleWithCoPB');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'widow': {
                        console.log('widow');
                        const container = document.getElementById('inputsForWidow');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'singleWithCoPBAnd2CoMaker': {
                        console.log('singleWithCoPBAnd2CoMaker');
                        const container = document.getElementById('inputsForSingleWithCoPBAnd2CoMaker');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'corpBorrower': {
                        console.log('corpBorrower');
                        const container = document.getElementById('inputsForCorpBorrower');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'marriedToAForeigner': {
                        console.log('marriedToAForeigner');
                        const container = document.getElementById('inputsForMarriedToAForeigner');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'spaLocallyNotarized': {
                        console.log('spaLocallyNotarized');
                        const container = document.getElementById('inputsForSpaLocallyNotarized');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'spaConsularized': {
                        console.log('spaConsularized');
                        const container = document.getElementById('inputsForSpaConsularized');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                case 'spaApostille': {
                        console.log('spaApostille');
                        const container = document.getElementById('inputsForSpaApostille');
                        clearInputs(container);
                        container.classList.remove('hidden');
                    }
                    break;
                default:
                    console.log('Clause not found.');
            }
        });
    });
}

function generateClause() {
    var clauseType = document.querySelector('input[name="clause"]:checked').value;
    document.getElementById('copyToClipboardBtn').innerText = 'Copy to Clipboard';
    switch (clauseType) {
        case 'spouses':
            updateResult(`SPS. ${document.getElementById('spouses_name').value}, Filipinos, both of legal age and with residence address at ${document.getElementById('spouses_address').value}`);
            break;
        case 'single':
            updateResult(`${document.getElementById('single_name').value}, Filipino, single, of legal age and with residence address at ${document.getElementById('single_address').value}`);
            break;
        case 'singleWithCoPB':
            updateResult(`${document.getElementById('singleWithCoPB_name').value}, and ${document.getElementById('singleWithCoPB_CoPB').value}, Filipinos, both single and of legal age, with residence address at ${document.getElementById('singleWithCoPB_address').value}`);
            break;
        case 'widow':
            updateResult(`${document.getElementById('widow_name').value}, Filipino,${document.getElementById('widow_type').value}, of legal age and with residence address at ${document.getElementById('widow_address').value}`);
            break;
        case 'singleWithCoPBAnd2CoMaker':
            updateResult(`${document.getElementById('singleWithCoPBAnd2CoMaker_name').value}, single, of legal age, and ${document.getElementById('singleWithCoPBAnd2CoMaker_coPB').value}, both Filipinos, of legal age and with residence address at ${document.getElementById('singleWithCoPBAnd2CoMaker_copbAddress').value}, and ${document.getElementById('singleWithCoPBAnd2CoMaker_coMaker').value}, Filipino, of legal age and with residence address at ${document.getElementById('singleWithCoPBAnd2CoMaker_coMakerAddress').value}.`);
            break;
        case 'corpBorrower':
            updateResult(`${document.getElementById('corpBorrower_name').value}, a corporation duly organized and existing under Philippines laws with principal office address at ${document.getElementById('corpBorrower_address').value}`);
            break;
        case 'marriedToAForeigner':
            updateResult(`SPS. ${document.getElementById('marriedToAForeigner_name').value}, Filipino and ${document.getElementById('marriedToAForeigner_nationality').value}, respectively, both of legal age and with residence address at ${document.getElementById('marriedToAForeigner_address').value}`);
            break;
        case 'spaLocallyNotarized':
            updateResult(`Represented by ${document.getElementById('spaLocallyNotarized_pronoun').value} duly designated Atty-in-Fact ${document.getElementById('spaLocallyNotarized_attyInFact').value}, by virtue of Special Power of Attorney dated ${document.getElementById('spaLocallyNotarized_spaDate').value} for and in ${document.getElementById('spaLocallyNotarized_address').value} notarized by Atty. ${document.getElementById('spaLocallyNotarized_attyNotarized').value} as Doc. No. ${document.getElementById('spaLocallyNotarized_docNum').value}; Page No. ${document.getElementById('spaLocallyNotarized_pageNum').value}; Book No. ${document.getElementById('spaLocallyNotarized_bookNum').value}; Series of ${document.getElementById('spaLocallyNotarized_year').value}.`);
            break;
        case 'spaConsularized':
            updateResult(`Represented by ${document.getElementById('spaConsularized_pronoun').value} duly designated Atty-in-Fact ${document.getElementById('spaConsularized_attyInFact').value}, by virtue of Special Power of Attorney dated ${document.getElementById('spaConsularized_spaDate').value} authenticated by ${document.getElementById('spaConsularized_authenticatedBy').value}, ${document.getElementById('spaConsularized_consul').value}, ${document.getElementById('spaConsularized_consulate').value}, ${document.getElementById('spaConsularized_consulateLocation').value} as Doc. No. ${document.getElementById('spaConsularized_docNum').value}; Page No. ${document.getElementById('spaConsularized_pageNum').value}; Book No. ${document.getElementById('spaConsularized_bookNum').value}; Fee Paid: ${document.getElementById('spaConsularized_feePaid').value}; O.R No.${document.getElementById('spaConsularized_orNum').value}; Service no. ${document.getElementById('spaConsularized_serviceNum').value}; Series of ${document.getElementById('spaConsularized_seriesOf').value}.`);
            break;
        case 'spaApostille':
            updateResult(`Represented by ${document.getElementById('spaApostille_pronoun').value} duly designated Attorney-in-Fact, ${document.getElementById('spaApostille_attyInFact').value}, by virtue of Special Power of Attorney dated ${document.getElementById('spaApostille_spaDate').value}, notarized by ${document.getElementById('spaApostille_notarizedBy').value}, acting in the capacity of a Notary Public, ${document.getElementById('spaApostille_notaryPublic').value} and certified by ${document.getElementById('spaApostille_certifiedBy').value}, Notary Public, ${document.getElementById('spaApostille_notaryPublic2').value} with Apostille No. ${document.getElementById('spaApostille_apostilleNum').value} dated ${document.getElementById('spaApostille_apostilleDate').value}.`);
            break;
        default:
            console.log('Clause not found.');
    }
}

function updateResult(clause) {
    document.getElementById('result').innerText = clause;
}

function hideAllInputs() {
    document.getElementById('inputsForSpouses').classList.add('hidden');
    document.getElementById('inputsForSingle').classList.add('hidden');
    document.getElementById('inputsForSingleWithCoPB').classList.add('hidden');
    document.getElementById('inputsForWidow').classList.add('hidden');
    document.getElementById('inputsForSingleWithCoPBAnd2CoMaker').classList.add('hidden');
    document.getElementById('inputsForCorpBorrower').classList.add('hidden');
    document.getElementById('inputsForMarriedToAForeigner').classList.add('hidden');
    document.getElementById('inputsForSpaLocallyNotarized').classList.add('hidden');
    document.getElementById('inputsForSpaConsularized').classList.add('hidden');
    document.getElementById('inputsForSpaApostille').classList.add('hidden');

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