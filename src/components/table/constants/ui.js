import moment from 'moment-timezone'

export const UI = {
  TYPING_DELAY: 800,
  DEFAULT_TIMEZONE_OFFSET: moment.tz.guess(), // user's system timezone
  PULL_FOR_UPDATES_DELAY_IN_SECONDS: 50
}

export default UI
