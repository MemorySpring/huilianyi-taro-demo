import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard, AtTag } from 'taro-ui'
import moment from "moment/moment";

const config = {
  baseUrl: 'https://uat.huilianyi.com'
};
export default class MyAccount extends Component {
  config = {
    navigationBarTitleText: '我的账本'
  };
  constructor(){
    super();
    this.state = {
      data: []
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
        url: `${config.baseUrl}/api/invoices/init/all/by?page=0&size=20`,
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



  render () {
    const {data} = this.state;
    return (
      <View className='test' style={{backgroundColor:"#d6e4ef"}}>
        {data.map((item,index) => {
          return(
            <View>
                {!index || moment(item.createdDate).format('YYYY-MM-DD')!== moment(data[index-1].createdDate).format('YYYY-MM-DD')
                  ?
                  <View style={{backgroundColor:"#d6e4ef",fontSize:0.8+'rem',color:"888888",paddingLeft:10+'px',height:32+'px',lineHeight:32+'px'}}>
                    {moment(item.createdDate).format('YYYY-MM-DD')}
                  </View>
                    :
                    ""}
              <AtCard
                key={index}
                note={item.comment}
                extra={`${item.currencyCode} ${item.expenseAmount}`}
                title={item.expenseTypeName}
                thumb={item.expenseTypeIconURL}
                isFull
              >
                {
                  item.invoiceLabels && item.invoiceLabels.length
                  ?
                  item.invoiceLabels.map((label,index) => {
                    return(
                      <AtTag size='small'  key={index} circle active>{label.name}</AtTag>
                    )
                  })
                  :
                    ""
                }
              </AtCard>
            </View>
          )
        })}
       </View>
    )
  }
}
