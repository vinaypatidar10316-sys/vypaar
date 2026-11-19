import { FormEvent, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CreditCard,
  FileText,
  Home,
  LayoutGrid,
  Menu,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  QrCode,
  Receipt,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { BusinessSetupData, maskUpiId } from '../utils/businessSetup';
import { LanguageCode } from '../utils/languageConfig';
import { useTranslate } from '../utils/useTranslate';
import { SmartVyapaarLogo } from './SmartVyapaarLogo';

type DashboardView =
  | 'home'
  | 'billing'
  | 'stock'
  | 'customers'
  | 'payments'
  | 'reports'
  | 'ai'
  | 'settings';

type ReportPeriod = 'today' | '7d' | '30d';

interface InventoryProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  unit: string;
  reorderLevel: number;
}

interface InvoiceTransaction {
  id: string;
  customer: string;
  time: string;
  amount: number;
  method: 'UPI' | 'Cash' | 'Card' | 'Udhaar';
  status: 'Paid' | 'Pending';
  itemsSummary: string;
}

interface CustomerCredit {
  id: string;
  name: string;
  phone: string;
  orders: number;
  pendingUdhaar: number;
  lastVisit: string;
}

interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  metricLabel?: string;
  metricValue?: string;
  detailLine?: string;
  dateRange?: string;
}

interface BusinessDashboardProps {
  businessData: BusinessSetupData;
  selectedLanguage?: LanguageCode;
  onRestartSetup: () => void;
}

const INITIAL_PRODUCTS: InventoryProduct[] = [
  {
    id: 'p1',
    name: 'Cotton T-shirt (Pack)',
    sku: 'SV-APP-101',
    category: 'Apparel',
    purchasePrice: 340,
    sellingPrice: 500,
    stock: 46,
    unit: 'pcs',
    reorderLevel: 12,
  },
  {
    id: 'p2',
    name: 'Premium Basmati Rice 5kg',
    sku: 'SV-GRC-204',
    category: 'Grocery',
    purchasePrice: 420,
    sellingPrice: 540,
    stock: 8,
    unit: 'bags',
    reorderLevel: 10,
  },
  {
    id: 'p3',
    name: 'Cold-Pressed Groundnut Oil 1L',
    sku: 'SV-GRC-218',
    category: 'Grocery',
    purchasePrice: 175,
    sellingPrice: 220,
    stock: 34,
    unit: 'btls',
    reorderLevel: 12,
  },
  {
    id: 'p4',
    name: 'LED Desk Lamp Pro',
    sku: 'SV-ELC-309',
    category: 'Electronics',
    purchasePrice: 680,
    sellingPrice: 950,
    stock: 0,
    unit: 'units',
    reorderLevel: 6,
  },
  {
    id: 'p5',
    name: 'Herbal Tea Tin 250g',
    sku: 'SV-GRC-412',
    category: 'Beverages',
    purchasePrice: 145,
    sellingPrice: 210,
    stock: 5,
    unit: 'tins',
    reorderLevel: 8,
  },
];

const INITIAL_TRANSACTIONS: InvoiceTransaction[] = [
  {
    id: 'SV-1024',
    customer: 'Aarav Mehta',
    time: '10:42 AM',
    amount: 1250,
    method: 'UPI',
    status: 'Paid',
    itemsSummary: 'Cotton T-shirt × 2, Herbal Tea × 1',
  },
  {
    id: 'SV-1023',
    customer: 'Priya Shah',
    time: '10:18 AM',
    amount: 850,
    method: 'Udhaar',
    status: 'Pending',
    itemsSummary: 'Basmati Rice 5kg × 1, Groundnut Oil × 1',
  },
  {
    id: 'SV-1022',
    customer: 'Walk-in Customer',
    time: '09:46 AM',
    amount: 2410,
    method: 'Card',
    status: 'Paid',
    itemsSummary: 'LED Desk Lamp × 2, Herbal Tea × 2',
  },
  {
    id: 'SV-1021',
    customer: 'Kiran Desai',
    time: '09:12 AM',
    amount: 640,
    method: 'Cash',
    status: 'Paid',
    itemsSummary: 'Groundnut Oil × 2, Herbal Tea × 1',
  },
];

const INITIAL_CUSTOMERS: CustomerCredit[] = [
  {
    id: 'c1',
    name: 'Priya Shah',
    phone: '98250 11420',
    orders: 14,
    pendingUdhaar: 2350,
    lastVisit: 'Today, 10:18 AM',
  },
  {
    id: 'c2',
    name: 'Manish Patel',
    phone: '98981 44512',
    orders: 9,
    pendingUdhaar: 850,
    lastVisit: 'Yesterday',
  },
  {
    id: 'c3',
    name: 'Aarav Mehta',
    phone: '97240 88310',
    orders: 22,
    pendingUdhaar: 0,
    lastVisit: 'Today, 10:42 AM',
  },
];

const WEEKLY_SERIES = [
  { day: 'Mon', sales: 18400, profit: 4720 },
  { day: 'Tue', sales: 21100, profit: 5410 },
  { day: 'Wed', sales: 16900, profit: 4320 },
  { day: 'Thu', sales: 22800, profit: 5980 },
  { day: 'Fri', sales: 24100, profit: 6150 },
  { day: 'Sat', sales: 29450, profit: 7890 },
  { day: 'Sun', sales: 24850, profit: 6420 },
];

