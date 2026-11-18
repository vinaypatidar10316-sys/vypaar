import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  CheckCircle2,
  Package,
  Plus,
  RefreshCw,
  ShoppingBag,
  Store,
  Users,
} from 'lucide-react';
import { BusinessSetupData } from '../utils/businessSetup';
import { LanguageCode } from '../utils/languageConfig';
import { THEMES } from '../utils/themeConfig';
import { useTranslate } from '../utils/useTranslate';

interface BusinessDashboardProps {
  businessData: BusinessSetupData;
  selectedLanguage?: LanguageCode;
  onRestartSetup: () => void;
}

export function BusinessDashboard({
  businessData,
  selectedLanguage,
  onRestartSetup,
}: BusinessDashboardProps) {
  const [activeTab, setActiveTab] = useState<'pos' | 'inventory' | 'staff' | 'settings'>('pos');
  const theme = THEMES.jade;

  // Utilize useTranslate hook with selectedLanguage / preferredLanguage
  const { t, language } = useTranslate(selectedLanguage ?? businessData.preferredLanguage);

  // Helper to format GST status in selected language
  const formatGstStatus = (status: string) => {
    switch (status) {
      case 'Not registered':
        return t('dashboard.gst.notRegistered', 'Not registered (Non-GST)');
      case 'GST registered':
        return t('dashboard.gst.registered', 'GST Registered');
      case 'Composition taxpayer':
        return t('dashboard.gst.composition', 'Composition taxpayer');
      case 'Not sure':
        return t('dashboard.gst.notSure', 'Not sure');
      default:
        return status;
    }
  };

  const navTabs = [
    { id: 'pos' as const, label: t('dashboard.tabs.pos', 'Billing & POS'), icon: ShoppingBag },
    { id: 'inventory' as const, label: t('dashboard.tabs.inventory', 'Inventory'), icon: Package },
    { id: 'staff' as const, label: t('dashboard.tabs.staff', 'Team & Staff'), icon: Users },
    { id: 'settings' as const, label: t('dashboard.tabs.settings', 'Settings'), icon: BarChart3 },
  ];

  return (
    <div
      data-testid="business-dashboard"
      className={`min-h-dvh w-full relative overflow-x-hidden flex flex-col ${theme.outerShell}`}
    >
      {/* Ambient background */}
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${theme.auroraLayer}`} />

      {/* Top Bar */}
      <header className="relative z-10 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-stone-200/90 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-[17px] font-bold text-[#0D1A15] leading-tight">
              {businessData.shopName || t('dashboard.shopDefault', 'Retail Counter')}
            </h1>
            <p className="text-[12px] text-stone-500">
              {t('dashboard.owner', 'Owner:')} {businessData.ownerName} · +91 {businessData.mobileNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('dashboard.storeActive', 'Store Active')}</span>
          </span>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            onClick={onRestartSetup}
            title={t('dashboard.restartTooltip', 'Restart Setup Wizard')}
            aria-label={t('dashboard.restartTooltip', 'Restart Setup Wizard')}
            className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-10 bg-white border-b border-stone-200 px-6 flex gap-6">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 font-display text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                isActive
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl mx-w-full w-full mx-auto p-6">
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
                <h2 className="font-display text-lg font-bold text-[#0D1A15] mb-3">
                  {t('dashboard.pos.quickInvoice', 'Quick Invoice Generator')} ({businessData.invoiceFormat})
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                    <span className="block text-xs text-stone-500 mb-0.5">
                      {t('dashboard.pos.invoicePrefix', 'Invoice Prefix')}
                    </span>
                    <strong className="font-mono text-sm">
                      {businessData.invoicePrefix}-{businessData.startingInvoiceNo}
                    </strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                    <span className="block text-xs text-stone-500 mb-0.5">
                      {t('dashboard.pos.gstStatus', 'GST Status')}
                    </span>
                    <strong className="text-sm">
                      {formatGstStatus(businessData.gstStatus)}
                    </strong>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.965 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  className="w-full min-h-[50px] rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>{t('dashboard.pos.createNewBill', 'Create New Bill')}</span>
                </motion.button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
                <h3 className="font-display text-base font-bold text-[#0D1A15] mb-2">
                  {t('dashboard.pos.businessSummary', 'Business Summary')}
                </h3>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li className="flex justify-between">
                    <span>{t('dashboard.pos.category', 'Category:')}</span>
                    <strong className="text-stone-900">{businessData.categories.join(', ')}</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>{t('dashboard.pos.type', 'Type:')}</span>
                    <strong className="text-stone-900">{businessData.businessType}</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>{t('dashboard.pos.city', 'City:')}</span>
                    <strong className="text-stone-900">
                      {businessData.city || t('dashboard.pos.notSpecified', 'Not specified')}
                    </strong>
                  </li>
                  <li className="flex justify-between">
                    <span>{t('dashboard.pos.language', 'Language:')}</span>
                    <strong className="text-emerald-800 font-semibold">{language.toUpperCase()}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="p-8 rounded-3xl bg-white border border-stone-200 text-center max-w-md mx-auto shadow-xs">
            <Package className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
            <h2 className="font-display text-xl font-bold text-[#0D1A15]">
              {t('dashboard.inventory.title', 'Inventory Management')}
            </h2>
            <p className="mt-1 text-sm text-stone-600 leading-relaxed">
              {t('dashboard.inventory.desc', {
                range: businessData.productCountRange || '100–500',
              })}
            </p>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="p-8 rounded-3xl bg-white border border-stone-200 text-center max-w-md mx-auto shadow-xs">
            <Users className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
            <h2 className="font-display text-xl font-bold text-[#0D1A15]">
              {t('dashboard.staff.title', 'Team & Staff Access')}
            </h2>
            <p className="mt-1 text-sm text-stone-600 leading-relaxed">
              {t('dashboard.staff.desc', 'Manage cashiers, inventory managers, and branch permissions here.')}
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-8 rounded-3xl bg-white border border-stone-200 text-center max-w-md mx-auto shadow-xs">
            <BarChart3 className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
            <h2 className="font-display text-xl font-bold text-[#0D1A15]">
              {t('dashboard.settings.title', 'Business Reports & Tax')}
            </h2>
            <p className="mt-1 text-sm text-stone-600 leading-relaxed">
              {t('dashboard.settings.desc', 'GST filings, daily turnover reports, and cloud backup preferences.')}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
