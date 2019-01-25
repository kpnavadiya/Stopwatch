// Variable

var hh = document.getElementById('houers'),
    mm = document.getElementById('minute'),
    ss = document.getElementById('second');
    ms = document.getElementById('mili');

const start = document.getElementById('start'),
      stop = document.getElementById('stop');
      reset = document.getElementById('reset');
      lapListContent = document.getElementById('lapList'),
      showLapHistory = document.getElementById('historyList'),
      shows = document.getElementById('history');


      let mili = 0,
      second = 0,
      minute = 0,
      houers = 0,
      timer=0;
      // Action Listener

listener();


function listener() {
    // When start a stopwatch    
    start.addEventListener('click', timeSet);
    stop.addEventListener('click',pauseTimer);
    reset.addEventListener('click', resetTimer); 
    lap.addEventListener('click', lapTimer);
    shows.addEventListener('click', show);   
}

// Function

function timeSet() {
     
    // Calculation of the time   
        mili++;
        printTime(houers,minute,second,mili);
    if(mili === 10) {
        second++;
        mili = 0;
        printTime(houers,minute,second,mili);
    } if(second === 60) {
        minute++;
        second = 0;
        printTime(houers,minute,second,mili);
    } if(minute === 60) {
        houers++;
        minute = 0;
        printTime(houers,minute,second,mili);
    }

    // Reapet every 100ms time 
     timer = setTimeout(function(){
         timeSet() }, 100);   
    start.innerHTML = "Resume";    
}

// Print time on Html        
function printTime(h,m,s,mi) {
    hh.innerHTML = h;
    mm.innerHTML = m;
    ss.innerHTML = s;
    ms.innerHTML = mi;         
}

// Pause Stopwatch
function pauseTimer() {
    // When stop button click
   clearTimeout(timer);   
}

// Reset Stopwatch
function resetTimer() {
    //it will start from(0:0:0:0)
    clearTimeout(timer);
    start.innerHTML = 'Start';
    printTime(houers = 0,minute = 0,second = 0,mili = 0);
   
}

// Count Stopatch Lap
function lapTimer() {
        count();
    const lapRow = document.createElement('tr');
    
    // Build a templet for lap
    lapRow.innerHTML = `
            <tr>
                
            </tr>
            <tr>
            <td> ${houers}: ${minute}: ${second}: ${mili} </td>
            <td> ${lepTime.houers}: ${lepTime.minute}: ${lepTime.second}: ${lepTime.mili}</td>
            </tr>
    `;
    // Add into Html
    
    lapListContent.appendChild(lapRow);    
}
let t=0;

let lepTime = {
    houers  , minute , second , mili };
function count() {
   
    saveInlocal(second);
}

// Save into local storage
function saveInlocal(second) {
    
    let timeStore = getTimeFromStorage();
    
    //add into local storage
    timeStore.push(second);
    
    // save as string into localStorage
    localStorage.setItem('timeStore', JSON.stringify(timeStore));
    
}

// get time into storage
function getTimeFromStorage() {
    let timeStore;
    
    // Check if something exist on storage otherwise it create empty array
    if(localStorage.getItem('timeStore') === null) {
        timeStore = [];
    } else {
        timeStore = JSON.parse(localStorage.getItem('timeStore'));
        
    }
    return timeStore;
}

// print the history of the lap
function show() {
    let timess = getTimeFromStorage();

    //count all lap into loop
    timess.forEach(function(second) {
        //create <tr> tage into html
        const row = document.createElement('tr');

        //print on html
        row.innerHTML = `
            <tr>
                <td>${second.second} </td>
            </tr>
            `;
            showLapHistory.appendChild(row);
    });
    
}