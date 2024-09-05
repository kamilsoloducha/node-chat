interface Date {
  isToday(): boolean;
  isYesterday(): boolean;
  isSameDay(date: Date | number): boolean;
  isSameWeek(): boolean;
}

const day = 86_400_000;

Date.prototype.isToday = function (): boolean {
  const now = new Date();
  return this.isSameDay(now);
};

Date.prototype.isSameDay = function (date: Date | number): boolean {
  date = new Date(date);
  return this.getDate() === date.getDate() && this.getMonth() === date.getMonth() && this.getFullYear() === date.getFullYear();
};

Date.prototype.isYesterday = function (): boolean {
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);
  return this.isSameDay(yesterday);
};

Date.prototype.isSameWeek = function (): boolean {
  const today = new Date();
  const beginWeekSpan = today.getDay() * day;
  return this.valueOf() > today.valueOf() - beginWeekSpan;
};
