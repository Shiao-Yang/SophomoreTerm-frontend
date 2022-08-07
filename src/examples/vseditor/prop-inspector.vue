<script>
import PropCheckInputVue from './prop-check-input.vue'
import PropGridInputVue from './prop-grid-input.vue'
import PropNumberInputVue from './prop-number-input.vue'
import PropRadioInputVue from './prop-radio-input.vue'
const PropInputImpl = {
  grid: PropGridInputVue,
  radio: PropRadioInputVue,
  number: PropNumberInputVue,
  checkbox: PropCheckInputVue,
}
export default {
  props: ['controlled'],
  data() {
    return {
      inputs: [
        { type: 'number', name: 'x', cn_name: 'x'  },
        { type: 'number', name: 'y', cn_name: 'y'  },
        { type: 'number', name: 'width', cn_name: '宽度' },
        { type: 'number', name: 'height', cn_name: '高度' },
        { type: 'number', name: 'rotation', cn_name: '旋转' },
        { type: 'number', name: 'minWidth', cn_name: '最小宽度' },
        { type: 'number', name: 'minHeight', cn_name: '最小高度' },
        { type: 'grid', name: 'grid', cn_name: '移动尺寸' },
        {
          type: 'radio',
          name: 'axis',
          cn_name: '移动方式',
          options: [{ label: 'y', value: 'y' }, { label: 'x', value: 'x' }, { label: 'xy', value: 'xy' }],
        },
        { type: 'checkbox', name: 'fixedRatio', cn_name: '移动方式' },
        { type: 'checkbox', name: 'draggable', cn_name: '是否可拖动' },
        { type: 'checkbox', name: 'resizable', cn_name: '是否可缩放' },
        { type: 'checkbox', name: 'rotatable', cn_name: '是否可旋转' },
        { type: 'checkbox', name: 'active', cn_name: '是否选中' },
        { type: 'checkbox', name: 'parent', cn_name: '是否为父容器' },
      ],
      extraInputs: [{ type: 'text', name: 'value' }, { type: 'text', name: 'label' }],
    }
  },
  methods: {
    customChange(e, item) {
      this.$emit('change', {
        ...item,
        value: e,
      })
    },
    extraChange(e, item) {
      this.$emit('change', {
        ...item,
        value: e.target.value,
        checked: e.target.checked,
        extra: true,
      })
    },
  },
  render() {
    return (
      <div class="vs-inspector">
        <div style="margin:20px auto">属性设置</div>
        {this.inputs.map((item) => {
          let DyInput = PropInputImpl[item.type]
          return (
            <div class="input-item" key={item.name}>
              <label class="input-label">{item.cn_name}</label>
              <DyInput
                options={item.options}
                value={this.controlled[item.name]}
                onInput={(e) => this.customChange(e, item)}
              />
            </div>
          )
        })}

        <div>附加属性</div>
        {this.controlled &&
          this.controlled.extra &&
          this.extraInputs
            .filter((item) => item.name in this.controlled.extra)
            .map((item) => {
              return (
                <div class="input-item" key={item.name}>
                  <label class="input-label">{item.name}</label>
                  <input
                    onInput={(e) => this.extraChange(e, item)}
                    class="input-value"
                    type={item.type}
                    checked={this.controlled.extra[item.name]}
                    value={this.controlled.extra[item.name]}
                  />
                </div>
              )
            })}
      </div>
    )
  },
}
</script>

<style lang="less">
.vs-inspector {
  width: 240px;
  border-left: 1px solid #ececec;
  background: #f8f8f8;
  padding: 15px;
  overflow-y: auto;
  right: 0;
  .input-item {
    margin-bottom: 12px;
    display: flex;
  }
  .input-label {
    display: inline-block;
    width: 100px;
    color: #555;
  }
  .input-value:not([type='checkbox']) {
    height: 24px;
    padding: 0;
    border-radius: 0;
    border: 1px solid #d3d3d3;
    padding-left: 10px;
    flex: 1;
    width: 0;
  }
}
</style>
