import { z } from 'zod';

export const scheduleDetailsSchema = z.object({
  name: z.string().min(1),
  command: z.string().min(1),
  schedule: z.string().min(1),
});

export type ScheduleDetailsFormData = z.infer<typeof scheduleDetailsSchema>;
