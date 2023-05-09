let xml = new XMLHttpRequest();
xml.open('GET', '/api/v1/data');
xml.send();
xml.onreadystatechange = () => {
    if (xml.readyState === 4) {
        const { coleg_gwent, bridgend_college } = JSON.parse(xml.responseText);
        const cgp = document.querySelector('#cgp');
        const bcp = document.querySelector('#bcp');
        if (cgp) {
            cgp.innerHTML = coleg_gwent.points;
        }
        if (bcp) {
            bcp.innerHTML = bridgend_college.points;
        }
    }
};
