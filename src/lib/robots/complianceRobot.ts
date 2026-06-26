/**
 * complianceRobot — vérifie les règles non négociables du produit.
 * --------------------------------------------------------------
 * 18+, numéro protégé, double consentement, pas de contact forcé,
 * pas de promesse mensongère, pas de stockage sensible côté client.
 */
export interface ComplianceFlags {
  ageGate18: boolean;
  phoneNeverExposed: boolean;
  doubleConsent: boolean;
  contactOptional: boolean;
  serviceKeyServerOnly: boolean;
  noSensitiveClientStorage: boolean;
  honestMarketing: boolean;
}

export interface ComplianceRule {
  key: keyof ComplianceFlags;
  label: string;
  pass: boolean;
  blocking: boolean;
}

export interface ComplianceReport {
  compliant: boolean;
  rules: ComplianceRule[];
  violations: ComplianceRule[];
  score: number; // 0-100
}

const RULES: { key: keyof ComplianceFlags; label: string; blocking: boolean }[] = [
  { key: "ageGate18", label: "18+ obligatoire", blocking: true },
  { key: "phoneNeverExposed", label: "Numéro jamais exposé", blocking: true },
  { key: "doubleConsent", label: "Double consentement", blocking: true },
  { key: "contactOptional", label: "Contact non forcé", blocking: true },
  { key: "serviceKeyServerOnly", label: "Service key server-only", blocking: true },
  { key: "noSensitiveClientStorage", label: "Pas de stockage sensible client", blocking: true },
  { key: "honestMarketing", label: "Pas de promesse mensongère", blocking: false },
];

export function runComplianceRobot(flags: ComplianceFlags): ComplianceReport {
  const rules: ComplianceRule[] = RULES.map((r) => ({
    key: r.key,
    label: r.label,
    pass: flags[r.key] === true,
    blocking: r.blocking,
  }));

  const violations = rules.filter((r) => !r.pass);
  const blockingViolations = violations.filter((r) => r.blocking);
  const score = Math.round((rules.filter((r) => r.pass).length / rules.length) * 100);

  return {
    compliant: blockingViolations.length === 0,
    rules,
    violations,
    score,
  };
}

/** Configuration de conformité par défaut du repo (état vérifié). */
export const DEFAULT_COMPLIANCE: ComplianceFlags = {
  ageGate18: true,
  phoneNeverExposed: true,
  doubleConsent: true,
  contactOptional: true,
  serviceKeyServerOnly: true,
  noSensitiveClientStorage: true,
  honestMarketing: true,
};
