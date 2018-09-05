import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'


export default class Mine extends Component {
  config = {
    navigationBarTitleText: '我的账本'
  };
  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  componentWillUnmount() {
    this.getList();
  }

  getList = () => {

  }

  render () {
    const {} = this.state;
    return (
      <View className='index'>
我是列表页
      </View>
    )
  }
}
