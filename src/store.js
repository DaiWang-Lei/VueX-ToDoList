import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 输入框的内容
    inputValue: 'aaa',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    // 为store中的input赋值
    setInputChange (state, val) {
      state.inputValue = val
    },
    // 添加列表项目
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.inputValue = ''
      state.nextId++
    },
    // 根据Id删除对应的Item事项
    removeItem (state, id) {
      // 根据id查询对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus (state, parma) {
      // 查找索引
      const i = state.list.findIndex(x => x.id === parma.id)
      if (i !== -1) {
        state.list[i].done = parma.status
      }
      console.log(state.list[i].done)
    },
    // 清除已经完成的任务
    clearDone (state) {
      // filter 过滤掉不符合条件的，只留下符合条件的
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey (state, key) {
      state.viewKey = key
      console.log(state.viewKey)
    }
  },
  actions: {
    getList (context) {
      axios.get('list.json').then(({ data: res }) => {
        console.log(res)
        context.commit('initList', res)
      })
    }
  },
  getters: {
    // 统计未完成任务的条数
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  }
})
