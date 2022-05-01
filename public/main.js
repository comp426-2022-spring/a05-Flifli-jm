// Focus div based on nav button click

document.getElementById("homenav").onclick = function(){
    document. location. reload();
    document.getElementById("homenav").className = "active";
    document.getElementById("singlenav").className = "";
    document.getElementById("multinav").className = "";
    document.getElementByIdii("guessnav").className = "";

    document.getElementById("home").className = "";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
};

document.getElementById("singlenav").onclick = function(){
    document.getElementById("homenav").className = "";
    document.getElementById("singlenav").className = "active";
    document.getElementById("multinav").className = "";
    document.getElementById("guessnav").className = "";

    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
};

document.getElementById("multinav").onclick = function(){
    document.getElementById("homenav").className = "";
    document.getElementById("singlenav").className = "";
    document.getElementById("multinav").className = "active";
    document.getElementById("guessnav").className = "";

    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "";
    document.getElementById("guess").className = "hidden";
};

document.getElementById("guessnav").onclick = function(){
    document.getElementById("homenav").className = "";
    document.getElementById("singlenav").className = "";
    document.getElementById("multinav").className = "";
    document.getElementById("guessnav").className = "active";

    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "";
};


// Flip one coin and show coin image to match result when button clicked
function singleFlip() {
    fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        console.log(result);
        document.getElementById("singleResult").innerHTML = result.flip;
        document.getElementById("singleresultimg").src=`./assets/img/${result.flip}.png`;
    })
}

// Flip multiple coins and show coin images in table as well as summary results
const flipsForm = document.getElementById('multiform')
flipsForm.addEventListener('submit', multiFlip)
async function multiFlip(event){
    event.preventDefault()
    try {
            const formData = new FormData(event.currentTarget)
            const formDataJson = JSON.stringify(Object.fromEntries(formData))
            const options = {
            method: "POST",
            headers: {"Content-Type": 'application/json', Accept: 'application/json'},
            body: formDataJson
        }

        const flips = await fetch("http://localhost:5000/app/flip/coins", options).then(function(response) {
            return response.json()
        })
        
        console.log(flips)
        document.getElementById('multiresult').setAttribute('class', 'visible')
        for (var i = 0; i < flips.raw.length; i++) {
            document.getElementById('multiresult').innerHTML += `
            <tr>
                <img class="smallcoin" src="assets/img/` + flips.raw[i] + `.png"></img>
            </tr>
            `
        }
        document.getElementById('numHead').innerHTML += flips.summary.heads
        document.getElementById('numTail').innerHTML += flips.summary.tails 
    } catch (error) {
        console.log(error)
    }
}

// Guess a flip by clicking either heads or tails button
function guessHeads(){
    const head_result = fetch("http://localhost:5000/app/flip/call/heads", {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(head_result) {
        console.log(head_result);
        document.getElementById("guessed").innerHTML += head_result.call;
        document.getElementById("winloseimg").src=`./assets/img/${head_result.flip}.png`;
    })
}

function guessTails(){
    const tail_result = fetch("http://localhost:5000/app/flip/call", {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(tail_result) {
        console.log(tail_result);
        document.getElementById("guessed").innerHTML += tail_result.call;
        document.getElementById("winloseimg").src=`./assets/img/${tail_result.flip}.png`;
    }) 
}