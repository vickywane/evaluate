export const SYSTEM_PROMPT = `
  You are an expert educator and assessment designer. I will provide learning material, and your task is to generate questions that test comprehension, recall, reasoning, and application of the content.

**Instructions:**
1. Analyze the material and extract key concepts, definitions, and insights.

2. Create a balanced set of questions that assess:
   - Basic understanding (recall)
   - Conceptual comprehension
   - Application and problem-solving
   - Critical thinking and synthesis

3. For each question, provide the following:
   - The question
   - A brief hint at the correct answer
   - A category or topic or keyword. 2 words max.
   - The correct answer
   - A brief explanation (1–2 sentences) of why it is correct.
   - Question type such as "multi-choice", "short-answer", "single-choice" and "long-answer".
   - answer_list array for multi-choice (4 total options, multiple correct answer) and single-choice (4 total options, one correct answer) questions.

  Do not skip the hint. Each response must have 4 items. Mix the question types to include all types mentioned above.

**Question Format Requirements:**
- Provide 3 difficulty tiers: Easy, Medium, Hard
- Include multiple question types
- Do NOT repeat questions.
- Keep questions concise and unambiguous.

**Output Format:**

Title: [Auto-Generated Based on Topic]

Easy (3 questions)
1. [Question]
   - Answer:
   - Explanation:

Medium (3 questions)
1. [Question]
   - Answer:
   - Explanation:

Hard (3 questions)
1. [Question]
   - Answer:
   - Explanation:

Applied Scenario Question
1. [Scenario-based question]
   - Answer:
   - Explanation:
`;

export const EVALUATION_PROMPT = `
You are an expert evaluator. Your task is to assess a user's answer based only on the reference learning material and the expected correct answer.

**Instructions:**
- Compare the user's answer with the correct answer and the original learning material.
- Consider accuracy, completeness, clarity, and reasoning.
- Ignore writing quality unless it affects correctness.

**Output Requirements:**
Provide the evaluation in the following format exactly:

Score (1–10): 
Feedback: 2–4 sentences describing:
- How correct the answer is
- Any missing or incorrect elements
- Specific improvement advice

**Scoring Guide:**
10 = Fully correct, complete, and well-reasoned  
7–9 = Mostly correct, minor gaps or small inaccuracies  
4–6 = Partially correct, noticeable gaps or errors  
1–3 = Mostly incorrect or shows fundamental misunderstanding  

---

I will provide the following inputs, and you will evaluate:

- Question:
- Correct Answer:
- Learning Material (summary or excerpt):
- User’s Answer:

Respond only with the evaluation in the required format.
`;

export const GENERATE_QUESTIONS_SCHEMA = {
  type: 'object',
  properties: {
    generated: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question_type: {
            enum: ['multi-choice', 'short-answer', 'single-choice', 'long-answer'],
          },
          question: {
            type: 'string',
          },
          hint: {
            type: 'string',
          },
          topic: {
            type: 'string',
          },
          answer: {
            type: 'string',
          },
          answer_list: {
            type: 'array',
            items: {
              type: 'string',
            },
            // minContains: 4,
            // maxContains: 4,
          },
        },
        required: ['question', 'answer'],
      },
      maxItems: 6,
    },
  },
};

export const EVALUATE_ANSWER_SCHEMA = {
  type: 'object',
  properties: {
    score: {
      type: 'number',
    },
    feedback: {
      type: 'string',
      description: 'Short feedback highlighting correctness and areas for improvement.',
    },
  },
  required: ['score', 'feedback'],
};

export const MOCK_QUESTIONS = [
  {
    question_type: 'multi-choice',
    question: 'Which of the following is NOT a value returned by `useActionState`?',
    hint: 'Return values',
    topic: 'Return Values',
    answer: 'The initial state passed to the hook',
    answer_list: [
      'The current form state',
      'A new action function',
      'The `isPending` flag',
      'The initial state passed to the hook',
    ],
  },
  {
    question_type: 'single-choice',
    question: 'What is the primary purpose of the `useActionState` hook in React?',
    hint: 'Form actions',
    topic: 'Form State',
    answer: 'Update form state based on form action results.',
    answer_list: [
      'Create component-level state',
      'Manage API calls',
      'Update form state from action results',
      'Handle user input',
    ],
  },
  {
    question_type: 'short-answer',
    question: 'What is the `fn` parameter in `useActionState` used for?',
    hint: 'Form submission',
    topic: 'Action Function',
    answer: 'The function to be called when the form is submitted or a button is clicked.',
  },
  {
    question_type: 'long-answer',
    question:
      'Explain the significance of using `useActionState` with Server Functions and how it differs from using it without Server Components.',
    hint: 'Server components',
    topic: 'Server Components',
    answer:
      'With Server Functions, `useActionState` allows for interactive forms before JavaScript execution completes on the client, enabling features like progressive enhancement. Without Server Components, it functions similarly to local component state, updating only on the client-side.',
  },
];

export const MOCK_EVALUATION_RESULT = {
  score: 8,
  feedback: 'Good answer, but could use more details on the main concepts.',
};
