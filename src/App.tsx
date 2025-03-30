import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { scheduleSchema, type ScheduleFormData } from '@/schemas/scheduleSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { MinuteField } from '@/components/schedule/MinuteField';
import { HourField } from '@/components/schedule/HourField';
import { DayOfMonthField } from '@/components/schedule/DayOfMonthField';

export const App = () => {
  const form = useForm<ScheduleFormData>({
    defaultValues: {
      minute: { type: 'every' },
      hour: { type: 'every' },
      dayOfMonth: { type: 'every' },
      month: { type: 'every' },
      dayOfWeek: { type: 'every' },
    },
    resolver: zodResolver(scheduleSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  function onSubmit(values: ScheduleFormData) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-6 px-4">
          <div className="flex gap-6">
            <MinuteField />
            <HourField />
          </div>
          <div className="flex mt-12 mb-6">
            <DayOfMonthField />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </FormProvider>
  );
};
