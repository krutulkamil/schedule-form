import type {
  MinuteFieldData,
  HourFieldData,
  DayOfMonthFieldData,
  MonthFieldData,
  DayOfWeekFieldData,
  ScheduleFormData,
} from '../schemas/scheduleSchema';

type FieldData = MinuteFieldData | HourFieldData | DayOfMonthFieldData | MonthFieldData | DayOfWeekFieldData;

const getCronPart = (field: FieldData): string => {
  switch (field.type) {
    case 'every':
      return '*';
    case 'between':
      return `${field.from}-${field.to}`;
    case 'step':
      return `*/${field.stepValue}`;
    case 'specific':
      return field.values.sort((a, b) => a - b).join(',');
    default:
      return '*';
  }
};

export const generateCronExpression = (data: ScheduleFormData): string => {
  return [
    getCronPart(data.minute),
    getCronPart(data.hour),
    getCronPart(data.dayOfMonth),
    getCronPart(data.month),
    getCronPart(data.dayOfWeek),
  ].join(' ');
};
