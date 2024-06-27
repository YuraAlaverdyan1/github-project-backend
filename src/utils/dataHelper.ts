export const getSixMonthsAgoDateTime = () => {
    const currentDate = new Date();
    const sixMonthsAgoDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    return sixMonthsAgoDate.toISOString(); // Return the date in ISO 8601 format
};