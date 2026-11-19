import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { LaunchScreen } from './components/LaunchScreen';
import { LanguageScreen } from './components/LanguageScreen';
import { ShopAuthScreen } from './components/ShopAuthScreen';
import { BusinessSetupWizard } from './components/BusinessSetupWizard';
import { BusinessDashboard } from './components/BusinessDashboard';
import {
  LAUNCH_DURATION_MS,
  LanguageCode,
  loadSavedLanguage,
} from './utils/languageConfig';
import {
  BusinessSetupData,
  DEFAULT_BUSINESS_SETUP,
  loadBusinessProfile,
} from './utils/businessSetup';

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
  const [businessData, setBusinessData] = useState<BusinessSetupData>(() => {
    const saved = loadBusinessProfile(storage);
    return {
      ...DEFAULT_BUSINESS_SETUP,
      ...(saved ?? {}),
      preferredLanguage: saved?.preferredLanguage ?? loadSavedLanguage(storage),
    };
  });

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
      <div className="min-h-dvh w-full overflow-x-hidden bg-[#F7F8FC] text-[#202536] relative">
        <AnimatePresence mode="wait">
          {step === 'launch' && (
            <LaunchScreen
              key="launch"
              onComplete={() => navigateToStep('language')}
            />
          )}

          {step === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <LanguageScreen
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                onContinue={() => navigateToStep('auth')}
              />
            </motion.div>
          )}

          {step === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <ShopAuthScreen
                selectedLanguage={selectedLanguage}
                onBackToLanguage={() => navigateToStep('language')}
                onStartSetup={() => navigateToStep('setup')}
              />
            </motion.div>
          )}

          {step === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <BusinessSetupWizard
                initialLanguage={selectedLanguage}
                onCompleteSetup={(data) => {
                  setBusinessData(data);
                  navigateToStep('dashboard');
                }}
                onBackToLogin={() => navigateToStep('auth')}
              />
            </motion.div>
          )}

          {step === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <BusinessDashboard
                businessData={businessData}
                selectedLanguage={selectedLanguage}
                onRestartSetup={() => navigateToStep('setup')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
