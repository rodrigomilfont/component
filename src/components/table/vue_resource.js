import VueResource from 'vue-resource'
import { keys, inRange, includes } from 'lodash'

import apiConfig from '@/api_config'
import applicationHelper from '@/helpers/application_helper'
import store from '@/store/store'
import { EventBus } from '@/event_bus'

export default function (Vue) {
  Vue.use(VueResource)

  Vue.http.interceptors.push((request, next) => {
    if (request.url.match(apiConfig.apiUrl)) {
      Vue.http.options.crossOrigin = true
      Vue.http.options.xhr = { withCredentials: true }

      const AUTHORIZATION_TYPE = 'Bearer'

      request.headers.set('Authorization', `${AUTHORIZATION_TYPE} ${applicationHelper.readCookie('cargox-api-token')}`)
    }

    next((response) => {
      if (response.status === 503) {
        EventBus.$emit('service_unavailable')
        return
      }

      if (!inRange(response.status, 400, 499)) { return }

      const hasInvalidToken = includes([
        'token_not_provided',
        'token_expired',
        'token_invalid',
        'user_not_found'
      ], keys(response.body.error)[0])

      if (hasInvalidToken) {
        store.dispatch('currentUser/unset')
      }
    })
  })
}
