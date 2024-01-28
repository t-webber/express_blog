let CounterValue = 0;
let IncrValue = 1;
let Power10Incr = 0;
const DEC = 12;
let borderReached = false;

document.getElementById("decr").onclick = function () {
    CounterValue -= IncrValue;
    CounterValue = Number(CounterValue.toFixed(DEC));
    document.getElementById("CounterValue").innerHTML = CounterValue;
}

document.getElementById("reset").onclick = function () {
    CounterValue = 0;
    IncrValue = 1;
    Power10Incr = 0;
    borderReached = false;
    document.getElementById("decr").innerHTML = "-" + IncrValue;
    document.getElementById("incr").innerHTML = "+" + IncrValue;
    document.getElementById("CounterValue").innerHTML = CounterValue;
}

document.getElementById("incr").onclick = function () {
    CounterValue += IncrValue;
    CounterValue = Number(CounterValue.toFixed(DEC));
    document.getElementById("CounterValue").innerHTML = CounterValue;
}

document.getElementById("changeLess").onclick = function () {
    Power10Incr -= 1;
    IncrValue /= 10;
    IncrValue = Number(IncrValue.toFixed(-Math.min(0, Power10Incr)));
    document.getElementById("decr").innerHTML = "-" + IncrValue;
    document.getElementById("incr").innerHTML = "+" + IncrValue;
}

document.getElementById("changeMore").onclick = function () {
    Power10Incr += 1;
    IncrValue *= 10;
    IncrValue = Number(IncrValue.toFixed(-Math.min(0, Power10Incr)));
    document.getElementById("decr").innerHTML = "-" + IncrValue;
    document.getElementById("incr").innerHTML = "+" + IncrValue;
}



function change () {
    let value = document.getElementById("input").value;
    if (value == "") {
        document.getElementById("input").value = "Write";
    }
    else {
        if (value == "round") {
            document.getElementById("CounterValue").innerHTML = CounterValue.toFixed(-Math.min(0, Power10Incr));
        }
        else if (value == "floor") {
            document.getElementById("CounterValue").innerHTML = CounterValue.toFixed();
        }
        else {
            CounterValue = Number(document.getElementById("input").value);
            CounterValue = Number(CounterValue.toFixed(DEC));
            document.getElementById("CounterValue").innerHTML = CounterValue;
        }
        document.getElementById("input").value = "";
    }
}

document.getElementById("input").onclick = function () {
    if (document.getElementById("input").value == "Write") {
        document.getElementById("input").value = "";
    }
}


document.getElementById("Change").onclick = function () {
    change();
}

document.getElementById("input").addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        change();
    }
});


document.body.addEventListener('click', (event) => {
    if (!borderReached && String(CounterValue).length > 7) {
        window.alert("The site doesn't guarantee to be functional after this frontiere. Click OK to ignore this warning, or reset the counter.");
        borderReached = true;
    }
    if (String(CounterValue) == "NaN") {
        window.alert("You're a fuckin' idiot!") ; 
    }
});