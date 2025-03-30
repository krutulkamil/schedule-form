import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grip } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScheduleDialog } from '@/components/schedule/ScheduleDialog';
import { scheduleDetailsSchema, type ScheduleDetailsFormData } from '@/schemas/scheduleDetailsSchema';
import { Toaster } from '@/components/ui/sonner';
import { ScheduleDetailsForm } from '@/components/schedule/ScheduleDetailsForm.tsx';

export const App = () => {
  const scheduleDetailsForm = useForm<ScheduleDetailsFormData>({
    defaultValues: {
      name: 'Harmonogram_1',
      command: 'app:remove:cron:report',
      schedule: '* * * * *',
    },
    resolver: zodResolver(scheduleDetailsSchema),
    mode: 'onBlur',
  });

  const handleSetSchedule = (value: string) => {
    scheduleDetailsForm.setValue('schedule', value);
  };

  return (
    <>
      <main className="wrapper">
        <div className="flex items-center gap-2 mb-6">
          <Grip size={16} />
          <h1>Cron</h1>
        </div>
        <Card>
          <CardContent>
            <FormProvider {...scheduleDetailsForm}>
              <ScheduleDetailsForm />
            </FormProvider>
          </CardContent>
          <CardFooter>
            <ScheduleDialog onSetSchedule={handleSetSchedule} />
          </CardFooter>
        </Card>
      </main>
      <Toaster />
    </>
  );
};
