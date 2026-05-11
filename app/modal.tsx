import { Redirect } from 'expo-router';

// Unused legacy route — sends users back to the home screen.
export default function ModalRedirect() {
  return <Redirect href="/" />;
}
