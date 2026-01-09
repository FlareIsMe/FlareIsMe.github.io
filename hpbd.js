const startbtn = document.getElementById("start");
const cake1 = document.getElementById("cake1");
const cake2 = document.getElementById("cake2");
const cakes = document.querySelectorAll("cakes");

const msgbtn = document.getElementById("msgicon");
const msgbox = document.getElementById("msgbox");
const noti = document.getElementById("noti");
let boxOpened = false;

const ColorsFree = [
    '#ffa9a9dc',
    '#ffb8b8c0',
    '#ffb8b897',
    '#ff9e9e7b',
    '#ffb8b84e',
    '#f9a0a013',
];

function createIcons() {
    const iconsList = ['❤️', '♒', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🎈', '🎂', '🍰', '🎉', '🍹', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟'];

    const totalIcons = 50;

    const container = document.querySelector('.bgcontainer');

    for (let i = 0; i < totalIcons; i++) {
        const iconEl = document.createElement('div');

        iconEl.innerText = iconsList[Math.floor(Math.random() * iconsList.length)];

        if (iconEl.innerText == '🌟') {
            iconEl.classList.add('stars');
            iconEl.style.top = -(Math.random() * 10 + 5) + 'vh';
            if (Math.round(Math.random()) == 0) iconEl.style.animationName = `falldown0`;
            else iconEl.style.animationName = `falldown1`;
        }
        else if (iconEl.innerText == '🎈') {
            iconEl.classList.add('balloons');
            if (Math.round(Math.random()) == 0) iconEl.style.animationName = `floatUp`;
            else iconEl.style.animationName = `floatUp1`;
        }
        else {
            iconEl.classList.add('icons');
            if (Math.round(Math.random()) == 0) iconEl.style.animationName = `floatUp`;
            else iconEl.style.animationName = `floatUp1`;
        }


        iconEl.style.left = Math.random() * 100 + '%';

        const size = Math.random() * 15 + 10;
        iconEl.style.fontSize = size + 'px';

        iconEl.style.animationDuration = (Math.random() * 3 + 5) + 's';

        iconEl.style.animationDelay = Math.random() * 5 + 's';

        iconEl.style.opacity = Math.random() * 0.5 + 0.5;
        container.appendChild(iconEl);
    }
}

function runCountdown() {
    const word = document.getElementById("wordcontainer");

    word.innerHTML = `<span id="wordhappy">HAPPY</span> <span id="wordbirthday">BIRTHDAY</span>`;
    word.id = `HPBD`;

    setTimeout(() => {
        word.innerHTML = `<span class="otherwords">HAP</span><span id="wordP" class="name">P</span><span class="otherwords">Y </span><span id="wordB" class="name">B</span><span class="otherwords">IRTH</span><span id="wordD" class="name">D</span><span class="otherwords">AY</span>`;

        setTimeout(() => {
            word.id = `fullname`;
            word.innerHTML = `Phạm Bạch Dương`;
            setTimeout(()=>{
                msgbtn.onclick = function(){
                    msgbtn.style.border = 0;
                    if(boxOpened){
                        msgbox.style.display = 'none';
                        boxOpened = false;
                    }
                    else{
                        msgbox.style.display = 'block';
                        boxOpened = true;
                        noti.style.display = 'none';
                    }
                }
                noti.style.display = 'block';
                msgbtn.style.border = `solid 3px rgb(255, 57, 57)`;
                msgbox.style.border = `dashed 5px plum`;
                msgbox.innerHTML = `Aujourd'hui, c'est une spéciale journée de toi.<br>Donc, j'ai créé ce web comme un cadeau à toi. <br>Joyeux anniversaire <3`;
            },5000);
        }, 2000);
    }, 5000);
}

