import {Text, TouchableOpacity} from 'react-native';

export default function BtnLogin({
  LableBtn,
  bgColor,
  textColor,
  onPress = () => {},
  ...props
}) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: bgColor,
          borderRadius: 100,
          alignItems: 'center',
          width: 350,
          paddingVertical: 5,
          marginVertical: 10,
        }}
        {...props}>
        <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>
          {LableBtn}
        </Text>
      </TouchableOpacity>
    </>
  );
}
