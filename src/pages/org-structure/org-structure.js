import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar, AtList, AtListItem  } from 'taro-ui'
import config from '../../../src/config/dev'

import floderPNG from '../../images/mine/orgStructure/floder.png'
import avatarPNG from '../../images/mine/orgStructure/avatar-common.png'


export default class OrgStructure extends Component {
  config = {
    navigationBarTitleText: '个人信息'
  };
  constructor(){
    super();
    this.state = {
      data:[],
      current: 2,
      tabListData:[
        { title: '首页', iconType: 'home'},
        { title: '报销单', iconType: 'bullet-list' },
        { title: '我的', iconType: 'user' }
      ]
    }
  }

  componentWillMount() {
    this.getList();
  }

  getList = () => {
    let token;
    self = this;
    Taro.getStorage({ key: 'hly.token' }).then(res => {
      token = res.data;
      Taro.request({
        url: `${config.baseUrl}/api/department/tenant/all`,
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(token).access_token
        },
        success: function (res) {
          let parentList = [];
          res.data.map((item) => {
            if(item.parentDepartmentOID === null){
              parentList.push(item);
            }
          });
          self.setState({
            data: parentList
          });
        }
      });
    });
  };

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
    const {tabListData, data} = this.state;
    return (
      <View className='org-structure'>
        <AtList>
          {
            data.map((item) => {
              return(
                <AtListItem
                  title={item.name}
                  thumb={item.hasChildrenDepartments ? floderPNG : avatarPNG}
                />
              )
            })
          }
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
