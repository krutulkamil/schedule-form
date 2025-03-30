import { z } from 'zod';

export const minuteSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('every') }),
  z.object({
    type: z.literal('between'),
    from: z.number().min(0).max(59),
    to: z.number().min(0).max(59),
  }),
  z.object({
    type: z.literal('step'),
    stepValue: z.number().min(1).max(59),
  }),
  z.object({
    type: z.literal('specific'),
    values: z.array(z.number().min(0).max(59)).min(1),
  }),
]);

export const hourSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('every') }),
  z.object({
    type: z.literal('between'),
    from: z.number().min(0).max(23),
    to: z.number().min(0).max(23),
  }),
  z.object({
    type: z.literal('step'),
    stepValue: z.number().min(1).max(23),
  }),
  z.object({
    type: z.literal('specific'),
    values: z.array(z.number().min(0).max(23)).min(1),
  }),
]);

export const dayOfMonthSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('every') }),
  z.object({
    type: z.literal('specific'),
    values: z.array(z.number().min(1).max(31)).min(1),
  }),
]);

export const monthSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('every') }),
  z.object({
    type: z.literal('specific'),
    values: z.array(z.number().min(1).max(12)).min(1),
  }),
]);

export const dayOfWeekSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('every') }),
  z.object({
    type: z.literal('specific'),
    values: z.array(z.number().min(0).max(6)).min(1),
  }),
]);

export const scheduleSchema = z.object({
  minute: minuteSchema,
  hour: hourSchema,
  dayOfMonth: dayOfMonthSchema,
  month: monthSchema,
  dayOfWeek: dayOfWeekSchema,
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;

export type MinuteFieldData = z.infer<typeof minuteSchema>;
export type HourFieldData = z.infer<typeof hourSchema>;
export type DayOfMonthFieldData = z.infer<typeof dayOfMonthSchema>;
export type MonthFieldData = z.infer<typeof monthSchema>;
export type DayOfWeekFieldData = z.infer<typeof dayOfWeekSchema>;
