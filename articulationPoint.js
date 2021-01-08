const GraphBase = require('./graph-base');
const Queue = require('./ds/queue');

class ArticulationPoint extends GraphBase {
    constructor(numVertices = 0, numEdges = 0, startingPoint = 0) {
        super(numVertices, numEdges);
    }

    findArtiPt(graph, v, time) {
        // console.log("hello from node "+v);
        graph[v].visited = true;
        time++;
        graph[v].disc = time;
        graph[v].low = time;
        var child = 0;
        // console.log(graph[v].al.length);
        for (var i = 0; i < graph[v].al.length; i++) {
            var av = graph[v].al[i];
            // console.log(i);
            if (graph[av].visited == false) {
                child++;
                graph[av].parent = v;
                this.findArtiPt(graph, av, time);
                graph[v].low = Math.min(graph[v].low, graph[av].low);
                if (graph[v].parent == -1 && child > 1) {
                    // console.log("-------"+v);
                    graph[v].res = true;
                } else if (graph[v].parent != -1 && graph[av].low >= graph[v].disc) {
                    // console.log("-------"+v);
                    graph[v].res = true;
                }
            } else if (av != graph[v].parent) {
                graph[v].low = Math.min(graph[v].low, graph[av].disc);
            }
        }
    }

    ArticulationPointCheck() {
        // let queue = new Queue();
        let Adj = this.getSimpleAdj();
        // console.log(Adj);

        // defining the color array and initializing all the vertices initially to -1
        // var color = [];
        // color = new Array(this.numVertices);
        // for (var i = 0; i < this.numVertices; i++) {
        //   color[i] = -1;
        // }

        // initializing a 2D Array for adjacency matrix representation
        var graph = [];
        for (var i = 0; i < this.numVertices; i++) {

            graph[i] = {
                al: [],
                visited: false,
                disc: 0,
                low: 0,
                parent: -1,
                res: false
            }
        }
        // console.log(graph);

        // building the array of objects
        Adj.forEach((value, key) => {
            value.forEach((i) => {
                // console.log(i);
                // if (!graph[key].al.includes(i)) {
                graph[key].al.push(i);
                // }
                // if (!graph[i].al.includes(key)) {
                graph[i].al.push(key);
                // }
            });
        });
        // console.log(graph);

        this.findArtiPt(graph, 0, 0);

        // console.log(graph);

        var res = [];
        for (var i = 0; i < this.numVertices; i++) {
            if (graph[i].res) {
                res.push(i);
            }
        }
        return res;
    }
}


// ----------Ex. of not ArticulationPoint graph
// const g = new ArticulationPoint(7);
// vertices = [0, 1, 2, 3,4 ,5,6]
// for (let i = 0; i < vertices.length; i++) {
//     g.addVertex(vertices[i]);
// }
// g.addEdge(0, 1);
// g.addEdge(0, 3);
// g.addEdge(1, 2);
// g.addEdge(2, 3);
// g.addEdge(2, 6);
// g.addEdge(3, 4);
// g.addEdge(3, 5);
// g.addEdge(4, 5);
// console.log(g.ArticulationPointCheck());

// ----------Ex. of a ArticulationPoint graph
 const f = new ArticulationPoint(5);
 vertices = [0, 1, 2, 3]
 for (let i = 0; i < vertices.length; i++) {
     f.addVertex(vertices[i]);
 }
 f.addEdge(1,0);
 f.addEdge(0, 2);
 f.addEdge(2,1);
 f.addEdge(0,3);
 f.addEdge(3,4);
 console.log(f.ArticulationPointCheck());

module.exports = ArticulationPoint;