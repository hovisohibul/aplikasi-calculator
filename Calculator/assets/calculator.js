// membuat objek untuk calculator
const calculator = {
    displayNumber: '0', // objek untuk display
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
}

// mengupdate angka pada display
function updateDisplay(){

    // mengupdate nilai pada tag displayNumber pada objek calculator
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

// menghapus angka(mengembalikan menjadi 0) pada display 
function clearNumber(){

    // memanggil objek untuk menghapus angka pada display
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// menambahkan angka pada display
function inputDigit(input){
    
    // mengubah nilai 0 pada display menjadi angka yang dipilih
    if(calculator.displayNumber === '0'){
        calculator.displayNumber = input;
    }else{
        calculator.displayNumber += input;
    }
}

// mengubah angka pada display menjadi negative
function inverseNumber(){
    if(calculator.displayNumber === '0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// menetapkan operator pada fungsi
function handleOperator(operator){

    // mengetahui nilai pada objek
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        
        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    }else if(calculator.waitingForSecondNumber != calculator.firstNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        
        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    }else{
        alert("Operator Telah Ditetapkan");
    }
}

// menghitung angka yang ditetapkan
function performCalculation(){

    // kondisi jika angka belum dipilih
    if(calculator.firstNumber == null || calculator.operator == null){
        alert("Anda belum menerapkan operator atau angka");
    }

    // kondisi mentotalkan angka yang dipilih
    let result = '0';
    if(calculator.operator == '+'){
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }else{
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    // objek untuk riwayat calculator
    const history = {
        firstNumber: calculator.firstNumber,
        operator: calculator.operator,
        secondNumber: calculator.displayNumber,
        result: result
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

// inisialisasi nilai seluruh element button
const buttons = document.querySelectorAll('.button');

// pemeriksaan tiap nilai button secara looping yang ditargetkan
for(let button of buttons){
    button.addEventListener('click', function(event){

        // mendapatkan objek saat click
        const target = event.target;

        // menghapus angka dengan clear
        if(target.classList.contains('clear')){

            // memanggil function clear
            clearNumber();
            updateDisplay();
            return; // agar nilai dikembalikan menjadi angka 0
        }

        // mengubah angka pada display menjadi negative
        if(target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }

        // total/menghitung angka yang diinputkan
        if(target.classList.contains('equals')){
            performCalculation();
            updateDisplay();
            return;
        }

        // mengendalikan operator
        if(target.classList.contains('operator')){
            handleOperator(target.innerText);
            return;
        }

        // memanggil function
        inputDigit(target.innerText);
        updateDisplay();
    })
}