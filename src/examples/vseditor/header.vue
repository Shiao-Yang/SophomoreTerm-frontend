<script>
import {
  EVENT_APPLICATION_CLEAR,
  EVENT_APPLICATION_REDO,
  EVENT_APPLICATION_UNDO,
  EVENT_COMPONENT_DELETE,
  EVENT_COMPONENT_DUPLICATE,
  EVENT_CONTENT_CHANGETOIMAGE,
  EVENT_APPLICATION_SAVE,
  EVENT_APPLICATION_ESC,
} from './event-enums'
export default {
  methods: {},
  render() {
    return (
      <div class="vs-header">
        <h1>
          <i className='bx bxs-book-reader'></i>
          墨 书
        </h1>
        <div class="header-actions">
          <button
            title="Return to the previous state"
            data-action="undo"
            onClick={() => this.eventbus.$emit(EVENT_APPLICATION_UNDO)}
          >
            撤销
          </button>
          <button
            title="Return to the next state"
            data-action="redo"
            onClick={() => this.eventbus.$emit(EVENT_APPLICATION_REDO)}
          >
            重做
          </button>
          <button
            title="Duplicate selected component"
            data-action="duplicate"
            onClick={() => this.eventbus.$emit(EVENT_COMPONENT_DUPLICATE)}
          >
            复制
          </button>
          <button
            title="Delete selected component"
            data-action="delete"
            onClick={() => this.eventbus.$emit(EVENT_COMPONENT_DELETE)}
          >
            删除
          </button>
          <button
            title="Clear all components in the editing area"
            data-action="clear"
            onClick={() => this.eventbus.$emit(EVENT_APPLICATION_CLEAR)}
          >
            清空
          </button>
          <button
            title="Change this page to image and download"
            data-action="export"
            onClick={() => this.eventbus.$emit(EVENT_CONTENT_CHANGETOIMAGE)}
          >
            导出
          </button>
          <button
              title="Save all components in the editing area"
              data-action="save"
              onClick={() => this.eventbus.$emit(EVENT_APPLICATION_SAVE)}
          >
            保存
          </button>
          <button
              title="Exit this page"
              data-action="exit"
              onClick={() => this.eventbus.$emit(EVENT_APPLICATION_ESC)}
          >
            退出
          </button>
        </div>
      </div>
    )
  },
}
</script>

<style lang="less">
.vs-header {
  height: 50px;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  background: #f8f8f8;
  h1 {
    text-align: center;
    font-size: 20px;
    color: #333;
    font-weight: 600;
    width: 150px;
  }
  .header-actions {
    display: flex;
    align-items: center;
  }
  button {
    padding: 5px 12px;
    font-size: 16px;
    color: #555;
    background: #eee;
    background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
    border: 1px solid #d5d5d5;
    margin-right: 20px;
    border-radius: 4px;
    &:hover {
      background: #ddd;
      cursor: pointer;
      transition: all 300ms;
      background-image: linear-gradient(to bottom, #eee 0, #ddd 100%);
    }
  }
}
</style>
