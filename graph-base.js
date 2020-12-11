// Base class for Graph and Edge objects

//
/**LinkedList for an edge
 * Initialises an Edge which stores data
 * and pointer to the next Edge
 * Defaults to null
 */
class Edge {
  /**
   * Class for creating an edge which is an
   * object containing src, dest and weight
   */

  constructor() {
    this.src = null;
    this.dest = null;
    this.weight = null;
  }
}

Edge.prototype.inspect = function () {
  return ` [src : ${this.src} dest: ${this.dest} weight:${this.weight} ]`;
};

class GraphBase {
  /**
   *
   * @param {integer} numVertices
   * @param {integer} numEdges
   *
   * This class stores a graph object
   * having v vertices and e edges
   * There is adjacency list to store
   * all the corresponding Edge object
   * This implements an undirected graph
   * For directed graph the addEdge needs
   * to be overloaded
   */
  constructor(numVertices = 0) {
    this.numVertices = numVertices;
    this.adj = new Map();
    // this.Adj = this.getSimpleAdj()
  }
  /**
   *
   * @param {Array} vertex
   * Function to add the total vertex in a graph
   * Stores a map in which each vertex points to all other vertices
   */
  addVertex(vertex) {
    this.adj.set(vertex, []);
  }

  /**
   *
   * @param {integer} vertices1
   * @param {integer} vertices2
   * @param {integer} weight
   *
   * Attach an edge to the adjacency list
   * Uses a weighted and directed graph
   */
  addEdge(vertices1, vertices2, weight) {
    const edge1 = new Edge();

    edge1.src = vertices1;
    edge1.dest = vertices2;
    edge1.weight = weight;

    this.adj.get(vertices1).push(edge1);
  }

  getSimpleAdj() {
    let Adj = new Map();
    let mp = this.adj;
    // console.log(this.adj)
    // Object.assign(mp, this.adj)
    // console.log(mp)
    mp.forEach(function (value, key) {
      // console.log("K"+key+"V"+value)
      Adj.set(key, []);
    });
    // console.log(mp)
    mp.forEach(function (value, key) {
      // value = ;
      // console.log(mp[key]);
      // Adj.set(key, [])
      // console.log(value)
      for (let i = 0; i < value.length; i++) {
        let val = value[i];
        Adj.get(val.src).push(val.dest);
        // Adj.get(val.dest).push(val.src)
      }
      // value.forEach((val) => {
      //     console.log(Adj.get(val))
      // Adj.get(val.src).push(val.dest)
      // Adj.get(val.dest).push(val.src)
      // })
    });
    // console.log(Adj)
    this.Adj = Adj;
    return Adj;
  }

  //   An adjacency list for a transpose graph
  getTransposeAdj() {
    let Adj = new Map();
    let mp = this.adj;
    // console.log(this.adj)
    // Object.assign(mp, this.adj)
    // console.log(mp)
    mp.forEach(function (value, key) {
      // console.log("K"+key+"V"+value)
      Adj.set(key, []);
    });
    // console.log(mp)
    mp.forEach(function (value, key) {
      // value = ;
      // console.log(mp[key]);
      // Adj.set(key, [])
      // console.log(value)
      for (let i = 0; i < value.length; i++) {
        let val = value[i];
        Adj.get(val.dest).push(val.src);
        // Adj.get(val.dest).push(val.src)
      }
      // value.forEach((val) => {
      //     console.log(Adj.get(val))
      // Adj.get(val.src).push(val.dest)
      // Adj.get(val.dest).push(val.src)
      // })
    });
    // console.log(Adj)
    this.Adj = Adj;
    return Adj;
  }
}

// const graph = new GraphBase(4)
// vertices = [0,1,2,3]

// for(let i=0;i<vertices.length;i++)
// {
//     graph.addVertex(vertices[i])
// }

// // console.log(graph.adj.get(v[0]).push(9))
// graph.addEdge(0 ,1 , 5);
// graph.addEdge(0,2,4)
// // // console.log(graph)
// graph.addEdge(1 ,2 , 4);
// // // console.log(graph)
// graph.addEdge(2 ,3 , 3);
// graph.addEdge(3 ,0 , 2);

// console.log(graph.getSimpleAdj())

module.exports = GraphBase;
