interface Date {
  addHours(hours: number): Date;
}

Object.defineProperty(Date.prototype, 'addHours', {
  configurable: true,
  writable: true,
  value: function (hours: number): Date {
    const hourMilisecs = 3_600_000;
    const currentMilisecs = this.valueOf();
    return new Date(currentMilisecs + hourMilisecs * hours);
  },
});
