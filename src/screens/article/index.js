import React from 'react';
import {ScrollView, View} from 'react-native';
import tw from '../../../tailwind';
import {CardArticle, Gap, Header} from '../../components';
import useNewArticle from '../../hooks/use-newarticle';
import {themeStore} from '../../stores';

export default function ArticleScreen({navigation}) {
  const {resultNewArticle} = useNewArticle();

  const isDarkMode = themeStore(state => state.isDarkMode);

  return (
    <View style={tw.style('flex-1', isDarkMode ? 'bg-black' : 'bg-white')}>
      <Header
        onPressBack={() => navigation.goBack()}
        title="Artikel"
        isWhite={isDarkMode}
      />
      <Gap height={8} />
      <ScrollView>
        <View style={tw.style('mx-4')}>
          {resultNewArticle.map((item, index) => {
            return (
              <CardArticle
                title={item.title}
                img={item.thumb}
                key={index}
                isDarkMode={isDarkMode}
              />
            );
          })}
        </View>
        <Gap height={24} />
      </ScrollView>
    </View>
  );
}
