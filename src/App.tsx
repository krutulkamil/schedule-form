import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grip, GripVertical, X, Plus } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormControl, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScheduleDialog } from '@/components/schedule/ScheduleDialog';
import { scheduleDetailsSchema, type ScheduleDetailsFormData } from '@/schemas/scheduleDetailsSchema';

export const App = () => {
  const scheduleDetailsForm = useForm<ScheduleDetailsFormData>({
    defaultValues: {
      name: 'Harmonogram_1',
      command: 'app:remove:cron:report',
      schedule: '*****'
    },
    resolver: zodResolver(scheduleDetailsSchema),
    mode: 'onBlur',
  });

  function onSubmit(values: ScheduleDetailsFormData) {
    console.log(values);
  }

  return (
    <main className="wrapper">
      <div className="flex items-center gap-2 mb-6">
        <Grip size={16} />
        <h1>Cron</h1>
      </div>
      <Card>
        <CardContent>
          <Form {...scheduleDetailsForm}>
            <form onSubmit={scheduleDetailsForm.handleSubmit(onSubmit)}>
              <div className="flex justify-between pb-6 mb-6 border-b">
                <div className="flex items-center gap-2">
                  <GripVertical size={16} />
                  <span>Harmonogram</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" type="button">
                    <X />
                    Zamknij
                  </Button>
                  <Button variant="save" type="submit">
                    <Plus />
                    Zapisz
                  </Button>
                </div>
              </div>
              <div className="flex gap-x-6 mb-6">
                <FormField
                  control={scheduleDetailsForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nazwa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={scheduleDetailsForm.control}
                  name="command"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Komenda</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={scheduleDetailsForm.control}
                name="schedule"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Harmonogram</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <ScheduleDialog />
        </CardFooter>
      </Card>
    </main>
  );
};
