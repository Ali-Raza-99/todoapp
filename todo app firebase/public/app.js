var list = document.getElementById("mylist")

firebase.database().ref("todos").on("child_added", function (data) {
    console.log(data.val())
    var li = document.createElement("li")
    var todonode = document.createTextNode(data.val().value)
    li.appendChild(todonode)
    inp.value = ""
    console.log(li)
    list.appendChild(li)

    var delbtn = document.createElement("button")
    var deltext = document.createTextNode("DELETE")
    delbtn.appendChild(deltext)
    delbtn.setAttribute("id", data.val().key)
    var editbtn = document.createElement("button")
    var edittext = document.createTextNode("EDIT")
    editbtn.appendChild(edittext)
    editbtn.setAttribute("id", data.val().key)

    delbtn.setAttribute("onclick", "delli(this)")
    li.appendChild(delbtn)

    editbtn.setAttribute("onclick", " editbtn(this)")
    li.appendChild(editbtn)
 li.setAttribute("class","liststyle")
}
)


function addTodo() {

    var inp = document.getElementById("inp")

    var key = firebase.database().ref("todos").push().key

    var todo = {
        value: inp.value,
        key: key
    }
    console.log(todo)

    firebase.database().ref("todos").child(key).set(todo)
    inp.value = ""
    
}

function delli(e) {
    firebase.database().ref("todos").child(e.id).remove()
    e.parentNode.remove()

}

function deleteAll() {
    firebase.database().ref("todos").remove()
    list.innerHTML = ""

}

function editbtn(e) {
    
    var edit = prompt("Enter your text")
    var edittodo={
        value: edit,
        key: e.id
    }

    firebase.database().ref("todos").child(e.id).set(edittodo)
        e.parentNode.firstChild.nodeValue = edit
}