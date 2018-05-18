import moment from 'moment-timezone'
import { UI } from '../constants/ui'

const dateHelpers = {
  now () {
    return this.dateTimeOnTimezone()
  },
  toUTC (datetime) {
    return this.dateTimeOnTimezone(datetime, 0)
  },
  dateTimeFormat (datetime) {
    if (!datetime) return '-'
    // TODO: I18n this format
    return this.dateTimeOnTimezone(datetime).format('DD/MM/YYYY HH:mm')
  },
  timeFormat (datetime) {
    if (!datetime) return '-'
    return this.dateTimeOnTimezone(datetime).format('HH:mm')
  },
  isTomorrow (datetime) {
    const scheduledDay = this.dateTimeOnTimezone(datetime)
    const tomorrow = this.now().add(1, 'day')

    return scheduledDay.isSame(tomorrow, 'day')
  },
  isToday (datetime) {
    const scheduledDay = this.dateTimeOnTimezone(datetime)
    const today = this.now()

    return scheduledDay.isSame(today, 'day')
  },
  isYesterday (datetime) {
    const scheduledDay = this.dateTimeOnTimezone(datetime)
    const yesterday = this.now().subtract(1, 'days').startOf('day')

    return scheduledDay.isSame(yesterday, 'day')
  },
  isBeforeYesterday (datetime) {
    const scheduledDay = this.dateTimeOnTimezone(datetime)
    const yesterday = this.now().subtract(1, 'days').startOf('day')

    return scheduledDay.isBefore(yesterday, 'day')
  },
  isAfterTomorrow (datetime) {
    const scheduledDay = this.dateTimeOnTimezone(datetime)
    const tomorrow = this.now().add(1, 'day')

    return scheduledDay.isAfter(tomorrow, 'day')
  },
  isOverdue (datetime) {
    const scheduled = this.dateTimeOnTimezone(datetime)
    const now = this.now()

    return now.isAfter(scheduled)
  },
  isFuture (datetime) {
    const scheduled = this.dateTimeOnTimezone(datetime)
    const now = this.now()

    return scheduled.isAfter(now)
  },
  dateTimeOnTimezone (datetime, zone = UI.DEFAULT_TIMEZONE_OFFSET) {
    if (Number.isInteger(datetime)) {
      // Assumes date is an epoch timestamp
      datetime = moment.unix(datetime)
    }

    const date = moment.tz(datetime, 'UTC')

    return zone ? date.tz(zone) : date
  }
}

export default dateHelpers
