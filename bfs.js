const GraphBase = require('./graph-base')
const Queue = require('./ds/queue')
class BFS extends GraphBase{
    constructor(numVertices=0, numEdges=0, startingPoint=0){
        super(numVertices, numEdges)
        this.startingPoint = startingPoint
    }

    bfs(){
        let queue = new Queue()
        let Adj = this.getSimpleAdj()

        let visited = []
        let vertex = []

        Adj.forEach((value,key) => {
            visited[key] = false
            vertex.enqueue(key)
        })

        let root = vertex[0]
        queue.enqueue(root)
        let bfs_order = []

        while(!queue.isEmpty())
        {
            let node = queue.dequeue()
            if(!visited[node])
            {
                bfs_order.enque(node)
                visited[node] = true
            }

            for(let i=0;i<Adj.get(node).length;i++)
            {
                if(!visited[Adj.get(node)[i]])
                {
                    queue.enqueue(Adj.get(node)[i])
                }
            }
        }

        return bfs_order
    }
}

module.export = BFS