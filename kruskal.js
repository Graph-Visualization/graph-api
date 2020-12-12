const GraphBase = require('./graph-base');
const DSU = require('./ds/dsu')

class Kruskal extends GraphBase{
    constructor(numVertices = 0, numEdges = 0 ,edgeset){
        super(numVertices, numEdges)
        this.edges = edgeset
    }

    sort_edges(edgeset)
    {
        let edges = edgeset
        edges.sort(function(a,b){ return b[2]<=a[2] })
        return edges
    }

    kruskal()
    {
        let minSpanningTree = { "edgeset" : [] , "total_weight": 0 }

        let sorted_edges = this.sort_edges(this.edges)

        let vertices = []
        let Adj = this.getSimpleAdj()

        Adj.forEach(function(value,key){
            vertices.push(key)
        })

        let disjoint_set = new DSU(vertices)

        for(let i=0;i<sorted_edges.length;i++)
        {
            let edge = sorted_edges[i];
            let node1 = edge[0] , node2 = edge[1]      
            let current_weight = edge[2]      
            if(disjoint_set.find(node1)!=disjoint_set.find(node2))
            {
                disjoint_set.union(node1,node2)
                minSpanningTree.edgeset.push([node1,node2])
                minSpanningTree.total_weight += current_weight
            }
        }       
        
        return minSpanningTree 

    }

}

/******************************* TEST ************************/

// const input_file = require('./testfiles/kruskal_test.json');
// const fs = require('fs');
// output_data = new Map();

// for (let testcase = 0; testcase < input_file.length; testcase++) {
//     let input = input_file[testcase];
    
//     let vertices = input.vertices
//     let edges = input.edges

//     const g = new Kruskal(input.numVertices, input.numEdges, edges)

//     for (let i = 0; i < vertices.length; i++) {
//         g.addVertex(vertices[i]);
//       }
    
//     for (let i = 0; i < input.numEdges; i++) {
//         let edge = input.edges[i];
//         g.addEdge(edge[0], edge[1], edge[2]);
//     }

//     let mst = g.kruskal()
//     console.log(mst)

//     // output_data.set('Testcase ' + testcase, mst ) ;


// }

// fs.writeFileSync(
//     'testfiles/output.json',
//     JSON.stringify(Array.from(output_data))
//   );

module.exports = Kruskal;
