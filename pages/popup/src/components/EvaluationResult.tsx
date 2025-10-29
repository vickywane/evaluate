import Spinner from './Spinner';
import { useQuestionStore } from '../store/questionStore';
import { cn } from '@extension/ui';
import { useState } from 'react';

type QuestionsProps = {
  question: string;
  id: string;

  onCompleteQuestion: (result: { score: number; feedback: string } | null) => void;
};

export const Answer = ({ question, id, onCompleteQuestion }: QuestionsProps) => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { evaluateAnswer } = useQuestionStore();

  const handleSubmit = async (question: string, id: string) => {
    setLoading(true);
    const result = await evaluateAnswer({ question, answer, id });

    // @ts-expect-error fix type
    onCompleteQuestion(result);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-3 w-full">
        <input
          onChange={e => setAnswer(e.target.value)}
          className="w-full border-b py-2 outline-0"
          placeholder="Write an answer..."
          type="text"
        />
      </div>

      <button
        disabled={isLoading}
        onClick={() => handleSubmit(question, id)}
        className={cn(
          'flex w-full items-center justify-center rounded-lg bg-blue-500 p-2 text-white shadow transition-transform hover:scale-105 hover:bg-blue-600',
        )}>
        {!isLoading ? 'Submit' : 'Submitting...'}

        {isLoading && <Spinner className="text-white" />}
      </button>
    </div>
  );
};
