const socket = new WebSocket(`ws://${window.location.host}`);


let username = "Anonymous" // default name

socket.addEventListener("message" , (event) =>{
    handleMessage(event.data);
})


function handleMessage(data) {
    if(typeof data == "string") {
        // if text is string do this
        displayMessage(data);
    }
    else if(data instanceof Blob) {
        // if message is blob convert it to text
        const reader = new FileReader();

        reader.onload = function() {
            const text = reader.result;
            displayMessage(text);
        }
        reader.readAsText(data);
    }
    else{
        // handle unspoporreted messages 
        console.log("unsupported message");
    }
}

function displayMessage(message) {
    const li = document.createElement("li");
    li.textContent = message;
    document.querySelector("#messages").appendChild(li);
}


document.querySelector("#form").addEventListener("submit" , (event) =>{
    let username = "";
    event.preventDefault(); // remove default setting
    const name = document.querySelector("#name");
    const input = document.querySelector("#input");
    // update username if name is not empty
    if(name.value.trim() !== "") {
        username = name.value.trim();
    }
    // send message
    const message = `${username}:${input.value}`;
    socket.send(message);
    input.value = "";
    
})