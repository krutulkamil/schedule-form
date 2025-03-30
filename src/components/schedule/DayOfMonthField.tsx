import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MultiSelect } from '@/components/ui/multi-select';
import { DAYS_OF_MONTH } from '@/constants/scheduleOptions';
import type { DayOfMonthFieldData, ScheduleFormData } from '@/schemas/scheduleSchema';

const DAYS_OF_MONTH_OPTIONS = DAYS_OF_MONTH.map((d) => ({
  label: d.toString(),
  value: d.toString(),
}));

export const DayOfMonthField = () => {
  const { control, setValue } = useFormContext<ScheduleFormData>();
  const currentType = useWatch({ control, name: 'dayOfMonth.type' });

  return (
    <FormField
      control={control}
      name="dayOfMonth"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Dzień miesiąca</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value.type}
              onValueChange={(value) => {
                field.onChange({ type: value as DayOfMonthFieldData['type'] });
              }}
              className="flex flex-col space-y-2 mt-2"
            >
              {/* every */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="every" />
                  </FormControl>
                  <FormLabel className="font-normal">Każdy dzień miesiąca</FormLabel>
                </div>
              </FormItem>

              {/* specific */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="specific" />
                  </FormControl>
                  <FormLabel className="font-normal">Określony dzień miesiąca (wybierz jeden lub więcej)</FormLabel>
                </div>

                <MultiSelect
                  disabled={currentType !== 'specific'}
                  options={DAYS_OF_MONTH_OPTIONS}
                  defaultValue={field.value.type === 'specific' ? (field.value.values ?? []).map(String) : []}
                  onValueChange={(values) => {
                    setValue(
                      'dayOfMonth.values',
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
