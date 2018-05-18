class Parameters {
  constructor () {
    this.converter = {
      toArray (value) {
        return value instanceof Array ? value : String(value).split(',')
      }
    }
  }
  filter (params, rules) {
    const filters = {}
    rules.map((entry) => {
      if (entry.key in params) {
        filters[entry.key] = entry['convert'] ? entry['convert'](params[entry.key]) : params[entry.key]
      }
    })
    return filters
  }
}

export default Parameters
