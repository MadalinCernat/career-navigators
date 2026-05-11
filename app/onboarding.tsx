import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Domain, DOMAIN_LABELS, Palette } from '@/constants/data';
import { store } from '@/constants/store';

export default function OnboardingScreen() {
  const [domain, setDomain] = useState<Domain>('marketing');

  const handleContinue = () => {
    store.setDomain(domain);
    router.replace('/levels');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <Text style={styles.kicker}>Pasul 1 / 1</Text>
        <Text style={styles.title}>Alege-ți domeniul</Text>
        <Text style={styles.subtitle}>
          Vom personaliza nivelul tehnic în funcție de cariera pe care o vizezi.
        </Text>

        <View style={styles.choices}>
          {(Object.keys(DOMAIN_LABELS) as Domain[]).map((key) => {
            const meta = DOMAIN_LABELS[key];
            const selected = domain === key;
            return (
              <Pressable
                key={key}
                onPress={() => setDomain(key)}
                style={({ pressed }) => [
                  styles.card,
                  selected && styles.cardSelected,
                  pressed && { transform: [{ scale: 0.99 }] },
                ]}>
                <Text style={styles.cardIcon}>{meta.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{meta.title}</Text>
                  <Text style={styles.cardSubtitle}>{meta.subtitle}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioOn]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ flex: 1 }} />

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
          onPress={handleContinue}>
          <Text style={styles.ctaText}>CONTINUĂ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  kicker: {
    color: Palette.textSecondary,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: Palette.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
  },
  subtitle: {
    color: Palette.textSecondary,
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  choices: { marginTop: 28, gap: 14 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#F7F7F7',
    borderWidth: 2,
    borderColor: '#EAEAEA',
    gap: 14,
  },
  cardSelected: {
    backgroundColor: '#F1FAEA',
    borderColor: Palette.primary,
  },
  cardIcon: { fontSize: 28 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: Palette.textPrimary },
  cardSubtitle: { fontSize: 13, color: Palette.textSecondary, marginTop: 3 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C9C9C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: Palette.primary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Palette.primary,
  },
  cta: {
    backgroundColor: Palette.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Palette.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  ctaText: { color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 0.4 },
});
