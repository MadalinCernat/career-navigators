import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { Palette } from '@/constants/data';
import { useAppState } from '@/constants/store';

export default function Level5RewardScreen() {
  const state = useAppState();
  const [isDownloading, setIsDownloading] = useState(false);
  const username = state.username?.trim() || 'Student';

  const diplomaHtml = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f7fb; color: #102a43; margin: 0; padding: 0; }
          .page { max-width: 800px; margin: 0 auto; padding: 48px; }
          .card { background: #ffffff; border: 8px solid #1b5e82; border-radius: 28px; padding: 48px; text-align: center; }
          .title { font-size: 40px; font-weight: 800; margin-bottom: 16px; }
          .subtitle { font-size: 18px; color: #3c566f; margin-bottom: 28px; }
          .name { font-size: 32px; font-weight: 800; margin: 24px 0; letter-spacing: 0.3px; }
          .detail { font-size: 16px; color: #334e68; margin: 10px 0; }
          .highlight { color: #1b5e82; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="card">
            <div class="title">Diploma de Merit</div>
            <div class="subtitle">Career Navigators — Reward for reaching Level 5</div>
            <div class="detail">Acest premiu este acordat pentru finalizarea traseului de pregătire.</div>
            <div class="name">${username}</div>
            <div class="detail"><span class="highlight">Nivel 5</span> — After the Interview</div>
            <div class="detail">Data: ${new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </body>
    </html>
  `;

  const handleDownloadDiploma = async () => {
    setIsDownloading(true);
    try {
      const { uri } = await Print.printToFileAsync({ html: diplomaHtml });
      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = uri;
        link.download = `diploma-${username.replace(/\s+/g, '-')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Descarcă diploma',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('Diploma', 'PDF salvata la: ' + uri);
      }
    } catch {
      Alert.alert('Eroare', 'Diploma nu a putut fi generată.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>Final Reward</Text>
        <Text style={styles.title}>Ai ajuns la nivelul 5!</Text>
        <Text style={styles.subtitle}>
          Apasă butonul de mai jos pentru a genera diploma ta personalizată, cu username-ul tău.
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>🎓</Text>
          <View>
            <Text style={styles.badgeLabel}>Username</Text>
            <Text style={styles.badgeValue}>{username}</Text>
          </View>
        </View>

        <Pressable
          disabled={isDownloading}
          onPress={handleDownloadDiploma}
          style={({ pressed }) => [
            styles.cta,
            pressed && { opacity: 0.9 },
            isDownloading && styles.ctaDisabled,
          ]}>
          <Text style={styles.ctaText}>
            {isDownloading ? 'Se pregătește diploma...' : 'Descarcă diploma PDF'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/levels')}
          style={styles.backBtn}>
          <Text style={styles.backText}>Înapoi la hartă</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  bg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0F2A44' },
  scroll: {
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  kicker: {
    color: '#A8DADC',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 14,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    marginBottom: 30,
  },
  badgeIcon: { fontSize: 30 },
  badgeLabel: { color: '#526F7A', fontSize: 12, textTransform: 'uppercase' },
  badgeValue: { color: '#102A43', fontSize: 18, fontWeight: '800' },
  cta: {
    backgroundColor: Palette.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Palette.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  ctaDisabled: { opacity: 0.6 },
  ctaText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  backBtn: { marginTop: 14, alignItems: 'center' },
  backText: { color: '#FFFFFF', fontSize: 14 },
});
