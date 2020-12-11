const GraphBase = require('./graph-base');
const Queue = require('./ds/queue');

class Bipartite extends GraphBase {
  constructor(numVertices = 0, numEdges = 0, startingPoint = 0) {
    super(numVertices, numEdges);
  }

  bipartiteCheck() {
    let queue = new Queue();
    let Adj = this.getSimpleAdj();

    // defining the color array and initializing all the vertices initially to -1
    var color = [];
    color = new Array(this.numVertices);
    for (var i = 0; i < this.numVertices; i++) {
      color[i] = -1;
    }

    // initializing a 2D Array for adjacency matrix representation
    var graph = [];
    for (var i = 0; i < this.numVertices; i++) {
      graph[i] = new Array(this.numVertices);
    }

    //initialinzing all elements of Adjacency matrix =0
    for (var i = 0; i < this.numVertices; i++) {
      for (var j = 0; j < this.numVertices; j++) {
        graph[i][j] = 0;
      }
    }

    // filling up the adjacency matrix
    Adj.forEach((value, key) => {
      value.forEach((i) => {
        graph[key][i] = 1;
      });
      // console.log(key + '---' + value);
    });

    // for (var i = 0; i < this.numVertices; i++) {
    //     for (var j = 0; j < this.numVertices; j++) {
    //         console.log(i + ',' + j + '=' + graph[i][j]);
    //     }
    // }

    var src = 0;
    color[src] = 1;

    queue.enqueue(0);

    var ans = 0;

    // Doing a DFS search and for every next element
    // if it is not colored then coloring it with opposite color of previous element
    // if colored then checking if it is of same color of previos vertex --- then not bipartite
    while (!queue.isEmpty()) {
      var u = queue.front();
      queue.dequeue();

      if (graph[u][u]) {
        // for a graph with self cycle can never be bipartite
        ans = 1;
      } else {
        for (var v = 0; v < this.numVertices; v++) {
          if (graph[u][v] == 1 && color[v] == -1) {
            color[v] = 1 - color[u];
            queue.enqueue(v);
          } else if (graph[u][v] == 1 && color[u] == color[v]) {
            ans = 1;
          }
        }
      }
    }
    if (ans == 1) {
      var ans = 'NOT A BIPARTITE GRAPH';
    } else {
      var ans = 'A BIPARTITE GRAPH';
    }

    return ans;
  }
}

// ----------Ex. of not bipartite graph
// const g = new Bipartite(5);
// vertices = [0, 1, 2, 3]
// for (let i = 0; i < vertices.length; i++) {
//     g.addVertex(vertices[i]);
// }
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 2);
// g.addEdge(2, 0);
// g.addEdge(2, 3);
// g.addEdge(3, 4);
// console.log(g.bipartiteCheck());

// ----------Ex. of a bipartite graph
// const g = new Bipartite(5);
// vertices = [0, 1, 2, 3]
// for (let i = 0; i < vertices.length; i++) {
//     g.addVertex(vertices[i]);
// }
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 3);
// g.addEdge(2, 3);
// console.log(g.bipartiteCheck());

module.exports = Bipartite;
