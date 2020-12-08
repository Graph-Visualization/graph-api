const GraphBase = require('./graph-base')
const Stack = require('./ds/stack')


class TopologicalSort extends GraphBase{

    constructor(numVertices=0, numEdges=0, startingPoint=0){
        super(numVertices, numEdges)
        this.startingPoint = startingPoint
    }

    topologicalSortHelper(node, visited, stack, Adj){
        visited[node] = true
        for(let i = 0;i < Adj.get(node).length;i++){
            if(!visited[Adj.get(node)[i]]){
                this.topologicalSortHelper(Adj.get(node)[i], visited, stack, Adj)
            }
        }

        stack.push(node);
    }


    topologicalSort(){
        let stack = new Stack()
        let Adj = this.getSimpleAdj()
        
        let visited = []
        let vertex = []

        Adj.forEach((value,key)=>{
            visited[key] = false
            vertex.push(key)
        })

        for(let i=0;i<vertex.length;i++){
            if(!visited[vertex[i]]){
                let node = vertex[i]
                this.topologicalSortHelper(node , visited, stack, Adj)
            }
        }

        let topoSort_order = []
        while(!stack.isEmpty()){
            topoSort_order.push(stack.peek())
            stack.pop()
        }
        return topoSort_order;
    }

}

// const g = new TopologicalSort(5)
// vertices = [0,1,2,3,4,5,6]
// for(let i=0;i<vertices.length;i++)
// {
//     g.addVertex(vertices[i])
// }
// g.addEdge(0, 2); 
// g.addEdge(0, 1); 
// g.addEdge(0,3); 
// g.addEdge(2, 3); 
// g.addEdge(3,4);
// g.addEdge(4,5);
// g.addEdge(1,6);
// // console.log(g.adj)
// console.log(g.topologicalSort())

module.exports = TopologicalSort