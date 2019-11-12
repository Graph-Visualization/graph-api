const DFS = require('./dfs')

// This script stores all the function
// which makes request to get the corresponding algo


// This function converts the values
// in the required format for GraphBase
const purifyValue = (graph_val) => {

    let vertex = new Set()
    graph_val.forEach((value, ind) => {
         vertex.add(value.src)
         vertex.add(value.dest)
    })

    return {graph_val, vertex}
    
}

const getDFS = (graph_val) => {

    values = purifyValue(graph_val)
    graph_values = values.graph_val
    vertex = values.vertex
    vertex = Array.from(vertex)
    // console.log(vertex)
    let graph = new DFS(vertex.length)
    graph.addVertex(vertex)

    console.log(graph_values)
    for(let i=0;i<graph_values;i++)
    {
        let node = graph_values[i]
        graph.addEdge(node.src, node.dest, node.weight)
    }

    return graph.dfs()

}

// Prepares the response to be sent back
const prepResponse = (graph_val, algo) => {
    
    let resp = {
        algo,
        result: getDFS(graph_val)
    }

    return JSON.stringify(resp)
}

module.exports = prepResponse