function dragStart(){}
function dragStart(event) {
   console.log("dragStart");
event.dataTransfer.setData("Text", event.target.id);
}

function dragging(event) {
    console.log("dragOver");
    document.getElementById("dragtarget").style.backgroundColor = "red";
}

function allowDrop(event) {
    console.log("-");
    event.preventDefault();
}

function drop(event) {
    console.log("dropped");
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
    //document.getElementById("demo").innerHTML = "The p element was dropped";
}

