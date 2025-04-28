function Problem() {
  return (
    <div className="problem-description p-4 bg-gray-50 rounded-lg shadow-sm overflow-scroll">
    <h1 className="text-2xl font-bold mb-4">Path Finding in a Matrix</h1>
    
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p className="mb-3">
        You are given a 2D grid representing a maze. The maze contains:
      </p>
      <ul className="list-disc ml-6 mb-3">
        <li><code className="bg-gray-100 px-1 rounded">'0'</code> representing open paths</li>
        <li><code className="bg-gray-100 px-1 rounded">'1'</code> representing walls</li>
        <li><code className="bg-gray-100 px-1 rounded">'S'</code> representing the starting point</li>
        <li><code className="bg-gray-100 px-1 rounded">'E'</code> representing the end point</li>
      </ul>
      <p>
        Your task is to find the shortest path from 'S' to 'E', moving only up, down, left, or right. 
        You cannot move diagonally or through walls.
      </p>
    </section>
    
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Input Format</h2>
      <ul className="list-disc ml-6">
        <li>The first line contains two integers <code className="bg-gray-100 px-1 rounded">n</code> and <code className="bg-gray-100 px-1 rounded">m</code> representing the number of rows and columns in the grid.</li>
        <li>The next <code className="bg-gray-100 px-1 rounded">n</code> lines contain strings of length <code className="bg-gray-100 px-1 rounded">m</code> representing the maze.</li>
      </ul>
    </section>
    
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Output Format</h2>
      <ul className="list-disc ml-6">
        <li>If a path exists, return the minimum number of steps required to reach 'E' from 'S'.</li>
        <li>If no path exists, return -1.</li>
      </ul>
    </section>
    
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Constraints</h2>
      <ul className="list-disc ml-6">
        <li>1 ≤ n, m ≤ 100</li>
        <li>The maze will contain exactly one 'S' and one 'E'.</li>
        <li>All other characters in the grid are either '0' or '1'.</li>
      </ul>
    </section>
    
    <section className="mb-2">
      <h2 className="text-xl font-semibold mb-2">Example</h2>
      
      <div className="mb-4">
        <h3 className="font-medium mb-1">Input:</h3>
        <pre className="bg-gray-800  p-3 rounded overflow-x-auto">
          <code>
            5 5{'\n'}
            S0000{'\n'}
            11110{'\n'}
            00000{'\n'}
            01111{'\n'}
            000E0
          </code>
        </pre>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-1">Output:</h3>
        <pre className="bg-gray-800  p-3 rounded overflow-x-auto">
          <code>
            8
          </code>
        </pre>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Explanation:</h3>
        <p className="mb-2">The shortest path from 'S' to 'E' is:</p>
        <ol className="list-decimal ml-6">
          <li>Start at 'S'</li>
          <li>Move right → right → right → right → down → down → down → right</li>
          <li>Reach 'E'</li>
        </ol>
        <p className="mt-2">Total steps: 8</p>
      </div>
    </section>
  </div>
  );
}

export default Problem;
