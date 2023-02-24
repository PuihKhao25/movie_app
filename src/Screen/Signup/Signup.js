import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import BtnLogin from '../../Components/BtnLogin';
import Field from '../../Constants/Field';
import {AuthContext} from '../../Constants/AuthContext';
// import Spinner from 'react-native-loading-spinner-overlay';

const Signup = ({navigation}) => {
  const [ho_ten, setHo_ten] = useState('');
  const [email, setEmail] = useState('');
  const [so_dt, setSo_dt] = useState('');
  const [mat_khau, setMat_khau] = useState('');
  const {isLoading, Register} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      {/* <Spinner visible={isLoading} /> */}
      <View style={styles.containerLogo}>
        <View style={styles.backgroundLogo}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/logomovie.png')}
          />
        </View>
        <View style={styles.titleRegisterNumber}>
          <Text
            style={{
              fontSize: 30,
              color: '#fff',
              fontWeight: 'bold',
              marginBottom: 50,
            }}>
            Đăng Ký Thành Viên
          </Text>
          <Field
            placeholder="Nhập Họ Tên"
            keyboardType="ho_ten"
            value={ho_ten}
            onChangeText={text => setHo_ten(text)}
          />
          <Field
            placeholder="Nhập Email"
            keyboardType="email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Field
            placeholder="Nhập Số Điện Thoại"
            keyboardType={'so_dt'}
            value={so_dt}
            onChangeText={text => setSo_dt(text)}
          />
          <Field
            placeholder="Mật Khẩu "
            secureTextEntry={true}
            keyboardType={'mat_khau'}
            value={mat_khau}
            onChangeText={text => setMat_khau(text)}
          />
          <View style={{marginTop: 20}}>
            <BtnLogin
              LableBtn={'Đăng Ký'}
              bgColor="#f47326"
              onPress={() => {
                Register(ho_ten, email, so_dt, mat_khau, setHo_ten);
              }}
            />
            <View style={styles.haveAccount}>
              <Text style={styles.titleAccount}>Bạn đã có tài khoản ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.titleLogin}>Quay lại đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#041b2d',
    marginTop:30
  },
  containerLogo: {
    alignItems: 'center',
    width: 400,
  },
  backgroundLogo: {
    alignItems: 'center',
    width: 405,
  },
  imageLogo: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
  titleRegisterNumber: {
    backgroundColor: '#041b2d',
    height: 700,
    width: 405,
    borderTopLeftRadius: 130,
    paddingTop: 50,
    alignItems: 'center',
  },
  haveAccount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleAccount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleLogin: {
    color: '#f47326',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Signup;
