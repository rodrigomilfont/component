import applicationHelper from '@/helpers/application_helper'

function Filters (Vue) {
  Vue.filter('datetime', function (timestamp, pattern) {
    const datetime = applicationHelper.dateTimeOnTimezone(timestamp)

    return datetime.format(pattern)
  })
}

export default Filters
