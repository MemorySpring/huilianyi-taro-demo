import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button,Swiper, SwiperItem } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import '../styles/main.scss'
import BanPNG from '../images/banner.png'
import BanPNG2 from '../images/banner2.png'

import CarPNG from '../images/menu/car.png'
import HandPNG from '../images/menu/hand.png'
import HotelPNG from '../images/menu/hotel.png'
import TrainPNG from '../images/menu/train.png'
import MorePNG from '../images/menu/more.png'

import OrderPNG from '../images/application/order.png'
import OnlinePNG from '../images/application/online.png'
import InvoicePNG from '../images/application/Invoice.png'
import PayApplyPNG from '../images/application/pay-apply.png'

if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}
export default class Main extends Component {
  config = {
    navigationBarTitleText: '汇联易',
    navigationBarBackgroundColor: '#1464F0',
    navigationBarTextStyle: '#fff'

  };

  constructor(){
    super();
    this.state = {
      expenseData: [
        {
          image: CarPNG,
          value: '打车'
        },
        {
          image: HandPNG,
          value: '扬招'
        },
        {
          image: HotelPNG,
          value: '携程酒店'
        },
        {
          image: TrainPNG,
          value: '同程火车'
        },
        {
          image: MorePNG,
          value: '更多'
        }
      ],
      applicationData: [
        {
          image: OrderPNG,
          value: '我的账本'
        },
        {
          image: OnlinePNG,
          value: '在线客服'
        },
        {
          image: InvoicePNG,
          value: '我的发票'
        },
        {
          image: PayApplyPNG,
          value: '申请'
        }
      ],
      tabListData:[
        { title: '首页', iconType: 'home'},
        { title: '报销单', iconType: 'bullet-list' },
        { title: '我的', iconType: 'user' }
      ],
      current: 0
    }
  }

  handleClick = (value, index) => {
    console.log(value, index)
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
    const {expenseData, applicationData, tabListData} = this.state;
    return (
        <View className='main'>
          <Swiper
            className='swiper-box'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            <SwiperItem>
              <Image className='swiper-item' src={BanPNG} />
            </SwiperItem>
            <SwiperItem>
              <Image className='swiper-item' src={BanPNG2} />
            </SwiperItem>
          </Swiper>
          <View className='panel'>
            <View className='panel__title'>消费</View>
            <View className='panel__content'>
              <View className='at-row at-row--wrap'>
                {expenseData.map((icon, index) => (
                  <View className='at-col at-col-3'>
                    <View className='panel-content__item' key={icon.value} onClick={this.handleClick.bind(this,index)}>
                      <View className='panel-content__icon'>
                        <Image src={icon.image}/>
                      </View>
                      <View className='panel-content__name'>{icon.value}</View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>应用</View>
            <View className='panel__content'>
              <View className='at-row at-row--wrap'>
                {applicationData.map((icon, index) => (
                  <View className='at-col at-col-3'>
                    <View className='panel-content__item' key={icon.value} onClick={this.handleClick.bind(this,index)}>
                      <View className='panel-content__icon'>
                        <Image src={icon.image}/>
                      </View>
                      <View className='panel-content__name'>{icon.value}</View>
                    </View>
                  </View>
                ))}
              </View>
              {/*<AtGrid data={applicationData} onClick={this.handleClick} columnNum={4}/>*/}
            </View>
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
