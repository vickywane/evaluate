import Spinner from '../components/Spinner';
import { useQuestionStore } from '../store/questionStore';
import { cn } from '@extension/ui';
import Header from '@src/components/Header';
import { ModelStatus } from '@src/components/ModelStatus';
import { SkeletonLoader } from '@src/components/SkeletonLoader';
import { downloadModel, getModelAvailability } from '@src/lib/ChromeAI';
import { ModelAvailability } from '@src/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { generateQuestions, pageContent, setPageContent } = useQuestionStore();
  const [modelAvailability, setModelAvailability] = useState<ModelAvailability | null>(null);

  const handleGetStarted = async () => {
    setLoading(true);

    await generateQuestions();
    navigate('/questions');
    setLoading(false);
  };

  useEffect(() => {
    const getStatus = async () => {
      const status = await getModelAvailability();
      setModelAvailability(status);
    };

    getStatus();
  }, []);

  useEffect(() => {
    if (modelAvailability === ModelAvailability.AVAILABLE) {
      setPageContent();
    }
  }, [modelAvailability, setPageContent]);

  const handleDownload = async () => {
    setLoading(true);
    await downloadModel();
    setLoading(false);
    setModelAvailability(ModelAvailability.AVAILABLE);
  };

  return (
    <div className={cn('h-full text-gray-900')}>
      <Header />

      {modelAvailability && <ModelStatus status={modelAvailability} />}

      <div className="h-full px-4 pt-6">
        {modelAvailability === ModelAvailability.DOWNLOADABLE && (
          <>
            <div className="mb-6 grid gap-2">
              <h1 className="text-left text-2xl font-bold">Download AI Model</h1>
              <p>
                Evaluate uses the Chrome{' '}
                <a className="underline" href="https://developer.chrome.com/docs/ai/built-in">
                  Built-in
                </a>{' '}
                AI model to generate summaries, assessment questions and provide feedback. Please download the nano
                model to get started.
              </p>
            </div>

            <div>
              <button
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white shadow',
                )}
                disabled={isLoading}
                onClick={handleDownload}>
                Download Model To Browser
                {isLoading && <Spinner className="text-white" />}
              </button>
            </div>
          </>
        )}

        {modelAvailability === ModelAvailability.UNAVAILABLE && (
          <div className="mb-6 grid gap-2">
            <h1 className="text-left text-2xl font-bold">AI Model Unavailable</h1>
            <p>
              The Chrome Built-in AI model is currently unavailable. Please ensure you are using the latest version of
              Chrome and try again.
            </p>
          </div>
        )}

        {modelAvailability === ModelAvailability.AVAILABLE && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
