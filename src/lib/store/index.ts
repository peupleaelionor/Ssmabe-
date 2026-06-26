"use client";

import { create } from "zustand";
import {
  CallMode,
  CallStatus,
  ConsentStatus,
  CountryCode,
  LanguageCode,
  TrustLevel,
  type User,
  type Profile,
  type CallSession,
  type CreditWallet,
  type MockCandidate,
} from "@/lib/types";

// ── Default mock user ─────────────────────────────────────

const DEFAULT_WALLET: CreditWallet = {
  id: "wallet_current",
  userId: "current_user",
  balance: 45,
  freeCallsRemaining: 3,
  freeCallsResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  totalSpent: 120,
  totalPurchased: 200,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ── Store interface ───────────────────────────────────────

interface AppStore {
  // ── User state
  user: User | null;
  profile: Profile | null;

  // ── Onboarding state
  onboardingStep: number;
  onboardingComplete: boolean;
  selectedCountry: CountryCode;
  selectedLanguage: LanguageCode;
  selectedMode: CallMode;
  pseudo: string;
  ageConfirmed: boolean;
  selectedCity: string;

  // ── Call state
  currentCall: CallSession | null;
  callStatus: CallStatus;
  callDuration: number;
  matchedUser: MockCandidate | null;
  userConsent: ConsentStatus;
  otherConsent: ConsentStatus;

  // ── Wallet
  wallet: CreditWallet;

  // ── UI state
  isSearching: boolean;

  // ── Actions: User
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;

  // ── Actions: Onboarding
  nextOnboardingStep: () => void;
  prevOnboardingStep: () => void;
  setSelectedCountry: (code: CountryCode) => void;
  setSelectedLanguage: (code: LanguageCode) => void;
  setSelectedMode: (mode: CallMode) => void;
  setPseudo: (pseudo: string) => void;
  setSelectedCity: (city: string) => void;
  confirmAge: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // ── Actions: Call
  startCall: (session: CallSession, candidate: MockCandidate) => void;
  endCall: () => void;
  setCallStatus: (status: CallStatus) => void;
  incrementCallDuration: () => void;
  setUserConsent: (consent: ConsentStatus) => void;
  setOtherConsent: (consent: ConsentStatus) => void;
  setMatchedUser: (user: MockCandidate | null) => void;
  setIsSearching: (searching: boolean) => void;

  // ── Actions: Wallet
  setWallet: (wallet: CreditWallet) => void;
  deductFromWallet: (amount: number) => void;
  addToWallet: (amount: number) => void;
}

// ── Store implementation ──────────────────────────────────

export const useAppStore = create<AppStore>((set, get) => ({
  // ── Initial state
  user: null,
  profile: null,

  onboardingStep: 1,
  onboardingComplete: false,
  selectedCountry: CountryCode.CD,
  selectedLanguage: LanguageCode.FR,
  selectedMode: CallMode.MBOKA,
  pseudo: "",
  ageConfirmed: false,
  selectedCity: "",

  currentCall: null,
  callStatus: CallStatus.IDLE,
  callDuration: 0,
  matchedUser: null,
  userConsent: ConsentStatus.PENDING,
  otherConsent: ConsentStatus.PENDING,

  wallet: DEFAULT_WALLET,
  isSearching: false,

  // ── User actions
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),

  // ── Onboarding actions
  nextOnboardingStep: () =>
    set((state) => ({ onboardingStep: Math.min(state.onboardingStep + 1, 6) })),

  prevOnboardingStep: () =>
    set((state) => ({ onboardingStep: Math.max(state.onboardingStep - 1, 1) })),

  setSelectedCountry: (code) => set({ selectedCountry: code }),
  setSelectedLanguage: (code) => set({ selectedLanguage: code }),
  setSelectedMode: (mode) => set({ selectedMode: mode }),
  setPseudo: (pseudo) => set({ pseudo }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  confirmAge: () => set({ ageConfirmed: true }),

  completeOnboarding: () => {
    const state = get();
    const newUser: User = {
      id: `user_${Date.now()}`,
      pseudo: state.pseudo || "VoixAnonymous",
      countryCode: state.selectedCountry,
      languageCode: state.selectedLanguage,
      preferredMode: state.selectedMode,
      createdAt: new Date(),
      lastActiveAt: new Date(),
      isBanned: false,
      isVerified: false,
      role: "user",
    };
    const newProfile: Profile = {
      userId: newUser.id,
      ageConfirmed: state.ageConfirmed,
      cities: state.selectedCity ? [state.selectedCity] : [],
      interests: [],
      trustScore: 50,
      trustLevel: TrustLevel.NEW,
      callCount: 0,
      reportCount: 0,
      blockCount: 0,
      averageCallDuration: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set({ user: newUser, profile: newProfile, onboardingComplete: true });
  },

  resetOnboarding: () =>
    set({
      onboardingStep: 1,
      onboardingComplete: false,
      selectedCountry: CountryCode.CD,
      selectedLanguage: LanguageCode.FR,
      selectedMode: CallMode.MBOKA,
      pseudo: "",
      ageConfirmed: false,
      selectedCity: "",
    }),

  // ── Call actions
  startCall: (session, candidate) =>
    set({
      currentCall: session,
      callStatus: CallStatus.ACTIVE,
      callDuration: 0,
      matchedUser: candidate,
      userConsent: ConsentStatus.PENDING,
      otherConsent: ConsentStatus.PENDING,
    }),

  endCall: () =>
    set({
      callStatus: CallStatus.ENDED,
      callDuration: 0,
      matchedUser: null,
    }),

  setCallStatus: (status) => set({ callStatus: status }),

  incrementCallDuration: () =>
    set((state) => ({ callDuration: state.callDuration + 1 })),

  setUserConsent: (consent) => set({ userConsent: consent }),
  setOtherConsent: (consent) => set({ otherConsent: consent }),
  setMatchedUser: (user) => set({ matchedUser: user }),
  setIsSearching: (searching) => set({ isSearching: searching }),

  // ── Wallet actions
  setWallet: (wallet) => set({ wallet }),

  deductFromWallet: (amount) =>
    set((state) => ({
      wallet: {
        ...state.wallet,
        balance: Math.max(0, state.wallet.balance - amount),
        totalSpent: state.wallet.totalSpent + amount,
        updatedAt: new Date(),
      },
    })),

  addToWallet: (amount) =>
    set((state) => ({
      wallet: {
        ...state.wallet,
        balance: state.wallet.balance + amount,
        totalPurchased: state.wallet.totalPurchased + amount,
        updatedAt: new Date(),
      },
    })),
}));
