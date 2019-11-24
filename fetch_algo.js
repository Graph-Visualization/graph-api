const DFS = require('./dfs')
const BFS = require('./bfs')

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

    let graph = new DFS(vertex.length)
    graph.addVertex(vertex)

    for(let i=0;i<graph_values;i++)
    {
        let node = graph_values[i]
        graph.addEdge(node.src, node.dest, node.weight)
    }

    return graph.dfs()

}

const getBFS = (graph_val) => {


    values = purifyValue(graph_val)
    graph_values = values.graph_val
    vertex = values.vertex
    vertex = Array.from(vertex)

    let graph = new BFS(vertex.length)
    graph.addVertex(vertex)

    for(let i=0;i<graph_values;i++)
    {
        let node = graph_values[i]
        graph.addEdge(node.src, node.dest, node.weight)
    }

    return graph.bfs()

}

// Prepares the response to be sent back
const prepResponse = (graph_val, algo) => {
    
    let result
    if(algo==='dfs')
    {
        result = getDFS(graph_val)
    }
    else if(algo==='bfs')
    {
        result = getBFS(graph_val)
    }
    else if(algo === 'mst')
    {
        result = ''
    }
    else if(algo === 'cycle')
    {
        result = ''
    }
    else{
        throw Error('Algorithm not supported!')
    }

    let resp = {
        algo,
        result
    }
    return JSON.stringify(resp)
}

module.exports = prepResponse