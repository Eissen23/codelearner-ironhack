import { ollamaService } from '../api/clients/ollama';


export const generateCodeEvaluation = async(
  sourceCode: string,
  language: string,
  problemData: {
    description: string;
  }
): Promise<string> => {
  const prompt = `
Evaluate the following code in ${language} :

Problem Description:
${problemData.description}

Source Code:
\`\`\`${language}
${sourceCode}
\`\`\`

 : ''}

Please evaluate the code on the following aspects, keep in mind this is an acceptable answer:
1. Efficiency - How efficient is the solution in terms of time and space complexity?
2. Code Style - How well is the code written and formatted?
3. Suggestions - What improvements could be made?

Provide a detailed evaluation and a score out of 100.
`;

  try {
    const response = await ollamaService.generate({
      model: 'llama3.2:latest', // Using CodeLlama model for better code understanding
      prompt: prompt,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      }
    });

    // Parse the response to extract structured evaluation

    // Extract sections from the response

    return response.response;
  } catch (error) {
    console.error('Error generating code evaluation:', error);
    throw error;
  }
}
/**
 * // Example usage:
const evaluation = await generateCodeEvaluation(
  sourceCode,  // Your source code as a string
  'python',    // Programming language
  {
    description: 'Problem description here',
    testCases: {
      input: ['test input 1', 'test input 2'],
      output: ['expected output 1', 'expected output 2']
    }
  }
);

// The evaluation will return an object with:
{
  correctness: string;    // Evaluation of code correctness
  efficiency: string;     // Analysis of time/space complexity
  style: string;         // Code style assessment
  suggestions: string[]; // Array of improvement suggestions
  score: number;        // Overall score out of 100
}
 */