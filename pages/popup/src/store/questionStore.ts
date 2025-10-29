// import { MOCK_QUESTIONS } from '@src/consts';
import { evaluatePageAnswer, generatePageQuestions, summarizePageContent } from '@src/lib/ChromeAI';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

interface QuestionState {
  questions: Question[];
  isLoading: boolean;
  learningMaterial: string;

  pageContent: {
    title: string;
    content: string;
    summary: string | null;
  } | null;

  progress: number[];

  setProgress: (progress: number[]) => void;
  setPageContent: () => void;
  generateQuestions: () => void;
  setLoading: (loading: boolean) => void;
  evaluateAnswer: (params: Pick<Question, 'question' | 'answer' | 'id'>) => void;
  clearQuestions: () => void;
}

export const useQuestionStore = create<QuestionState>((set, get) => ({
  // questions: MOCK_QUESTIONS,
  questions: [],
  isLoading: false,
  learningMaterial: '',
  pageContent: null,
  progress: [],

  setProgress: progress => set({ progress }),
  setPageContent: async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    const tabContent = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => ({
        title: document.title,
        text: document.body.innerText,
      }),
    });

    const content = tabContent[0].result;
    if (!content) return;

    const summary = await summarizePageContent(content.text);

    set({
      pageContent: {
        title: content.title,
        content: content.text,
        summary,
      },
    });
  },

  generateQuestions: async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    const tabContent = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.body.innerText,
    });

    const content = tabContent[0].result;
    if (!content) return;

    set({
      learningMaterial: content,
    });

    const data = await generatePageQuestions(content);

    // console.log('Generated Questions:', data);

    set({ questions: data?.generated?.map((item: unknown[]) => ({ id: uuidv4(), ...item })) });
  },
  setLoading: loading => set({ isLoading: loading }),
  evaluateAnswer: async ({ question, answer, id }) => {
    const content = document.body.innerText;

    const { questions } = get();
    // const result = await evaluatePageAnswer({ question, answer, learningMaterial: '' });

    const result = await evaluatePageAnswer({ question, answer, learningMaterial: content });

    const modifiedQuestions = questions.map(item => {
      if (item.id === id) {
        return { ...item, evaluation: result };
      }

      return item;
    });

    set({
      questions: modifiedQuestions,
    });

    return result;
  },
  clearQuestions: () => set({ questions: [] }),
}));

export enum QuestionType {
  SHORT_ANSWER = 'short-answer',
  LONG_ANSWER = 'long-answer',
  SINGLE_CHOICE = 'single-choice',
  MULTI_CHOICE = 'multi-choice',
}

export interface Question {
  id: string;
  question: string;
  question_type: QuestionType;
  answer_list: string[];
  answer: string;
  hint: string;
  topic: string;
  evaluation: {
    score: number;
    feedback: string;
  } | null;
}
