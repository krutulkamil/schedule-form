import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCronBuilder } from '@/hooks/useCronBuilder';
import type { ScheduleFormData } from '@/schemas/scheduleSchema';

/**
 * @vitest-environment happy-dom
 */

describe('useCronBuilder', () => {
  it('returns correct CRON for "every" values', () => {
    const { result } = renderHook(() => useCronBuilder());

    const input: ScheduleFormData = {
      minute: { type: 'every' },
      hour: { type: 'every' },
      dayOfMonth: { type: 'every' },
      month: { type: 'every' },
      dayOfWeek: { type: 'every' },
    };

    const cron = result.current.getCronValue(input);
    expect(cron).toBe('* * * * *');
  });

  it('returns correct CRON for "step" values', () => {
    const { result } = renderHook(() => useCronBuilder());

    const input: ScheduleFormData = {
      minute: { type: 'step', stepValue: 15 },
      hour: { type: 'step', stepValue: 2 },
      dayOfMonth: { type: 'every' },
      month: { type: 'every' },
      dayOfWeek: { type: 'every' },
    };

    const cron = result.current.getCronValue(input);
    expect(cron).toBe('*/15 */2 * * *');
  });

  it('returns correct CRON for "between" values', () => {
    const { result } = renderHook(() => useCronBuilder());

    const input: ScheduleFormData = {
      minute: { type: 'between', from: 5, to: 20 },
      hour: { type: 'every' },
      dayOfMonth: { type: 'every' },
      month: { type: 'every' },
      dayOfWeek: { type: 'every' },
    };

    const cron = result.current.getCronValue(input);
    expect(cron).toBe('5-20 * * * *');
  });

  it('returns correct CRON for "specific" values', () => {
    const { result } = renderHook(() => useCronBuilder());

    const input: ScheduleFormData = {
      minute: { type: 'specific', values: [5, 15, 10] },
      hour: { type: 'specific', values: [1, 2] },
      dayOfMonth: { type: 'specific', values: [1, 15] },
      month: { type: 'specific', values: [1, 12] },
      dayOfWeek: { type: 'specific', values: [0, 6] },
    };

    const cron = result.current.getCronValue(input);
    expect(cron).toBe('5,10,15 1,2 1,15 1,12 0,6');
  });

  it('returns fallback "*" for missing or invalid fields', () => {
    const { result } = renderHook(() => useCronBuilder());

    const input = {
      minute: { type: 'step' },
      hour: { type: 'between', from: 5 } as any,
      dayOfMonth: { type: 'specific', values: [] },
      month: { type: 'every' },
      dayOfWeek: { type: 'every' },
    } as unknown as ScheduleFormData;

    const cron = result.current.getCronValue(input);
    expect(cron).toBe('* * * * *');
  });
});
