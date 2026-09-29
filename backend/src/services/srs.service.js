/**
 * SM-2 Spaced Repetition System Algorithm implementation
 */

export function calculateSM2({ quality, easeFactor = 2.5, intervalDays = 0, repetitions = 0 }) {
  const q = Math.max(0, Math.min(5, Number(quality)));
  let newEaseFactor = easeFactor;
  let newIntervalDays = intervalDays;
  let newRepetitions = repetitions;

  if (q < 3) {
    // Quality < 3 means failed / forgot (Again)
    newRepetitions = 0;
    newIntervalDays = 1;
  } else {
    // Quality >= 3 means successful recall (Hard / Good / Easy)
    if (newRepetitions === 0) {
      newIntervalDays = 1;
    } else if (newRepetitions === 1) {
      newIntervalDays = 6;
    } else {
      newIntervalDays = Math.round(intervalDays * easeFactor);
    }

    newRepetitions += 1;
    
    // Formula for Ease Factor update:
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    newEaseFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (newEaseFactor < 1.3) {
      newEaseFactor = 1.3;
    }
  }

  // Calculate new due date (now + newIntervalDays in milliseconds)
  const now = new Date();
  const nextDueDate = new Date(now.getTime() + newIntervalDays * 24 * 60 * 60 * 1000);

  return {
    easeFactor: Number(newEaseFactor.toFixed(2)),
    intervalDays: newIntervalDays,
    repetitions: newRepetitions,
    dueDate: nextDueDate.toISOString(),
    lastReviewedAt: now.toISOString()
  };
}
