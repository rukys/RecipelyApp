import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils';
import useNewArticle from '../../hooks/use-newarticle';
import {CardArticle, Gap, Header} from '../../components';

export default function ArticleScreen({navigation}) {
  const {resultNewArticle} = useNewArticle();

  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.page}>
        <Header onPressBack={() => navigation.goBack()} title="Artikel" />
        <Gap height={8} />
        <ScrollView>
          <View style={styles.content}>
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    marginHorizontal: 16,
  },
});
