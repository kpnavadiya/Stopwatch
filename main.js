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

// Check Page is reload!!! 
if(window.performance) {
    //console.log('work fine');
} if(performance.navigation.type == 1) {
    //console.log('page reload!!!');
    //reloadPage();
}else {
    console.log('page is not reload!!!');
}



function listener() {
    // When start a stopwatch    
    start.addEventListener('click', timeSet);
    stop.addEventListener('click',pauseTimer);
    reset.addEventListener('click', resetTimer); 
    lap.addEventListener('click', lapTimer);
    shows.addEventListener('click', show);
    
}

///////////////////////////////////////////////////////////////////////////
//window.onbeforeunload();
// Function
// When page is reload
function reloadPage() {
    alert ('thread');
    var sec = document.getElementById('second').textContent;
    localStorage.setItem("second", sec);

    var sec = localStorage.getItem("second");
    //console.log(sec);
}
window.onbeforeunload = reloadPage();
/////////////////////////////////////////////////////////////////////////////
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
   
   // Remove Lap History from DOM
    removeLap();
}

// Count Stopatch Lap
function lapTimer() {
        //Save History in LocalStorage
        saveInlocal(houers,minute,second,mili);

    const lapRow = document.createElement('tr');
    
    // Build a templet for lap
    lapRow.innerHTML = `
           
         <tr><td><a id="list"></a></td>
            <td> ${houers}: ${minute}: ${second}: ${mili} </td>
               
        </tr>
    `;
    // Add into Html
    
    lapListContent.appendChild(lapRow);    
}

// Save into local storage
function saveInlocal(houers,minuet,second,mili) {
    
    let timeStore = getTimeFromStorage();
    //let timeData;
    if(houers!='00' || minuet!='00' || second != '00' || mili != '00'){
        // Check the numbers of Lap
        if(timeStore.length >= 10){
            timeStore.shift();
        }
        let timeData = houers + ':' + minuet + ':' + second + ':' + mili;
    
         //add into local storage
        timeStore.push(timeData);
    
         // save as string into localStorage
        localStorage.setItem('timeStores', JSON.stringify(timeStore));
    }
       
}

// get time into storage
function getTimeFromStorage() {
    let timeStore;
    
    // Check if something exist on storage otherwise it create empty array
    if(localStorage.getItem('timeStores') === null) {
        timeStore = [];
    } else {
        timeStore = JSON.parse(localStorage.getItem('timeStores'));
        
    }
    return timeStore;
}

// print the history of the lap from LocalStorage
function show() {
    let timess = getTimeFromStorage();
    
	//Remove Old History row from the tamplate
	 removeHistory();
    //count all lap into loop
	timess.forEach(function(lapT) {
        //create <tr> tage into html
        const row = document.createElement('tr');

        //print on html
        row.innerHTML = `
            <tr>
                <td>${lapT} </td>
            </tr>
            `;
			
            showLapHistory.appendChild(row);
    });

    
}

// Remove Lap
function removeLap() {
    // Remove All the Child of the laplist  
    var list = document.getElementById('lapList');
      while(list.hasChildNodes()) {
          list.removeChild(list.firstChild);
      }
    
}

// Remove old History
function removeHistory() {
	//Remove All the child of history 
	var list = document.getElementById('historyList');
      while(list.hasChildNodes()) {
          list.removeChild(list.firstChild);
      }
}