import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import '../styles/login.scss'
import LogoPNG from '../images/logo.png'
import UserPNG from '../images/user.png'
import PasswordPNG from '../images/password.png'

export default class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  };

  constructor(){
    super();
    this.state = {
      username: "",
      password: ""
    }
  }
  formSubmit = e => {
    console.log(e);
    // let username = e.target.value.username;
    // let password = e.target.value.password;
    let username = "13323454321";
    let password = "hly123";
    if(username === "13323454321" && password === "hly123"){
      Taro.redirectTo({
        url: '/pages/main'
      });
      // wx.navigateBack({
      //   url: '/pages/main'
      // })
    }
  };


  goToPage = (page, e) => {
    console.log(page);
  };

  render () {
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
          </View>
        </View>
      </View>
    )
  }
}
