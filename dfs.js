const GraphBase = require('./graph-base')
// const SizeLimitedStack = require('size-limited-stack');

class DFS extends GraphBase{

    constructor(numVertices=0, numEdges=0, startingPoint=0){
        super(numVertices, numEdges)
        this.startingPoint = startingPoint
        this.Adj = null
    }

    getSimpleAdj(){

        this.Adj = []
        // console.log(this.adj[0])
        this.adj.forEach((value, key, map) => {
            console.log(value)
        })

        // console.log(this.Adj)
    }

    dfs(){
        // stack = new SizeLimitedStack(50)

    }
}


const graph = new DFS(4, 4)
graph.addEdge(0 ,1 , 5);
// console.log(graph)
graph.addEdge(1 ,2 , 4);
// console.log(graph)
graph.addEdge(2 ,3 , 3);
graph.addEdge(3 ,0 , 2);
graph.getSimpleAdj()
console.log(this.Adj)