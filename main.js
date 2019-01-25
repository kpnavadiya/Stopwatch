// Variable

var hh = document.getElementById('houers'),
    mm = document.getElementById('minute'),
    ss = document.getElementById('second');
    ms = document.getElementById('mili');

const start = document.getElementById('start'),
      stop = document.getElementById('stop');
      reset = document.getElementById('reset');
      lapListContent = document.getElementById('lapList');

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
    lap.addEventListener('click', getLap);   
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
    // console.log(houers);
    //Create a <tr>
    const lapRow = document.createElement('tr');
    
    // Build a templet for lap
    lapRow.innerHTML = `
            <tr>
                
                <td> ${houers}: ${minute}: ${second}: ${mili} </td>
            </tr>
    `;
    // Add into Html
    lapListContent.appendChild(lapRow);
}

function getLap(){
    const lapList = {
        houers : document.getElementById("houers").textContent,
        minute : document.getElementById("minute").textContent,
        second : document.getElementById("second").textContent,
        mili : document.getElementById("mili").textContent
    } 
    lapTimer(lapList);
    //console.log(lapList);
}
