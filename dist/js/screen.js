function getScreenSize() {
    let w = document.body.clientWidth;
    let k = 76.6;
    let f;

    if(w < 1024) {
        f = 13.5;
    } else {
        f = w / k;
    }

    document.documentElement.style.fontSize = f + 'px';
}

getScreenSize();

window.addEventListener('resize', getScreenSize);