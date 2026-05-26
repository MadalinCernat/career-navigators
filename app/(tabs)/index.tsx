import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Palette } from '@/constants/data';
import { store, useAppState } from '@/constants/store';

/**
 * Screen 01 — Landing
 * Dark themed welcome screen with target logo, the "Career Navigators"
 * wordmark, a tagline, and Sign in / Log in CTAs.
 */
export default function LandingScreen() {
  const state = useAppState();
  const [username, setUsername] = useState(state.username ?? '');
  const [touched, setTouched] = useState(false);

  const handleContinue = () => {
    setTouched(true);
    if (!username.trim()) return;
    store.setUsername(username.trim());
    router.push('/onboarding');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.bgBase} />
      <View style={styles.bgOverlay} />

      <CitySilhouette />

      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <View style={styles.logoOuterGlow}>
            <View style={styles.logoRing}>
              <Text style={styles.logoIcon}>🎯</Text>
            </View>
          </View>
        </View>

        <Text style={styles.brand}>Career{'\n'}Navigators</Text>
        <Text style={styles.tagline}>Introduce-ți username-ul pentru a salva progresul.</Text>

        <View style={styles.actions}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={[styles.input, touched && !username.trim() && styles.inputError]}
              placeholder="e.g. alex.popescu"
              placeholderTextColor="rgba(255,255,255,0.55)"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {touched && !username.trim() && (
              <Text style={styles.errorText}>Te rog introdu un nume de utilizator.</Text>
            )}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.pressed,
              !username.trim() && styles.disabledBtn,
            ]}
            onPress={handleContinue}
            disabled={!username.trim()}>
            <Text style={styles.primaryBtnText}>CONTINUĂ</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
            onPress={() => router.push('/levels')}>
            <Text style={styles.secondaryBtnText}>Continuă cu progresul existent</Text>
          </Pressable>

          <Text style={styles.footer}>Username-ul tău păstrează progresul în baza de date.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function CitySilhouette() {
  const buildings = [60, 90, 75, 110, 80, 130, 95, 70, 100, 85, 115, 65, 90];
  return (
    <View style={styles.city} pointerEvents="none">
      {buildings.map((h, i) => (
        <View key={i} style={[styles.building, { height: h }]}>
          {Array.from({ length: 4 }).map((_, w) => (
            <View
              key={w}
              style={[
                styles.window,
                {
                  opacity: (i + w) % 3 === 0 ? 0.6 : 0.15,
                  marginTop: w === 0 ? 14 : 8,
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Palette.appDark },
  bgBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F2A44',
  },
  bgOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '40%',
    backgroundColor: 'rgba(46, 109, 88, 0.35)',
  },
  city: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    opacity: 0.55,
  },
  building: {
    width: 22,
    backgroundColor: '#0A1E33',
    marginHorizontal: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  window: {
    width: 4,
    height: 4,
    backgroundColor: '#FFE08A',
    alignSelf: 'center',
    marginVertical: 2,
    borderRadius: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: { marginBottom: 32 },
  logoOuterGlow: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(88, 204, 2, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Palette.primary,
    shadowOpacity: 0.6,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 14,
  },
  logoIcon: { fontSize: 56 },
  brand: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 44,
    letterSpacing: 0.2,
  },
  tagline: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    marginTop: 14,
    marginBottom: 56,
    textAlign: 'center',
  },
  actions: { width: '100%', alignItems: 'center' },
  inputGroup: { width: '100%', gap: 8, marginBottom: 16 },
  inputLabel: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inputError: {
    borderColor: '#FF7A7A',
  },
  errorText: {
    color: '#FFB3B3',
    fontSize: 11,
    marginTop: 6,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: Palette.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Palette.primary,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  disabledBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.45)',
    backgroundColor: 'transparent',
  },
  secondaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.4,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  footer: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    marginTop: 22,
  },
});
