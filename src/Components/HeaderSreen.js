import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default function HeaderSreen({
  title,
  iconLeft = false,
  onIconLeft = () => {},
  style,
}) {
  return (
    <>
      <View style={{backgroundColor: '#151C26', height: 50, marginTop:30}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: '10%'}}>
            {iconLeft && (
              <TouchableOpacity onPress={onIconLeft}>
                <Icon name="chevron-small-left" color={'white'} size={35} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{width: '20%'}}></View>
          <View style={{width: '70%'}}>
            <Text style={{color: 'white', fontSize: 20}}>{title}</Text>
          </View>
        </View>
      </View>
    </>
  );
}
