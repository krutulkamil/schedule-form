import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MultiSelect } from '@/components/ui/multi-select';
import { MINUTES } from '@/constants/scheduleOptions';
import type { MinuteFieldData, ScheduleFormData } from '@/schemas/scheduleSchema';

const MINUTE_OPTIONS = MINUTES.map((m) => ({
  label: m.toString(),
  value: m.toString(),
}));

export const MinuteField = () => {
  const { control, setValue } = useFormContext<ScheduleFormData>();
  const currentType = useWatch({ control, name: 'minute.type' });
  const fromValue = useWatch({ control, name: 'minute.from' });
  const toOptions = MINUTES.filter((m) => fromValue == null || m > fromValue);
  const isToDisabled = currentType !== 'between' || toOptions.length === 0;

  return (
    <FormField
      control={control}
      name="minute"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Minuta</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value.type}
              onValueChange={(value) => {
                field.onChange({ ...field.value, type: value as MinuteFieldData['type'] });
              }}
              className="flex flex-col mt-2"
            >
              {/* every */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="every" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Każda minuta</FormLabel>
                </div>
              </FormItem>

              {/* between */}
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem className="ml-2" value="between" />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">Co minutę między</FormLabel>
                </div>

                <div className="flex items-center gap-x-4">
                  <Controller
                    name="minute.from"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString() ?? ''}
                        disabled={currentType !== 'between'}
                        onValueChange={(val) => setValue('minute.from', Number(val), { shouldValidate: true })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MINUTES.map((minute) => (
                            <SelectItem key={minute} value={minute.toString()}>
                              {minute.toString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  -
                  <Controller
                    name="minute.to"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString() ?? ''}
                        disabled={isToDisabled}
                        onValueChange={(val) => setValue('minute.to', Number(val), { shouldValidate: true })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {toOptions.map((minute) => (
                            <SelectItem key={minute} value={minute.toString()}>
                              {minute.toString()}
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
                  <FormLabel className="font-normal text-xs">Co */X minut</FormLabel>
                </div>

                <Controller
                  name="minute.stepValue"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString() ?? ''}
                      disabled={currentType !== 'step'}
                      onValueChange={(val) => setValue('minute.stepValue', Number(val), { shouldValidate: true })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MINUTES.filter((m) => m > 0).map((minute) => (
                          <SelectItem key={minute} value={minute.toString()}>
                            {minute.toString()}
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
                  <FormLabel className="font-normal text-xs">Określona minuta (wybierz jedną lub więcej)</FormLabel>
                </div>

                <Controller
                  name="minute.values"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      disabled={currentType !== 'specific'}
                      options={MINUTE_OPTIONS}
                      value={field.value?.map(String) ?? []}
                      defaultValue={field.value?.map(String) ?? []}
                      onValueChange={(values) => {
                        setValue(
                          'minute.values',
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
