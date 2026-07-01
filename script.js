function prosesPDA() {
    const inputField = document.getElementById('input-string');
    const input = inputField.value.trim();
    const statusBox = document.getElementById('status-display');
    const statusMain = document.getElementById('status-main');
    const statusReason = document.getElementById('status-reason');
    const logViewer = document.getElementById('log-container');
    
    logViewer.innerHTML = ""; 
    statusReason.textContent = "";
    let stack = ['Z'];
    let state = 'q0';
    let isRejected = false;
    let reason = "";

    function recordLog(char, currentState, stackArr) {
        const div = document.createElement('div');
        div.className = "log-entry";
        div.textContent = `[Baca: ${char || 'ε'}] State: ${currentState} | Stack: ${JSON.stringify(stackArr)}`;
        logViewer.appendChild(div);
    }

    recordLog('Start', state, stack);

    if (input === "") {
        isRejected = true;
        reason = "Input tidak boleh kosong (n >= 1).";
    } else {
        for (let i = 0; i < input.length; i++) {
            let char = input[i];
            
           
            if (char !== 'a' && char !== 'b') {
                isRejected = true;
                reason = `Karakter '${char}' bukan bagian dari alfabet {a, b}.`;
                break;
            }

            if (state === 'q0') {
                if (char === 'a') {
                    stack.push('A');
                    state = 'q1';
                } else {
                    isRejected = true;
                    reason = "Karakter pertama harus 'a'.";
                    break;
                }
            } 
            else if (state === 'q1') {
                if (char === 'a') {
                    stack.push('A');
                } else if (char === 'b') {
                    if (stack[stack.length - 1] === 'A') {
                        stack.pop();
                        state = 'q2';
                    } else {
                        isRejected = true;
                        reason = "Input 'b' ditemukan tapi stack tidak memiliki 'A'.";
                        break;
                    }
                }
            } 
            else if (state === 'q2') {
                if (char === 'b') {
                    if (stack[stack.length - 1] === 'A') {
                        stack.pop();
                    } else {
                        isRejected = true;
                        reason = "Jumlah 'b' lebih banyak daripada jumlah 'a'.";
                        break;
                    }
                } else if (char === 'a') {
                    isRejected = true;
                    reason = "Karakter 'a' tidak boleh muncul setelah karakter 'b'.";
                    break;
                }
            }
            recordLog(char, state, stack);
        }
    }

    if (!isRejected) {
        if (state === 'q1') {
            isRejected = true;
            reason = "String hanya berisi 'a', minimal harus ada satu 'b'.";
        } else if (stack.length > 1) {
            isRejected = true;
            reason = "Jumlah 'a' lebih banyak daripada jumlah 'b' (Stack tidak kosong).";
        } else {
            state = 'q3'; 
            recordLog('End', state, stack);
        }
    }

    if (!isRejected && state === 'q3') {
        statusBox.className = "status-box accepted";
        statusMain.textContent = "HASIL: STRING DITERIMA";
        statusReason.textContent = "Kondisi a^n b^n terpenuhi.";
    } else {
        statusBox.className = "status-box rejected";
        statusMain.textContent = "HASIL: STRING DITOLAK";
        statusReason.textContent = "Alasan: " + reason;
    }
}