import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { scheduleSchema, type ScheduleFormData } from '@/schemas/scheduleSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { MinuteField } from '@/components/schedule/MinuteField';
import { HourField } from '@/components/schedule/HourField';
import { DayOfMonthField } from '@/components/schedule/DayOfMonthField';
import { MonthField } from '@/components/schedule/MonthField';
import { DayOfWeekField } from '@/components/schedule/DayOfWeekField';

export const ScheduleDialog = () => {
  const scheduleForm = useForm<ScheduleFormData>({
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ustaw harmonogram</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Harmonogram</DialogTitle>
        </DialogHeader>
        <FormProvider {...scheduleForm}>
          <Form {...scheduleForm}>
            <form onSubmit={scheduleForm.handleSubmit(onSubmit)} className="pt-6 pb-2 px-4">
              <div className="flex gap-6">
                <MinuteField />
                <HourField />
              </div>
              <div className="flex mt-12 mb-6 gap-6">
                <DayOfMonthField />
                <MonthField />
                <DayOfWeekField />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Zamknij</Button>
                </DialogClose>
                <Button variant="save" type="submit">
                  Ustaw
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
