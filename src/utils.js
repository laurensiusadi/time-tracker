const dateDiffToString = (a, b) => {
  let diff = Math.abs(a - b)

  const ms = diff % 1000
  diff = (diff - ms) / 1000
  const s = diff % 60
  diff = (diff - s) / 60
  const m = diff % 60
  diff = (diff - m) / 60
  const h = diff

  const ss = s <= 9 && s >= 0 ? `0${s}` : s
  const mm = m <= 9 && m >= 0 ? `0${m}` : m
  const hh = h <= 9 && h >= 0 ? `0${h}` : h

  return hh + ':' + mm + ':' + ss
}

export {
  dateDiffToString
}
