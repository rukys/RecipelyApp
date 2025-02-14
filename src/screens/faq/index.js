import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import tw from '../../../tailwind';
import {Gap, Header} from '../../components';
import {themeStore} from '../../stores';

export default function FaqScreen({navigation}) {
  const isDarkMode = themeStore(state => state.isDarkMode);
  return (
    <ScrollView
      style={tw.style('flex-1', isDarkMode ? 'bg-black' : 'bg-white')}>
      <Header
        title="FAQ"
        isWhite={isDarkMode}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={tw.style('flex-1 mx-4')}>
        <Gap height={8} />
        <Text
          style={tw.style(
            'font-sofiaBold text-base ',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          Yang sering di tanyakan
        </Text>
        <Gap height={8} />
        <Text
          style={tw.style(
            'font-sofiaBold text-base ',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          Fitur :{' '}
        </Text>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Resep dari Seluruh Dunia: Jelajahi koleksi resep kami yang luas,
            dari masakan tradisional Indonesia hingga hidangan internasional
            yang populer.
          </Text>
        </View>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Kategori Masakan: Temukan resep berdasarkan kategori seperti
            sarapan, makan siang, makan malam, pencuci mulut, dan banyak lagi.
          </Text>
        </View>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Komposisi dan Langkah-langkah: Setiap resep dilengkapi dengan daftar
            bahan dan langkah-langkah memasak yang jelas dan mudah diikuti.
          </Text>
        </View>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Pencarian Cepat: Gunakan fitur pencarian untuk menemukan resep
            berdasarkan nama hidangan atau bahan yang Anda miliki.
          </Text>
        </View>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Favoritkan Resep: Simpan resep favorit Anda untuk akses mudah di
            kemudian hari.
          </Text>
        </View>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Notifikasi Harian: Dapatkan notifikasi harian dengan rekomendasi
            resep baru yang menarik.
          </Text>
        </View>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Mode Offline: Simpan resep untuk diakses tanpa koneksi internet.
          </Text>
        </View>
        <Gap height={8} />
        <Text
          style={tw.style(
            'font-sofiaBold text-base',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          Mengapa Recipely?{' '}
        </Text>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Mudah Digunakan: Antarmuka pengguna yang sederhana dan intuitif
            memastikan pengalaman memasak yang menyenangkan bagi semua pengguna,
            baik pemula maupun ahli.
          </Text>
        </View>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Inspirasi Setiap Hari: Dengan notifikasi harian dan rekomendasi
            resep, Anda tidak akan pernah kehabisan ide untuk memasak.
          </Text>
        </View>
        <View style={tw.style('flex-row')}>
          <Text>*</Text>
          <Gap width={8} />
          <Text
            style={tw.style(
              'flex-1 font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            Belajar Memasak: Pelajari teknik memasak baru dan tingkatkan
            keterampilan Anda dengan panduan langkah demi langkah yang detail.
          </Text>
        </View>
        <Gap height={24} />
      </View>
    </ScrollView>
  );
}
