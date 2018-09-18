import Taro, { Component, Config } from '@tarojs/taro'
import { View , Navigator} from '@tarojs/components'
import { AtTabBar, AtList, AtListItem  } from 'taro-ui'

export default class PersonalReport extends Component {
  config = {
    navigationBarTitleText: '个人报表'
  };
  constructor(){
    super();
    this.state = {
      current: 1,
      tabListData:[
        { title: '个人报表', iconType: 'home'},
        { title: '部门报表', iconType: 'bullet-list' },
        { title: '成本中心', iconType: 'user' }
      ],
    }
  }

  handleChangeTab = index => {
    console.log(index);
    if(index === this.state.current){
      return false;
    }else{
      if(index === 0){
        Taro.redirectTo({
          url: '/pages/personal-report/personal-report'
        });
      }
      if(index === 1){
        Taro.redirectTo({
          url: '/pages/dep-report/dep-report'
        });
      }
      if(index === 2){
        Taro.redirectTo({
          url: '/pages/cost-center/cost-center'
        });
      }
    }
  };




  render () {
    const {tabListData} = this.state;
    return (
      <View className='report'>
        我是部门报表
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
