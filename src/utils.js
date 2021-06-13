const secondsToHhMmSs = (s) => {
  return new Date(s * 1000).toISOString().substr(11, 8)
}

const diffToSecond = (a, b) => {
  return Math.abs(a - b) / 1000
}

const dateDiffToString = (a, b) => {
  return secondsToHhMmSs(diffToSecond(a, b))
}

export {
  secondsToHhMmSs,
  diffToSecond,
  dateDiffToString
}
