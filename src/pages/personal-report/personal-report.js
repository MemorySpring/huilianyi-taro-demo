import * as echarts from '../../components/ec-canvas/echarts';
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Picker} from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import bannerIcon from '../../images/report/@2xOval 9 Copy 3.png'
import arrowLeft from '../../images/report/arrow-left.png'
import arrowRight from '../../images/report/arrow-right.png'

import '../../styles/report/report.scss'

function initChart(canvas, width, height) {
  console.log(canvas);
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  const option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data:['报销金额'],
      backgroundColor: '#1E3255'
    },
    xAxis: {
      data: ["6月","7月","8月","9月","10月","11月"]
    },
    series: [{
      name: '报销金额',
      type: 'bar',
      data: [960, 880, 1500, 920, 2200, 20],
      itemStyle: {
        // 普通样式。
        normal: {
          // 点的颜色。
          color: '#1E78C8',
          colorAlpha: 0.5
        },
        // 高亮样式。
        emphasis: {
          // 高亮时点的颜色。
          color: 'blue'
        }
      },

    }]
  };

  chart.setOption(option);
  return chart
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
        onInit: initChart
      },
      currentCode: '',
      amount: 0,
      date: '2018-11'
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

  handleViewDetail = () => {

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
  }

  render () {
    const {tabListData, currentCode, amount, date} = this.state;
    return (
      <View className='personal-report'>
        <View className='tips-banner'>
          <View  className={'pull-left'}>
            <Image
            style={{width: 20+'px',height: 20+'px'}}
            src={bannerIcon}
            />
            你还有&nbsp;<Text style={{fontWeight: 600}}>{currentCode}{amount}</Text>&nbsp;没有报销哦
          </View>
          <View className='pull-right'>
            <a onClick={this.handleViewDetail}>查看</a>
          </View>
        </View>
        <View className='search-input'>
          <Image
            style={{width: 40+'rpx',height: 40+'rpx',float: "left"}}
            src={arrowLeft}
            onClick={this.handlePrevDate}
          />
          <Picker mode="date" fields='month' value={date} onChange={this.onDateChange} className='picker'>
            <Input type='text' value={date}/>
          </Picker>
          <Image
            style={{width: 40+'rpx',height: 40+'rpx',float: "right"}}
            src={arrowRight}
            onClick={this.handleNextDate}
          />
        </View>
        <View className="bar-chart">
          <ec-canvas id='mychart-dom-area' canvas-id='mychart-area' ec={this.state.ec} />
        </View>
        <View>

        </View>
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
