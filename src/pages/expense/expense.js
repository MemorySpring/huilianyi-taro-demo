import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar, AtTabs, AtTabsPane, AtButton} from 'taro-ui'
import '../../styles/expense/expense.scss'
export default class Expense extends Component {

  config = {
    navigationBarTitleText: '报销单'
  };

  constructor(){
    super();
    this.state = {
      current: 1,
      subcurrent: {
        current1: 0,
        current2: 0,
        current3: 0,
      },
      tabListData:[
        { title: '首页', iconType: 'home'},
        { title: '报销单', iconType: 'bullet-list' },
        { title: '我的', iconType: 'user' }
      ],
      tabsData: [
        { title: '待提交' },
        { title: '审批中' },
        { title: '已审批' }
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

  handleClick (stateName, value) {
    this.state.subcurrent[stateName] = value;
    this.setState();
  }

  render () {
    const {tabListData, tabsData, subcurrent} = this.state;
    return (
      <View className='expense'>
        <AtTabs  current={subcurrent.current1} tabList={tabsData} onClick={this.handleClick.bind(this, 'current1')}>
          <AtTabsPane>
            <View className='tab-content'><AtButton type='primary'>按钮文案1</AtButton></View>
          </AtTabsPane>
          <AtTabsPane>
            <View className='tab-content'>><AtButton type='secondary'>按钮文案2</AtButton></View>
          </AtTabsPane>
          <AtTabsPane>
            <View className='tab-content'>><AtButton>按钮文案3</AtButton></View>
          </AtTabsPane>
        </AtTabs>
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
