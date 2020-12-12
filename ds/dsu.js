class DSU{

    constructor(vertices)
    {
        this.vertices = vertices
        this.parent = {}
        this.rank = []

        vertices.forEach(element => {
            this.rank[element] = 1
            this.parent[element] = element
        });
        
    }

    find(x) //Path Compressed
    {
        let y = x

        while(this.parent[x] != x)
            x = this.parent[x]

        //Comment out next 4 lines if you dont want path to be compressed.
        while(y!=x)
        {
            let z = y
            y = this.parent[y]
            this.parent[z] = x
        }

        return x
    }

    union(x,y)
    {
        let a = this.find(x) //Root of X
        let b = this.find(y) //Root of Y

        if(this.rank[a] > this.rank[b])
        {
            this.rank[a] += this.rank[b]
            this.parent[b] = a
        }
        else
        {
            this.rank[b] += this.rank[a]
            this.parent[a] = b 
        }
    }
}

module.exports = DSU;
