import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { LaunchScreen } from './components/LaunchScreen';
import { LanguageScreen } from './components/LanguageScreen';
import { ShopAuthScreen } from './components/ShopAuthScreen';
import { BusinessSetupWizard } from './components/BusinessSetupWizard';
import { BusinessDashboard } from './components/BusinessDashboard';
import { FluidTransitionOverlay } from './components/FluidTransitionOverlay';
import {
  LAUNCH_DURATION_MS,
  LanguageCode,
  loadSavedLanguage,
} from './utils/languageConfig';
import { BusinessSetupData, loadBusinessProfile } from './utils/businessSetup';

type AppStep = 'launch' | 'language' | 'auth' | 'setup' | 'dashboard';

export default function App() {
  const storage = typeof window !== 'undefined' ? window.localStorage : null;
  const [step, setStep] = useState<AppStep>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('step') === 'dashboard') {
        return 'dashboard';
      }
      if (params.get('step') === 'setup') {
        return 'setup';
      }
      if (params.get('step') === 'auth') {
        return 'auth';
      }
      if (params.get('autostart') === '1') {
        return 'language';
      }
    }
    return 'launch';
  });
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(() =>
    loadSavedLanguage(storage),
  );
  const [businessData, setBusinessData] = useState<BusinessSetupData>(() =>
    loadBusinessProfile(storage) ?? {
      ...loadBusinessProfile(storage)!,
      preferredLanguage: loadSavedLanguage(storage),
    },
  );

  const navigateToStep = (nextStep: AppStep) => {
    if (step === nextStep) return;
    setStep(nextStep);
  };

  useEffect(() => {
    if (step !== 'launch') return;
    const timer = window.setTimeout(() => {
      setStep('language');
    }, LAUNCH_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [step]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh w-full overflow-x-hidden bg-[#F6F3EC]">
        {step === 'launch' && <LaunchScreen />}

        {step === 'language' && (
          <LanguageScreen
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
            onContinue={() => navigateToStep('auth')}
          />
        )}

        {step === 'auth' && (
          <ShopAuthScreen
            selectedLanguage={selectedLanguage}
            onBackToLanguage={() => navigateToStep('language')}
            onStartSetup={() => navigateToStep('setup')}
          />
        )}

        {step === 'setup' && (
          <BusinessSetupWizard
            initialLanguage={selectedLanguage}
            onCompleteSetup={(data) => {
              setBusinessData(data);
              navigateToStep('dashboard');
            }}
            onBackToLogin={() => navigateToStep('auth')}
          />
        )}

        {step === 'dashboard' && (
          <BusinessDashboard
            businessData={businessData}
            selectedLanguage={selectedLanguage}
            onRestartSetup={() => navigateToStep('setup')}
          />
        )}
      </div>
    </MotionConfig>
  );
}
