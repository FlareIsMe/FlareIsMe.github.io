function createIcons() {
    const iconsList = ['❤️','♒','🔴','🟠','🟡','🟢','🔵','🟣','🎈','🎂','🍰','🎉','🍹','🌟','🌟','🌟','🌟','🌟','🌟'];

    const totalIcons = 100; 
    
    const container = document.querySelector('.bgcontainer');

    for (let i = 0; i < totalIcons; i++) {
        const iconEl = document.createElement('div');
        
        iconEl.innerText = iconsList[Math.floor(Math.random() * iconsList.length)];
        
        if(iconEl.innerText=='🌟'){
            iconEl.classList.add('stars');
            iconEl.style.top = -(Math.random()*10 + 5) + 'vh';
            if(Math.round(Math.random())==0) iconEl.style.animationName = `falldown0`;
            else iconEl.style.animationName = `falldown1`;
        }
        else if(iconEl.innerText == '🎈'){
            iconEl.classList.add('balloons');
        }
        else{
            iconEl.classList.add('icons');
        }

        iconEl.style.left = Math.random() * 100 + '%';

        const size = Math.random() * 15 + 10; 
        iconEl.style.fontSize = size + 'px';
        
        iconEl.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        iconEl.style.animationDelay = Math.random() * 5 + 's';

        iconEl.style.opacity = Math.random() * 0.5 +0.5;
        container.appendChild(iconEl);
    }
}

function runCountdown(){
const word=document.getElementById("wordcontainer");

word.innerHTML = 3;
setTimeout(()=>{
    word.innerHTML = 2;
},1900);

setTimeout(()=>{
    word.innerHTML = 1;
},3900);

setTimeout(()=>{
    word.innerHTML = 0;
},5900);

setTimeout(()=>{
    word.innerHTML = `HAPPY BIRTHDAY`
    word.id = `HPBD`;
},7900);

setTimeout(()=>{
    word.innerHTML = `<span class="otherwords">HAP</span><span id="wordP" class="name">P</span><span class="otherwords">Y </span><span id="wordB" class="name">B</span><span class="otherwords">IRTH</span><span id="wordD" class="name">D</span><span class="otherwords">AY</span>`;
},12000);

setTimeout(()=>{
    word.id = `fullname`;
    word.innerHTML = `Phạm Bạch Dương`;
},14000);
}

runCountdown();