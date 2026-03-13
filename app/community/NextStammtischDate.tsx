'use client';
import { useState, useEffect } from 'react';

function getLastThursday(year: number, month: number): Date {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const candidate = new Date(lastDayOfMonth);
  while (candidate.getDay() !== 4) {
    candidate.setDate(candidate.getDate() - 1);
  }
  return candidate;
}

function getNextStammtischDate(): string {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  while (true) {
    if (month === 11) {
      month = 0;
      year += 1;
    }

    const lastThursday = getLastThursday(year, month);

    if (lastThursday >= now) {
      return lastThursday.toLocaleDateString('de-CH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }
}

export default function NextStammtischDate() {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    setDate(getNextStammtischDate());
  }, []);

  return (
    <p className="text-sm text-am-ink/70 mb-2">
      <strong>{date || 'Wird berechnet...'}</strong>
    </p>
  );
}
