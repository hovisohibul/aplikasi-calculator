// variabel storage
const CACHE_KEY = 'calculation_history';

// mengembalikan nilai boolean pada storage
function checkForStorage(){
    return typeof(Storage) !== "undefined"
}

// menyimpan data pada storage
function putHistory(data){

    // mengecek data apakah tersimpan pada storage
    if(checkForStorage()){
        
        // variable dengan nilai null
        let historyData = null;

        // mencari data yang disimpan dengan tidak bersifat null
        if(localStorage.getItem(CACHE_KEY) === null){
            historyData = [];
        }else{
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        // get variable history
        historyData.unshift(data);
        
        // mengecek data yang akan dikeluarkan
        if(historyData.length > 5){
            historyData.pop(); // mengeluarkan data oleh data yang telah dikelurkan
        }

        // set local storage dengan nilai variabel pertama
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

// mendapatkan data pada storage dan menampilkannya
function showHistory(){

    // mengembalikan nilai yang kosong
    if(checkForStorage()){
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    }else{
        return [];
    }
}

// merender data riwayat
function renderHistory(){

    // variabel
    const historyData = showHistory();
    let historyList = document.querySelector('#historyList');

    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
    
    // pengulangan untuk merender riwayat data calculator
    for(let history of historyData){

        // membuat variable dengan get id pada nilai
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();