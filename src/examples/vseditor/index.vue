<script>
import ComponentsVue from '@/examples/vseditor/components.vue'
import EditorViewVue from '@/examples/vseditor/editor-view.vue'
import {
  EVENT_APPLICATION_CLEAR,
  EVENT_APPLICATION_REDO,
  EVENT_APPLICATION_UNDO,
  EVENT_COMPONENT_ADD,
  EVENT_COMPONENT_DELETE,
  EVENT_COMPONENT_DUPLICATE,
  EVENT_COMPONENT_SELECT,
  EVENT_COMPONENT_TRANSFORM,
  EVENT_COMPONENT_UNSELECT,
  EVENT_CONTENT_CHANGETOIMAGE,
  EVENT_APPLICATION_SAVE,
  EVENT_APPLICATION_ESC,
  EVENT_APPLICATION_EXPORT,
} from '@/examples/vseditor/event-enums'
import FooterVue from '@/examples/vseditor/footer.vue'
import HeaderVue from '@/examples/vseditor/header.vue'
import {
  batchUpdateIn,
  deepCopyComponent,
  findComponent,
  findComponentPathById,
  generateId,
  updateTreeIn,
} from '@/examples/utils'
import PropInspectorVue from '@/examples/vseditor/prop-inspector.vue'
import PluginSelectionVue from '@/examples/vseditor/plugins/plugin-selection.vue'
import PluginGridVue from '@/examples/vseditor/plugins/plugin-grid.vue'
import { registerKeyboardAction } from '@/examples/vseditor/plugins/keyboard'
import html2canvas from "html2canvas";
import {saveAs} from 'file-saver'
import $ from 'jquery'
import qs from "qs";
let historys = [[]]
let historyPointer = 0
export default {
  name: 'app',
  data() {
    return {
      controls: [],
      currentId: '',
      currentPath: [],
      controlled: {},
      width: 800,
      height: 500,
      /*url: 'http://43.138.26.134/api/media/documents/prototype_model_1.json'*/
    }
  },
  methods: {
    setSize(width, height) {
      /*
      var container = document.getElementsByClassName('container')[0];
      container.style.height = width + 'px';
      container.style.width = height + 'px';

       */
      $(".container").css({width: width + 'px',height: height + 'px'})
      console.log(this.controls);
    },
    getComponents(components, parentId) {
      return components.map((item) => ({
        type: item.type,
        children: item.type === 'container' ? [] : void 0,
        id: generateId(),
        transform: {
          x: item.x - (item.x % 10),
          y: item.y - (item.y % 10),
          width: item.width,
          height: item.height,
          rotation: 0,
        },
        minHeight: 10,
        minWidth: 10,
        rotatable: true,
        resizable: true,
        draggable: true,
        fixedRatio: false,
        zoom: 1,
        active: false,
        parent: true,
        parentId,
        resizeHandler: ['tl', 'tm', 'tr', 'r', 'br', 'bm', 'l', 'bl'],
        extra: item,
        grid: [1, 1],
        axis: 'xy',
      }))
    },
    /**
     * @description 批量添加组件到编辑区域，如果指定了parentid则将添加到指定的组件中。目前parentid对应的组件只能为Container类型的组件
     * @params {{components:Array,parentId:string?}}
     */
    addControl({components, parentId}) {
      let controls = []
      let newComponents = this.getComponents(components, parentId)
      if (parentId) {
        const {path} = findComponentPathById(this.controls, parentId)
        controls = updateTreeIn(this.controls, path, (item) => {
          item.children = item.children.concat(newComponents)
          return item
        })
      } else {
        controls = this.controls.concat(newComponents)
      }

      this.setControls(controls)

      // 默认选中最后一个
      let {component} = findComponentPathById(controls, newComponents[newComponents.length - 1].id)

      // 默认选中最后一个
      this.handleSelect(component)

      //console.log(this.$store)


      //console.log(this.controls)
      //sessionStorage.setItem('controls',this.controls);
      //console.log(sessionStorage.getItem('controls'));
    },
    /**
     * @description 根据变更id的数据进行批量更新
     * @param {{[id :string]:{key:string;value:any}}} changes
     */
    batchUpdateControlValue(changes) {
      let controls = batchUpdateIn(this.controls, Object.keys(changes), (item) => {
        item[changes[item.id].key] = changes[item.id].value
        return item
      })
      this.setControls(controls)
    },
    /**
     * @description 指定id列表批量删除组件
     * @param {string[]} 要删除的组件id集合
     */
    batchDeleteControls(deleteIds) {
      let controls = batchUpdateIn(this.controls, deleteIds, () => false)
      this.setControls(controls)
    },
    /**
     * @description 更新选中组件指定的key
     * @param {String} key 组件中的字段
     * @param {any} value  新的值
     * @param {Boolean} isExtra 是否为附加参数，对应组件的extra字段。
     */
    updateControlValue(key, value, isExtra) {
      let controls = updateTreeIn(this.controls, this.currentPath, (item) => {
        if (['x', 'y', 'width', 'height', 'rotation'].includes(key)) {
          let transform = {...item.transform}
          transform[key] = value
          item.transform = transform
          return item
        } else if (isExtra) {
          let extra = {...item.extra}
          extra[key] = value
          item.extra = extra
        } else {
          item[key] = value
        }
        return item
      })
      this.setControls(controls)
    },
    // 组件拖拽时将新的transform同步到属性编辑器中，并在end事件中进行一次数据同步
    handleTransform({transform, type}) {
      this.controlled = {...this.controlled, ...transform}
      if (['resizeend', 'dragend', 'rotateend'].includes(type)) {
        this.updateControlValue('transform', transform, false)
      }
    },
    /**
     * @description 变更当前选中组件的状态
     * @param {Boolean} status
     */
    updateControlStatus(status) {
      let controls = updateTreeIn(this.controls, this.currentPath, (item) => {
        item.active = status
        return item
      })
      this.setControls(controls)
    },
    //  组件选中，右侧展示属性编辑器
    handleSelect(control) {
      this.setCurrentControl(control)
      this.updateControlStatus(true)
    },
    setCurrentControl(control) {
      // 无组件选中时，直接清除属性编辑器
      if (!control || !control.id) {
        this.clearCurrentComponent()
        return
      }

      // 将已选中的取消选中
      if (control && this.currentId) {
        let controls = updateTreeIn(this.controls, this.currentPath, (item) => {
          item.active = false
          return item
        })
        // 不加入历史记录
        this.setControls(controls, false)
      }

      // 深度拷贝数据，避免数据引用污染
      control = JSON.parse(JSON.stringify(control))
      Object.assign(control, control.transform, {active: true})
      //  将选中组件设置到当前属性编辑器中
      let {path} = findComponentPathById(this.controls, control.id)
      this.currentPath = path
      this.controlled = control
      this.currentId = control.id
    },
    // 属性编辑器变化后同步到组件中
    handleChange({name, value, extra}) {
      if (!this.currentId) {
        return
      }
      if (extra) {
        this.controlled.extra[name] = value
      } else {
        this.controlled[name] = value
      }
      // 注意节流优化提升性能
      this.updateControlValue(name, value, extra)
    },
    getActiveComponent(ctls) {
      return findComponent(ctls, (item) => item.active)
    },
    setControls(controls, needRecordHistory = true) {
      this.controls = controls

      if (needRecordHistory) {
        historys = historys.slice(0, historyPointer + 1)
        historys.push(this.controls)
        historyPointer = historys.length - 1
      }

      this.$store.state.controls = this.controls;
      this.$store.state.his = historys;
      this.$store.state.hisPnt = historyPointer;
    },
    /**
     * @description 清空选中状态
     */
    clearCurrentComponent() {
      this.controlled = {}
      this.currentId = ''
      this.currentPath = []
    },
    initFromHistory(bounce) {
      historyPointer += bounce
      let controls = historys[historyPointer]
      this.controls = controls
    },
    // Actions
    handleUndo() {
      if (historyPointer == 0) return
      this.clearCurrentComponent()
      this.initFromHistory(-1)
      this.setCurrentControl(this.getActiveComponent(this.controls))
    },
    /**
     * @description 删除当前选中的组件
     */
    deleteComponent() {
      if (!this.currentId) {
        return
      }
      let controls = updateTreeIn(this.controls, this.currentPath, () => false)
      this.setControls(controls)
      this.clearCurrentComponent()
    },
    duplicateComponent() {
      if (!this.currentId) {
        return
      }

      let pathes = this.currentPath.slice()
      let selectedIndex = pathes.pop()

      let controls = []
      let component = null
      const newComponent = (item) => {
        // 深度拷贝，粗暴！！
        let copyOfSelected = deepCopyComponent(item)
        let t = copyOfSelected.transform
        copyOfSelected.transform = {
          x: t.x,
          y: t.y + t.height,
          width: t.width,
          height: t.height,
          rotation: t.rotation,
        }
        component = copyOfSelected
        return copyOfSelected
      }
      if (pathes.length > 0) {
        controls = updateTreeIn(this.controls, pathes, (item) => {
          let children = item.children.slice()
          let copyOfSelected = newComponent(children[selectedIndex])
          children.splice(selectedIndex + 1, 0, copyOfSelected)
          item.children = children
          return item
        })
      } else {
        controls = this.controls.slice()
        controls.splice(selectedIndex + 1, 0, newComponent(this.controls[selectedIndex]))
      }
      this.setControls(controls)
      this.setCurrentControl(component)
    },
    handleClear() {
      this.setControls([])
      this.clearCurrentComponent()
    },

    handleRedo() {
      if (historyPointer === historys.length - 1) return
      this.initFromHistory(1)
      this.clearCurrentComponent()
      this.setCurrentControl(this.getActiveComponent(this.controls))
    },
    handleUnselect() {
      if (!this.currentId) return
      this.updateControlStatus(false)
      this.clearCurrentComponent()
    },
    getEditorView() {
      return this.$refs.editor
    },
    saveView() {
      this.$store.state.controls = this.controls;
    },
    jump() {
      this.$router.push('/userInfo');
    },
    openDialog() {
      this.dialogFormVisible = true;
      console.log(this.dialogFormVisible);
    },

    saveImg(){
      this.setCurrentControl(this.getActiveComponent(this.controls))
      // 手动创建一个 canvas 标签
      const canvas = document.createElement("canvas")
      // 获取父标签，意思是这个标签内的 DOM 元素生成图片
      // imageTofile是给截图范围内的父级元素自定义的ref名称
      let canvasBox = this.$refs.imageTofile
      // 获取父级的宽高
      const width = parseInt(window.getComputedStyle(canvasBox).width)
      const height = parseInt(window.getComputedStyle(canvasBox).height)
      // 宽高 * 2 并放大 2 倍 是为了防止图片模糊
      canvas.width = width * 3
      canvas.height = height * 3
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      const context = canvas.getContext("2d");
      context.scale(2.4, 2.4);
      const options = {
        backgroundColor: null,
        canvas: canvas,
        useCORS: true
      }
      html2canvas(canvasBox, options).then((canvas) => {
        // toDataURL 图片格式转成 base64
        //let fileName = prompt("请输入导出的图片名\n(默认.png，支持.jpg, .jpeg及.png)", "例:aaa(默认输出aaa.png)")
        //let reg = [/.png$/, /.jpg$/, /.jpeg$/]
        let dataURL = String
        dataURL = canvas.toDataURL("image/png")
        let params = {
          img : JSON.stringify(dataURL),
          picid: this.$route.query.pic_id
        }
        this.$axios({
          method: 'post',
          url: this.$store.state.base + "design/upload_prototype/",
          data: qs.stringify(params)
        }).then(res => {
          console.log("新建图片成功")
          console.log(res.data);
          //location.reload();
          // this.$message({
          //   message: '保存成功',
          //   type: "success",
          //   showClose: true,
          // })
        }).catch(err => {
          console.log(err)
        })
      })

    },

    toImage() {
      this.setCurrentControl(this.getActiveComponent(this.controls))
      // 手动创建一个 canvas 标签
      const canvas = document.createElement("canvas")
      // 获取父标签，意思是这个标签内的 DOM 元素生成图片
      // imageTofile是给截图范围内的父级元素自定义的ref名称
      let canvasBox = this.$refs.imageTofile
      // 获取父级的宽高
      const width = parseInt(window.getComputedStyle(canvasBox).width)
      const height = parseInt(window.getComputedStyle(canvasBox).height)
      // 宽高 * 2 并放大 2 倍 是为了防止图片模糊
      canvas.width = width * 3
      canvas.height = height * 3
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      const context = canvas.getContext("2d");
      context.scale(2.4, 2.4);
      const options = {
        backgroundColor: null,
        canvas: canvas,
        useCORS: true
      }
      html2canvas(canvasBox, options).then((canvas) => {
        // toDataURL 图片格式转成 base64
        let fileName = prompt("请输入导出的图片名\n(默认.png，支持.jpg, .jpeg及.png)", "例:aaa(默认输出aaa.png)")
        let reg = [/.png$/, /.jpg$/, /.jpeg$/]
        let dataURL = String
        if (reg[2].test(fileName)) {
          dataURL = canvas.toDataURL("image/jpeg")
        } else if (reg[1].test(fileName)) {
          dataURL = canvas.toDataURL("image/jpg")
        } else {
          dataURL = canvas.toDataURL("image/png")
        }
        console.log(fileName)
        fileName.replace(/.png$/, "")
        fileName.replace(/.jpeg$/, "")
        fileName.replace(/.jpg$/, "")
        this.downloadImage(dataURL, fileName)
      })
    },
    downloadImage(url, fileName) {
      // 如果是在网页中可以直接创建一个 a 标签直接下载
      let a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
    },
    handleSave() {
      this.setCurrentControl(this.getActiveComponent(this.controls))
      let str = JSON.stringify(this.controls);
      console.log(str);
      let blob = new Blob([str]);
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("picid", JSON.stringify(this.$store.state.pic_id));
      for (var value of formData.values()) {
        console.log(value);
        console.log(typeof value);
      }

      this.$axios({
        method: 'post',
        url: this.$store.state.base + "design/store/",
        data: formData
      }).then(res => {
        console.log(res.data);
        //location.reload();
        this.$message({
          message: '保存成功',
          type: "success",
          showClose: true,
        })
      }).catch(err => {
        console.log(err)
      })

      this.saveImg();
    },
    get_Pic(pic_id) {
      let params = {
        picid: pic_id,
      }
      console.log(params);
      this.$axios({
        method: 'post',
        url: this.$store.state.base + "design/get_one_design/",
        data: qs.stringify(params)
      }).then(res => {
        let ans = res.data[0];
        console.log(ans);

        console.log(this.$store.state.base + ans.url);
        this.$axios.post(this.$store.state.base + ans.url)
            .then( res => {
              console.log(1)
              console.log(res.data);
              if(res.data === "")
                this.controls = [];
              else
                this.controls = res.data;
            })

        this.width = ans.width;
        this.height = ans.height;
        console.log(this.width, this.height);
        this.setSize(this.width, this.height);
        console.log(this.controls);
      }).catch(err => {
        console.log(err)
      })
    },
    Escape() {
      this.$router.push('/designList')
      location.reload()
    },
    Export() {
      console.log(JSON.stringify(this.controls));
    },

    /*
    getFile(picid) {
      let params = {
        picid : picid,
      }

      this.axios({
        method: 'post',
        url: this.$store.state.base + 'design/get_one_design/'
      })

      this.axios({

      })
      this.$axios.get(url)
        .then( res => {
          console.log(1)
          console.log(res.data);
          this.controls = res.data;
        })
    }

     */
  },

  mounted() {
    console.log('mounted',this.width, this.height);
    this.setSize(this.width, this.height);
  },

  created() {
    // 使用独立的事件对象来处理，避免多层透传回调函数

    this.eventbus.$on(EVENT_COMPONENT_ADD, this.addControl)
    this.eventbus.$on(EVENT_COMPONENT_SELECT, this.handleSelect)
    this.eventbus.$on(EVENT_COMPONENT_TRANSFORM, this.handleTransform)
    this.eventbus.$on(EVENT_COMPONENT_UNSELECT, this.handleUnselect)
    this.eventbus.$on(EVENT_COMPONENT_DUPLICATE, this.duplicateComponent)
    this.eventbus.$on(EVENT_COMPONENT_DELETE, this.deleteComponent)
    this.eventbus.$on(EVENT_APPLICATION_REDO, this.handleRedo)
    this.eventbus.$on(EVENT_APPLICATION_UNDO, this.handleUndo)
    this.eventbus.$on(EVENT_APPLICATION_CLEAR, this.handleClear)
    this.eventbus.$on(EVENT_CONTENT_CHANGETOIMAGE, this.toImage)

    this.eventbus.$on(EVENT_APPLICATION_SAVE, this.handleSave)
    this.eventbus.$on(EVENT_APPLICATION_ESC, this.Escape)
    this.eventbus.$on(EVENT_APPLICATION_EXPORT, this.Export)
    // 绑定键盘按钮事件
    registerKeyboardAction(this)

    console.log("调用created");
    this.get_Pic(this.$route.query.pic_id);
    console.log(this.controls);
    console.log("调用完毕");

    /*
    console.log("调用getFile");
    this.getFile(this.url);
    console.log(this.controls);
    console.log("调用完毕");

     */


  },
  render() {
    return (
      <div class="vs-editor-app">
        <HeaderVue />
        <div class="content">
          <ComponentsVue />
          <div class="temp">
            <div class="container" ref="imageTofile">
              <EditorViewVue ref="editor" value={this.controls}>
                <PluginSelectionVue application={this}/>
              </EditorViewVue>
            </div>
          </div>
          <PropInspectorVue onChange={this.handleChange} controlled={this.controlled} />
        </div>
        <FooterVue />
      </div>
    )
  },
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}

.block {

}

.temp{
  background-color: #d0cdcd;
  flex: 1;
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background-color: #fcfcfc;
    overflow: hidden;

  }
}

.vs-editor-app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    display: flex;
    flex: 1;
    height: 0;
    /*background-color: #ffffff;

     */
    .vs-editor {
      flex: 1;
      position: relative;
      width: 100%;
      overflow: hidden;
      height: 100%;
    }
  }
  .component-impl,

  .match-parent {
    width: 100%;
    height: 100%;
    display: block;
  }


  .input-has-label {
    display: flex;
    align-items: center;
    input {
      margin-right: 6px;
    }
  }
  // 自定义class样式
  .yoyoo-ddr.ddr-dragging {
    &.active {
      border: 1px solid blue;
      border-radius: 2px;
    }
    .resize-handler-wrapper,
    .rotate-handler {
      display: none;
    }
  }
  .yoyoo-ddr.ddr-ready-dragging {
    &.active {
      border: 1px solid #ff0000;
    }
    .resize-handler-wrapper,
    .rotate-handler {
      display: none;
    }
  }
}
</style>
