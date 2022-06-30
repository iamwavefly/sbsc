export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US')
}

export const greeting = () => {
  const today = new Date()
  const curHr = today.getHours()
  if (curHr < 12) {
    return 'Morning'
  } else if (curHr < 17) {
    return 'Afternoon'
  } else {
    return 'Evening'
  }
}
