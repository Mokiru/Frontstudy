// 倒计时
$(document).ready(()=> {
    let serverTime = $.ajax({
        type:'HEAD',
    }).success((data, status, xhr) => {
        let serverTime = xhr.getResponseHeader('date');
        serverTime = Date.parse(serverTime);
        countDown(serverTime);
    });
});

const targetTime = Number(new Date(2024, 0, 10, 11, 11, 11)); // 2024 year 1 month 10 day 11:11:11
function countDown(serverTime) {
    const diffTime = serverTime - Date.now();
    let stop = false;
    let start = Date.now();
    function animate() {
        if (stop) {
            return;
        }
        requestAnimationFrame(animate);
        if (Date.now() - start >= 100) {
            start += 100;
            const currentTime = Date.now() + diffTime;
            const duration = targetTime - currentTime;
            if (duration <= 0) {
                stop = true;
                duration = 0;
                alert("秒杀时间到");
            }
            render(duration);
        }
    }
    animate();
}


function render(duration) {
    let sec = duration / 1000;
    let min = sec / 60;
    let hour = min / 60;
    let milli;

    sec = format(sec % 60);
    min = format(min % 60);
    hour = format(hour % 60);
    milli = format((duration % 1000) / 100);

    const html = `限时秒杀:<span>${hour}:${min}:${sec}:${milli}</span>`;
    document.getElementById('countDown').innerHTML = html;

    function format(num) {
        const str = Math.floor(num) + '';
        return str.padStart(2, '0'); // 补全，如果长度小于2则用0补齐，start从左开始补end从右开始补
    }
}