function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function BusinessDashboard({
  businessData,
  selectedLanguage,
  onRestartSetup,
}: BusinessDashboardProps) {
  const [activeView, setActiveView] = useState<DashboardView>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [period, setPeriod] = useState<ReportPeriod>('today');

  // Interactive operational state (sample overview + session edits)
  const [products, setProducts] = useState<InventoryProduct[]>(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<InvoiceTransaction[]>(INITIAL_TRANSACTIONS);
  const [customers, setCustomers] = useState<CustomerCredit[]>(INITIAL_CUSTOMERS);

  // Add Product drawer state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('10');

  // Interactive Invoice Builder state
  const [billItems, setBillItems] = useState<{ productId: string; qty: number }[]>([
    { productId: 'p1', qty: 2 },
  ]);
  const [billDiscount, setBillDiscount] = useState<number>(100);
  const [billPaymentMethod, setBillPaymentMethod] = useState<'UPI' | 'Cash' | 'Card' | 'Udhaar'>('UPI');
  const [billCustomerName, setBillCustomerName] = useState('Walk-in Customer');
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrPaymentVerified, setQrPaymentVerified] = useState(false);
  const [invoiceSuccessMsg, setInvoiceSuccessMsg] = useState<string | null>(null);

  // Vyapaar AI assistant state
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([
    {
      id: 'ai-welcome',
      role: 'assistant',
      text: `Here is your live summary for ${businessData.shopName || 'your store'}. Ask about sales, low-stock items, pending Udhaar, or tax readiness.`,
      metricLabel: 'Connected weekly overview (sample)',
      metricValue: '₹1,42,500.00',
      detailLine: 'Estimated gross margin ~25.8% across active categories.',
      dateRange: 'Last 7 days · Connected store records',
    },
  ]);

  const { t, language } = useTranslate(selectedLanguage ?? businessData.preferredLanguage);

  const periodFactor = period === 'today' ? 1 : period === '7d' ? 5.73 : 22.4;
  const todaysBaseSales = 24850 + Math.max(0, transactions.length - INITIAL_TRANSACTIONS.length) * 945;
  const displayedSales = Math.round(todaysBaseSales * periodFactor);
  const displayedProfit = Math.round(6420 * periodFactor);
  const totalPendingPayments = useMemo(
    () => customers.reduce((sum, c) => sum + c.pendingUdhaar, 0),
    [customers],
  );
  const lowOrOutStockProducts = useMemo(
    () => products.filter((p) => p.stock <= p.reorderLevel),
    [products],
  );

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    if (!normalizedSearch) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(normalizedSearch) ||
        p.sku.toLowerCase().includes(normalizedSearch) ||
        p.category.toLowerCase().includes(normalizedSearch),
    );
  }, [products, normalizedSearch]);

  const filteredTransactions = useMemo(() => {
    if (!normalizedSearch) return transactions;
    return transactions.filter(
      (tx) =>
        tx.id.toLowerCase().includes(normalizedSearch) ||
        tx.customer.toLowerCase().includes(normalizedSearch) ||
        tx.itemsSummary.toLowerCase().includes(normalizedSearch),
    );
  }, [transactions, normalizedSearch]);

  // Billing calculations
  const billSubtotal = useMemo(() => {
    return billItems.reduce((sum, line) => {
      const product = products.find((p) => p.id === line.productId);
      return sum + (product ? product.sellingPrice * line.qty : 0);
    }, 0);
  }, [billItems, products]);

  const isGstRegistered = businessData.gstStatus === 'GST registered';
  const clampedDiscount = Math.min(billSubtotal, Math.max(0, billDiscount));
  const taxableAmount = Math.max(0, billSubtotal - clampedDiscount);
  const taxAmount = isGstRegistered ? Math.round(taxableAmount * 0.05) : 0;
  const totalPayable = taxableAmount + taxAmount;

  const formatGstStatus = (status: string) => {
    switch (status) {
      case 'Not registered':
        return t('dashboard.gst.notRegistered', 'Non Registration (Non-GST)');
      case 'GST registered':
        return t('dashboard.gst.registered', 'GST Registered');
      case 'Composition taxpayer':
        return t('dashboard.gst.composition', 'Composition taxpayer');
      default:
        return status;
    }
  };

  const sidebarItems: { id: DashboardView; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Business overview', icon: Home },
    { id: 'billing', label: 'Billing & invoices', icon: Receipt },
    { id: 'stock', label: 'Products & inventory', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'payments', label: 'Payments', icon: Wallet },
    { id: 'reports', label: 'Reports & analytics', icon: BarChart3 },
    { id: 'ai', label: 'Vyapaar AI', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleToggleInvoicePaid = (id: string) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, status: tx.status === 'Paid' ? 'Pending' : 'Paid' } : tx,
      ),
    );
  };

  const handleAddProductSubmit = (e: FormEvent) => {
    e.preventDefault();
    const price = Number(newProdPrice);
    const stock = Number(newProdStock);
    if (!newProdName.trim() || Number.isNaN(price) || price <= 0) return;
    const item: InventoryProduct = {
      id: `p-${Date.now()}`,
      name: newProdName.trim(),
      sku: `SV-NEW-${String(products.length + 101)}`,
      category: businessData.categories[0] ?? 'Retail',
      purchasePrice: Math.round(price * 0.78),
      sellingPrice: price,
      stock: Number.isNaN(stock) ? 10 : Math.max(0, stock),
      unit: 'pcs',
      reorderLevel: 8,
    };
    setProducts((prev) => [item, ...prev]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('10');
    setShowAddProduct(false);
  };

  const handleGenerateInvoice = (markAsPaid: boolean) => {
    if (totalPayable <= 0) return;
    const nextNum = 1025 + (transactions.length - INITIAL_TRANSACTIONS.length);
    const summary = billItems
      .map((line) => {
        const prod = products.find((p) => p.id === line.productId);
        return prod ? `${prod.name} × ${line.qty}` : '';
      })
      .filter(Boolean)
      .join(', ');

    const newTx: InvoiceTransaction = {
      id: `${businessData.invoicePrefix || 'SV'}-${nextNum}`,
      customer: billCustomerName.trim() || 'Walk-in Customer',
      time: 'Just now',
      amount: totalPayable,
      method: billPaymentMethod,
      status: markAsPaid ? 'Paid' : 'Pending',
      itemsSummary: summary || 'Retail items',
    };

    setTransactions((prev) => [newTx, ...prev]);
    setQrModalOpen(false);
    setQrPaymentVerified(false);
    setInvoiceSuccessMsg(`Invoice ${newTx.id} recorded (${newTx.status} · ${formatInr(newTx.amount)})`);
    window.setTimeout(() => setInvoiceSuccessMsg(null), 4000);
  };

  const handleAskAi = (promptText: string) => {
    const query = promptText.trim();
    if (!query) return;
    const lower = query.toLowerCase();

    const userMsg: AiMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: query,
    };

    let reply: AiMessage;
    if (lower.includes('stock') || lower.includes('restock') || lower.includes('inventory')) {
      const names = lowOrOutStockProducts.map((p) => `${p.name} (${p.stock} left)`).join(', ');
      reply = {
        id: `a-${Date.now() + 1}`,
        role: 'assistant',
        text:
          lowOrOutStockProducts.length > 0
            ? `${lowOrOutStockProducts.length} items are at or below reorder level: ${names}.`
            : 'All tracked products are healthy and above reorder thresholds.',
        metricLabel: 'Items needing attention',
        metricValue: `${lowOrOutStockProducts.length} SKUs`,
        detailLine: 'Calculated directly from your current inventory table.',
        dateRange: 'Live inventory snapshot',
      };
    } else if (lower.includes('credit') || lower.includes('pending') || lower.includes('udhaar')) {
      const debtors = customers.filter((c) => c.pendingUdhaar > 0);
      reply = {
        id: `a-${Date.now() + 1}`,
        role: 'assistant',
        text:
          debtors.length > 0
            ? `${debtors.length} customers have outstanding Udhaar balances: ${debtors
                .map((d) => `${d.name} (${formatInr(d.pendingUdhaar)})`)
                .join(', ')}.`
            : 'Zero pending customer credit balances.',
        metricLabel: 'Total pending receivables',
        metricValue: formatInr(totalPendingPayments),
        detailLine: 'Verified against active customer credit accounts.',
        dateRange: 'Current billing cycle',
      };
    } else if (lower.includes('setup') || lower.includes('store') || lower.includes('tax') || lower.includes('gst')) {
      reply = {
        id: `a-${Date.now() + 1}`,
        role: 'assistant',
        text: `${businessData.shopName || 'Your store'} is configured in ${
          businessData.city || 'India'
        } under ${businessData.categories.join(', ')} (${formatGstStatus(businessData.gstStatus)}).`,
        metricLabel: 'Configured UPI settlement',
        metricValue: businessData.upiId ? maskUpiId(businessData.upiId) : 'Not added',
        detailLine: businessData.bankName
          ? `Settling to ${businessData.bankName}${businessData.bankBranch ? ` · ${businessData.bankBranch}` : ''}.`
          : 'Configure a bank account under Settings anytime.',
        dateRange: 'Verified store profile',
      };
    } else {
      reply = {
        id: `a-${Date.now() + 1}`,
        role: 'assistant',
        text: `Sales this week total ₹1,42,500.00 across sample & session invoices, led by Cotton T-shirt and Basmati Rice 5kg.`,
        metricLabel: "Today's billing volume",
        metricValue: formatInr(todaysBaseSales),
        detailLine: `${transactions.length} invoices tracked · Estimated gross profit ₹6,420.00.`,
        dateRange: 'Last 7 days · Store records',
      };
    }

    setAiMessages((prev) => [...prev, userMsg, reply]);
    setAiInput('');
  };

  const navigateView = (view: DashboardView) => {
    setActiveView(view);
    setMobileMoreOpen(false);
  };

  return (
    <div
      data-testid="business-dashboard"
      className="min-h-dvh w-full bg-[#F7F8FC] dark:bg-[#111827] text-[#202536] dark:text-[#F7F8FC] flex transition-colors duration-300"
    >
      {/* Desktop Collapsible Sidebar (Section 12) */}
      <aside
        aria-label="Primary Workspace Navigation"
        className={`hidden lg:flex flex-col shrink-0 bg-[#FFFFFF] dark:bg-[#1B2434] border-r border-[#E6E9F0] dark:border-[#344157] transition-all duration-200 ${
          sidebarCollapsed ? 'w-[78px]' : 'w-[252px]'
        }`}
      >
        <div className="h-16 px-4 border-b border-[#E6E9F0] dark:border-[#344157] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <SmartVyapaarLogo size="sm" className="w-8 sm:w-8 shrink-0" />
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <p className="font-display text-[15px] font-extrabold tracking-tight truncate leading-none">
                  <span className="text-[#0B132B]">SMART</span><span className="text-[#2563EB]">Vyapaar</span>
                </p>
                <p className="text-[10.5px] text-[#667085] dark:text-[#A4AEC0] truncate mt-0.5">
                  Platinum Console
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1.5 rounded-lg text-[#667085] dark:text-[#A4AEC0] hover:bg-[#F7F8FC] dark:hover:bg-[#253148] hover:text-[#202536] dark:hover:text-[#F7F8FC] cursor-pointer"
          >
            {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map(({ id, label, icon: Icon }) => {
            const active = activeView === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => navigateView(id)}
                title={sidebarCollapsed ? label : undefined}
                className={`w-full min-h-[44px] px-3 py-2.5 rounded-xl flex items-center gap-3 text-[13.5px] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  active
                    ? 'bg-[#EFF6FF] dark:bg-[#28365B] text-[#0B132B] dark:text-[#A9B9FF] font-semibold'
                    : 'text-[#667085] dark:text-[#A4AEC0] hover:bg-[#F7F8FC] dark:hover:bg-[#253148] hover:text-[#202536] dark:hover:text-[#F7F8FC]'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    active ? 'text-[#2563EB] dark:text-[#7891FF]' : ''
                  }`}
                />
                {!sidebarCollapsed && <span className="truncate">{label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#E6E9F0] dark:border-[#344157]">
          <button
            type="button"
            onClick={onRestartSetup}
            title={t('dashboard.restartTooltip', 'Restart Setup Wizard')}
            className={`w-full min-h-[44px] px-3 py-2 rounded-xl border border-[#E6E9F0] dark:border-[#344157] hover:bg-[#F7F8FC] dark:hover:bg-[#253148] text-[13px] font-medium text-[#667085] dark:text-[#A4AEC0] hover:text-[#202536] dark:hover:text-[#F7F8FC] flex items-center gap-2.5 transition-colors cursor-pointer ${
              sidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <RefreshCw className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Restart Setup</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 min-w-0 flex flex-col pb-20 lg:pb-0">
        {/* Global Top Header */}
        <header className="sticky top-0 z-20 h-16 bg-[#FFFFFF]/90 dark:bg-[#1B2434]/90 backdrop-blur-md border-b border-[#E6E9F0] dark:border-[#344157] px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="lg:hidden shrink-0">
              <SmartVyapaarLogo size="sm" className="w-8" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-[15px] sm:text-[16px] font-bold text-[#202536] dark:text-[#F7F8FC] truncate">
                  {businessData.shopName || t('dashboard.shopDefault', 'Retail Counter')}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#16865D]/10 dark:bg-[#50C69A]/15 text-[11px] font-semibold text-[#16865D] dark:text-[#50C69A]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{t('dashboard.storeActive', 'Store Active')}</span>
                </span>
              </div>
              <p className="text-[11.5px] text-[#667085] dark:text-[#A4AEC0] truncate">
                {businessData.ownerName || 'Owner'} · +91 {businessData.mobileNumber || '—'}
                {businessData.city ? ` · ${businessData.city}` : ''}
              </p>
            </div>
          </div>

          {/* Global Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#667085] dark:text-[#A4AEC0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bills, SKU, or customers..."
                aria-label="Global dashboard search"
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#F7F8FC] dark:bg-[#253148] text-[13px] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/75 dark:placeholder:text-[#A4AEC0]/65 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#7891FF] focus:bg-[#FFFFFF] dark:focus:bg-[#1B2434] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onRestartSetup}
              title={t('dashboard.restartTooltip', 'Restart Setup Wizard')}
              aria-label={t('dashboard.restartTooltip', 'Restart Setup Wizard')}
              className="lg:hidden min-h-[36px] min-w-[36px] p-2 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] text-[#667085] dark:text-[#A4AEC0] hover:text-[#202536] dark:hover:text-[#F7F8FC] cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Workspace Canvas */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
          {/* HOME / BUSINESS OVERVIEW (Section 6) */}
          {activeView === 'home' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#2563EB] dark:text-[#7891FF]">
                    WELCOME BACK
                  </p>
                  <h2 className="font-display text-[24px] font-bold tracking-tight text-[#202536] dark:text-[#F7F8FC]">
                    {businessData.shopName || 'Your Business'}
                  </h2>
                  <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                    Business overview · Sample dashboard metrics synced with your store profile
                  </p>
                </div>

                {/* Reporting Period Switcher */}
                <div className="inline-flex p-1 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] self-start">
                  {(
                    [
                      { id: 'today' as const, label: 'Today' },
                      { id: '7d' as const, label: '7 Days' },
                      { id: '30d' as const, label: '30 Days' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPeriod(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
                        period === item.id
                          ? 'bg-[#EFF6FF] dark:bg-[#28365B] text-[#0B132B] dark:text-[#A9B9FF]'
                          : 'text-[#667085] dark:text-[#A4AEC0] hover:text-[#202536] dark:hover:text-[#F7F8FC]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Level 2 (Highlight Indigo KPI) + Level 1 (Standard KPIs) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Highlight Card: Today's Sales */}
                <div className="lg:col-span-1 rounded-[16px] p-5 bg-[#0B132B] text-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-medium text-[#EFF6FF]">
                        {period === 'today' ? "Today's sales" : period === '7d' ? 'Weekly sales' : 'Monthly sales'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold px-2 py-0.5 rounded-md bg-white/15 text-white">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        12.5%
                      </span>
                    </div>
                    <p className="mt-2 font-mono tabular-nums text-[30px] font-bold tracking-tight">
                      {formatInr(displayedSales)}
                    </p>
                    <p className="mt-1 text-[12px] text-[#EFF6FF]/85">
                      {transactions.length * (period === 'today' ? 4 : period === '7d' ? 21 : 84)} bills generated · Sample KPI
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateView('reports')}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white hover:text-[#EFF6FF] transition-colors cursor-pointer self-start"
                  >
                    <span>View sales analytics</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Standard 2x2 Financial KPI Grid */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  <div className="rounded-[16px] p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157]">
                    <p className="text-[12.5px] font-medium text-[#667085] dark:text-[#A4AEC0]">
                      Estimated profit
                    </p>
                    <p className="mt-1.5 font-mono tabular-nums text-[22px] sm:text-[26px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      {formatInr(displayedProfit)}
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-[#16865D] dark:text-[#50C69A] inline-flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+25.8% gross margin</span>
                    </p>
                  </div>

                  <div className="rounded-[16px] p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157]">
                    <p className="text-[12.5px] font-medium text-[#667085] dark:text-[#A4AEC0]">
                      Pending payments
                    </p>
                    <p className="mt-1.5 font-mono tabular-nums text-[22px] sm:text-[26px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      {formatInr(totalPendingPayments)}
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-[#C58A24] dark:text-[#F0BE61] inline-flex items-center gap-1">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      <span>{customers.filter((c) => c.pendingUdhaar > 0).length} Udhaar accounts</span>
                    </p>
                  </div>

                  <div className="rounded-[16px] p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157]">
                    <p className="text-[12.5px] font-medium text-[#667085] dark:text-[#A4AEC0]">
                      Total products
                    </p>
                    <p className="mt-1.5 font-mono tabular-nums text-[22px] sm:text-[26px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      {products.length} <span className="text-[13px] font-sans font-normal text-[#667085] dark:text-[#A4AEC0]">active SKUs</span>
                    </p>
                    <p className="mt-1 text-[12px] text-[#C58A24] dark:text-[#F0BE61] font-medium">
                      {lowOrOutStockProducts.length} items need restocking
                    </p>
                  </div>

                  <div className="rounded-[16px] p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157]">
                    <p className="text-[12.5px] font-medium text-[#667085] dark:text-[#A4AEC0]">
                      Customers
                    </p>
                    <p className="mt-1.5 font-mono tabular-nums text-[22px] sm:text-[26px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      486
                    </p>
                    <p className="mt-1 text-[12px] text-[#667085] dark:text-[#A4AEC0]">
                      Loyalty & Udhaar ledger ready
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar (Section 4 & 6) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => navigateView('billing')}
                  className="min-h-[50px] px-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span>{t('dashboard.pos.createNewBill', 'Create New Bill')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProduct(true);
                    navigateView('stock');
                  }}
                  className="min-h-[50px] px-4 rounded-2xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] hover:bg-[#F7F8FC] dark:hover:bg-[#253148] text-[#202536] dark:text-[#F7F8FC] font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Package className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF]" />
                  <span>Add Product</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateView('customers')}
                  className="min-h-[50px] px-4 rounded-2xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] hover:bg-[#F7F8FC] dark:hover:bg-[#253148] text-[#202536] dark:text-[#F7F8FC] font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF]" />
                  <span>Customers</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateView('ai')}
                  className="min-h-[50px] px-4 rounded-2xl bg-[#EFF6FF] dark:bg-[#28365B] hover:bg-[#DCE4FF] dark:hover:bg-[#31416B] text-[#0B132B] dark:text-[#A9B9FF] font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF]" />
                  <span>Ask Vyapaar AI</span>
                </button>
              </div>

              {/* Recent Transactions + Connected Store Insight Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-[16px] bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#E6E9F0] dark:border-[#344157] flex items-center justify-between gap-2">
                    <h3 className="font-display text-[16px] font-semibold text-[#202536] dark:text-[#F7F8FC]">
                      Recent transactions
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateView('payments')}
                      className="text-[12.5px] font-semibold text-[#2563EB] dark:text-[#7891FF] hover:underline cursor-pointer"
                    >
                      View all
                    </button>
                  </div>

                  <div className="divide-y divide-[#E6E9F0] dark:divide-[#344157]">
                    {filteredTransactions.slice(0, 5).map((tx) => (
                      <div
                        key={tx.id}
                        className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[#F7F8FC]/80 dark:hover:bg-[#253148]/60 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[13.5px] font-semibold text-[#202536] dark:text-[#F7F8FC]">
                              {tx.id}
                            </span>
                            <span className="text-[11.5px] px-2 py-0.5 rounded-md bg-[#F7F8FC] dark:bg-[#253148] text-[#667085] dark:text-[#A4AEC0] font-medium">
                              {tx.method}
                            </span>
                          </div>
                          <p className="text-[12.5px] text-[#667085] dark:text-[#A4AEC0] truncate mt-0.5">
                            {tx.customer} · {tx.time}
                          </p>
                        </div>

                        <div className="text-right shrink-0 flex items-center gap-3">
                          <div>
                            <p className="font-mono tabular-nums text-[14.5px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                              {formatInr(tx.amount)}
                            </p>
                            <button
                              type="button"
                              onClick={() => handleToggleInvoicePaid(tx.id)}
                              className={`text-[11.5px] font-semibold cursor-pointer ${
                                tx.status === 'Paid'
                                  ? 'text-[#16865D] dark:text-[#50C69A]'
                                  : 'text-[#C58A24] dark:text-[#F0BE61]'
                              }`}
                            >
                              {tx.status}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Level 3: Insight / Configured Business Profile Card */}
                <div className="rounded-[16px] p-5 bg-[#EFF6FF]/70 dark:bg-[#28365B]/80 border border-[#3B82F6]/30 dark:border-[#344157] space-y-3.5 self-start">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-[15.5px] font-semibold text-[#0B132B] dark:text-[#A9B9FF]">
                      {t('dashboard.pos.businessSummary', 'Business Profile')}
                    </h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FFFFFF]/80 dark:bg-[#1B2434] text-[#2563EB] dark:text-[#7891FF]">
                      {language.toUpperCase()}
                    </span>
                  </div>

                  <dl className="space-y-2.5 text-[13px]">
                    <div className="flex justify-between gap-3">
                      <dt className="text-[#667085] dark:text-[#A4AEC0]">
                        {t('dashboard.pos.category', 'Category')}
                      </dt>
                      <dd className="font-semibold text-[#202536] dark:text-[#F7F8FC] text-right">
                        {businessData.categories.join(', ')}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[#667085] dark:text-[#A4AEC0]">
                        {t('dashboard.pos.city', 'City')}
                      </dt>
                      <dd className="font-semibold text-[#202536] dark:text-[#F7F8FC] text-right">
                        {businessData.city || t('dashboard.pos.notSpecified', 'Not specified')}
                        {businessData.pinCode ? ` (${businessData.pinCode})` : ''}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[#667085] dark:text-[#A4AEC0]">
                        {t('dashboard.pos.gstStatus', 'Tax Status')}
                      </dt>
                      <dd className="font-semibold text-[#202536] dark:text-[#F7F8FC] text-right">
                        {formatGstStatus(businessData.gstStatus)}
                      </dd>
                    </div>
                    {businessData.upiId && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#667085] dark:text-[#A4AEC0]">UPI ID</dt>
                        <dd className="font-mono font-semibold text-[#202536] dark:text-[#F7F8FC] text-right truncate">
                          {maskUpiId(businessData.upiId)}
                        </dd>
                      </div>
                    )}
                    {(businessData.bankName || businessData.bankAccountNumber) && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#667085] dark:text-[#A4AEC0]">Bank Settlement</dt>
                        <dd className="font-semibold text-[#202536] dark:text-[#F7F8FC] text-right">
                          {businessData.bankName ? `${businessData.bankName} ` : ''}
                          {businessData.bankAccountNumber
                            ? `••••${businessData.bankAccountNumber.slice(-4)}`
                            : ''}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}

          {/* BILLING & INVOICING (Section 7 + Dynamic QR Workflow Section 9) */}
          {activeView === 'billing' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 rounded-[16px] p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 className="font-display text-[20px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      {t('dashboard.pos.quickInvoice', 'Create Invoice')}
                    </h2>
                    <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                      Search & add products, apply discount, and verify payment
                    </p>
                  </div>
                  <span className="font-mono text-[12.5px] font-semibold px-2.5 py-1 rounded-lg bg-[#EFF6FF] dark:bg-[#28365B] text-[#0B132B] dark:text-[#A9B9FF]">
                    {businessData.invoicePrefix || 'SV'}-{1025 + (transactions.length - INITIAL_TRANSACTIONS.length)}
                  </span>
                </div>

                {invoiceSuccessMsg && (
                  <div
                    role="status"
                    className="p-3 rounded-xl bg-[#16865D]/10 dark:bg-[#50C69A]/15 border border-[#16865D]/30 text-[13px] font-semibold text-[#16865D] dark:text-[#50C69A] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{invoiceSuccessMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="bill-customer-name"
                      className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                    >
                      Customer Name
                    </label>
                    <input
                      id="bill-customer-name"
                      type="text"
                      value={billCustomerName}
                      onChange={(e) => setBillCustomerName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] text-[14px] text-[#202536] dark:text-[#F7F8FC] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bill-discount-input"
                      className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                    >
                      Discount (₹)
                    </label>
                    <input
                      id="bill-discount-input"
                      type="number"
                      min={0}
                      value={billDiscount}
                      onChange={(e) => setBillDiscount(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#253148] font-mono tabular-nums text-[14px] text-[#202536] dark:text-[#F7F8FC] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Quick Product Selector */}
                <div>
                  <span className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-2">
                    Tap product to add to invoice
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {products.filter((p) => p.stock > 0).map((product) => {
                      const inBill = billItems.find((i) => i.productId === product.id);
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() =>
                            setBillItems((prev) => {
                              const existing = prev.find((i) => i.productId === product.id);
                              if (existing) {
                                return prev.map((i) =>
                                  i.productId === product.id ? { ...i, qty: i.qty + 1 } : i,
                                );
                              }
                              return [...prev, { productId: product.id, qty: 1 }];
                            })
                          }
                          className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            inBill
                              ? 'bg-[#EFF6FF] dark:bg-[#28365B] border-[#2563EB] dark:border-[#7891FF]'
                              : 'bg-[#F7F8FC] dark:bg-[#253148] border-[#E6E9F0] dark:border-[#344157] hover:border-[#3B82F6]'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-[#202536] dark:text-[#F7F8FC] truncate">
                              {product.name}
                            </p>
                            <p className="text-[11.5px] font-mono text-[#667085] dark:text-[#A4AEC0]">
                              {formatInr(product.sellingPrice)} · {product.stock} {product.unit}
                            </p>
                          </div>
                          <span className="text-[12px] font-bold text-[#2563EB] dark:text-[#7891FF] shrink-0">
                            {inBill ? `×${inBill.qty}` : '+ Add'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <span className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-2">
                    Choose payment method
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(['UPI', 'Cash', 'Card', 'Udhaar'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setBillPaymentMethod(method)}
                        className={`min-h-[44px] rounded-xl border text-[13px] font-semibold transition-colors cursor-pointer ${
                          billPaymentMethod === method
                            ? 'bg-[#0B132B] dark:bg-[#2563EB] border-[#0B132B] text-white'
                            : 'bg-[#FFFFFF] dark:bg-[#253148] border-[#E6E9F0] dark:border-[#344157] text-[#202536] dark:text-[#F7F8FC]'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stripe-Inspired Invoice Document Preview (Section 7) */}
              <div className="lg:col-span-2 rounded-[16px] p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="pb-3 border-b border-[#E6E9F0] dark:border-[#344157] flex items-start justify-between">
                    <div>
                      <p className="font-display text-[13px] font-extrabold tracking-tight text-[#0B132B] dark:text-[#A9B9FF]">
                        SMART VYAPAAR
                      </p>
                      <p className="text-[15px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                        {businessData.shopName || 'Your Shop Name'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] dark:text-[#A4AEC0]">
                        {isGstRegistered ? 'GST Invoice' : 'Non-GST Bill'}
                      </span>
                      <p className="font-mono text-[13px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                        {businessData.invoicePrefix || 'SV'}-00{1025 + (transactions.length - INITIAL_TRANSACTIONS.length)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {billItems.map((line) => {
                      const prod = products.find((p) => p.id === line.productId);
                      if (!prod) return null;
                      return (
                        <div key={line.productId} className="flex items-center justify-between text-[13px]">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[#202536] dark:text-[#F7F8FC] truncate">
                              {prod.name} × {line.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setBillItems((prev) =>
                                  prev.filter((i) => i.productId !== line.productId),
                                )
                              }
                              className="text-[11px] text-[#D64545] dark:text-[#FF7777] hover:underline cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                          <span className="font-mono tabular-nums font-semibold text-[#202536] dark:text-[#F7F8FC]">
                            {formatInr(prod.sellingPrice * line.qty)}
                          </span>
                        </div>
                      );
                    })}
                    {billItems.length === 0 && (
                      <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                        Select items on the left to build an invoice.
                      </p>
                    )}
                  </div>

                  <dl className="pt-3 border-t border-[#E6E9F0] dark:border-[#344157] space-y-1.5 text-[13px]">
                    <div className="flex justify-between">
                      <dt className="text-[#667085] dark:text-[#A4AEC0]">Discount</dt>
                      <dd className="font-mono tabular-nums text-[#16865D] dark:text-[#50C69A]">
                        −{formatInr(clampedDiscount)}
                      </dd>
                    </div>
                    {isGstRegistered && (
                      <div className="flex justify-between">
                        <dt className="text-[#667085] dark:text-[#A4AEC0]">GST (5% illustrative)</dt>
                        <dd className="font-mono tabular-nums text-[#202536] dark:text-[#F7F8FC]">
                          {formatInr(taxAmount)}
                        </dd>
                      </div>
                    )}
                    <div className="pt-2 border-t border-[#E6E9F0] dark:border-[#344157] flex justify-between items-baseline">
                      <dt className="font-display font-bold text-[15px] text-[#202536] dark:text-[#F7F8FC]">
                        Total payable
                      </dt>
                      <dd className="font-mono tabular-nums font-bold text-[24px] text-[#0B132B] dark:text-[#A9B9FF]">
                        {formatInr(totalPayable)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-2.5">
                  {billPaymentMethod === 'UPI' ? (
                    <button
                      type="button"
                      disabled={totalPayable <= 0}
                      onClick={() => {
                        setQrPaymentVerified(false);
                        setQrModalOpen(true);
                      }}
                      className="w-full min-h-[50px] rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-semibold text-[15px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <QrCode className="w-4.5 h-4.5" />
                      <span>Generate Dynamic UPI QR</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={totalPayable <= 0}
                      onClick={() => handleGenerateInvoice(billPaymentMethod !== 'Udhaar')}
                      className="w-full min-h-[50px] rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-semibold text-[15px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <FileText className="w-4.5 h-4.5" />
                      <span>Generate Invoice</span>
                    </button>
                  )}
                  <p className="text-[11px] text-[#667085] dark:text-[#A4AEC0] text-center">
                    Actual GST treatment uses verified store & HSN configuration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY MANAGEMENT (Section 8) */}
          {activeView === 'stock' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-[24px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                    {t('dashboard.inventory.title', 'Products & Inventory')}
                  </h2>
                  <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                    {products.length} SKUs tracked · {lowOrOutStockProducts.length} items below reorder threshold
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddProduct((s) => !s)}
                  className="min-h-[48px] px-5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 cursor-pointer self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {showAddProduct && (
                <form
                  onSubmit={handleAddProductSubmit}
                  className="rounded-[16px] p-4 bg-[#EFF6FF]/70 dark:bg-[#28365B]/70 border border-[#3B82F6]/40 dark:border-[#344157] grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
                >
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="add-prod-name"
                      className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                    >
                      Product Name
                    </label>
                    <input
                      id="add-prod-name"
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="e.g. Organic Turmeric 500g"
                      className="w-full h-11 px-3 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/60 text-[14px] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="add-prod-price"
                      className="block text-[12px] font-semibold text-[#202536] dark:text-[#F7F8FC] mb-1"
                    >
                      Selling Price (₹)
                    </label>
                    <input
                      id="add-prod-price"
                      type="number"
                      required
                      min={1}
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      placeholder="250"
                      className="w-full h-11 px-3 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/60 font-mono text-[14px] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      aria-label="Initial stock quantity"
                      className="w-20 h-11 px-3 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] text-[#202536] dark:text-[#F7F8FC] font-mono text-[14px] focus:outline-none focus:border-[#2563EB]"
                    />
                    <button
                      type="submit"
                      className="flex-1 h-11 px-4 rounded-xl bg-[#0B132B] hover:bg-[#0B132B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-[13px] font-semibold cursor-pointer transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}

              <div className="rounded-[16px] bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] overflow-hidden">
                <div className="hidden md:grid grid-cols-12 px-5 py-3 bg-[#F7F8FC] dark:bg-[#253148] border-b border-[#E6E9F0] dark:border-[#344157] text-[12px] font-semibold text-[#667085] dark:text-[#A4AEC0]">
                  <span className="col-span-4">Product & SKU</span>
                  <span className="col-span-2">Category</span>
                  <span className="col-span-2 text-right">Price</span>
                  <span className="col-span-2 text-center">Stock</span>
                  <span className="col-span-2 text-right">Status</span>
                </div>
                <div className="divide-y divide-[#E6E9F0] dark:divide-[#344157]">
                  {filteredProducts.map((product) => {
                    const isOut = product.stock === 0;
                    const isLow = !isOut && product.stock <= product.reorderLevel;
                    return (
                      <div
                        key={product.id}
                        className="px-5 py-3.5 grid grid-cols-1 md:grid-cols-12 items-center gap-3"
                      >
                        <div className="md:col-span-4">
                          <p className="font-semibold text-[14px] text-[#202536] dark:text-[#F7F8FC]">
                            {product.name}
                          </p>
                          <p className="text-[12px] font-mono text-[#667085] dark:text-[#A4AEC0]">
                            {product.sku}
                          </p>
                        </div>
                        <div className="md:col-span-2 text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                          {product.category}
                        </div>
                        <div className="md:col-span-2 md:text-right font-mono tabular-nums font-semibold text-[14px]">
                          {formatInr(product.sellingPrice)}
                        </div>
                        <div className="md:col-span-2 flex items-center md:justify-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setProducts((prev) =>
                                prev.map((p) =>
                                  p.id === product.id ? { ...p, stock: Math.max(0, p.stock - 1) } : p,
                                ),
                              )
                            }
                            aria-label={`Decrease stock for ${product.name}`}
                            className="w-7 h-7 rounded-lg border border-[#E6E9F0] dark:border-[#344157] text-sm font-bold cursor-pointer hover:bg-[#F7F8FC] dark:hover:bg-[#253148]"
                          >
                            −
                          </button>
                          <span className="font-mono tabular-nums text-[13.5px] font-semibold min-w-[52px] text-center">
                            {product.stock} {product.unit}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setProducts((prev) =>
                                prev.map((p) =>
                                  p.id === product.id ? { ...p, stock: p.stock + 1 } : p,
                                ),
                              )
                            }
                            aria-label={`Increase stock for ${product.name}`}
                            className="w-7 h-7 rounded-lg border border-[#E6E9F0] dark:border-[#344157] text-sm font-bold cursor-pointer hover:bg-[#F7F8FC] dark:hover:bg-[#253148]"
                          >
                            +
                          </button>
                        </div>
                        <div className="md:col-span-2 md:text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11.5px] font-semibold ${
                              isOut
                                ? 'bg-[#D64545]/10 dark:bg-[#FF7777]/15 text-[#D64545] dark:text-[#FF7777]'
                                : isLow
                                ? 'bg-[#C58A24]/12 dark:bg-[#F0BE61]/15 text-[#C58A24] dark:text-[#F0BE61]'
                                : 'bg-[#16865D]/10 dark:bg-[#50C69A]/15 text-[#16865D] dark:text-[#50C69A]'
                            }`}
                          >
                            {isOut ? 'Out of stock' : isLow ? 'Low stock' : 'In stock'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMERS & UDHAAR LEDGER */}
          {activeView === 'customers' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-[24px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                  Customers & Udhaar
                </h2>
                <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                  Total credit receivable: <strong className="font-mono">{formatInr(totalPendingPayments)}</strong>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="rounded-[16px] p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display font-semibold text-[16px] text-[#202536] dark:text-[#F7F8FC]">
                          {customer.name}
                        </p>
                        <p className="font-mono text-[12px] text-[#667085] dark:text-[#A4AEC0]">
                          +91 {customer.phone}
                        </p>
                      </div>
                      <span className="text-[11.5px] font-medium text-[#667085] dark:text-[#A4AEC0]">
                        {customer.orders} orders
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#E6E9F0] dark:border-[#344157] flex items-center justify-between">
                      <div>
                        <p className="text-[11.5px] text-[#667085] dark:text-[#A4AEC0]">Pending Udhaar</p>
                        <p
                          className={`font-mono tabular-nums font-bold text-[17px] ${
                            customer.pendingUdhaar > 0
                              ? 'text-[#C58A24] dark:text-[#F0BE61]'
                              : 'text-[#16865D] dark:text-[#50C69A]'
                          }`}
                        >
                          {formatInr(customer.pendingUdhaar)}
                        </p>
                      </div>
                      {customer.pendingUdhaar > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomers((prev) =>
                              prev.map((c) =>
                                c.id === customer.id ? { ...c, pendingUdhaar: 0 } : c,
                              ),
                            )
                          }
                          className="min-h-[38px] px-3 rounded-xl bg-[#EFF6FF] dark:bg-[#28365B] text-[#0B132B] dark:text-[#A9B9FF] text-[12px] font-semibold cursor-pointer hover:opacity-90"
                        >
                          Mark Settled
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENTS & RECONCILIATION (Section 9) */}
          {activeView === 'payments' && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-[24px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                  Payments & Settlements
                </h2>
                <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                  Collect via dynamic UPI QR, track cash & card receipts, and reconcile bank settlements
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-[16px] p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#667085] dark:text-[#A4AEC0]">
                      UPI Collection ID
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#16865D] dark:text-[#50C69A]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Active
                    </span>
                  </div>
                  <p className="font-mono text-[18px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                    {businessData.upiId ? maskUpiId(businessData.upiId) : 'Not configured'}
                  </p>
                </div>

                <div className="rounded-[16px] p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#667085] dark:text-[#A4AEC0]">
                      Settlement Bank Account
                    </span>
                    <CreditCard className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF]" />
                  </div>
                  <p className="font-semibold text-[16px] text-[#202536] dark:text-[#F7F8FC]">
                    {businessData.bankName || 'Verified Settlement Bank'}{' '}
                    {businessData.bankAccountNumber ? `· ••••${businessData.bankAccountNumber.slice(-4)}` : ''}
                  </p>
                </div>
              </div>

              <div className="rounded-[16px] bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] divide-y divide-[#E6E9F0] dark:divide-[#344157]">
                {transactions.map((tx) => (
                  <div key={tx.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[13.5px] font-semibold">
                        {tx.id} · {tx.method}
                      </p>
                      <p className="text-[12.5px] text-[#667085] dark:text-[#A4AEC0]">
                        {tx.customer} — {tx.itemsSummary}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono tabular-nums font-bold">{formatInr(tx.amount)}</p>
                      <span
                        className={`text-[11.5px] font-semibold ${
                          tx.status === 'Paid'
                            ? 'text-[#16865D] dark:text-[#50C69A]'
                            : 'text-[#C58A24] dark:text-[#F0BE61]'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORTS & ANALYTICS */}
          {activeView === 'reports' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-[24px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                  {t('dashboard.settings.title', 'Reports & Analytics')}
                </h2>
                <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                  Illustrative weekly sales & gross profit breakdown · {formatGstStatus(businessData.gstStatus)}
                </p>
              </div>

              <div className="rounded-[16px] p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-[16px]">Weekly Revenue vs Profit</h3>
                  <div className="flex items-center gap-4 text-[12px]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
                      Sales
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#16865D]" />
                      Profit
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-4">
                  {WEEKLY_SERIES.map((d) => {
                    const salesPct = Math.round((d.sales / 32000) * 100);
                    const profitPct = Math.round((d.profit / 32000) * 100);
                    return (
                      <div key={d.day} className="h-full flex flex-col items-center justify-end gap-1.5">
                        <div className="w-full flex items-end justify-center gap-1 flex-1">
                          <div
                            title={`${d.day} Sales: ${formatInr(d.sales)}`}
                            style={{ height: `${salesPct}%` }}
                            className="w-3 sm:w-5 rounded-t-md bg-[#2563EB] dark:bg-[#7891FF]"
                          />
                          <div
                            title={`${d.day} Profit: ${formatInr(d.profit)}`}
                            style={{ height: `${profitPct}%` }}
                            className="w-3 sm:w-5 rounded-t-md bg-[#16865D] dark:bg-[#50C69A]"
                          />
                        </div>
                        <span className="text-[11.5px] font-medium text-[#667085] dark:text-[#A4AEC0]">
                          {d.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VYAPAAR AI — BUSINESS INTELLIGENCE ASSISTANT (Section 10) */}
          {activeView === 'ai' && (
            <div className="max-w-3xl space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0B132B] to-[#2563EB] text-white flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-[22px] font-bold text-[#202536] dark:text-[#F7F8FC]">
                      Vyapaar AI
                    </h2>
                    <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                      Your business intelligence assistant · Answers grounded in connected store data
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#16865D]/10 dark:bg-[#50C69A]/15 text-[#16865D] dark:text-[#50C69A] text-[12px] font-semibold">
                  Ready
                </span>
              </div>

              {/* Suggested Queries */}
              <div className="flex flex-wrap gap-2">
                {[
                  'How is my business performing this week?',
                  'Which items need restocking?',
                  'Who has outstanding credit?',
                  'Summarise my store setup',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleAskAi(prompt)}
                    className="px-3.5 py-2 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#FFFFFF] dark:bg-[#1B2434] hover:bg-[#EFF6FF] dark:hover:bg-[#28365B] text-[12.5px] font-medium text-[#0B132B] dark:text-[#A9B9FF] transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="rounded-[16px] p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] space-y-4">
                <div className="space-y-3 max-h-[380px] overflow-y-auto">
                  {aiMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-[#0B132B] text-white ml-8 sm:ml-16'
                          : 'bg-[#EFF6FF]/65 dark:bg-[#28365B]/75 text-[#202536] dark:text-[#F7F8FC] mr-4 sm:mr-10 border border-[#3B82F6]/25'
                      }`}
                    >
                      <p className="text-[13.5px] leading-relaxed">{msg.text}</p>
                      {msg.metricValue && (
                        <div className="mt-2.5 pt-2.5 border-t border-[#2563EB]/20 flex items-baseline justify-between gap-2">
                          <span className="text-[12px] text-[#667085] dark:text-[#A4AEC0]">
                            {msg.metricLabel}
                          </span>
                          <span className="font-mono tabular-nums text-[18px] font-bold text-[#0B132B] dark:text-[#A9B9FF]">
                            {msg.metricValue}
                          </span>
                        </div>
                      )}
                      {msg.dateRange && (
                        <p className="mt-1.5 text-[11px] text-[#667085] dark:text-[#A4AEC0]">
                          {msg.dateRange}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAskAi(aiInput);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask Vyapaar AI anything..."
                    aria-label="Ask Vyapaar AI"
                    className="flex-1 h-12 px-4 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#F7F8FC] dark:bg-[#253148] text-[#202536] dark:text-[#F7F8FC] placeholder:text-[#667085]/70 dark:placeholder:text-[#A4AEC0]/60 text-[14px] focus:outline-none focus:border-[#2563EB]"
                  />
                  <button
                    type="submit"
                    aria-label="Send query to Vyapaar AI"
                    className="h-12 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* SETTINGS (Store Profile) */}
          {activeView === 'settings' && (
            <div className="max-w-2xl space-y-5">
              <div>
                <h2 className="font-display text-[24px] font-bold text-[#202536]">
                  Settings
                </h2>
                <p className="text-[13px] text-[#667085]">
                  Review and update your configured store details
                </p>
              </div>

              <div className="rounded-[16px] p-5 bg-[#FFFFFF] border border-[#E6E9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-[16px]">Store Onboarding Profile</h3>
                  <p className="text-[13px] text-[#667085] dark:text-[#A4AEC0]">
                    Update owner, shop address, GSTIN/PAN, or UPI/Bank payout configuration
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onRestartSetup}
                  className="min-h-[44px] px-4 rounded-xl border border-[#E6E9F0] dark:border-[#344157] hover:bg-[#F7F8FC] dark:hover:bg-[#253148] font-semibold text-[13.5px] inline-flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restart Setup Wizard</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Dynamic UPI QR Collection Modal (Section 9) */}
      <AnimatePresence>
        {qrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/60 backdrop-blur-xs">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Dynamic UPI QR Collection"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="w-full max-w-sm rounded-[20px] bg-[#FFFFFF] dark:bg-[#1B2434] border border-[#E6E9F0] dark:border-[#344157] p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-[18px]">Collect via UPI</h3>
                <button
                  type="button"
                  onClick={() => setQrModalOpen(false)}
                  aria-label="Close payment modal"
                  className="p-1.5 rounded-lg text-[#667085] hover:bg-[#F7F8FC] dark:hover:bg-[#253148] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F8FC] dark:bg-[#253148] border border-[#E6E9F0] dark:border-[#344157] text-center space-y-3">
                <p className="font-mono tabular-nums text-[28px] font-bold text-[#0B132B] dark:text-[#A9B9FF]">
                  {formatInr(totalPayable)}
                </p>
                <div className="w-36 h-36 mx-auto rounded-2xl bg-[#FFFFFF] p-3 border border-[#E6E9F0] flex items-center justify-center text-[#0B132B]">
                  <QrCode className="w-28 h-28" aria-hidden="true" />
                </div>
                <p className="font-mono text-[12.5px] text-[#667085] dark:text-[#A4AEC0]">
                  {businessData.upiId ? maskUpiId(businessData.upiId) : 'merchant@upi'}
                </p>
              </div>

              {!qrPaymentVerified ? (
                <button
                  type="button"
                  onClick={() => setQrPaymentVerified(true)}
                  className="w-full min-h-[48px] rounded-2xl bg-[#0B132B] hover:bg-[#0B132B] text-white font-semibold text-[14.5px] cursor-pointer"
                >
                  Verify Payment Status
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleGenerateInvoice(true)}
                  className="w-full min-h-[48px] rounded-2xl bg-[#16865D] hover:bg-[#126F4D] text-white font-semibold text-[14.5px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  <span>Payment Verified · Complete Invoice</span>
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile 5-Destination Bottom Navigation (Section 12) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 h-16 bg-[#FFFFFF]/95 dark:bg-[#1B2434]/95 backdrop-blur-md border-t border-[#E6E9F0] dark:border-[#344157] grid grid-cols-5"
      >
        {(
          [
            { id: 'home' as const, label: 'Home', icon: Home },
            { id: 'billing' as const, label: 'Billing', icon: ShoppingBag },
            { id: 'stock' as const, label: 'Stock', icon: Package },
            { id: 'reports' as const, label: 'Reports', icon: BarChart3 },
          ] as const
        ).map(({ id, label, icon: Icon }) => {
          const active = activeView === id && !mobileMoreOpen;
          return (
            <button
              key={id}
              type="button"
              onClick={() => navigateView(id)}
              className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium cursor-pointer ${
                active
                  ? 'text-[#2563EB] dark:text-[#7891FF] font-semibold'
                  : 'text-[#667085] dark:text-[#A4AEC0]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setMobileMoreOpen((o) => !o)}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium cursor-pointer ${
            mobileMoreOpen || ['customers', 'payments', 'ai', 'settings'].includes(activeView)
              ? 'text-[#2563EB] dark:text-[#7891FF] font-semibold'
              : 'text-[#667085] dark:text-[#A4AEC0]'
          }`}
        >
          {mobileMoreOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span>More</span>
        </button>
      </nav>

      {/* Mobile More Destinations Drawer */}
      <AnimatePresence>
        {mobileMoreOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed bottom-16 inset-x-0 z-30 bg-[#FFFFFF] dark:bg-[#1B2434] border-t border-[#E6E9F0] dark:border-[#344157] p-4 shadow-xl grid grid-cols-2 gap-2.5"
          >
            {(
              [
                { id: 'customers' as const, label: 'Customers', icon: Users },
                { id: 'payments' as const, label: 'Payments', icon: Wallet },
                { id: 'ai' as const, label: 'Vyapaar AI', icon: Sparkles },
                { id: 'settings' as const, label: 'Settings', icon: LayoutGrid },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => navigateView(id)}
                className="min-h-[48px] px-3.5 rounded-xl border border-[#E6E9F0] dark:border-[#344157] bg-[#F7F8FC] dark:bg-[#253148] flex items-center gap-2.5 text-[13.5px] font-semibold cursor-pointer"
              >
                <Icon className="w-4 h-4 text-[#2563EB] dark:text-[#7891FF]" />
                <span>{label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
