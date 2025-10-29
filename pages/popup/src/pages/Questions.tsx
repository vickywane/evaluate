import { useQuestionStore } from '../store/questionStore';
import { cn } from '@extension/ui';
import Header from '@src/components/Header';
import { Question } from '@src/components/Question';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState } from 'react';

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { questions, progress } = useQuestionStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    watchDrag: false,
  });

  // const scrollPrev = useCallback(() => {
  //   if (emblaApi) {
  //     emblaApi.scrollPrev();

  //     setCurrentIndex(prev => prev - 1);
  //   }
  // }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setCurrentIndex(prev => prev + 1);
    }
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      setCurrentIndex(index);
    }
  };

  return (
    <div className={'text-gray-900'}>
      <Header />

      <div className="my-4 flex flex-row justify-center gap-2">
        {Array.from({
          length: questions.length,
        }).map((_, index) => (
          <button
            onClick={() => scrollTo(index)}
            className={cn(
              'h-1 w-6 hover:cursor-pointer',
              progress.includes(index) || index === currentIndex ? 'bg-black' : 'bg-gray-400',
            )}
            key={index}
          />
        ))}
      </div>

      <div className="overflow-hidden">
        {questions.length === 0 ? (
          <div className={cn('rounded-lg border border-gray-200 bg-gray-50 p-8 text-center')}>
            <p className="mb-2 text-lg">No questions generated yet</p>
            <p className="text-sm opacity-75">Generate questions from the main popup to see them here</p>
          </div>
        ) : (
          <div>
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex">
                {questions.map((item, index) => (
                  <div key={item.id} className="embla__slide min-w-0 flex-[0_0_100%] p-2">
                    <Question onNext={scrollNext} position={index + 1} data={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
