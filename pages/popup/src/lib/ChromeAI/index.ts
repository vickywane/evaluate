import { EVALUATE_ANSWER_SCHEMA, EVALUATION_PROMPT, GENERATE_QUESTIONS_SCHEMA, SYSTEM_PROMPT } from '@src/consts';
import type { Question } from '@src/store/questionStore';

type EvaluatePageParams = Pick<Question, 'answer' | 'question'> & {
  learningMaterial?: string;
};

export const getModelAvailability = async () => await LanguageModel.availability();

export const downloadModel = async () => {
  if (navigator.userActivation.isActive) {
    return await LanguageModel.create({
      monitor(m) {
        m.addEventListener('downloadprogress', e => {
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });
  }
};

export const generatePageQuestions = async (content: string) => {
  const session = await LanguageModel.create({
    intialPrompts: [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
    ],
    languages: ['en'],
  });

  const prompt = session.prompt(
    [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: `Content: ${content}`,
      },
    ],
    {
      responseConstraint: GENERATE_QUESTIONS_SCHEMA,
    },
  );

  return JSON.parse(await prompt);
};

export const evaluatePageAnswer = async ({ question, answer, learningMaterial }: EvaluatePageParams) => {
  const session = await LanguageModel.create({
    languages: ['en'],
  });

  const prompt = session.prompt(
    [
      {
        role: 'system',
        content: EVALUATION_PROMPT,
      },
      {
        role: 'user',
        content: `Answer: ${answer}; Question: ${question}; Learning Material: ${learningMaterial}`,
      },
    ],
    {
      responseConstraint: EVALUATE_ANSWER_SCHEMA,
    },
  );

  return JSON.parse(await prompt);
};

export const summarizePageContent = async (content: string) => {
  const status = await Summarizer.availability();

  if (status === 'downloadable') {
    await Summarizer.create({
      monitor(m) {
        m.addEventListener('downloadprogress', e => {
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });
  }

  if (status === 'available') {
    const client = await Summarizer.create({
      type: 'teaser',
      sharedContext: '',
      length: 'short',
    });

    const summarizer = client.summarize(content, {
      context:
        'Summarize the provided content so that it retains all the key ideas and factual details necessary to generate accurate and meaningful evaluation questions later.',
    });

    return await summarizer;
  }
};
