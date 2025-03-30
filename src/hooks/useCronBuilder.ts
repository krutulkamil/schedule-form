import type {
  MinuteFieldData,
  HourFieldData,
  DayOfMonthFieldData,
  MonthFieldData,
  DayOfWeekFieldData,
  ScheduleFormData,
} from '@/schemas/scheduleSchema';

type FieldData = MinuteFieldData | HourFieldData | DayOfMonthFieldData | MonthFieldData | DayOfWeekFieldData;

const getCronPart = (field: FieldData) => {
  if (!field || typeof field !== 'object' || !('type' in field)) return '*';

  switch (field.type) {
    case 'every':
      return '*';
    case 'between':
      return field.from !== undefined && field.to !== undefined ? `${field.from}-${field.to}` : '*';
    case 'step':
      return field.stepValue !== undefined ? `*/${field.stepValue}` : '*';
    case 'specific':
      return Array.isArray(field.values) && field.values.length > 0
        ? field.values.sort((a, b) => a - b).join(',')
        : '*';
    default:
      return '*';
  }
};

export const generateCronExpression = (data: ScheduleFormData) => {
  return [
    getCronPart(data.minute),
    getCronPart(data.hour),
    getCronPart(data.dayOfMonth),
    getCronPart(data.month),
    getCronPart(data.dayOfWeek),
  ].join(' ');
};


export const useCronBuilder = () => {
  const getCronValue = (values: ScheduleFormData) => {
    return generateCronExpression(values);
  };

  return { getCronValue };
};
