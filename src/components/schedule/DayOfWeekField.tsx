import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MultiSelect } from '@/components/ui/multi-select';
import { DAYS_OF_WEEK } from '@/constants/scheduleOptions';
import { capitalize, polishWeekdayFormatter } from '@/lib/utils';
import type { DayOfWeekFieldData, ScheduleFormData } from '@/schemas/scheduleSchema';

const DAY_OF_WEEK_OPTIONS = DAYS_OF_WEEK.map((dayIndex) => {
  const date = new Date(2023, 0, 1 + dayIndex);
  const label = polishWeekdayFormatter.format(date);
  return {
    label: capitalize(label),
    value: dayIndex.toString(),
  };
});

export const DayOfWeekField = () => {
  const { control, setValue } = useFormContext<ScheduleFormData>();
  const currentType = useWatch({ control, name: 'dayOfWeek.type' });

  return (
    <FormField
      control={control}
      name="dayOfWeek"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Dzień tygodnia</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value.type}
              onValueChange={(value) => {
                field.onChange({ type: value as DayOfWeekFieldData['type'] });
              }}
              className="flex flex-col mt-2"
            >
              {/* every */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="every" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Każdy dzień tygodnia</FormLabel>
                </div>
              </FormItem>

              {/* specific */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="specific" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">
                    Określony dzień tygodnia (wybierz jeden lub więcej)
                  </FormLabel>
                </div>

                <MultiSelect
                  disabled={currentType !== 'specific'}
                  options={DAY_OF_WEEK_OPTIONS}
                  defaultValue={field.value.type === 'specific' ? (field.value.values ?? []).map(String) : []}
                  onValueChange={(values) => {
                    setValue(
                      'dayOfWeek.values',
                      values.map((v) => Number(v)),
                      { shouldValidate: true },
                    );
                  }}
                  className="w-full"
                  placeholder=""
                />
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
