import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grip, GripVertical, X, Plus } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
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

export const App = () => {
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
    <main className="wrapper">
      <div className="flex items-center gap-2 mb-6">
        <Grip size={16} />
        <h1>Cron</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GripVertical size={16} />
            <span>Harmonogram</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <X />
              Zamknij
            </Button>
            <Button variant="save">
              <Plus />
              Zapisz
            </Button>
          </div>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </main>
  );
};
