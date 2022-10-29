let socket = null;
let intervalEvent = null;

const validateUrl = () => {
    const value = String(document.getElementById('uri').value);
    if (value.search("http://") != -1 && value[value.length - 1] === '/' && value[value.length - 2] !== '/') {
        document.getElementById('output').innerText = `Can connect to ${value}`;
        document.getElementById('output').style.color = 'blue';
        document.getElementById('connect').hidden = false;
    } else {
        document.getElementById('output').style.color = 'red';
        document.getElementById('output').innerText = `Enter a valid URL`;
        document.getElementById('connect').hidden = true;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('uri').value = localStorage.getItem('url');
    validateUrl();
    document.getElementById('disconnect').hidden = true;
});

document.getElementById('uri').addEventListener("input", () => {
    validateUrl();
});

document.getElementById("connect").addEventListener("click", function (e) {
    e.preventDefault();
    const url = String(document.getElementById('uri').value);

    socket = io(url, {
        extraHeaders: {
            // token: "token-gg"
        }
    });

    socket.on("connect", () => {
        document.getElementById('main-section').innerHTML = `<p id="socket-id">${socket.id}</p><p id="socket-data"></p>`
    });

    socket.on("disconnect", () => {
        document.getElementById('main-section').removeChild(document.getElementById('socket-id'))
    });
    i = 0;
    intervalEvent = setInterval(() => {
        socket.emit("testServer", `Hi Server - ${i}`);
        i++;
    }, 2000);

    socket.on("testClient", data => {
        document.getElementById('socket-data').innerHTML = data;
    })

    alert("Connected to Socket");

    localStorage.setItem('url', url);
    document.getElementById('disconnect').hidden = false;
});

document.getElementById('disconnect').addEventListener('click', () => {
    socket?.disconnect();
    clearInterval(intervalEvent);
    document.getElementById('disconnect').hidden = true;
    alert('Socket connection dropped');
});

