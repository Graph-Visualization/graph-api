// Base class for Graph and Edge objects

// 
/**LinkedList for an edge
 * Initialises an Edge which stores data
 * and pointer to the next Edge
 * Defaults to null
 */
class Edge{
    /**
     * Class for creating an edge which is an 
     * object containing src, dest and weight
     */
    
    constructor(){
        this.src = null
        this.dest = null
        this.weight = null
    }

}

Edge.prototype.inspect = function(){
    return ` [src : ${this.src} dest: ${this.dest} weight:${this.weight} ]`
}

class GraphBase{
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
    constructor(numVertices=0, numEdges=0){

        // Check if number of edges is correct for a given
        // number of vertices
        if(numEdges > (numVertices*(numVertices-1)))
            throw Error("Number of edges not compatible with number of vertices!")
        
        this.numVertices = numVertices
        this.numEdges = numEdges
        this.adj = new Map()
    }

    addEdge(vertices1, vertices2, weight){

        // Attach vertices1
        this.adj[vertices1] = this.adj[vertices2] || []

        const edge1 = new Edge()
        
        edge1.src = vertices1
        edge1.dest = vertices2
        edge1.weight = weight

        this.adj[vertices1].push(edge1)


        // Attach vertices2
        // this.adj[vertices2] = this.adj[vertices2] || []

        // const edge2 = new Edge()
        
        // edge2.src = vertices2
        // edge2.dest = vertices1
        // edge2.weight = weight
        
        // this.adj[vertices2].push(edge2)
    }
};

const graph = new GraphBase(4, 4)
graph.addEdge(0 ,1 , 5);
// console.log(graph)
graph.addEdge(1 ,2 , 4);
// console.log(graph)
graph.addEdge(2 ,3 , 3);
graph.addEdge(3 ,0 , 2);

console.log(graph)

module.exports = GraphBase