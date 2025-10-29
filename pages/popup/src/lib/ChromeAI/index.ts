import { EVALUATE_ANSWER_SCHEMA, EVALUATION_PROMPT, GENERATE_QUESTIONS_SCHEMA, SYSTEM_PROMPT } from '@src/consts';
import type { Question } from '@src/store/questionStore';

type EvaluatePageParams = Pick<Question, 'answer' | 'question'> & {
  learningMaterial?: string;
};

export const generatePageQuestions = async (content: string) => {
  const [tab] = await chrome.tabs.query({ active: true });

  if (tab) {
    if (chrome.runtime.lastError) {
      console.error('Error:', chrome.runtime.lastError);
      return;
    }

    if (content) {
      const modelAvailability = await LanguageModel.availability();

      // NOTE: must design the flow in a way that user clicks/tap an element to consent. Maybe add a modal that user consents to use LM features.
      if (navigator.userActivation.isActive) {
        if (modelAvailability === 'downloadable') {
          // TODO: check if I can download & use model immediately.
          await LanguageModel.create({
            monitor(m) {
              m.addEventListener('downloadprogress', e => {
                console.log(`Downloaded ${e.loaded * 100}%`);
              });
            },
          });
        }

        if (modelAvailability === 'available') {
          const session = await LanguageModel.create({
            intialPrompts: [
              {
                role: 'system',
                content: SYSTEM_PROMPT,
                // content: `Answer my questions with the following text:  ${response.content}`,
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
        }
      }
    }
  }
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
