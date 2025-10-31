import { ModelAvailability } from '@src/types';
import { PiSealWarningDuotone, PiSealCheckDuotone } from 'react-icons/pi';
import type { ReactNode } from 'react';

const Available = () => (
  <>
    <PiSealCheckDuotone className="text-lg text-gray-600" />

    <p className="text-left text-xs font-normal text-gray-600">Chrome Built-in AI ready!</p>
  </>
);

const Unavailable = () => (
  <>
    <PiSealWarningDuotone className="text-lg text-gray-600" />

    <p className="text-left text-xs font-normal text-gray-600">Chrome AI is not supported </p>
  </>
);

const Downloadable = () => (
  <>
    <PiSealWarningDuotone className="text-lg text-gray-600" />

    <p className="text-left text-xs font-normal text-gray-600">Chrome AI Download Required </p>
  </>
);

const Status: Record<ModelAvailability, ReactNode> = {
  [ModelAvailability.AVAILABLE]: <Available />,
  [ModelAvailability.DOWNLOADABLE]: <Downloadable />,
  [ModelAvailability.UNAVAILABLE]: <Unavailable />,
};

export const ModelStatus = ({ status }: { status: ModelAvailability }) => (
  <div className="mt-4 flex justify-center">
    <div className="flex h-8 flex-row items-center justify-center gap-1 rounded-full bg-gray-200 px-3">
      <div className="flex flex-row items-center gap-1">{Status[status]}</div>
    </div>
  </div>
);
