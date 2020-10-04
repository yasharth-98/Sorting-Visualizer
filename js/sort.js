import SortingAlgo from './sortingAlgo.js';

var objects = [], speed = 50, size = 50, s;

function select(t){
    if(type!=-1){
        document.querySelector("#btn-"+type).style.backgroundColor="";
    }
    if(t>-1){
        document.querySelector("#btn-"+t).style.backgroundColor="#dc3545";
        
    }
    type=t;
}


async function sort()
{
    if (s && s.inProgress)
    {
        alert("Please wait and enjoy");
        return;
    }

    if (s)
    {
        s.setObjects(objects);
    }
    else {
        s = new SortingAlgo(objects,speed);
    }
    switch(type)
    {
        case -1: alert("Please select a sort type: "); break;
        case 0: s.bubbleSort();break;
        case 1: s.insertionSort();break;
        case 2: s.mergeSort();break;
        case 3: s.selectionSort();break;
        case 4: s.quickSort();break;
        case 5: s.heapSort();break;
        default: randomize();break;
    }
}

function speedToggle(value)
{
    speed = value;
    if (s)
    {
        s.setSpeed(value);
    }
}

async function frequencyToggle(value)
{
    size = value;
    await randomize();
}

async function randomize()
{
    if (s && s.inProgress)
    {
        alert("Please observe");
        return;
    }
    var arr = [];
    objects = [];

    var area = document.querySelector('#bars');
    let h = parseInt($('#bars').height())-50;
    area.innerHTML = "";
    for(var i = 0; i< size; i++)
    {
        arr.push(Math.floor(Math.random()*h + 1));
    }
    for(var i = 0; i< size; i++)
    {
        var bar = document.createElement("div");
        bar.className = "bar";
        bar.title = arr[i]+" px";
        var attribute = document.createAttribute('style');
        attribute.value = "height: " +arr[i]+"px; background-color: white;";
        bar.setAttributeNode(attribute);
        area.appendChild(bar);
        objects.push(bar); 
    }
}


export{randomize, speedToggle, frequencyToggle, sort, select};