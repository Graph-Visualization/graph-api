const GraphBase = require('./graph-base')
const Stack = require('./ds/stack')


class DFS extends GraphBase{

    constructor(numVertices=0, numEdges=0, startingPoint=0){
        super(numVertices, numEdges)
        this.startingPoint = startingPoint
    }

    dfs(){
        let stack = new Stack()
        let Adj = this.getSimpleAdj()

        let visited = []
        let vertex = []

        Adj.forEach((value, key) => {
            visited[key] = false
            vertex.push(key)
        })

        let root = vertex[0]
        stack.push(root)
        let dfs_order = []

        while(!stack.isEmpty())
        {   
            let node = stack.pop()
            if(!visited[node])
            {
                dfs_order.push(node)
                visited[node] = true
            }

            for(let i=0;i<Adj.get(node).length;i++)
            {
                if(!visited[Adj.get(node)[i]])
                {
                    stack.push(Adj.get(node)[i])
                }
            }
        }

        return dfs_order

    }
}

// const g = new DFS(5)
// vertices = [0,1,2,3,4]
// for(let i=0;i<vertices.length;i++)
// {
//     g.addVertex(vertices[i])
// }
// g.addEdge(1, 0); 
// g.addEdge(0, 2); 
// g.addEdge(2, 1); 
// g.addEdge(0, 3); 
// g.addEdge(3,4);
// g.addEdge(4,0);
// // console.log(g.adj)
// console.log(g.dfs())

module.exports = DFS