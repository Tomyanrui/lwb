/**
 * 公共条组件
 */
Component({
  options: {
    styleIsolation: 'apply-shared',
  },
  externalClasses: ['item-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    // 左边标题
    title: {
      type: String, //类型
      value: '左边内容' //默认值
    },
    // input框类型
    inputType: {
      type: String, //类型
      value: 'text' //默认值
    },
    // 右边内容
    content: {
      type: String, //类型
      value: '' //默认值
    },
    // 输入框的placeholder
    inputPlacehodler: {
      type: String, //类型
      value: '请输入XXX' //默认值
    },
    // 输入框的最大输入长度
    maxlength: {
      type: String, //类型
      value: '140' //默认值
    },
    // 输入框的placeholder
    contentEmptyText: {
      type: String, //类型
      value: '' //默认值
    },
    // 跳转的url
    url: {
      type: String, //类型
      value: '' //默认值
    },
    // 是否显示箭头
    isShowArrow: {
      type: Boolean, //类型
      value: false //默认值
    },
    // 是否显示输入框
    isShowInput: {
      type: Boolean, //类型
      value: false //默认值
    },
    // 是否绑定手机
    isShowCode: {
      type: Boolean, //类型
      value: false //默认值
    },
    // 是否显示发送验证码
    isShowSend: {
      type: Boolean, //类型
      value: false //默认值
    },
    // 在isContentWithArrow的模式下,箭头颜色跟背景一样,看不见
    isArrowHidden: {
      type: Boolean, //类型
      value: false //默认值
    },
    // 是否有底边
    hasBorder: {
      type: Boolean, //类型
      value: false //默认值
    },
    // 是否文字带着箭头
    isContentWithArrow: {
      type: Boolean, //类型
      value: false //默认值
    },
  },

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelectItem: function() {
      this.triggerEvent('onSelectItem', {
        title: this.properties.title
      })
    },
    onInput: function(e) {
      this.triggerEvent('onInput', {
        value: e.detail.value,
        title: this.properties.title
      })
    },
    onBlur: function(e) {
      this.triggerEvent('onBlur', {
        value: e.detail.value,
        title: this.properties.title
      })
    }
  }
})