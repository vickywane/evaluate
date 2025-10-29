import { useQuestionStore } from '../store/questionStore';
import { cn } from '@extension/ui';
import Header from '@src/components/Header';
import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Result = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const { questions } = useQuestionStore();

  // console.log('questions in result page:', questions);

  const data = useMemo(
    () =>
      questions.map(item => ({
        name: item?.topic,
        value: item?.evaluation ? item?.evaluation?.score * 10 : 0,
        color: '#6b9080',
      })),
    [questions],
  );

  // const onPieEnter = (_: undefined, index: number) => {
  //   // setActiveIndex(index);
  // };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  // const onPieClick = (_: undefined, index: number) => {
  //   // setSelectedSection(data[index].name);
  // };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border-border rounded-lg border p-3 shadow-lg">
          <p className="text-foreground font-semibold">{payload[0].name}</p>
          <p className="text-muted-foreground text-sm">{payload[0].value}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn('h-full text-gray-900')}>
      <Header />

      <div className="overflow-y h-full px-4 pt-6">
        <div className="mb-6 grid gap-2">
          <h1 className="text-left text-2xl font-bold">Congratulations!</h1>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="relative h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={150}
                  paddingAngle={2}
                  dataKey="value"
                  // onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  // onClick={onPieClick}
                  className="cursor-pointer focus:outline-none">
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                      strokeWidth={activeIndex === index ? 3 : 0}
                      stroke={activeIndex === index ? entry.color : 'none'}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-foreground text-5xl font-bold">
                  {activeIndex !== null ? data[activeIndex].value : data[0].value}%
                </p>
                {activeIndex !== null && <p className="text-muted-foreground mt-2 text-sm">{data[activeIndex].name}</p>}
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors"
                // onClick={() => setSelectedSection(item.name)}
              >
                <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: item.color }} />
                <div className="flex-1">
                  <p className="text-foreground text-sm font-medium">{item.name}</p>
                  <p className="text-muted-foreground text-xs">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
