import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import tw from '../../../tailwind';
import {CardArticle, Gap, Header} from '../../components';
import useNewArticle from '../../hooks/use-newarticle';

export default function ArticleScreen({navigation}) {
  const {resultNewArticle} = useNewArticle();

  return (
    <>
      <StatusBar
        backgroundColor={tw.color('white')}
        barStyle={'dark-content'}
      />
      <View style={tw.style('flex-1 bg-white')}>
        <Header onPressBack={() => navigation.goBack()} title="Artikel" />
        <Gap height={8} />
        <ScrollView>
          <View style={tw.style('mx-4')}>
            {resultNewArticle.map((item, index) => {
              return (
                <CardArticle title={item.title} img={item.thumb} key={index} />
              );
            })}
          </View>
          <Gap height={24} />
        </ScrollView>
      </View>
    </>
  );
}
