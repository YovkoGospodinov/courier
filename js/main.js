var pType;

function calculate() {
    var eodMultiply = 1.3;
    var threeHoursMultiply = 2;
    var twoHoursMultiply = 2.6;

    if (pType == "envelope") {
        var envelopeTime = parseFloat(document.getElementById("time").value);
        var envelopePrice = 5;

        switch (envelopeTime) {
            case 2:
                envelopePrice *= eodMultiply;
                break;
            case 3:
                envelopePrice *= threeHoursMultiply;
                break;
            case 4:
                envelopePrice *= twoHoursMultiply;
                break;
            default:
                break;
        }

        envelopePrice = envelopePrice.toFixed(2);
        showPrice(envelopePrice);
    } else {
        var values = getValues();
        var isMesuaresValid = validateMeasures(values);

        if (!isMesuaresValid) {
            return;
        }
        var capacity = (values[0] * values[1] * values[2]) / 6000;
        var weight = values[3];
        var time = values[4];
        var price = 7;

        if (values[0] > 200 || values[1] > 200 || values[2] > 200) {
            var resultMessage = document.getElementById("resultMessage");
            resultMessage.textContent = "Вашата пратка надвишава максималният размер от 200см, моля свържете се с нас за карго тарифиране.";
            resultMessage.style.display = "block";
            showPrice(0);
            return;
        } else if ((weight > 30) || (capacity > 30)) {
            var resultMessage = document.getElementById("resultMessage");
            resultMessage.textContent = "Вашата пратка надвишава максималното тегло от 30кг, моля свържете се с нас за карго тарифиране.";
            resultMessage.style.display = "block";
            showPrice(0);
            return;
        } else {
            showPrice(0);
            document.getElementById("resultMessage").style.display = "none";
        }

        if (capacity > weight) {
            weight = capacity;
        }

        if (pType == "box") {

        }
        switch (true) {
            case (weight <= 1):
                break;
            case (weight <= 3):
                price *= 1.2;
                break;
            case (weight <= 6):
                price *= 1.4;
                break;
            case (weight <= 10):
                price *= 1.6;
                break;
            case (weight <= 20):
                price *= 1.8;
                break;
            case (weight <= 30):
                price *= 2;
                break;
            default:
                break;
        }

        switch (time) {
            case 2:
                price *= eodMultiply;
                break;
            case 3:
                price *= threeHoursMultiply;
                break;
            case 4:
                price *= twoHoursMultiply;
                break;
            default:
                break;
        }

        price = price.toFixed(2);
        showPrice(price);
    }
}

function getValues(params) {
    var length = parseFloat(document.getElementById("length").value);
    var width = parseFloat(document.getElementById("width").value);
    var high = parseFloat(document.getElementById("high").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var time = parseFloat(document.getElementById("time").value);

    var result = [length, width, high, weight, time];

    return result;
}

function showPrice(price) {
    var priceElement = document.getElementById("resultValue");
    priceElement.textContent = price;
}

function isValidNumericInput(evt) {
    var charCode = evt ? (evt.which != undefined ? evt.which : evt.keyCode) : event.keyCode;

    // FF does not like event.keyCode; only allow digits + backspace (8) + . (46) + tab (0)
    return (charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 46 || charCode == 0;
}

function validateMeasures(values) {
    var l = values[0];
    var w = values[1];
    var h = values[2];

    var errorL = isNaN(l);
    var errorW = isNaN(w);
    var errorH = isNaN(h);
    if (errorL || errorW || errorH) {
        document.getElementById("missingDimensionError").style.display = "block";
        document.getElementById("zeroDimensionError").style.display = "none";
        showPrice(0);
    } else if (l == 0 || w == 0 || h == 0) {
        document.getElementById("zeroDimensionError").style.display = "block";
        document.getElementById("missingDimensionError").style.display = "none";
        errorL = (l == 0);
        errorW = (w == 0);
        errorH = (h == 0);
        showPrice(0);
    }
    if (!(errorL || errorW || errorH)) {
        document.getElementById("missingDimensionError").style.display = "none";
        document.getElementById("zeroDimensionError").style.display = "none";
        document.getElementById("errorsTitle").style.display = "none";
        document.getElementById("labelLength").style.color = "black";
        document.getElementById("labelWidth").style.color = "black";
        document.getElementById("labelHigh").style.color = "black";

        return true;
    } else {
        document.getElementById("errorsTitle").style.display = "block";
        document.getElementById("resultValue").value = 0;

        document.getElementById("labelLength").style.color = (errorL) ? "#CC0202" : "black";
        document.getElementById("labelWidth").style.color = (errorW) ? "#CC0202" : "black";
        document.getElementById("labelHigh").style.color = (errorH) ? "#CC0202" : "black";
    }
}

function setPackageTypeConfigs(packageType) {

    pType = packageType;
    showPrice(0);
    document.getElementById("resultMessage").style.display = "none";
    document.getElementById("missingDimensionError").style.display = "none";
    document.getElementById("zeroDimensionError").style.display = "none";
    document.getElementById("errorsTitle").style.display = "none";
    document.getElementById("labelLength").style.color = "black";
    document.getElementById("labelWidth").style.color = "black";
    document.getElementById("labelHigh").style.color = "black";

    var measures = document.getElementsByClassName("measuresBox");

    if (packageType == "envelope") {
        document.getElementById("smallBox").style.display = "none";
        document.getElementById("smallEnvelope").style.display = "block";

        for (let i = 0; i < measures.length; i += 1) {
            measures[i].style.display = "none";
        }

    } else {
        document.getElementById("smallEnvelope").style.display = "none";
        document.getElementById("smallBox").style.display = "block";

        for (let i = 0; i < measures.length; i += 1) {
            measures[i].style.display = "block";
        }
    }
}