import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button,Swiper, SwiperItem } from '@tarojs/components'
import '../styles/main.scss'

import BanPNG from '../../images/banner.png'
import BanPNG2 from '../../images/banner2.png'

import CarPNG from '../../images/menu/car.png'
import HandPNG from '../../images/menu/hand.png'
import HotelPNG from '../../images/menu/hotel.png'
import TrainPNG from '../../images/menu/train.png'
import MorePNG from '../../images/menu/more.png'

import OrderPNG from '../../images/application/order.png'
import OnlinePNG from '../../images/application/online.png'
import InvoicePNG from '../../images/application/Invoice.png'
import PayApplyPNG from '../../images/application/pay-apply.png'

if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

export default class Index extends Component {
  config = {
    navigationBarTitleText: '个人信息'
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
          value: '我的订单'
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
      ]
    }
  }

  handleClick = (value, index) => {
    console.log(value, index)
  };

  render () {
    const {expenseData, applicationData} = this.state;
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
                  <View className='panel-content__item' key={index} onClick={this.handleClick.bind(this,index)}>
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
                  <View className='panel-content__item' key={index} onClick={this.handleClick.bind(this,index)}>
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
      </View>
    )
  }
}
