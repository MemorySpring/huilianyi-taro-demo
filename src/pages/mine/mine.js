import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar, AtList, AtListItem  } from 'taro-ui'

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

  handleClick = () => {
    Taro.navigateTo({
      url: '/pages/org-structure/org-structure'
    })
  };

  render () {
    const {tabListData} = this.state;
    return (
      <View className='index'>
        <AtList style={{marginBottom: 20+'px'}}>
          <AtListItem
            title='陈行健'
            note='Web前端'
            extraText='个人信息'
            arrow='right'
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
        </AtList>
        <AtList>
          <AtListItem
            title='订票设置'
            arrow='right'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
          <AtListItem
            title='订单信息'
            arrow='right'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
          <AtListItem
            title='开票信息'
            arrow='right'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
          <AtListItem
            title='账号绑定'
            arrow='right'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
          <AtListItem
            title='组织架构'
            arrow='right'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            onClick={this.handleClick}
          />
        </AtList>
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
