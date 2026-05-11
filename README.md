# Career Navigators

A Duolingo-style mobile app that teaches users how to ace a job interview. Built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev/).

The app has five screens:

1. **Landing** — welcome and sign in / sign up.
2. **Onboarding** — pick your domain (HR or Marketing).
3. **Level Map** — see your progress through 5 levels with XP, streak and hearts.
4. **Question** — multiple-choice with feedback pop-ups for wrong answers.
5. **Level Complete + Review Quiz** — celebrate, then take a randomized check on previous levels.

---

## Tutorial for new developers

This tutorial assumes you are on Windows, macOS or Linux and have never worked with Expo before. Follow the steps in order.

### 1. Install Node.js

Expo runs on top of Node.js. Install the LTS version (20.x or later) from the official site:

- Download: [https://nodejs.org/](https://nodejs.org/)
- After installing, open a new terminal (PowerShell on Windows, Terminal on macOS/Linux) and verify:
  ```bash
  node --version
  npm --version
  ```
  Both commands should print version numbers. If they don't, restart your terminal.

### 2. Install Git (optional but recommended)

Download from [https://git-scm.com/downloads](https://git-scm.com/downloads). Used to clone the repo. Skip this step if you already have the project folder.

### 3. Install Expo Go on your phone

Expo Go is a free app that lets you run the project on a physical phone without compiling anything. It is the easiest way to develop and demo.

- **iPhone**: open the App Store, search for **Expo Go**, install it.
  Direct link: [https://apps.apple.com/app/expo-go/id982107779](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: open the Play Store, search for **Expo Go**, install it.
  Direct link: [https://play.google.com/store/apps/details?id=host.exp.exponent](https://play.google.com/store/apps/details?id=host.exp.exponent)

Make sure your **phone and computer are on the same Wi-Fi network** — Expo uses the local network to push the bundle to your device.

### 4. Get the project on your machine

Either clone the repo:

```bash
git clone <repository-url>
cd MyApp
```

…or copy the project folder anywhere convenient and `cd` into it.

### 5. Install the project dependencies

From inside the project folder run:

```bash
npm install
```

This downloads everything the project needs into `node_modules/`. It takes a minute or two the first time.

### 6. Start the development server

```bash
npm start
```

(equivalent to `npx expo start`). After a few seconds you'll see a **QR code** in the terminal plus a list of keyboard shortcuts.

### 7. Open the app on your phone (recommended)

- **iPhone**: open the **Camera** app, point it at the QR code, tap the banner that appears — it opens Expo Go which loads the project.
- **Android**: open **Expo Go**, tap *Scan QR code*, point it at the QR code in the terminal.

The first load takes ~20–30 seconds while Metro bundles the JavaScript. After that, the app runs natively on your phone. Edits you make on your computer hot-reload automatically.

### 8. Alternative ways to run

If you don't want to use a phone, you have two more options.

#### Web (works everywhere)

```bash
npm run web
```

Opens the app in your browser at `http://localhost:8081`. Most layout works, but native-only features (shadows, haptics, gesture animations) may render differently.

#### Android emulator (Windows / macOS / Linux)

1. Install [Android Studio](https://developer.android.com/studio).
2. Open Android Studio → *More Actions* → *Virtual Device Manager* → create and start a Pixel device.
3. With the emulator running:
   ```bash
   npm run android
   ```

#### iOS simulator (macOS only)

Requires a Mac with Xcode installed from the App Store:

```bash
npm run ios
```

iOS simulator is **not available on Windows or Linux** — use Expo Go on a real iPhone instead.

---

## Project structure

```
MyApp/
├── app/                        # File-based routes (expo-router)
│   ├── _layout.tsx             # Root stack
│   ├── (tabs)/
│   │   ├── _layout.tsx         # Inner stack
│   │   └── index.tsx           # 01 Landing screen
│   ├── onboarding.tsx          # Domain picker (HR / Marketing)
│   ├── levels.tsx              # 02 Level map
│   ├── question.tsx            # 03 Question + feedback pop-up
│   ├── complete.tsx            # 04 Level complete (trophy, stars, XP)
│   └── review.tsx              # 05 Retention check quiz
├── constants/
│   ├── data.ts                 # All question content + palette tokens
│   ├── store.ts                # In-memory app state (XP, hearts, progress)
│   └── theme.ts                # Default theme colors
├── components/                 # Reusable UI primitives
├── assets/                     # Images, icons, fonts
├── app.json                    # Expo configuration
└── package.json
```

### Where to make changes

| You want to…                              | Edit this file              |
| ----------------------------------------- | --------------------------- |
| Add or change a question                  | `constants/data.ts`         |
| Tweak colors                              | `constants/data.ts` → `Palette` |
| Change the home screen                    | `app/(tabs)/index.tsx`      |
| Change the level map look                 | `app/levels.tsx`            |
| Adjust XP / hearts / starting progress    | `constants/store.ts`        |
| Add a new screen                          | Create `app/<name>.tsx` and register it in `app/_layout.tsx` |

Files in `app/` automatically become routes. For example `app/levels.tsx` is reachable via `router.push('/levels')`.

---

## Useful commands

```bash
npm start            # start the dev server (QR code, all platforms)
npm run android      # launch Android emulator
npm run ios          # launch iOS simulator (macOS only)
npm run web          # open the web build in a browser
npm run lint         # check code style
npx tsc --noEmit     # type-check the TypeScript code
```

While the dev server is running, you can press these keys in the terminal:

- `r` — reload the app
- `m` — toggle the developer menu
- `j` — open the Chrome debugger
- `w` — open the web version
- `?` — show all shortcuts

---

## Troubleshooting

**"Network response timed out" in Expo Go.**
Phone and computer must be on the same Wi-Fi network. If your network blocks peer-to-peer (common on guest / corporate Wi-Fi), restart the server with a tunnel:
```bash
npx expo start --tunnel
```

**"Xcode must be fully installed" on Windows.**
You ran `npm run ios` but iOS builds only work on macOS. Use `npm start` and scan the QR code with Expo Go instead, or use `npm run web` / `npm run android`.

**Metro can't find a module after editing dependencies.**
Stop the server, then:
```bash
npm install
npx expo start -c        # the -c flag clears the cache
```

**The app shows the old screen after changes.**
Press `r` in the terminal to reload, or shake your phone and tap *Reload*.

**TypeScript errors.**
Run `npx tsc --noEmit` to see them all. The CI-equivalent check used during development.

---

## Tech stack

- [Expo SDK 54](https://docs.expo.dev/) (managed workflow)
- [Expo Router 6](https://docs.expo.dev/router/introduction/) (file-based navigation)
- [React Native 0.81](https://reactnative.dev/)
- [TypeScript 5.9](https://www.typescriptlang.org/)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)

State is held in a small `useSyncExternalStore`-based module (`constants/store.ts`) — no external state library needed.

---

## Learn more

- [Expo documentation](https://docs.expo.dev/) — the canonical reference.
- [Expo Router](https://docs.expo.dev/router/introduction/) — how file-based routing works.
- [React Native](https://reactnative.dev/docs/getting-started) — components, styling, layout.
- [TypeScript](https://www.typescriptlang.org/docs/) — typing the code.

Happy hacking!
