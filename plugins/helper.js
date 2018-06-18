let helper = {}

helper.convertTimetoInt = date => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return parseInt(hours) * 60 + parseInt(minutes)
}

export default helper
