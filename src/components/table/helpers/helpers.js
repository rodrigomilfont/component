// This is a index file
// You should be able to get all helpers at once importing it

import dateHelpers from './date_helpers'
import stringHelpers from './string_helpers'

export { dateHelpers, stringHelpers }
export default Object.assign({}, dateHelpers, stringHelpers)
