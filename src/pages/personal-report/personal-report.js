import * as echarts from '../../components/ec-canvas/echarts';
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Picker} from '@tarojs/components'
import { AtTabBar, AtIcon } from 'taro-ui'
import bannerIcon from '../../images/report/@2xOval 9 Copy 3.png'
import arrowLeft from '../../images/report/arrow-left.png'
import arrowRight from '../../images/report/arrow-right.png'
import config from '../../../src/config/dev'

import '../../styles/report/report.scss'

const xaxisLabel = [];
const xaxisValue = [];
if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}
function setOption(chart) {
  const option = {
    // title: {
    //   text: 'ECharts 入门示例'
    // },
    tooltip: {},
    backgroundColor: '#1E3255',
    grid:{
      top: 10,
      right:0,
      left:0,
      bottom:0
    },
    xAxis: {
      data: xaxisLabel,
      axisLine:{
        show: false
      },
      axisLabel:{
        // backgroundColor: '#EBEDEF'
      }
    },
    yAxis: {
      show: false
    },
    series: [{
      name: '报销金额',
      type: 'bar',
      data: xaxisValue,
      label:{
        show: true,
        position:'insideTop',
        color: '#ffffff',
        fontSize: 12
      },
      barMinHeight: 30,
      itemStyle: {
        normal: {
          // 点的颜色。
          color: function(param){
            if(param.dataIndex !== 5)
              return '#1e558e';
            return new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: 'rgba(30, 120, 200, 1)'},
                {offset: 0.5, color: 'rgba(30, 120, 200, 0.9)'},
                {offset: 1, color: 'rgba(30, 120, 200, 0.5)'}
              ]
          )}
        }
      }

    }]
  };
  chart.setOption(option);
}
export default class PersonalReport extends Component {
  config = {
    navigationBarTitleText: '个人',
    navigationBarBackgroundColor: '#1E3255',
    navigationBarTextStyle: '#ffffff',
    // 定义需要引入的第三方组件
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  };
  constructor(){
    super();
    this.state = {
      current: 0,
      tabListData:[
        { title: '个人报表', iconType: 'home'},
        { title: '部门报表', iconType: 'bullet-list' },
        { title: '成本中心', iconType: 'user' }
      ],
      ec: {
        // 将 lazyLoad 设为 true 后，需要手动初始化图表
        lazyLoad: true
      },
      currentCode: '',
      totalAmount: 0,//已报销金额
      unSubmitTotalAmount: 0,//未报销金额
      payingTotalAmount: 0,//已报销未付款金额
      paidTotalAmount: 0,//已报销已付款金额
      date: '2018-11'
    }
  }

  componentWillMount() {
    this.getExpense();
  }

  getExpense = () => {
    let token;
    self = this;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    Taro.getStorage({ key: 'hly.token' }).then(res => {
      token = res.data;
      Taro.request({
        url: `${config.baseUrl}/api/personal/expense/report/overview?year=${year}&month=${month}`,
        header: {
          'Authorization': 'Bearer ' + JSON.parse(token).access_token
        },
        success: function (res) {
          for(let i =0; i < 6 ;i++){
           xaxisLabel.push(res.data.amountList[i+6].month + "月");
           xaxisValue.push(res.data.amountList[i+6].totalAmount);
          }
          self.setState({
            currentCode: res.data.baseCurrencyCode,
            totalAmount: res.data.totalAmount,
            unSubmitTotalAmount: res.data.unSubmitTotalAmount,
            paidTotalAmount: res.data.paidTotalAmount.totalAmount,
            payingTotalAmount: res.data.payingTotalAmount.totalAmount
          });
          self.init();
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

  handleUnReimburse = () => {

  };

  handleReimbursed = () => {

  };
  onDateChange = (e) => {
    this.setState({
      date: e.detail.value
    })
  };

  handlePrevDate = (e) => {
    this.setState({
      date: e.detail.value
    })
  };

  handleNextDate = (e) => {
    this.setState({
      date: e.detail.value
    })
  };

  init = () => {
    this.refs.mychar.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  }

  render () {
    const {tabListData, currentCode, totalAmount, unSubmitTotalAmount, payingTotalAmount, paidTotalAmount, date} = this.state;
    return (
      <View className='personal-report'>
        <View className='personal-report-top'>
          <View className='tips-banner'>
            <View  className={'pull-left'}>
              <Image
                style={{width: 20+'px',height: 20+'px'}}
                src={bannerIcon}
              />
              你还有&nbsp;<Text style={{fontWeight: 600}}>{currentCode}{unSubmitTotalAmount}</Text>&nbsp;没有报销哦
            </View>
            <View className='pull-right'>
              <a onClick={this.handleUnReimburse}>查看</a>
            </View>
          </View>
          <View className='search-input'>
            <View className='at-row at-row--wrap'>
              <View className='at-col at-col-1'>
                <Image
                  style={{width: 40+'rpx',height: 40+'rpx'}}
                  src={arrowLeft}
                  onClick={this.handlePrevDate}
                />
              </View>
              <View className='at-col at-col-10'>
                <Picker mode="date" fields='month' value={date} onChange={this.onDateChange} className='picker'>
                  <Input type='text' value={date}/>
                </Picker>
              </View>
              <View className='at-col at-col-1'>
                <Image
                  style={{width: 40+'rpx',height: 40+'rpx'}}
                  src={arrowRight}
                  onClick={this.handleNextDate}
                />
              </View>
            </View>



          </View>
          <View className={'at-row at-row--wrap report-details'}>
            <View  className={'at-col at-col-11'}>
              <View className='at-row at-row--wrap'>
                <View className='at-col at-col-12'>
                  <Text>本月已报销金额</Text>
                  <Text style={{fontSize: 1.2+'rem'}}>{totalAmount}</Text>
                  <Text style={{marginLeft: 10+'px',fontSize: 1+'rem',display: "inline"}}>{currentCode}</Text>
                </View>
              </View>
              <View className='at-row at-row--wrap'>
                <View className='at-col at-col-6'>
                  <Text>已付款</Text>
                  <Text>{paidTotalAmount}</Text>
                </View>
                <View className='at-col at-col-6'>
                  <Text>未付款</Text>
                  <Text style={{color: "#FA6478"}}>{payingTotalAmount}</Text>
                </View>
              </View>
            </View>
            <View className='at-col at-col-1' style={{position: "relative"}}>
              <a onClick={this.handleReimbursed}>
                <AtIcon value='chevron-right' size='12' color='#FFFFFF' />
              </a>
            </View>
          </View>
          <View className="bar-chart">
            <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec={this.state.ec} ref="mychar"/>
          </View>
        </View>
        {xaxisLabel.length && <View className="bar-chart-xaxis-label">
          <View className='at-row at-row--wrap'>
            {xaxisLabel.map((item,index) => (
              <View className='at-col at-col-2' key={index}>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
        </View>}
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
