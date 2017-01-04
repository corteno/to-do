function newItem(){
    var item = document.getElementById('input').value;
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    var p = document.createElement('p');
    var div = document.createElement('div');
    var deleteButton = document.createTextNode('');
    var deleteSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");



    li.className = "todo-element";
    li.appendChild(p);
    p.appendChild(document.createTextNode(item));
    li.appendChild(div);
    div.className = 'delete-button';
    div.appendChild(deleteButton);
    ul.appendChild(li);

    document.getElementById('input').value ="";
    div.onclick = removeItem;
}

document.body.onkeyup = function(e){
    if(e.keyCode == 13){
        newItem();
    }
}

function removeItem(e){
    var removeDelay = 200; //in ms
    e.target.parentElement.className = "hide-element";

    setTimeout(function () {
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    }, removeDelay);
    //e.target.parentElement.parentElement.removeChild(e.target.parentElement);
}


