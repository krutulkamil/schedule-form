import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MultiSelect } from '@/components/ui/multi-select';
import { MONTHS } from '@/constants/scheduleOptions';
import { capitalize, polishMonthFormatter } from '@/lib/utils';
import type { MonthFieldData, ScheduleFormData } from '@/schemas/scheduleSchema';

const MONTH_OPTIONS = MONTHS.map((month) => {
  const date = new Date(2000, month - 1, 1);
  return {
    label: capitalize(polishMonthFormatter.format(date)),
    value: month.toString(),
  };
});

export const MonthField = () => {
  const { control, setValue } = useFormContext<ScheduleFormData>();
  const currentType = useWatch({ control, name: 'month.type' });

  return (
    <FormField
      control={control}
      name="month"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Miesiąc roku</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value.type}
              onValueChange={(value) => {
                field.onChange({ type: value as MonthFieldData['type'] });
              }}
              className="flex flex-col mt-2"
            >
              {/* every */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="every" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Każdy miesiąc roku</FormLabel>
                </div>
              </FormItem>

              {/* specific */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="specific" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">
                    Określony miesiąc roku (wybierz jeden lub więcej)
                  </FormLabel>
                </div>

                <MultiSelect
                  disabled={currentType !== 'specific'}
                  options={MONTH_OPTIONS}
                  defaultValue={field.value.type === 'specific' ? (field.value.values ?? []).map(String) : []}
                  onValueChange={(values) => {
                    setValue(
                      'month.values',
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
