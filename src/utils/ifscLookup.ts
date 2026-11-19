import { isValidIfscCode } from './businessSetup';

export interface IfscBranchInfo {
  ifsc: string;
  bank: string;
  branch: string;
  city?: string;
  state?: string;
  address?: string;
  source: 'rbi-api' | 'directory';
}

export const CURATED_BANK_NAMES: Record<string, string> = {
  SBIN: 'State Bank of India',
  HDFC: 'HDFC Bank',
  ICIC: 'ICICI Bank',
  UTIB: 'Axis Bank',
  KKBK: 'Kotak Mahindra Bank',
  BARB: 'Bank of Baroda',
  PUNB: 'Punjab National Bank',
  CNRB: 'Canara Bank',
  UBIN: 'Union Bank of India',
  IDIB: 'Indian Bank',
  BKID: 'Bank of India',
  MAHB: 'Bank of Maharashtra',
  IOBA: 'Indian Overseas Bank',
  CBIN: 'Central Bank of India',
  UCBA: 'UCO Bank',
  PSIB: 'Punjab & Sind Bank',
  YESB: 'YES Bank',
  INDB: 'IndusInd Bank',
  FDRL: 'Federal Bank',
  IDFB: 'IDFC First Bank',
  RATN: 'RBL Bank',
  KARB: 'Karnataka Bank',
  KVBL: 'Karur Vysya Bank',
  TMBL: 'Tamilnad Mercantile Bank',
  SIBL: 'South Indian Bank',
  CSBK: 'CSB Bank',
  DCBL: 'DCB Bank',
  AUBL: 'AU Small Finance Bank',
  ESFB: 'Equitas Small Finance Bank',
  UJVN: 'Ujjivan Small Finance Bank',
  JSFB: 'Jana Small Finance Bank',
  PYTM: 'Paytm Payments Bank',
  AIRP: 'Airtel Payments Bank',
  JIOP: 'Jio Payments Bank',
  FINO: 'Fino Payments Bank',
  IPOS: 'India Post Payments Bank',
  CITI: 'Citibank',
  HSBC: 'HSBC Bank',
  SCBL: 'Standard Chartered Bank',
  DBSS: 'DBS Bank India',
};

export const CURATED_IFSC_BRANCHES: Record<string, Omit<IfscBranchInfo, 'ifsc' | 'source'>> = {
  HDFC0001234: {
    bank: 'HDFC Bank',
    branch: 'Navrangpura Main Branch',
    city: 'Ahmedabad',
    state: 'Gujarat',
  },
  HDFC0000240: {
    bank: 'HDFC Bank',
    branch: 'Sandoz House, Worli',
    city: 'Mumbai',
    state: 'Maharashtra',
  },
  SBIN0000300: {
    bank: 'State Bank of India',
    branch: 'Mumbai Main Branch',
    city: 'Mumbai',
    state: 'Maharashtra',
  },
  SBIN0000691: {
    bank: 'State Bank of India',
    branch: 'Sansad Marg Main Branch',
    city: 'New Delhi',
    state: 'Delhi',
  },
  SBIN0000456: {
    bank: 'State Bank of India',
    branch: 'Bhadra Main Branch',
    city: 'Ahmedabad',
    state: 'Gujarat',
  },
  ICIC0000001: {
    bank: 'ICICI Bank',
    branch: 'Nariman Point',
    city: 'Mumbai',
    state: 'Maharashtra',
  },
  UTIB0000001: {
    bank: 'Axis Bank',
    branch: 'Maker Towers, Cuffe Parade',
    city: 'Mumbai',
    state: 'Maharashtra',
  },
  KKBK0000958: {
    bank: 'Kotak Mahindra Bank',
    branch: 'Nariman Point',
    city: 'Mumbai',
    state: 'Maharashtra',
  },
};

export function lookupIfscLocal(rawIfsc: string): IfscBranchInfo | null {
  const ifsc = rawIfsc.trim().toUpperCase();
  if (!isValidIfscCode(ifsc)) return null;

  const exact = CURATED_IFSC_BRANCHES[ifsc];
  if (exact) {
    return {
      ifsc,
      ...exact,
      source: 'directory',
    };
  }

  const bankCode = ifsc.slice(0, 4);
  const bankName = CURATED_BANK_NAMES[bankCode];
  if (!bankName) return null;

  return {
    ifsc,
    bank: bankName,
    branch: `${bankName} Branch (${ifsc.slice(5)})`,
    source: 'directory',
  };
}

interface RazorpayIfscResponse {
  BANK?: string;
  BRANCH?: string;
  CITY?: string;
  STATE?: string;
  ADDRESS?: string;
  IFSC?: string;
}

export async function fetchIfscBranchDetails(
  rawIfsc: string,
  signal?: AbortSignal,
): Promise<IfscBranchInfo | null> {
  const ifsc = rawIfsc.trim().toUpperCase();
  if (!isValidIfscCode(ifsc)) return null;

  try {
    const response = await fetch(`https://ifsc.razorpay.com/${encodeURIComponent(ifsc)}`, {
      signal,
    });
    if (response.ok) {
      const data = (await response.json()) as RazorpayIfscResponse;
      if (data && data.BRANCH) {
        return {
          ifsc: data.IFSC || ifsc,
          bank: data.BANK || CURATED_BANK_NAMES[ifsc.slice(0, 4)] || ifsc.slice(0, 4),
          branch: data.BRANCH,
          city: data.CITY || undefined,
          state: data.STATE || undefined,
          address: data.ADDRESS || undefined,
          source: 'rbi-api',
        };
      }
    }
  } catch {
    if (signal?.aborted) return null;
  }

  return lookupIfscLocal(ifsc);
}
