export interface Suggestion {
  value: string;
  label: string;
}

const suggestions: Suggestion[] = [
  //  Data Structures
  { value: "array", label: "Array" },
  { value: "linked-list", label: "Linked List" },
  { value: "tree", label: "Tree" },
  { value: "graph", label: "Graph" },
  { value: "hash-table", label: "Hash Table" },
  { value: "stack", label: "Stack" },
  { value: "queue", label: "Queue" },

  // Algorithms & Techniques
  { value: "binary-search", label: "Binary Search" },
  { value: "recursion", label: "Recursion" },
  { value: "dynamic-programming", label: "Dynamic Programming" },
  { value: "greedy", label: "Greedy" },
  { value: "backtracking", label: "Backtracking" },
  { value: "sliding-window", label: "Sliding Window" },
  { value: "bit-manipulation", label: "Bit Manipulation" },
  { value: "two-pointers", label: "Two Pointers" },

  // Problem Tags
  { value: "bug", label: "Bug" },
  { value: "performance", label: "Performance" },
  { value: "security", label: "Security" },
  { value: "optimization", label: "Optimization" },
  { value: "regression", label: "Regression" },

  // Programming Languages
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "php", label: "PHP" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },

  // Frameworks & Tools
  { value: "react", label: "React.js" },
  { value: "node", label: "Node.js" },
  { value: "bootstrap", label: "Bootstrap" },
  { value: "jquery", label: "jQuery" },

  // Article / Knowledge Topics
  { value: "api", label: "API & REST" },
  { value: "json", label: "JSON" },
  { value: "testing", label: "Testing" },
  { value: "devops", label: "DevOps" },
  { value: "authentication", label: "Authentication" },
  { value: "web-security", label: "Web Security" },
  { value: "responsive", label: "Responsive Design" },
  { value: "accessibility", label: "Accessibility" },
  { value: "code-style", label: "Code Style" },
  { value: "design-pattern", label: "Design Pattern" },
];

export default suggestions;
