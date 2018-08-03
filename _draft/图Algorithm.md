---
layout: post
title: "图论中的一些经典算法"
author: "nice01qc"
categories: "Algorithms"
excerpt_separator: "..."
---

> ...

> 取自《算法》第四版，自已关于图论中一些算法的理解 ...



**首先了解下`Union-find`算法，这个很重要**（关于动态连通性算法，在p136，我觉得它应该放在图那章一块会好些），直接给出代码，看代码就好：

```java
int id[]; // 所有的节点以数字来表示，例如0、1、2、3、4 ....

// 简单的实现是，所有连通的节点都设置为同一个值
public int find(int p)
{
    return id[p];	// 是否连通，只需要判断find值是否相等就好了
}
public void union(int p, int q)		// 添加数据
{
 	int pID = find(p);
    int qID = find(q);
    if(pID == qID) return;  // 已经连通，直接返回
    // 通过遍历使连通的值一致
    for(int i = 0; i < id.length; i++)
    {
        if(id[i] == pID) id[i] = qID;
    }
}

// 改进的 quick-union 算法， 所有连通的节点都有相同的根节点（根触点）
private int find(int p)
{
    while(p != id[p]) p = id[p];
    return p;
}
public void union(int p, int q)
{
    int pRoot = find(p);
    int qRoot = find(q);
    if (pRoot == qRoot) return;
    
    id[pRoot] = qRoot;		// 这可能引发不平衡问题，有改进的，暂时不做讨论
}
// 从算法运行过程可以看出，只要没有被重复覆盖，id数组可以保存union插入数据的路径，这个在图论中有用，当然这种简单的判断连通性也是其一大特点
```



### 无向图

| 问题                   | 解决方法                          |
| ---------------------- | --------------------------------- |
| 单点连通性和单点路径   | 深度优先搜索（DepthFirstSearch)   |
| 单点最短路径           | 广度优先搜索（BreadthFirstPaths） |
| 连通性                 | 深度优先搜索                      |
| 检测环                 | 深度优先搜索                      |
| 图的二分性（双色问题） | 深度优先搜索                      |

```java
// 每个节点表示
public class Graph {
    private final int V;
    private int E;
    private List<Integer>[] adj;
    public Graph(int V) {
        this.V = V;
        this.E = 0;
        adj =  new ArrayList[V];
        for (int v = 0; v < V; v++) {
            adj[v] = new ArrayList<Integer>();
        }
    }
    public int V() { return V; }

    public void addEdge(int v, int w) {
        E++;
        adj[v].add(w);
        adj[w].add(v);
    }
    public Iterable<Integer> adj(int v) { return adj[v]; }
}

// 深度优先搜索， 就算走迷宫一样，遇到走过的点就折返，直到把所有点都走完为止，所以它的路径可能不是最短的
public class DepthFirstPaths {
    private boolean[] marked;      
    private int[] edgeTo;
    private final int s;

    public DepthFirstPaths(Graph G,int s) {
        this.marked = new boolean[G.V()];
        this.edgeTo = new int[G.V()];
        this.s = s;
        dfs(G,s);
    }

    private void dfs(Graph G,int v)
    {
        marked[v] = true;
        for (int w : G.adj(v))
        {
            if (!marked[w])
            {
                edgeTo[w] = v;	// 记录路径
                dfs(G,w);
            }
        }
    }

    public boolean hasPathTo(int v){ return marked[v]; }
    
    public Iterable<Integer> pathTo(int v){
        if (!hasPathTo(v)){ return null; }
        Stack<Integer> path = new Stack<Integer>();
        for (int x = v;x !=s;x = edgeTo[x]){ path.push(x); }
        path.push(s);
        return path;
    }
}
// 而广度优先搜索解决了最短路径问题，它一层一层的搜索
public class BreadFirstPath {
        private boolean[] marked; 
        private int[] edgeTo;           //到达该顶点的已知路径上的最后一个顶点
        private final int s;            //  起点

        public BreadFirstPath(Graph G,int s){
            this.marked = new boolean[G.V()];
            this.edgeTo = new int[G.V()];
            this.s = s;
            bfs(G,s);
        }

        private void bfs(Graph G,int s){
            Queue<Integer> queue = new PriorityQueue<Integer>();
            marked[s] = true;
            queue.add(s);
            while(!queue.isEmpty()){
                int v = queue.remove();
                for (int w : G.adj(v)) {
                    if (!marked[w]){
                        edgeTo[w] = v;
                        marked[w] = true;
                        queue.add(w);
                    }
                }
            }
        }
    
        public boolean hasPathTo(int v){ return marked[v]; }
    
        public Iterable<Integer> pathTo(int v){
            if (!hasPathTo(v))return null;
            Stack<Integer> stack = new Stack<Integer>();
            for (int i = v;i!=s;i = edgeTo[i]){
                stack.push(i);
            }
            stack.push(s);
            return stack;
        }
}
```

*如果对这两个理解一下贴出源码*，直接说关键部分

**无向图的有无环判断关键点为**：在搜索过程中只需要下一个节点是否在已搜索的路径中（其本身除外），若在则有环。

**有向图的有无环判断关键点为**：在搜索过程中只需要下一个节点是否在已搜索的路径中，若在则有环。





**参考资源：**

