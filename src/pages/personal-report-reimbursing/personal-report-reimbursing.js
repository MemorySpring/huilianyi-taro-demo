import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane  } from 'taro-ui'
import config from '../../../src/config/dev'

import '../../styles/report/report.scss'

export default class Reimbursing extends Component {
  config = {
    navigationBarTitleText: '未报销金额',
    navigationBarBackgroundColor: '#ffffff'
  };
  constructor(){
    super();
    this.state = {
      current: 0,
      unSubmitTotalAmount: 0
    }
  }

  componentWillMount () {
    console.log(this.$router.params);// 输出 { id: 2, type: 'test' }
    this.setState({
      unSubmitTotalAmount: this.$router.params.unSubmitTotalAmount
    });
    this.getExpenseList();
  }

  getExpenseList = () => {
    let token;
    self = this;
    Taro.getStorage({ key: 'hly.token' }).then(res => {
      token = res.data;
      Taro.request({
        url: `${config.baseUrl}/api/personal/expense/init`,
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(token).access_token
        },
        success: function (res) {
          self.setState({
            data: res.data
          });
        }
      });
    });
  };
  handleClick (stateName, value) {
    this.setState({
      current: value
    });
  }

  render () {
    const {current, unSubmitTotalAmount} = this.state;
    console.log(this.$router.params);
    return (
      <View className='reimbursing'>
        <View className='reimbursing-banner'>
          <Text>{Number(unSubmitTotalAmount).toFixed(2)}</Text>
        </View>
        <AtTabs
          current={current}
          tabList={[
            { title: '费用' },
            { title: '单据' }
            ]}
          onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0}>
            <View className='reimbursing-content'>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className='reimbursing-content'>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
