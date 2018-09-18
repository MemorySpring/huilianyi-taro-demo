import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Login from './pages/login.js'
import './styles/app.scss'
import configStore from './store'

const store = configStore();

class App extends Component {

  config = {
    pages: [
      'pages/login',
      'pages/main',
      'pages/expense/expense',
      'pages/mine/mine',
      'pages/org-structure/org-structure',
      'pages/my-account/my-account',
      'pages/personal-report/personal-report',
      'pages/dep-report/dep-report',
      'pages/cost-center/cost-center'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'));
