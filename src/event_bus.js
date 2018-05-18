import Vue from 'vue'
export const EventBus = new Vue()

export const EventTypes = {
  refreshData: 'refreshData',
  body: {
    click: 'body:click'
  },
  customerUser: {
    edit: 'customerUser:edit'
  },
  shipment: {
    edit: 'shipment:edit'
  },
  modal: {
    message: {
      show: 'modal:show:message'
    }
  },
  mixPanel: {
    menuItemClicked: 'menuItem:clicked',
    shipmentStatusUpdated: 'shipmentStatus:updated'
  },
  flashMessage: {
    show: 'flashMessage:show'
  },
  tableConfig: {
    change: 'tableConfig:change'
  }
}

export default EventBus
