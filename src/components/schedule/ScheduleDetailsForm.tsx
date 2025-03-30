import { useFormContext } from 'react-hook-form';
import { GripVertical, X, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { type ScheduleDetailsFormData } from '@/schemas/scheduleDetailsSchema';

export const ScheduleDetailsForm = () => {
  const form = useFormContext<ScheduleDetailsFormData>();

  const onSubmit = (values: ScheduleDetailsFormData) => {
    toast(`Save to DB: ${JSON.stringify(values)}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            control={form.control}
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
            control={form.control}
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
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Harmonogram</FormLabel>
              <FormControl>
                <Input {...field} readOnly disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
