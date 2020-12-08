const GraphBase = require('./graph-base');

class FloodFill extends GraphBase {
  constructor(numVertices = 0, numEdges = 0, startingPoint = 0) {
    super(numVertices, numEdges);
    this.startingPoint = startingPoint;
  }

  floodFill() {
    let Adj = this.getSimpleAdj();

    let visited = [];
    let vertex = [];

    Adj.forEach((value, key) => {
      visited[key] = false;
      vertex.push(key);
    });

    let root = this.startingPoint;
    let listOfNodes = [];

    this.floodFillHelper(root, visited, listOfNodes, Adj);

    return listOfNodes;
  }

  floodFillHelper(node, visited, listOfNodes, Adj) {
    visited[node] = true;
    for (let i = 0; i < Adj.get(node).length; i++) {
      if (!visited[Adj.get(node)[i]]) {
        this.floodFillHelper(Adj.get(node)[i], visited, listOfNodes, Adj);
      }
    }

    listOfNodes.push(node);
  }
}

/*-------------Test Case Starts---------------------*/

// const input_file = require('./testfiles/floodFillTest.json')
// const fs = require("fs")
// output_data = new Map()

// for(let testCase=0;testCase<input_file.length;testCase++)
// {
//     let input = input_file[testCase]

//     const g = new FloodFill(input.numVertices,input.numEdges,input.startingPoint)

//     vertices = input.vertices

//     for(let i=0;i<vertices.length;i++)
//     {
//         g.addVertex(vertices[i])
//     }

//     for(let i=0;i<input.numEdges;i++)
//     {
//         let edge = input.edges[i]
//         g.addEdge(edge[0],edge[1])
//     }

//     // console.log("Output For TestCase " + (testCase+1)+ " : g.floodFill()")

//     output_data.set("Testcase "+ testCase , g.floodFill())
// }

// // console.log(output_data)

// fs.writeFileSync("testfiles/floodFillOutput.json",JSON.stringify(Array.from(output_data)))

/*+++++++++++++++++Test Case Ends++++++++++++++++++++++*/

module.exports = FloodFill;
