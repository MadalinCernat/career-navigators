import { Redirect } from 'expo-router';

// Legacy template route — redirect to landing.
export default function ExploreRedirect() {
  return <Redirect href="/" />;
}
