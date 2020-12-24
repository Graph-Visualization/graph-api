const GraphBase = require('./graph-base');

const INFINITY = 1e18;

class PrimsMST extends GraphBase {
  constructor(numVertices = 0, numEgdes = 0, edges) {
    super(numVertices, numEgdes);
    this.edges = edges;
  }

  nearest_vertex(vertices, distance, is_taken) {
    let min_distance = INFINITY;
    let nearest = -1;
    for (let i = 0; i < vertices.length; i++) {
      let v = vertices[i];
      if (is_taken[v] == false && distance[v] < min_distance) {
        min_distance = distance[v];
        nearest = v;
      }
    }

    return nearest;
  }

  getAdjMatrix() {
    let Adj = this.getSimpleAdj();
    let vertices = [];

    Adj.forEach(function (value, key) {
      vertices.push(key);
    });

    let n = vertices[vertices.length - 1];

    let matrix = new Array(n + 1);

    for (let i = 0; i <= n; i++) {
      matrix[i] = new Array(n + 1);
      for (let j = 0; j <= n; j++) {
        matrix[i][j] = INFINITY;
      }
      matrix[i][i] = 0;
    }

    for (let i = 0; i < this.edges.length; i++) {
      let edge = this.edges[i];
      matrix[edge[0]][edge[1]] = edge[2];
      matrix[edge[1]][edge[0]] = edge[2];
    }

    return matrix;
  }

  prims_mst() {
    let minSpanningTree = { edgeset: [], total_weight: 0 };
    let Adj = this.getSimpleAdj();
    let vertices = [],
      distance = [];
    let parent = [],
      is_taken = [];

    Adj.forEach(function (value, key) {
      vertices.push(key);
      distance[key] = INFINITY;
      is_taken[key] = false;
      parent[key] = -1;
    });

    let n = vertices.length;
    let Adj_Matrix = this.getAdjMatrix();

    distance[vertices[0]] = 0; //Pick the first vertex always

    for (
      let i = 1;
      i <= n - 1;
      i++ //Add n-1 edges [n= number of vertices]
    ) {
      let u = this.nearest_vertex(vertices, distance, is_taken);
      is_taken[u] = true;

      for (let j = 0; j < n; j++) {
        let v = vertices[j];
        if (
          Adj_Matrix[u][v] > 0 &&
          is_taken[v] == false &&
          Adj_Matrix[u][v] < distance[v]
        ) {
          distance[v] = Adj_Matrix[u][v];
          parent[v] = u;
        }
      }
    }

    for (let i = vertices[1]; i <= vertices[n - 1]; i++) {
      minSpanningTree.edgeset.push([parent[i], i]);
      minSpanningTree.total_weight += Adj_Matrix[parent[i]][i];
    }

    return minSpanningTree;
  }
}

/*************************TEST ********************************/

// const input_file = require('./testfiles/mst_test_kruskal_prim.json');
// const fs = require('fs');
// output_data = new Map();

// for (let testcase = 0; testcase < input_file.length; testcase++) {
//     let input = input_file[testcase];

//     let vertices = input.vertices
//     let edges = input.edges

//     const g = new PrimsMST(input.numVertices, input.numEdges , edges)

//     for (let i = 0; i < vertices.length; i++) {
//         g.addVertex(vertices[i]);
//       }

//     for (let i = 0; i < input.numEdges; i++) {
//         let edge = input.edges[i];
//         g.addEdge(edge[0], edge[1], edge[2]);
//         g.addEdge(edge[1], edge[0], edge[2]);
//     }

//     let mst = g.prims_mst()
//     console.log(mst)

//     // output_data.set('Testcase ' + testcase, mst ) ;

// }

// fs.writeFileSync(
//     'testfiles/output.json',
//     JSON.stringify(Array.from(output_data))
//   );

module.exports = PrimsMST;
