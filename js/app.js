function newItem(){
    var item = document.getElementById('input').value;
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    var p = document.createElement('p');
    var div = document.createElement('div');
    var deleteButton = document.createTextNode('');

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
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
}


