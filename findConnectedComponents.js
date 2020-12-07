const GraphBase = require('./graph-base')
const Stack = require('./ds/stack')

class FindConnectedComponents extends GraphBase{

    constructor(numVertices = 0, numEdges = 0){
        super(numVertices, numEdges)
    }

    findConnectedComponents()
    {
        let vertices = []
        let visited = []
        let all_connected_components = []

        let Adj = this.getSimpleAdj()

        Adj.forEach(function(value,key){
            vertices.push(key) 
            visited[key] = false     
        })

        for(let i=0;i<vertices.length;i++)
        {
            let stack = new Stack()
            let node = vertices[i]
            if(visited[node])
                continue;

            stack.push(node)
            let current_connected_components = [node] 

            visited[node] = true

            while(!stack.isEmpty())
            {
                let current_node = stack.pop()
                let neighbours = Adj.get(current_node)

                for(let j=0;j<neighbours.length;j++)
                {
                    let neighbouring_node = neighbours[j]

                    if(!visited[neighbouring_node])
                    {
                        visited[neighbouring_node] = true
                        current_connected_components.push(neighbouring_node)
                        stack.push(neighbouring_node)
                    }
                }
                
            }

            all_connected_components.push(current_connected_components)

        }

        return all_connected_components
        //returns list of lists 
    }
}

/**********   TEST RUN **********************/

const input_file = require('./testfiles/test2.json')
const fs = require("fs")
output_data = new Map()

for(let testcase=0;testcase<input_file.length;testcase++)
{
    let input = input_file[testcase]

    const g = new FindConnectedComponents(input.numVertices)

    vertices = input.vertices

    for(let i=0;i<vertices.length;i++)
    {
        g.addVertex(vertices[i])
    }

    for(let i=0;i<input.numEdges;i++)
    {
        let edge = input.edges[i]
        g.addEdge(edge[0],edge[1])
        g.addEdge(edge[1],edge[0])
    }

    // console.log("Output For TestCase " + (testcase+1)+ " :")
    // console.log(g.findConnectedComponents())

    output_data.set("Testcase "+ testcase , g.findConnectedComponents())

}

fs.writeFileSync("testfiles/output.json",JSON.stringify(Array.from(output_data)))


module.exports = FindConnectedComponents
