import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../utils';
import {Gap, Header} from '../../components';
import {useNavigation} from '@react-navigation/native';

export default function FaqScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.page}>
      <Header
        title="FAQ"
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <Gap height={8} />
        <Text style={styles.textTitle}>Yang sering di tanyakan</Text>
        <Gap height={8} />
        <Text style={styles.textTitle}>Fitur : </Text>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Resep dari Seluruh Dunia: Jelajahi koleksi resep kami yang luas,
            dari masakan tradisional Indonesia hingga hidangan internasional
            yang populer.
          </Text>
        </View>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Kategori Masakan: Temukan resep berdasarkan kategori seperti
            sarapan, makan siang, makan malam, pencuci mulut, dan banyak lagi.
          </Text>
        </View>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Komposisi dan Langkah-langkah: Setiap resep dilengkapi dengan daftar
            bahan dan langkah-langkah memasak yang jelas dan mudah diikuti.
          </Text>
        </View>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Pencarian Cepat: Gunakan fitur pencarian untuk menemukan resep
            berdasarkan nama hidangan atau bahan yang Anda miliki.
          </Text>
        </View>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Favoritkan Resep: Simpan resep favorit Anda untuk akses mudah di
            kemudian hari.
          </Text>
        </View>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Notifikasi Harian: Dapatkan notifikasi harian dengan rekomendasi
            resep baru yang menarik.
          </Text>
        </View>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Mode Offline: Simpan resep untuk diakses tanpa koneksi internet.
          </Text>
        </View>
        <Gap height={8} />
        <Text style={styles.textTitle}>Mengapa Recipely? </Text>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Mudah Digunakan: Antarmuka pengguna yang sederhana dan intuitif
            memastikan pengalaman memasak yang menyenangkan bagi semua pengguna,
            baik pemula maupun ahli.
          </Text>
        </View>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Inspirasi Setiap Hari: Dengan notifikasi harian dan rekomendasi
            resep, Anda tidak akan pernah kehabisan ide untuk memasak.
          </Text>
        </View>
        <View style={styles.row}>
          <Text>*</Text>
          <Gap width={8} />
          <Text style={[styles.flex, styles.textDesc]}>
            Belajar Memasak: Pelajari teknik memasak baru dan tingkatkan
            keterampilan Anda dengan panduan langkah demi langkah yang detail.
          </Text>
        </View>
        <Gap height={24} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
  },
  textDesc: {
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
    fontSize: 14,
  },
  textTitle: {
    fontFamily: fonts.SofiaProBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});
