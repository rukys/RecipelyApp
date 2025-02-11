import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import Gap from '../gap';

const HeaderHome = ({data, isDarkMode}) => {
  const [greeting, setGreeting] = useState('');
  const [iconName, setIconName] = useState('sun');

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting('Selamat Pagi');
        setIconName('cloud-sun');
      } else if (hour >= 12 && hour < 15) {
        setGreeting('Selamat Siang');
        setIconName('sun');
      } else if (hour >= 15 && hour < 18) {
        setGreeting('Selamat Sore');
        setIconName('cloud-moon');
      } else {
        setGreeting('Selamat Malam');
        setIconName('moon');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update tiap menit

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={tw.style(
        'flex-row mx-4 h-14',
        isDarkMode ? 'bg-black' : 'bg-white',
      )}>
      <View style={tw.style('flex-1')}>
        <View style={tw.style('flex-row')}>
          <FontAwesomeIcon
            name={iconName}
            size={20}
            color={tw.color(isDarkMode ? 'white' : 'primary')}
          />
          <Gap width={8} />
          <Text
            style={tw.style(
              'font-sofia',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            {greeting}
          </Text>
        </View>
        <Text
          style={tw.style(
            'font-sofiaBold text-xl',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          {data?.fullName}
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.center} onPress={onNavigateNotif}>
          <IconNotif />
        </TouchableOpacity> */}
    </View>
  );
};

export default HeaderHome;
