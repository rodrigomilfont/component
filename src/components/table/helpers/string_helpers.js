const stringHelpers = {
  capitalizeFirst (string) {
    return string.replace(/^./, $0 => $0.toUpperCase())
  }
}

export default stringHelpers
