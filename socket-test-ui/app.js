let socket = null;

renderControlPanel(false);

function validateUrl() {
    const value = String(document.getElementById('uri').value);
    if (
        value.search("http://") != -1 &&
        value[value.length - 1] === '/' &&
        value[value.length - 2] !== '/'
    ) {
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
    document.getElementById('token').value = localStorage.getItem('token');
    document.getElementById('endpoint').value = localStorage.getItem('endpoint');

    validateUrl();

    document.getElementById('disconnect').hidden = true;
});


document.getElementById('uri').addEventListener("input", () => {
    validateUrl();
});


document.getElementById("connect").addEventListener("click", function (e) {
    e.preventDefault();
    const url = String(document.getElementById('uri').value);
    const token = String(document.getElementById('token').value);
    const ep = String(document.getElementById('endpoint').value);
    socket?.disconnect();
    socket = io(url, {
        extraHeaders: { authorization: `Bearer ${token}` },
        query: { ep }
    });

    socket.on("connect", () => {
        document.getElementById('main-section').innerHTML = `<p id="socket-id">Socket ID: ${socket.id}</p><p id="socket-data"></p>`;
        renderControlPanel(true);
    });

    socket.on("disconnect", () => {
        document.getElementById('disconnect').hidden = true;
        alert('Socket connection dropped');
        document.getElementById('main-section').removeChild(document.getElementById('socket-id'));
        renderControlPanel(false);
    });


    socket.on("testClient", data => {
        document.getElementById('socket-data').innerHTML = data;
    });

    socket.on('to_ui', (data) => {
        console.log(data);
        if (data.chip_id)
            document.getElementById('chip_id').innerText = data.chip_id;
        if (data.value != null || data.value != undefined) {
            document.getElementById('from_device').innerText = data.value;

        }
        if (data.state != null || data.state != undefined) {
            document.getElementById('pump').checked = data.state;
        }

        if (data.pump_enable != null || data.pump_enable != undefined) {
            if (data.pump_enable == false) {
                socket.emit("from_ui", { state: false });
                document.getElementById('pump').checked = false;
            }
        }
    });


    localStorage.setItem('url', url);
    localStorage.setItem('token', token);
    localStorage.setItem('endpoint', ep);
    document.getElementById('disconnect').hidden = false;

    alert("Connected to Socket");
});


document.getElementById('disconnect').addEventListener('click', () => {
    socket?.disconnect();
});

document.getElementById('from_ui').addEventListener(
    'input',
    (x) => {
        const value = x.target.value;
        socket?.emit("from_ui", value);
    }
);

function renderControlPanel(x) {
    document.getElementById('ctrl').hidden = !(x === true);
}


document.getElementById('pump').addEventListener(
    'click',
    () => {
        let value = Boolean(document.getElementById('pump').checked)
        console.log(value)

        socket.emit("from_ui", { state: value })
    }
)