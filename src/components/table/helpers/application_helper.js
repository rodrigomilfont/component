import jwtDecode from 'jwt-decode'
import _ from 'lodash'
import dateHelpers from '@/helpers/date_helpers'

const utils = {
  readCookie (name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },
  toTitleCase (value) {
    return value.toLowerCase().replace(/(^|\s)./g, ($0, $1) => $1 + $0.toUpperCase())
  },
  getDecodedToken () {
    return jwtDecode(utils.readCookie('cargox-api-token'))
  },
  phoneFormat (value) {
    if (!value) { return '-' }

    if (value.length > PHONE_WITH_DDD_LENGTH) {
      return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '+$1 $2')
        .replace(/(\d{2})(\d{9})$/, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2')
    }

    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
  }
}

const EARTH_RADIUS = 6371000
const PHONE_WITH_DDD_LENGTH = 11

function convertDegreesToRadians (value) {
  return value * Math.PI / 180
}

const locationHelper = {
  calculateDistanceFromLatitudeAndLongitude (southWest, northEast) {
    const latitudeDifferenceInRadians = convertDegreesToRadians(northEast.lat - southWest.lat)
    const longitudeDifferenceInRadians = convertDegreesToRadians(northEast.lon - southWest.lon)
    const value = Math.sin(latitudeDifferenceInRadians / 2) * Math.sin(latitudeDifferenceInRadians / 2) +
      Math.cos(convertDegreesToRadians(southWest.lat)) * Math.cos(convertDegreesToRadians(northEast.lat)) *
      Math.sin(longitudeDifferenceInRadians / 2) * Math.sin(longitudeDifferenceInRadians / 2)
    const multiplier = 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))

    return multiplier * EARTH_RADIUS
  },
  calculateCenter (southWest, northEast) {
    return [(southWest.lat + northEast.lat) / 2, (southWest.lon + northEast.lon) / 2]
  }
}

const applicationHelper = _.extend({}, utils, dateHelpers, locationHelper)

export default applicationHelper
