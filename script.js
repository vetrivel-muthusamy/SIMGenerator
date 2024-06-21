document.getElementById('generateBtn').addEventListener('click', generateValues);

let generatedData = [];

function generateValues() {
    const iccid = BigInt(document.getElementById('iccid').value);
    const imsi = BigInt(document.getElementById('imsi').value);
    const sfEuimidDec = BigInt(document.getElementById('sf_euimid_dec').value);
    const limit = parseInt(document.getElementById('limit').value);
    const puk1 = "81299640";
    const puk2 = "38584195";
    const pin1 = "7213";
    const pin2 = "7213";
    const simVersion = "38.02";
    const eki = "C4761A0AE0139997A5E888B9512C0000";

    generatedData = [];

    for (let i = 0; i < limit; i++) {
        const currentICCID = iccid + BigInt(i);
        const currentIMSI = imsi + BigInt(i);
        const currentSF_EUIMID_DEC = sfEuimidDec + BigInt(i);
        const data = `${currentICCID}|${eki}|${currentIMSI}|${puk1}|${puk2}|${pin1}|${pin2}|${currentSF_EUIMID_DEC}|${simVersion}`;
        generatedData.push(data);
    }

    alert(`Generated ${limit} entries.`);
    
    // Create download buttons after generation
    createDownloadButtons();
}

function createDownloadButtons() {
    const downloadArea = document.getElementById("downloadArea");
    downloadArea.innerHTML = `
        <button id="downloadOut" onclick="downloadFile('out')"><i class="fas fa-download"></i> Download .out</button>
        <button id="downloadTxt" onclick="downloadFile('txt')"><i class="fas fa-download"></i> Download .txt</button>
        <button id="downloadCsv" onclick="downloadFile('csv')"><i class="fas fa-download"></i> Download .csv</button>
    `;
}

function downloadFile(format) {
    let content = '';
    const filename = `generated_data.${format}`;

    if (format === 'csv') {
        content = "ICCID,EKI,IMSI,PUK1,PUK2,PIN1,PIN2,SF_EUIMID_DEC,SIM_VERSION\n" + generatedData.join("\n").replace(/\|/g, ',');
    } else {
        content = generatedData.join("\n");
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // **Update existing button text and href instead of creating a new one**
    const downloadBtn = document.getElementById(`download${format.toUpperCase()}`);
    downloadBtn.href = link.href;
    downloadBtn.download = filename;
    downloadBtn.click();
}