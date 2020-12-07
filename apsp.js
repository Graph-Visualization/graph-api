/**
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 * @return {{distances, previousVertices}}
 */


export default function bellmanFord(graph, startVertex) {
  const distances = {};
  const previousVertices = {};


  distances[startVertex.getKey()] = 0;  //starting node

  graph.getAllVertices().forEach((vertex) => {
    previousVertices[vertex.getKey()] = null;
    if (vertex.getKey() !== startVertex.getKey()) {
      distances[vertex.getKey()] = Infinity;  //init all dists with infinity
    }
  });

  // We need (|V| - 1) iterations.
  for (let iteration = 0; iteration < (graph.getAllVertices().length - 1); iteration += 1) {

    Object.keys(distances).forEach((vertexKey) => {
      const vertex = graph.getVertexByKey(vertexKey);

      // Go through all vertex edges.
      graph.getNeighbors(vertex).forEach((neighbor) => {
        const edge = graph.findEdge(vertex, neighbor);
        // Find out if the distance to the neighbor is shorter in this iteration
        // then in previous one.
        const distanceToVertex = distances[vertex.getKey()];
        const distanceToNeighbor = distanceToVertex + edge.weight;
        if (distanceToNeighbor < distances[neighbor.getKey()]) {
          distances[neighbor.getKey()] = distanceToNeighbor;
          previousVertices[neighbor.getKey()] = vertex;
        }
      });
    });
  }

  return {
    distances,
    previousVertices,
  };
}