const GraphBase = require('./graph-base');
const Queue = require('./ds/queue');

class FindingBridges extends GraphBase {
  constructor(numVertices = 0, numEdges = 0, res = []) {
    super(numVertices, numEdges, res);
  }

  bridgeCheck(u, graph, time) {
    graph[u].visited = true;
    time++;
    graph[u].disc = time;
    graph[u].low = time;

    for (var i = 0; i < graph[u].al.length; i++) {
      var av = graph[u].al[i];
      if (graph[av].visited == false) {
        graph[av].parent = u;
        this.bridgeCheck(av, graph, time);
        graph[u].low = Math.min(graph[u].low, graph[av].low);

        if (graph[av].low > graph[u].disc) {
          graph[u].ans.push(av);
          graph[av].ans.push(u);
        }
      } else if (av != graph[u].parent) {
        graph[u].low = Math.min(graph[u].low, graph[av].disc);
      }
    }

    return time;
  }

  bridge(graph) {
    var t = 0;
    for (var i = 0; i < this.numVertices; i++) {
      if (graph[i].visited == false) {
        t = this.bridgeCheck(i, graph, 0);
      }
    }
  }

  FindingBridgesCheck() {
    let Adj = this.getSimpleAdj();

    var graph = [];
    for (var i = 0; i < this.numVertices; i++) {
      graph[i] = {
        al: [],
        visited: false,
        disc: 0,
        low: 0,
        parent: -1,
        ans: [],
      };
    }

    // building the array of objects
    Adj.forEach((value, key) => {
      value.forEach((i) => {
        if (!graph[key].al.includes(i)) {
          graph[key].al.push(i);
        }
        if (!graph[i].al.includes(key)) {
          graph[i].al.push(key);
        }
      });
    });
    this.bridge(graph);

    var res = [];
    for (var i = 0; i < this.numVertices; i++) {
      for (var j = 0; j < graph[i].ans.length; j++) {
        var x = i;
        var y = graph[i].ans[j];
        if (x < y) {
          res.push([x, y]);
        }
      }
    }

    return res;
  }
}

// ----------Ex. of not FindingBridges graph
//   const g = new FindingBridges(7);
//   vertices = [0, 1, 2, 3,4 ,5,6]
//   for (let i = 0; i < vertices.length; i++) {
//       g.addVertex(vertices[i]);
//   }
//   g.addEdge(0, 1);
//   g.addEdge(1, 2);
//   g.addEdge(2, 0);
//   g.addEdge(1, 3);
//   g.addEdge(1, 4);
//   g.addEdge(1, 6);
//   g.addEdge(3, 5);
//   g.addEdge(4, 5);
//   console.log(g.FindingBridgesCheck());

// ----------Ex. of a FindingBridges graph
//  const f = new FindingBridges(5);
//  vertices = [0, 1, 2, 3]
//  for (let i = 0; i < vertices.length; i++) {
//      f.addVertex(vertices[i]);
//  }
//  f.addEdge(1,0);
//  f.addEdge(0, 2);
//  f.addEdge(2,1);
//  f.addEdge(0,3);
//  f.addEdge(3,4);
//  console.log(f.FindingBridgesCheck());

module.exports = FindingBridges;
