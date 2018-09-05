import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtToast } from 'taro-ui'

import '../styles/login.scss'
import LogoPNG from '../images/logo.png'
import UserPNG from '../images/user.png'
import PasswordPNG from '../images/password.png'

const config = {
  baseUrl: 'https://uat.huilianyi.com'
};
const INIT_STATE= {
  image: '',
  icon: '',
  text: '',
  status: '',
  duration: 3000,
  hasMask: false,
  isOpened: false
};
export default class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  };

  constructor(){
    super();
    this.state = {
      username: "",
      password: "aaa",
      image: '',
      icon: '',
      text: '',
      status: '',
      duration: 3000,
      hasMask: false,
      isOpened: false
    }
  }

  handleShowToast = (text, icon, image, hasMask, status) => {
    const state = Object.assign(
      { ...INIT_STATE, isOpened: true },
      { text, icon, image, hasMask, status }
    );
    this.setState(state);
  };

  formSubmit = e => {
    console.log(e);
    // // let username = e.target.value.username;
    // // let password = e.target.value.password;
    let username = "13323454321";
    let password = "hly123";
    let loginType = "authorizationCode";
    let self = this;
    Taro.request({
      url: `${config.baseUrl}/operationservice/public/isWhitelist?login=${username}`,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        let data = {
          scope: 'read write',
          grant_type: 'password',
          username: username,
          password: password
        };
        Taro.request({
          url: encodeURI(`${config.baseUrl}/oauth/token`),
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic QXJ0ZW1pc1dlYjpuTENud2RJaGl6V2J5a0h5dVpNNlRwUURkN0t3SzlJWERLOExHc2E3U09X'
          },
          data: data,
          success: function () {
            Taro.redirectTo({
              url: '/pages/main'
            });
          },
          fail: function (res) {
            self.handleShowToast(
             res.data.message,
              '',
              '',
              false,
              '');
          }
        })
      },
      fail: function (res) {
        self.handleShowToast(
          res.data.message,
          '',
          '',
          false,
          '');
      }
    })
  };


  goToPage = (page, e) => {
    console.log(page);
  };

  render () {
    const {
      text,
      icon,
      status,
      isOpened,
      duration,
      image,
      hasMask
    } = this.state;
    return (
      <View className='page'>
        <View className='login'>
          <View className='login-hd'>
            <Image className='login-logo' src={LogoPNG} />
          </View>
          <View className='login-bd'>
            <Form onSubmit={this.formSubmit}>
              <View className='login-input'>
                <Image className='login-iconfont' src={UserPNG} />
                <Input
                  name='username'
                  className='helios-input-lg'
                  type='text'
                  placeholder='邮箱/ 手机号'//用户名
                />
              </View>
              <View className='login-input'>
                <Image className='login-iconfont' src={PasswordPNG} />
                <Input
                  name='password'
                  className='helios-input-lg'
                  type='password'
                  placeholder='请输入用户密码'  //密码
                  onPressEnter={this.formSubmit}
                />
              </View>
              <View className='login-operate'>
                <Text className='pull-left' onClick={this.goToPage.bind(this,"FINDPASSWORD")}>找回密码</Text>
                <Text className='pull-right'>激活账号</Text>
              </View>
              <Button
                name='loginBtn'
                className='helios-btn-dft'
                formType='submit'
                type='primary'>登录</Button>
            </Form>
            <AtToast
              icon={icon}
              text={text}
              image={image}
              status={status}
              hasMask={hasMask}
              isOpened={isOpened}
              duration={duration}
            />
          </View>
        </View>
      </View>
    )
  }
}
