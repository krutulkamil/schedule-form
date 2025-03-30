import { generateCronExpression } from '@/utils/generateCronExpression';
import type { ScheduleFormData } from '@/schemas/scheduleSchema';

export const useCronBuilder = () => {
  const getCronValue = (values: ScheduleFormData) => {
    return generateCronExpression(values);
  };

  return { getCronValue };
};
