let socket = null;

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
}
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
    socket = io(url);
    alert("Connected to Socket");
    localStorage.setItem('url', url);
    document.getElementById('disconnect').hidden = false;
});

document.getElementById('disconnect').addEventListener('click', () => {
    document.getElementById('disconnect').hidden = true;
    socket?.disconnect();
    alert('Socket connection dropped');
});
