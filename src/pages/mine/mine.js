import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

export default class Mine extends Component {
  config = {
    navigationBarTitleText: '个人信息'
  };
  constructor(){
    super();
    this.state = {
      current: 2,
      tabListData:[
        { title: '首页', iconType: 'home'},
        { title: '报销单', iconType: 'bullet-list' },
        { title: '我的', iconType: 'user' }
      ]
    }
  }

  handleChangeTab = index => {
    console.log(index);
    if(index === this.state.current){
      return false;
    }else{
      if(index === 0){
        Taro.redirectTo({
          url: '/pages/main'
        });
      }
      if(index === 1){
        Taro.redirectTo({
          url: '/pages/expense/expense'
        });
      }
      if(index === 2){
        Taro.redirectTo({
          url: '/pages/mine/mine'
        });
      }
    }
  };


  render () {
    const {tabListData} = this.state;
    return (
      <View className='index'>
       个人信息
        <AtTabBar
          fixed
          tabList={tabListData}
          color='#6a6a77'
          selectedColor='#1464F0'
          onClick={this.handleChangeTab}
          current={this.state.current}
        />
      </View>
    )
  }
}
