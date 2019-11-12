// const vis = require('./vis/dist/vis.js')
// var nodes = new vis.DataSet([
//     {id: 1, label: 'Node 1'},
//     {id: 2, label: 'Node 2'},
//     {id: 3, label: 'Node 3'},
//     {id: 4, label: 'Node 4'},
//     {id: 5, label: 'Node 5'}
//   ]);
 
//   // create an array with edges
//   let arr = [
//     {from: 1, to: 3},
//     {from: 1, to: 2},
//     {from: 2, to: 4},
//     {from: 2, to: 5},
//     // {from: 3, to: 3}
//   ]
//   let edgeAr = []
//   var edges = new vis.DataSet(edgeAr);
 
//   // create a network
//   var container = document.getElementById('mynetwork');
//   var data = {
//     nodes: nodes,
//     edges: edges
//   };
//   var options = {
//       nodes: {
//           shape: "dot",
//           size: 15,
//           borderWidth: 2
//       },
//       edges: {
//           width: 2
//       }
//   };
//   var network = new vis.Network(container, data, options);
//   counter = 0
//   const submit = document.querySelector('#but')
//   submit.addEventListener('click', (e)=>{
//       // let val = {id:counter, label:`Node ${counter}`}
//       let edge = {from: 1, to:counter}

//       // nodes.update(val)
//       edges.update(arr[counter])
//       counter+=1
//   })

// Since we are only updating a color of a graph, we dont need to add
// all the edges one by one

// Function to initialise a graph network
const initGraph = function(){

    // Async request for getting a list of node of a graph
    n = [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
      ]
    
    e = [
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5}
        // {from: 3, to: 3}
      ]
    var nodes = new vis.DataSet(n)
    var edges1 = new vis.DataSet(e)
    var edges2 = new vis.DataSet([{from: 1, to: 3}])
    // create a network
    var container1 = document.getElementById('mynetwork1');
    var container2 = document.getElementById('mynetwork2');    

    var data1 = {
        nodes: nodes,
        edges: edges1
    };

    var data2 = {
        nodes: nodes,
        edges: edges2
    }

    var options = {
        nodes: {
            shape: "dot",
            size: 15,
            borderWidth: 2
        },
        edges: {
            width: 2,
            color : {
                inherit: false
              }
        }
    };
    var network1 = new vis.Network(container1, data1, options)
    var network2 = new vis.Network(container2, data2, options)
    console.log('YYY'+edges2)
    return {nodes, edges2}
}


    
const graph = initGraph()
console.log(graph)
var nodes = graph.nodes
var edges = graph.edges2

// Async request for getting the edge list in a particular order
arr = [
    // {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 3, to: 3}
  ]

counter = 0
const submit = document.querySelector('#but')
// var x = new TimedQueue(2000);
submit.addEventListener('click', (e)=>{
    console.log(edges)
    for (var counter = 0; counter < arr.length; counter++) {
        (function(counter) {
            setTimeout(function() { 
                edges.update(arr[counter])
            }, 2000 * counter);
        })(counter);
    }
    console.log(edges)
    submit.textContent = "Stopped Animation"
    
})


