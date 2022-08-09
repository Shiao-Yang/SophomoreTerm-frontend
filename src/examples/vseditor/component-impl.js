import EditorView from './editor-view'
const Img = {
  props: {
    params: {
      default: () => ({}),
    },
  },
  render() {
    return <img draggable="false" class="match-parent" src={this.params.url} />
  },
}
const Label = {
  props: {
    params: {
      default: () => ({}),
    },
  },
  render() {
    return (
      <div draggable="false" class="match-parent">
        {this.params.value}
      </div>
    )
  },
}

const Container = {
  props: {
    params: {
      default: () => ({}),
    },
    meta: {
      default: () => ({ children: [] }),
    },
  },
  render() {
    return (
      <div style="border:1px solid #d4d4d4" draggable="false" class="match-parent">
        <EditorView parentId={this.meta.id} value={this.meta.children} />
      </div>
    )
  },
}

const Input = {
  props: {
    params: {
      default: () => ({
        value: '',
        type: 'input',
      }),
    },
  },
  render() {
    if (['checkbox', 'radio'].includes(this.params.inputType)) {
      return (
        <label class="match-parent input-has-label">
          <input type={this.params.inputType} value={this.params.value} />
          {this.params.label}
        </label>
      )
    }
    return <input class="match-parent" type={this.params.inputType} value={this.params.value} />
  },
}

const Select = {
  props: {
    params: {
      default: () => ({
        value: '',
        options: [{ label: 'text', value: 'text' }],
      }),
    },
  },
  render() {
    return (
      <select class="match-parent" type={this.params.type} value={this.params.url}>
        {this.params.options.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    )
  },
}

const Rect = {
  render() {
    return <div class="match-parent" class="rect" />
  },
}

const Search = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Cart = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Message = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const User = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Shopping = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Home = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const NewProduct = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Attention = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Live = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Friend = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Commend = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Safety = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Hot = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

const Game = {
  render() {
    return <div class="match-parent" class="rect"/>
  },
}

export default {
  img: Img,
  input: Input,
  select: Select,
  rect: Rect,
  label: Label,
  container: Container,
  search: Search,
  cart: Cart,
  message: Message,
  user: User,
  shopping: Shopping,
  home: Home,
  attention: Attention,
}
