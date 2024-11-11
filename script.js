let startTime;
        let elapsedTime = 0;
        let timerInterval;
        let running = false;
        let lapCount = 0;

        const display = document.getElementById('display');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const lapsDiv = document.getElementById('laps');

        function formatTime(ms) {
            const date = new Date(ms);
            return date.toISOString().slice(11, 23);
        }

        function updateDisplay() {
            display.textContent = formatTime(elapsedTime);
        }

        function start() {
            if (!running) {
                running = true;
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    updateDisplay();
                }, 10);
                startBtn.textContent = 'Pausar';
            } else {
                stop();
            }
        }

        function stop() {
            running = false;
            clearInterval(timerInterval);
            startBtn.textContent = 'Iniciar';
        }

        function reset() {
            stop();
            elapsedTime = 0;
            updateDisplay();
            lapCount = 0;
            lapsDiv.innerHTML = '';
        }

        function lap() {
            if (running) {
                lapCount++;
                const lapTime = document.createElement('div');
                lapTime.className = 'lap-time';
                lapTime.innerHTML = `
                    <span class="lap-number">Vuelta ${lapCount}</span>
                    <span class="lap-duration">${formatTime(elapsedTime)}</span>
                `;
                lapsDiv.insertBefore(lapTime, lapsDiv.firstChild);
            }
        }

        startBtn.addEventListener('click', start);
        stopBtn.addEventListener('click', stop);
        resetBtn.addEventListener('click', reset);
        lapBtn.addEventListener('click', lap);