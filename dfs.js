const GraphBase = require('./graph-base')
// console.log(GraphBase)
// const SizeLimitedStack = require('size-limited-stack');

class DFS extends GraphBase{

    constructor(numVertices=0, numEdges=0, startingPoint=0){
        super(numVertices, numEdges)
        this.startingPoint = startingPoint
        this.Adj = {}
    }

    addEdge(v1, v2, w){
        return super.addEdge(v1,v2,w)
    }

    getSimpleAdj(){
        return super.getSimpleAdj()
    }

    dfs(){
        // stack = new SizeLimitedStack(50)

    }
}


const graph = new DFS(4, 4)
// console.log(graph)
graph.addEdge(0 ,1 , 5);
// console.log(graph)
graph.addEdge(1 ,2 , 4);
// console.log(graph)
graph.addEdge(2 ,3 , 3);
graph.addEdge(3 ,0 , 2);
console.log(graph.getSimpleAdj())
// console.log(graph.Adj)