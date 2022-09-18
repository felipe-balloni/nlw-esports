export const convertHoursStringToMinutes = (time: string) => {
  const [hour, minutes] = time.split(':').map(Number);
  return (hour * 60) + minutes;
};