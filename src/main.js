import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from './store'
// 引入normalize.css重置浏览器默认样式
import 'normalize.css/normalize.css'
// 引入mock模拟数据
import '@/mocks'

// 引入cookie插件权限控制
import Cookies from 'js-cookie'

import {
  Container,
  Aside,
  Header,
  Main,
  Menu, 
  Submenu,
  MenuItem, 
  MenuItemGroup,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  DatePicker,
  Message,
  MessageBox,
  Pagination


} from 'element-ui'


Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Pagination);



Vue.config.productionTip = false

// 消息提示挂载到Vue原型上，方便使用
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$cookie = Cookies



new Vue({
  router,
  store,
  render: h => h(App),
  // 解决刷新页面白屏，因为没在登陆入口调动态添加路由的方法
  created() {
    store.commit('tab/ADD_MENU',router)
  }
}).$mount('#app')
