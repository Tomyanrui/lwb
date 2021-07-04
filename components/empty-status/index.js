/**
 * @description 空态组件，用view包裹，默认100%父级高
 * @param {String}  
 */
Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    mode: {
      type: String,
      value: 'widthFix'
    },
    height: {
      type: String,
      value: '100%'
    },
    imgSrc: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    info: {
      type: String,
      value: ''
    },
    btnText: {
      type: String,
      value: ''
    },
    btnRouter: {
      type: String,
      value: ''
    },
    isFromAddrList: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onBtnClick(e) {
      // let type = e.currentTarget.dataset.type
      this.triggerEvent('onBtnClick', {
        // data: this.data.item,
        // type
      })
    },
  }
})
