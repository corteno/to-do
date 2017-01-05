var toDoElements = new Array();
var emptyInputError = "Can't add empty to-do!";

//=================== COOKIES ==========================

var getCookies = function(){
    var cookies = document.cookie;
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(',');

    //console.log(decodedCookie);
    for(var i = 0; i < ca.length; i++){
        var startPos = ca[i].indexOf("\"") + 1;
        var endPos = ca[i].indexOf("\"", startPos);
        var toDoElement = ca[i].substring(startPos, endPos);

        if(toDoElement.length !== 0){
            newItemFromCookie(toDoElement);
        }

    }

};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)){
    getCookies();
} else {
    document.addEventListener("DOMContentLoaded", getCookies);
}

function addToCookies(element){
    toDoElements.push(element);
    cookiefy();
}

function cookiefy(){
    var arrayToCookies = toDoElements;
    arrayToCookies = JSON.stringify(arrayToCookies);
    document.cookie = arrayToCookies;
}

//=================== COOKIES END ==========================


function newItem(){
    var item = document.getElementById('input').value;

    if(validInput(item)){
        var ul = document.getElementById('list');
        var li = document.createElement('li');
        var p = document.createElement('p');
        var div = document.createElement('div');
        var deleteButton = document.createTextNode('');
        var deleteSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        //Puts the element into an array for cookies
        addToCookies(item);
        console.log(document.cookie);

        li.className = "todo-element";
        li.appendChild(p);
        p.appendChild(document.createTextNode(item));
        li.appendChild(div);
        div.className = 'delete-button';
        div.appendChild(deleteButton);
        ul.appendChild(li);

        document.getElementById('input').value ="";
        div.onclick = removeItem;
    } else {
        //Make Popup notification in bottom corner
        //console.log("empty");
        document.getElementById('input').value ="";
        document.getElementById('tooltip').className = "tooltip-wrapper box-shadow";
        document.getElementById('tooltip-close').onclick = closeToolTip;
        document.getElementById('tooltip-content').innerHTML = emptyInputError;

    }
}

function closeToolTip(e){
    console.log("close tooltip");
    e.target.parentElement.parentElement.className = "hide-element tooltip-wrapper box-shadow";
}

function newItemFromCookie(element){
    var item = element;
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    var p = document.createElement('p');
    var div = document.createElement('div');
    var deleteButton = document.createTextNode('');
    var deleteSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    //Puts the element into an array for cookies
    addToCookies(item);
    //console.log(document.cookie);
    p.onclick = editToDo;
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

function validInput(string){
    if(string.length !== 0 && /^(?!\s)/.test(string)){
        return true;
    } else {
        return false;
    }

}

//=================== EDIT TO-DO ELEMENT ==========================

function editToDo(e){
    var toDoContent = e.target.innerHTML;
    var editInput = createNode('input', toDoContent);
    editInput.className = "editInput";
    editInput.id = "active-edit-input";
    editInput.setAttribute('data-oc', toDoContent);
    /*editInput.value = toDoContent;
    editInput.addEventListener('blur', editFocusLoss, false);*/

    e.target.parentNode.replaceChild(editInput, e.target);
    editInput.focus();

    //console.log(e.target);
    //e.target.appendChild(editInput);



}

function editFocusLoss(e){
    //e.target.value works, because it's an input
    var editInput = e.target;

    //console.log(editInput.value);
    //editInput.value = originalContent
    replaceElement(editInput, editInput.getAttribute('data-oc'));

}

function replaceElement(replaceable, originalContent){
    var toDoContent = createNode('p', originalContent);
    /*toDoContent.onclick = editToDo;
    toDoContent.innerHTML = originalContent;*/
    replaceable.parentNode.replaceChild(toDoContent, replaceable);
    //console.log("Replace: " + replaceable.value);
}

function saveEdit(e){
    var index = toDoElements.indexOf(e.getAttribute('data-oc'));
    var newContent = createNode('p', e.value);
    toDoElements[index] = newContent.innerHTML;

    e.removeEventListener('blur', editFocusLoss, false)
    e.parentNode.replaceChild(newContent, e);

    addToCookies(newContent);

    //console.log("save edit: " + e.value + " original content: " + e.getAttribute('data-oc'));
}

function createNode(type, content){
    var node = document.createElement(type);

    if(type === 'input'){
        node.addEventListener('blur', editFocusLoss, false);
        node.value = content;
    } else if(type === 'p'){
        node.innerHTML = content;
        node.onclick = editToDo;
    }

    return node;

}
//=================== EDIT TO-DO ELEMENT END ==========================


document.body.onkeyup = function(e){
    if(e.keyCode == 13 && document.getElementById('input') === document.activeElement){
        newItem();
        //console.log(toDoElements);
    } else if (e.keyCode == 13 && document.getElementById('active-edit-input') === document.activeElement){
        saveEdit(e.target);
    }
}


function removeItem(e){
    var removeDelay = 200; //in ms
    e.target.parentElement.className = "hide-element";

    setTimeout(function () {
        var itemContent = e.target.parentElement.firstChild.innerHTML;
        var index = toDoElements.indexOf(itemContent);
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);

        if (index > -1) {
            toDoElements.splice(index, 1);
            cookiefy();
        }
        //console.log(toDoElements);
    }, removeDelay);
    //e.target.parentElement.parentElement.removeChild(e.target.parentElement);
}


