import { useForm } from 'react-hook-form';
import { scheduleSchema, type ScheduleFormData } from '@/schemas/scheduleSchema';
import { generateCronExpression } from '@/utils/cronGenerator';
import { zodResolver } from '@hookform/resolvers/zod';

export const useScheduleForm = () => {
  const form = useForm<ScheduleFormData>({
    defaultValues: {
      minute: { type: 'every' },
      hour: { type: 'every' },
      dayOfMonth: { type: 'every' },
      month: { type: 'every' },
      dayOfWeek: { type: 'every' },
    },
    resolver: zodResolver(scheduleSchema),
    mode: 'onChange',
  });

  const getCronString = () => {
    const values = form.getValues();
    return generateCronExpression(values);
  };

  return {
    ...form,
    getCronString,
  };
};
