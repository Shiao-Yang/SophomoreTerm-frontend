<script>
import Logo from '@/assets/logo.png'
export default {
  data() {
    return {
      components: [
        {
          type: 'label',
          value: 'Hi~我是一段文本',
          name: '标签',
          width: 150,
          height: 30,
        },
        {
          type: 'input',
          value: '输入',
          inputType: 'input',
          name: '输入',
          width: 150,
          height: 30,
        },
        {
          type: 'select',
          options: [],
          name: '选项',
          width: 150,
          height: 30,
        },
        {
          type: 'img',
          name: '图片',
          url: Logo,
          width: 100,
          height: 100,
        },
        {
          type: 'input',
          inputType: 'checkbox',
          name: '复选框',
          label: '多选',
          width: 100,
          height: 30,
        },
        {
          type: 'input',
          inputType: 'radio',
          name: '单选框',
          label: '单选',
          width: 100,
          height: 30,
        },
        {
          type: 'input',
          inputType: 'button',
          name: '按钮',
          value: 'Button',
          width: 100,
          height: 30,
        },
        {
          type: 'input',
          inputType: 'date',
          name: '日期',
          value: '2021-10-10',
          width: 100,
          height: 30,
        },
        {
          type: 'container',
          name: '容器',
          width: 200,
          height: 200,
          children: [],
        },
        {
          type: 'search',
          name: '搜索',
          width: 100,
          height: 100,
        },
        {
          type: 'cart',
          name: '购物车',
          width: 100,
          height: 100,
        },
        {
          type: 'message',
          name: '消息',
          width: 50,
          height: 50,
        },
        {
          type: 'user',
          name: '用户',
          width: 50,
          height: 50,
        },
        {
          type: 'shopping',
          name: '逛店',
          width: 50,
          height: 50,
        },
        {
          type: 'newProduct',
          name: '新品',
          width: 50,
          height: 50,
        },
        {
          type: 'home',
          name: '首页',
          width: 50,
          height: 50,
        },
        {
          type: 'attention',
          name: '关注',
          width: 50,
          height: 50,
        },
        {
          type: 'friend',
          name: '朋友',
          width: 50,
          height: 50,
        },
        {
          type: 'live',
          name: '直播',
          width: 50,
          height: 50,
        },
        {
          type: 'hot',
          name: '热点',
          width: 50,
          height: 50,
        },
        {
          type: 'commend',
          name: '推荐',
          width: 50,
          height: 50,
        },
        {
          type: 'safety',
          name: '安全',
          width: 50,
          height: 50,
        },
        {
          type: 'sports',
          name: '体育',
          width: 50,
          height: 50,
        },
        {
          type: 'game',
          name: '游戏',
          width: 50,
          height: 50,
        },
        {
          type: 'mail',
          name: '私信' ,
          width: 50,
          height: 50,
        },
        {
          type: 'notice',
          name: '通知' ,
          width: 50,
          height: 50,
        },
        {
          type: 'history',
          name: '历史' ,
          width: 50,
          height: 50,
        },
        {
          type: 'collect',
          name: '收藏' ,
          width: 50,
          height: 50,
        },
        {
          type: 'upload',
          name: '上传' ,
          width: 50,
          height: 50,
        },
        {
          type: 'like',
          name: '点赞',
          width: 50,
          height: 50,
        },
      ],
    }
  },
  methods: {
    handleDrag(e, item) {
      e.dataTransfer.dropEffect = 'copy'
      e.dataTransfer.setData('text/component', JSON.stringify(item))
    },
  },
  render() {
    return (
      <div class="vs-components">
        {this.components.map((item, index) => {
          return (
            <div ondragstart={(e) => this.handleDrag(e, item)} draggable="true" class="components-item" key={index}>
              <img class="components-icon" src={require('@/assets/' + (item.inputType || item.type) + '.png')}/>
              {item.name}
            </div>
          )
        })}
      </div>
    )
  },
}
</script>

<style lang="less" scoped>
.vs-components {
  width: 100px;
  border-right: 1px solid #ececec;
  position: relative;
  left: 0;
  overflow-y: scroll;
  background: #f8f8f8;
  &::-webkit-scrollbar {
    display: none;
  }
  .components-icon {
    width: 35px;
    height: 35px;
    margin-bottom: 6px;
  }
}
.components-item {
  height: 100px;
  width: 100%;
  float: left;
  display: flex;
  &:nth-child(2n + 1) {
    border-right: 1px solid #ececec;
  }
  border-bottom: 1px solid #ececec;
  align-items: center;
  justify-content: center;
  cursor: move;
  flex-direction: column;
  font-weight: 300;
  &:hover {
    background: #dbdcde;
  }
}
</style>
