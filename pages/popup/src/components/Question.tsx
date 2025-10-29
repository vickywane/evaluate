import { Answer } from './Answer';
import { useQuestionStore } from '../store/questionStore';
import { cn } from '@extension/ui';
import { useState } from 'react';
import { HiLightBulb } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import type { Question as IQuestion } from '../store/questionStore';

type QuestionsProps = {
  position: number;
  data: IQuestion;
  onNext: () => void;
};

export const Question = ({ position, data, onNext }: QuestionsProps) => {
  const [evaluationResult, setEvaluationResult] = useState<{ score: number; feedback: string } | null>(null);
  const [showHint, setShowHint] = useState(false);

  const { progress, setProgress, questions } = useQuestionStore();

  const handleNext = () => {
    if (!progress.includes(position)) {
      setProgress([...progress, position - 1]);
    }

    onNext();
  };

  const isLast = position === questions.length;

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className={cn('rounded-lg bg-white p-4')}>
      <div className="mb-4 flex flex-row justify-between">
        <p className="text-sm">
          {position} / {questions.length}
        </p>

        <div className="flex flex-row items-center gap-1">
          <button
            onMouseDown={toggleHint}
            onMouseUp={toggleHint}
            className={cn(
              'flex flex-row gap-1 rounded-full border bg-transparent px-3 py-1 transition hover:cursor-pointer hover:border-gray-100 hover:bg-gray-100',
              showHint && 'bg-gray-100',
            )}>
            Hint
            <HiLightBulb className="text-base" />
          </button>

          {!isLast && (
            <button onClick={onNext} className="bg-transparent p-1 transition hover:cursor-pointer hover:bg-gray-100">
              <p className="text-xs text-gray-800">Skip</p>
            </button>
          )}
        </div>
      </div>

      {showHint && (
        <div className="mb-6 flex justify-center">
          <div className="flex h-8 flex-row items-center justify-center gap-1 rounded-full bg-gray-200 px-3">
            <div>
              <p className="text-left text-xs font-normal text-gray-600">{data.hint}</p>
            </div>
          </div>
        </div>
      )}

      {evaluationResult ? (
        <div className="grid gap-4">
          <p className="text-4xl">{evaluationResult.score}</p>
          <p className="text-left">{evaluationResult.feedback}</p>

          {progress.length + 1 === questions.length ? (
            <Link to="/result">
              <button
                className={cn(
                  'flex w-full items-center justify-center rounded-lg bg-blue-500 p-2 text-white shadow transition-transform hover:scale-105 hover:bg-blue-600',
                )}>
                Complete Assessment
              </button>
            </Link>
          ) : (
            <button
              onClick={handleNext}
              className={cn(
                'w-full rounded-lg bg-blue-500 p-2 text-white shadow transition-transform hover:scale-105 hover:bg-blue-600',
              )}>
              Next Question
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div>
              <p className="text-left text-2xl font-normal">{data.question}</p>
            </div>
          </div>

          <Answer question={data} onCompleteQuestion={result => setEvaluationResult(result)} />
        </div>
      )}
    </div>
  );
};
