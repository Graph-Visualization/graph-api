// const graphBase = require('GraphBase')


const inputForm = document.querySelector('#vertices')
const vertices = document.querySelector('#verval')
const addButton = document.querySelector('#add')

addButton.addEventListener('click', (e) =>{
    e.preventDefault()

    const numVer = vertices.value
    console.log(numVer)


    var submitContainer = document.querySelector('#submit')

    while (submitContainer.hasChildNodes()) {
        submitContainer.removeChild(submitContainer.lastChild);
    }

    var submit = document.createElement("button")
    submit.textContent = "Submit"
    submit.className += "btn btn-success btn-lg mb-3 disabled"
    submit.addEventListener('click', ()=>{
        inputForm.submit()
    })
    submitContainer.appendChild(submit)


    var container = document.getElementById("containerJ");
    var adjform = document.getElementById("#adjlist")
    // console.log('Y')
            // Clear previous contents of the container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

    const addEdge = document.createElement("button")
    addEdge.textContent = "Add Edge"
    addEdge.name = "edge_button"
    addEdge.id = "add-element"
    addEdge.className = "btn btn-warning btn-block mt-1 mb-3"
    container.appendChild(addEdge)
    counter = 0
    addEdge.addEventListener('click', ()=>{
        if(counter < numVer)
        {
            console.log('Clciked')
                // Append a node with a random text
            // container.appendChild(document.createTextNode("Member " + (counter+1)));
            // Create an <input> element, set its type and name attributes
            var divInput = document.createElement("div")
            var input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Source Vertices"
            input.className = "bubble form-control"
            var input3 = document.createElement("input");
            var input2 = document.createElement("input");

            input2.type = "text";
            input2.placeholder = "Destination Vertices"
            input2.className = "bubble form-control"

            input3.type = "text";
            input3.placeholder = "Edge Weights"
            input3.className = "bubble form-control"
            divInput.appendChild(input)
            divInput.appendChild(input2)
            divInput.appendChild(input3)
            divInput.className = "d-flex justify-content-around flex-row"
            // input.name = "member" + counter;
            container.appendChild(divInput);
            // Append a line break 
            container.appendChild(document.createElement("br"));
            counter+=1
        }
        else
        {
            submit.className = submit.className.split("disabled")[0]
        }
    })

    
    // console.log('Z')

    // var counter = 0
    
    

})

