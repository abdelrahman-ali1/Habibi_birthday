document.addEventListener("DOMContentLoaded", () => {

    const heart = document.getElementById("heart");
    const intro = document.getElementById("intro");
    const main = document.getElementById("mainContent");
    const song = document.getElementById("song");
    const sections = [
        document.getElementById("sec1"),
        document.getElementById("sec2"),
        document.getElementById("sec3"),
        document.getElementById("sec4")
    ];

    const surpriseBtn = document.getElementById("surpriseBtn");
    const surpriseContent = document.getElementById("surpriseContent");

    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettis = [];

    function createConfetti(){
        confettis = [];
        const colors = ["#c58be9","#7b1fa2","#ff9ad3","#ffd86b"];
        for(let i=0;i<50;i++){
            confettis.push({
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.height - canvas.height,
                r: 6+Math.random()*6,
                dx: (Math.random()-0.5)*2,
                dy: 2+Math.random()*3,
                color: colors[Math.floor(Math.random()*colors.length)],
                rot: Math.random()*360,
                spin: (Math.random()-0.5)*0.2
            });
        }
    }

    function drawConfetti(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confettis.forEach(c=>{
            c.x += c.dx;
            c.y += c.dy;
            c.rot += c.spin;
            ctx.save();
            ctx.translate(c.x,c.y);
            ctx.rotate(c.rot);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.r/2,-c.r/2,c.r,c.r*0.7);
            ctx.restore();
            if(c.y>canvas.height){ c.y=-10; }
        });
        requestAnimationFrame(drawConfetti);
    }

    heart.addEventListener("click", () => {
        intro.style.opacity = "0";
        setTimeout(() => {
            intro.style.display = "none";
            main.classList.remove("hidden");

            song.play();

            createConfetti();
            drawConfetti();

            // عرض العناصر واحد ورا التاني مع confetti
            let delay = 500;
            sections.forEach(sec => {
                setTimeout(() => {
                    sec.classList.add("show");
                }, delay);
                delay += 1500;
            });
        }, 800);
    });

    // زر المفاجأة
    surpriseBtn.addEventListener("click", () => {
        surpriseContent.classList.remove("hidden");
        surpriseContent.classList.add("show");
        createConfetti();
    });

    // تحديث حجم canvas عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

});