const GraphBase = require('./graph-base');
const Queue = require('./ds/queue');
const BFS = require('./bfs');

class Bipartite extends BFS{
    constructor(numVertices = 0, numEdges = 0, startingPoint = 0) {
        super(numVertices,numEdges);
        this.startingPoint = startingPoint;
    }
    isBipartite(){
        
        let bfs_order = this.bfs();
        let Adj = this.getSimpleAdj();
        
        let ans = true;
        if(bfs_order.length != this.numVertices){             //Cyclicity Check 
            ans = false;
        }
        
        let color = [];
        Adj.forEach((value, key) => {
            color[key] = 0;
        });

        color[bfs_order[0]] = 1;
        for (let i = 0; i < bfs_order.length; i++) {
            let node = bfs_order[i];
            
            for (let j = 0; j < Adj.get(node).length; j++) {
                
                if (!color[Adj.get(node)[j]]) {
                    color[Adj.get(node)[j]] = -1*color[bfs_order[i]];
                }
                else if(color[Adj.get(node)[j]] == color[bfs_order[i]]){
                    ans = false;
                }

            }
        }
        return ans;
    }
}

// const g = new Bipartite(4)
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
// console.log(g.isBipartite())

module.exports = Bipartite;