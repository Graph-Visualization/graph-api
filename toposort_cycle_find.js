const GraphBase = require('./graph-base')
const Queue = require('./ds/queue')

class FindCycle extends GraphBase{
    
    constructor(numVertices = 0, numEdges = 0, isDirected = false){
        super(numVertices, numEdges)
        this.isDirected = isDirected
    }

    findCycle()
    {
        let isCyclic = false

        let Adj = this.getSimpleAdj()

        if (this.isDirected)
        {
            let sorted_list = this.toposort()
            let pos = []

            for(let i=0;i<sorted_list.length;i++)
            {
                let node = sorted_list[i]
                pos[node] = i
            }
            
            Adj.forEach(function(children,parent){
                for(let i=0;i<children.length;i++)
                {
                    let child = children[i]
                    if(pos[parent]>pos[child])
                    {
                        isCyclic = true
                    }
                    if(isCyclic)
                        break
                }
            })

        }
        else
        {
            let visited = [], vertices = [], parent = []

            Adj.forEach(function(neighbours,vertex){
                visited[vertex] = false
                parent[vertex] = -1
                vertices.push(vertex)
            })

            for(let i=0;i<vertices.length;i++)
            {
                let current_vertex = vertices[i]

                if(visited[current_vertex])
                    continue;

                let queue = new Queue()
                visited[current_vertex] = true
                queue.enqueue(current_vertex)

                while(!queue.isEmpty())
                {
                    let vertex = queue.dequeue()

                    for(let i=0;i<Adj.get(vertex).length;i++)
                    {
                        let next_vertex = Adj.get(vertex)[i]
                        if(!visited[next_vertex])
                        {
                            visited[next_vertex] = true
                            queue.enqueue(next_vertex)
                            parent[next_vertex] = vertex
                        }
                        else if(parent[vertex] != next_vertex)
                        {
                            isCyclic = true
                            break
                        }
                    }

                    if(isCyclic)
                        break
                }

                if(isCyclic)
                    break
            }

        }

        return isCyclic
    }

    toposort()
    {
        let Adj = this.getSimpleAdj()
        let visited = []
        let vertices = []

        Adj.forEach(function(neighbours,vertex){
            visited[vertex] = false
            vertices.push(vertex)
        })

        let topo_stack = []

        for(let i=0;i<vertices.length;i++)
        {
            let current_vertex = vertices[i]

            if(!visited[current_vertex])
            {
                dfs_recursive(Adj,current_vertex,visited,topo_stack)
            }
        }

        let sorted_list = []
        while(topo_stack.length)
        {
            sorted_list.push(topo_stack.pop())
        }

        return sorted_list 

    }    
}


function dfs_recursive(Adj, current_vertex, visited, topo_stack = [])
{
    visited[current_vertex] = true

    for(let i = 0;i<Adj.get(current_vertex).length;i++)
    {
        let next_vertex = Adj.get(current_vertex)[i]
        if(!visited[next_vertex])
        {
            dfs_recursive(Adj,next_vertex,visited,topo_stack)
        }
    }

    topo_stack.push(current_vertex)
}


/*****************   TEST RUN **********************/

const input_file = require('./testfiles/test1.json')
const fs = require("fs")
output_data = new Map()

for(let testcase=0;testcase<input_file.length;testcase++)
{
    let input = input_file[testcase]

    const g = new FindCycle(input.numVertices,input.numEdges,input.isDirected)

    vertices = input.vertices

    for(let i=0;i<vertices.length;i++)
    {
        g.addVertex(vertices[i])
    }

    for(let i=0;i<input.numEdges;i++)
    {
        let edge = input.edges[i]
        g.addEdge(edge[0],edge[1])
        if(input.isDirected == false)
        {
            g.addEdge(edge[1],edge[0])
            //only add when undirected.
        }
    }

    // console.log("Output For TestCase " + (testcase+1)+ " : g.findCycle()")

    output_data.set("Testcase "+ testcase , g.findCycle())
}

// console.log(output_data)

fs.writeFileSync("testfiles/output.json",JSON.stringify(Array.from(output_data)))

module.exports = FindCycle
