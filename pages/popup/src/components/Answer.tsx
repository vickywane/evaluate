import Spinner from './Spinner';
import { useQuestionStore, QuestionType } from '../store/questionStore';
import { cn } from '@extension/ui';
import { useState } from 'react';
import type { Question } from '../store/questionStore';

type QuestionsProps = {
  question: Question;
  onCompleteQuestion: (result: unknown) => void;
};

// const LongAnswer = () => (
//   <div>
//     <p>Long Answer</p>
//   </div>
// );

// const MultiAnswer = () => (
//   <div>
//     <p>Multi Answer</p>
//   </div>
// );

// const ShortAnswer = () => (
//   <div>
//     <p>Short Answer</p>
//   </div>
// );

// const SingleAnswer = () => (
//   <div>
//     <p>Single Answer</p>
//   </div>
// );

// const AnswerTypes: Record<QuestionType, ReactNode> = {
//   [QuestionType.LONG_ANSWER]: <LongAnswer />,
//   [QuestionType.SINGLE_CHOICE]: <MultiAnswer />,
//   [QuestionType.MULTI_CHOICE]: <ShortAnswer />,
//   [QuestionType.SHORT_ANSWER]: <SingleAnswer />,
// };

export const Answer = ({ question, onCompleteQuestion }: QuestionsProps) => {
  const [answer, setAnswer] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const { evaluateAnswer } = useQuestionStore();

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => {
      const newSelection = prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option];

      setAnswer(newSelection.join('; '));
      return newSelection;
    });
  };

  const selectSingleOption = (option: string) => {
    setAnswer(answer === option ? '' : option);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await evaluateAnswer({ question: question.question, answer, id: question.id });

    onCompleteQuestion(result);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-2">
        <div className="w-full">
          {question.question_type === QuestionType.LONG_ANSWER && (
            <div className="w-full">
              <textarea
                value={answer}
                onChange={e => {
                  setAnswer(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className={cn(
                  'w-full resize-none overflow-hidden rounded-lg border-2 border-gray-300 p-3 outline-none transition-all duration-200',
                  'focus:border-blue-500 focus:shadow-md focus:ring-2 focus:ring-blue-200',
                  'hover:border-blue-300',
                )}
                placeholder="Write your answer here..."
                rows={3}
                style={{ minHeight: '80px' }}
              />
            </div>
          )}

          {question.question_type === QuestionType.SHORT_ANSWER && (
            <div>
              <input
                onChange={e => setAnswer(e.target.value)}
                className="w-full border-b py-2 outline-0"
                placeholder="Write an answer..."
                type="text"
              />
            </div>
          )}

          {question.question_type === QuestionType.MULTI_CHOICE && (
            <div className="flex flex-col gap-2">
              <p>Select all that apply</p>

              {question.answer_list.map((option, index) => {
                const isSelected = selectedOptions.includes(option);
                return (
                  <button
                    key={index}
                    onClick={() => toggleOption(option)}
                    className={cn(
                      'rounded-lg border-2 p-3 text-left transition-all duration-200 ease-in-out',
                      'hover:scale-[1.02] hover:shadow-md active:scale-[0.98]',
                      isSelected
                        ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300',
                    )}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {isSelected && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.question_type === QuestionType.SINGLE_CHOICE && (
            <div className="flex flex-col gap-2">
              <p>Select an option</p>

              {question.answer_list.map((option, index) => {
                const isSelected = answer === option;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSingleOption(option)}
                    className={cn(
                      'rounded-lg border-2 p-3 text-left transition-all duration-200 ease-in-out',
                      'hover:scale-[1.02] hover:shadow-md active:scale-[0.98]',
                      isSelected
                        ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300',
                    )}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {isSelected && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-1 flex flex-row items-center hover:cursor-pointer">
          <p className="text-[10px] text-gray-800">Report Question</p>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className={cn(
            'flex w-full items-center justify-center rounded-lg bg-blue-500 p-2 text-white shadow transition-transform hover:scale-105 hover:bg-blue-600',
          )}>
          {!isLoading ? 'Submit' : 'Submitting...'}

          {isLoading && <Spinner className="text-white" />}
        </button>
      </div>
    </div>
  );
};
