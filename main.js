// Variable

var hh = document.getElementById('houers'),
    mm = document.getElementById('minute'),
    ss = document.getElementById('second');
    ms = document.getElementById('mili');

const start = document.getElementById('start'),
      stop = document.getElementById('stop');


// Action Listener

listener();


function listener() {
    // When start a stopwatch    
    start.addEventListener('click', timeSet);
    stop.addEventListener('click',pause);    
}

// Function

let mili = 0,
    second = 0,
    minute = 0,
    houers = 0,
    timer;
    

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
        
}

// Print time on Html        
function printTime(h,m,s,mi) {
    hh.innerHTML = h;
    mm.innerHTML = m;
    ss.innerHTML = s;
    ms.innerHTML = mi;         
}

// Pause Stopwatch
function pause(mili,second,minute,houers) {
    // When stop button click
   clearInterval(timer);
    

}

