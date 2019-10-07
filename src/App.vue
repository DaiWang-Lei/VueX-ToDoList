<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange"></a-input>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStatusChange(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除连接 -->
        <a slot="actions" @click="RemoveItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' :'default'" @click="changeList('all')">全部</a-button>
          <a-button
            :type="viewKey === 'undone' ? 'primary' :'default'"
            @click="changeList('undone')"
          >未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' :'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清楚已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['getList']),
    ...mapMutations([
      'setInputChange',
      'addItem',
      'removeItem',
      'changeStatus',
      'clearDone',
      'changeViewKey'
    ]),
    // 监听输入框变化
    handleInputChange(e) {
      console.log(e.target.value)
      this.setInputChange(e.target.value)
    },
    // 向列表中新增item项
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('请输入任务！')
      }
      this.addItem()
    },
    // 根据id删除对应的事项
    RemoveItemById(id) {
      this.removeItem(id)
    },
    // 监听复选框的变化事件
    cbStatusChange(e, id) {
      console.log(e)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.changeStatus(param)
    },
    // 清除已经完成的任务
    clear() {
      this.clearDone()
    },

    changeList(key) {
      this.changeViewKey(key)

    }
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength','infolist'])
  }
}
</script>

<style scoped>
#app {
  padding: 0;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