function runCanvas(callback) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth * 99 / 100;
    canvas.height = window.innerHeight * 99 / 100;

    let particles = [];
    let textIndex = 0;
    const textArray = ["3", "", "2", "", "1", "", "0", ""];

    let fontSize = window.innerWidth / 6;
    ctx.font = `bold ${fontSize}px 'Fasthand black`;

    class Particle {
        constructor(x, y) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.targetX = x;
            this.targetY = y;
            this.size = 1;

            this.ease = 0.05 + Math.random() * 0.05;

            this.angle = Math.random() * Math.PI * 2;
            this.isFree = false;
        }

        update() {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;

            const distanceSq = dx * dx + dy * dy;

            if (distanceSq > 1) {
                this.x += dx * this.ease;
                this.y += dy * this.ease;
            }
            else {
                this.x = this.targetX;
                this.y = this.targetY;
            }
            if (this.isFree) {
                this.angle += 0.02;
                this.x += Math.sin(this.angle) * 0.15;
                this.y += Math.cos(this.angle) * 0.15;
            }
        }

        draw() {
            ctx.fillStyle = this.isFree ? ColorsFree[Math.floor(Math.random() * 6)] : '#ffb8b8';
            ctx.beginPath();
            this.size = this.isFree ? Math.random() * 2 + 1 : 1;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function getTextCoordinates(text) {
        ctx.fillStyle = 'rgb(6, 6, 6)';
        fontSize = window.innerWidth / 6;
        ctx.font = `bold ${fontSize}px 'Fasthand'`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const buffer = imageData.data;
        let coordinates = [];

        let gap = 3;
        if (window.innerWidth < 600) gap = 3;

        for (let y = 0; y < canvas.height; y += gap) {
            for (let x = 0; x < canvas.width; x += gap) {
                const index = (y * canvas.width + x) * 4;
                if (buffer[index] == 6) {
                    coordinates.push({ x: x, y: y });
                }
            }
        }
        return coordinates;
    }

    function changeText() {
        const currentText = textArray[textIndex];

        const newCoords = getTextCoordinates(currentText);

        if (currentText.trim() === "") {
            for (let i = 0; i < particles.length; i++) {
                let degree = Math.random() * 360;
                particles[i].targetX = canvas.width / 2 + Math.cos(degree) * Math.random() * (canvas.height / 12);
                particles[i].targetY = canvas.height / 2 + Math.sin(degree) * Math.random() * (canvas.height / 12);
                particles[i].isFree = true;
            }
        }

        else {

            if (particles.length < newCoords.length) {
                const coordsToAdd = newCoords.length - particles.length;
                for (let i = 0; i < coordsToAdd; i++) {
                    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
                }
            } else if (particles.length > newCoords.length) {
                particles.length = newCoords.length;
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].targetX = newCoords[i].x;
                particles[i].targetY = newCoords[i].y;
                particles[i].isFree = false;
            }
        }

        textIndex++;
        if (textIndex >= textArray.length) {
            for (let i = 0; i < particles.length; i++) {
                particles[i].targetX = -10;
                particles[i].targetY = -10;
            }
            textIndex = 0;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    animate();

    setTimeout(() => {
        changeText();
        setTimeout(() => {
            changeText();
            setTimeout(() => {
                changeText();
                setTimeout(() => {
                    changeText();
                    setTimeout(() => {
                        changeText();
                        setTimeout(() => {
                            changeText();
                            setTimeout(() => {
                                changeText();
                                setTimeout(() => {
                                    cake1.style.display = 'block';
                                    cake2.style.display = 'block';
                                    setTimeout(() => {
                                        cake1.style.animationName = 'cakesAnimation';
                                        cake1.style.animationDuration = '1s';
                                        cake2.style.animationName = 'cakesAnimation';
                                        cake2.style.animationDuration = '1s';
                                    }, 3000);
                                    changeText();
                                    callback();
                                }, 1000);
                            }, 500);
                        }, 1000);
                    }, 500);
                }, 1000);
            }, 500);
        }, 1000);
    }, 500);

}


startbtn.onclick = function () {
    startbtn.style.display = `none`;
    runCanvas(runCountdown);
    createIcons();
    const music = document.getElementById("music");
    music.play();
    music.volume = 0.2;
}
