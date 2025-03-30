import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MultiSelect } from '@/components/ui/multi-select';
import { HOURS } from '@/constants/scheduleOptions';
import type { HourFieldData, ScheduleFormData } from '@/schemas/scheduleSchema';

const HOUR_OPTIONS = HOURS.map((h) => ({
  label: h.toString(),
  value: h.toString(),
}));

export const HourField = () => {
  const { control, setValue } = useFormContext<ScheduleFormData>();
  const currentType = useWatch({ control, name: 'hour.type' });

  const fromValue = useWatch({ control, name: 'hour.from' });
  const toOptions = HOURS.filter((m) => fromValue == null || m > fromValue);
  const isToDisabled = currentType !== 'between' || toOptions.length === 0;

  return (
    <FormField
      control={control}
      name="hour"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Godzina</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value.type}
              onValueChange={(value) => {
                field.onChange({ ...field.value, type: value as HourFieldData['type'] });
              }}
              className="flex flex-col mt-2"
            >
              {/* every */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="every" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Każda godzina</FormLabel>
                </div>
              </FormItem>

              {/* between */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="between" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Co godzinę między</FormLabel>
                </div>

                <div className="flex items-center gap-x-4">
                  <Controller
                    name="hour.from"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString() ?? ''}
                        disabled={currentType !== 'between'}
                        onValueChange={(val) => setValue('hour.from', Number(val), { shouldValidate: true })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS.map((hour) => (
                            <SelectItem key={hour} value={hour.toString()}>
                              {hour.toString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  -
                  <Controller
                    name="hour.to"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString() ?? ''}
                        disabled={isToDisabled}
                        onValueChange={(val) => setValue('hour.to', Number(val), { shouldValidate: true })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {toOptions.map((hour) => (
                            <SelectItem key={hour} value={hour.toString()}>
                              {hour.toString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </FormItem>

              {/* step */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="step" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Co */X godzin</FormLabel>
                </div>

                <Controller
                  name="hour.stepValue"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString() ?? ''}
                      disabled={currentType !== 'step'}
                      onValueChange={(val) => setValue('hour.stepValue', Number(val), { shouldValidate: true })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS.filter((m) => m > 0).map((hour) => (
                          <SelectItem key={hour} value={hour.toString()}>
                            {hour.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormItem>

              {/* specific */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="specific" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Określona godzina (wybierz jedną lub więcej)</FormLabel>
                </div>

                <Controller
                  name="hour.values"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      disabled={currentType !== 'specific'}
                      options={HOUR_OPTIONS}
                      value={field.value?.map(String) ?? []}
                      defaultValue={field.value?.map(String) ?? []}
                      onValueChange={(values) => {
                        setValue(
                          'hour.values',
                          values.map((v) => Number(v)),
                          { shouldValidate: true },
                        );
                      }}
                      className="w-full"
                    />
                  )}
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
