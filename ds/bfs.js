const GraphBase = require('./graph-base');
const Queue = require('./queue');

class BFS extends GraphBase {
  constructor(numVertices = 0, numEdges = 0, startingPoint = 0) {
    super(numVertices, numEdges);
    this.startingPoint = startingPoint;
  }

  bfs() {
    let queue = new Queue();
    let Adj = this.getSimpleAdj();

    let visited = [];
    let vertex = [];

    Adj.forEach((value, key) => {
      visited[key] = false;
      vertex.push(key);
    });

    let root = vertex[0];
    queue.enqueue(root);
    let bfs_order = [];

    while (!queue.isEmpty()) {
      let node = queue.dequeue();
      if (!visited[node]) {
        bfs_order.push(node);
        visited[node] = true;
      }

      for (let i = 0; i < Adj.get(node).length; i++) {
        if (!visited[Adj.get(node)[i]]) {
          queue.enqueue(Adj.get(node)[i]);
        }
      }
    }

    return bfs_order;
  }
}

// const g = new BFS(5)
// vertices = [0,1,2,3]
// for(let i=0;i<vertices.length;i++)
// {
//     g.addVertex(vertices[i])
// }
// g.addEdge(0,1);
// g.addEdge(0, 2);
// g.addEdge(1,2);
// g.addEdge(2,0);
// g.addEdge(2,3);
// g.addEdge(3,3);
// console.log(g.getSimpleAdj())
// console.log(g.bfs())

module.exports = BFS;
