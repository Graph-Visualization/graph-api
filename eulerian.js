const GraphBase = require('./graph-base');
const Queue = require('./ds/queue');
const DFS = require('./dfs');

class Eulerian extends DFS {
  constructor(numVertices = 0, numEdges = 0, startingPoint = 0) {
    super(numVertices, numEdges, startingPoint);
    // this.startingPoint = startingPoint;
  }

  isEulerian() {
    let dfs_order = this.dfs();

    let Adj = this.getSimpleAdj();

    let visited = [];
    // let vertex = [];

    Adj.forEach((value, key) => {
      visited[key] = false;
      // vertex.push(key);
    });

    let flag = 1;

    for (let i = 0; i < dfs_order.length; i++) {
      visited[dfs_order[i]] = true;
    }
    for (let i = 0; i < visited.length; i++) {
      if (visited[i] == false) {
        return false;
        // return true;
      }
    }

    let trans_dfs_order = this.dfsForTranspose();
    for (let i = 0; i < visited.length; i++) {
      visited[i] = false;
    }
    for (let i = 0; i < trans_dfs_order.length; i++) {
      visited[trans_dfs_order[i]] = true;
    }
    for (let i = 0; i < visited.length; i++) {
      if (visited[i] == false) return false;
    }

    flag = 1;
    let n = visited.length;
    let indegree = new Array(n);
    for (let i = 0; i < n; i++) indegree[i] = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < Adj.get(i).length; j++) indegree[Adj.get(i)[j]]++;
    }
    for (let i = 0; i < n; i++)
      if (Adj.get(i).length != indegree[i]) return false;

    return true;
  }
}

// const g = new Eulerian(5)
// vertices = [0,1,2,3,4]
// for(let i=0;i<vertices.length;i++)
// {
//     g.addVertex(vertices[i])
// }
// g.addEdge(1, 0);

// g.addEdge(0, 2);
// g.addEdge(2, 1);
// g.addEdge(0, 3);
// g.addEdge(3, 4);
// g.addEdge(4, 0);
// // console.log(g.adj)
// console.log(g.isEulerian())

module.exports = Eulerian;
//Adj -> Returns simple adj list; adj->more complex(with edges)
