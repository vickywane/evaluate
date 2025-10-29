import Spinner from '../components/Spinner';
import { useQuestionStore } from '../store/questionStore';
import { cn } from '@extension/ui';
import Header from '@src/components/Header';
import { SkeletonLoader } from '@src/components/SkeletonLoader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { generateQuestions, pageContent, setPageContent } = useQuestionStore();

  const handleGetStarted = async () => {
    setLoading(true);

    await generateQuestions();
    navigate('/questions');
    setLoading(false);
  };

  useEffect(() => {
    setPageContent();
  }, [setPageContent]);

  return (
    <div className={cn('h-full text-gray-900')}>
      <Header />

      <div className="h-full px-4 pt-12">
        <div className="mb-6 grid gap-2">
          <h1 className="text-left text-2xl font-bold">Get Started</h1>
          <p>Welcome to Evaluate - Your learning assessment tool</p>
        </div>

        <div className="mb-12 grid gap-1 rounded-lg border bg-slate-50 p-4 text-left">
          {!pageContent?.summary ? (
            <SkeletonLoader />
          ) : (
            <>
              <p className="text-base font-semibold">{pageContent?.title}</p>
              <p className="text-md">{pageContent?.summary}</p>
            </>
          )}
        </div>

        <div>
          <button
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white shadow',
            )}
            disabled={isLoading}
            onClick={handleGetStarted}>
            Start Assessment
            {isLoading && <Spinner className="text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
