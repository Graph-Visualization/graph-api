
const inputForm = document.querySelector('#vertices')
const vertices = document.querySelector('#verval')
const addButton = document.querySelector('#add')
const submitButton = document.querySelector('#submit')

class GraphValues{
    constructor(){
        this.src = null
        this.dest = null
        this.weight = null
    }
}

inputForm.addEventListener('keypress',(e)=>{
    if(e.keyCode == 13)
    {
        e.preventDefault()
        console.log('Enter!')
    }
})

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
    // submit.addEventListener('click', ()=>{
    //     inputForm.submit()
    // })
    submitContainer.appendChild(submit)

    var container = document.getElementById("containerJ");
    var adjform = document.getElementById("#adjlist")

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
            console.log('Clicked')
            var divInput = document.createElement("div")
            divInput.id = "graph-value"
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

            container.appendChild(divInput);
            // Append a line break
            container.appendChild(document.createElement("br"));
            counter+=1
            window.scrollBy(0,10000)
        }
        else
        {
            
            submit.className = submit.className.split("disabled")[0]
        }
    })
})

const createJSON = (graphValues, algo) => {
    // Format of JSON
    // algo : 
    // graph : [src:, dest:, weight:]

    let values = []
    for(let i in graphValues){
        let nodes ={
            src : graphValues[i].src,
            dest : graphValues[i].dest,
            weight : graphValues[i].weight
        }
        values.push(nodes)
    }
    // console.log(values)
    let jsonObj = {
        algo,
        values
    }

    return JSON.stringify(jsonObj)
}

submitButton.addEventListener('click', (e)=>{

    e.preventDefault()
    console.log(e)
    if(e.target.classList[4] !== "disabled")
    {

    
        let result = []

        let divValues = document.querySelectorAll('#graph-value')
        divValues.forEach((val, index)=>{
            let gobj = new GraphValues()
            gobj.src = val.childNodes[0].value
            gobj.dest = val.childNodes[1].value
            gobj.weight = val.childNodes[2].value

            result.push(gobj)
        })
        console.log(result[0].src)
        console.log(createJSON(result, "DFS"))

        fetch('http://localhost:3000/dfs', {

            method:'post',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body : createJSON(result, "DFS")
        }).then((data)=>{
            console.log("SUCCESS!")
            data.json().then((dat) => {
                data = JSON.parse(dat)
                console.log(data)
                var res = document.getElementById('plaintext')
                res.textContent = data.result
            })
        })
        // return true
    }
})


// Code for generating the animations for the graph
// Code for adding edges in a particular order



// Code for already generated graph and update its color