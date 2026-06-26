"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Phone,
  Clock,
  Flag,
  Globe,
  TrendingUp,
  DollarSign,
  Ban,
  Activity,
  MessageSquare,
  UserPlus,
  BarChart3,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/admin/stats-card";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminStats } from "@/lib/growth-radar";
import { formatDuration, timeAgo } from "@/lib/utils";
import { COUNTRIES } from "@/lib/country-brain/countries";
import { MODES } from "@/lib/constants/modes";
import type { RecentCallAdmin, RecentReportAdmin, BetaSignup } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getLocalSignups } from "@/lib/mabe/beta";

type AdminTab = "overview" | "calls" | "reports" | "countries" | "beta";

// ── Beta analytics helpers ─────────────────────────────────

function getTopCountries(signups: BetaSignup[]): { code: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const s of signups) {
    counts[s.countryCode] = (counts[s.countryCode] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function getIntentionDistribution(signups: BetaSignup[]): { intention: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const s of signups) {
    counts[s.intention] = (counts[s.intention] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([intention, count]) => ({ intention, count }))
    .sort((a, b) => b.count - a.count);
}

const INTENTION_LABELS: Record<string, string> = {
  chill: "Chill",
  serieux: "Sérieux",
  diaspora: "Diaspora",
  decouverte: "Découverte",
};

export default function AdminPage() {
  const stats = getAdminStats();
  const [tab, setTab] = React.useState<AdminTab>("overview");
  const [betaSignups, setBetaSignups] = React.useState<BetaSignup[]>([]);

  React.useEffect(() => {
    setBetaSignups(getLocalSignups());
  }, [tab]);

  const topBetaCountries = getTopCountries(betaSignups);
  const betaIntentions = getIntentionDistribution(betaSignups);

  const callColumns = [
    {
      key: "id",
      label: "ID",
      render: (row: RecentCallAdmin) => (
        <span className="text-xs font-mono text-gris-texte">{row.id}</span>
      ),
    },
    {
      key: "mode",
      label: "Mode",
      render: (row: RecentCallAdmin) => (
        <span className="text-sm">
          {MODES[row.mode]?.icon} {MODES[row.mode]?.label}
        </span>
      ),
    },
    {
      key: "countries",
      label: "Pays",
      render: (row: RecentCallAdmin) => (
        <span className="text-sm">
          {COUNTRIES[row.countryA]?.flag} → {COUNTRIES[row.countryB]?.flag}
        </span>
      ),
    },
    {
      key: "duration",
      label: "Durée",
      render: (row: RecentCallAdmin) => (
        <span className="text-sm font-mono">{formatDuration(row.duration)}</span>
      ),
    },
    {
      key: "flagged",
      label: "Flag",
      render: (row: RecentCallAdmin) =>
        row.flagged ? (
          <Badge variant="destructive">Flagué</Badge>
        ) : (
          <Badge variant="success">OK</Badge>
        ),
    },
  ];

  const reportColumns = [
    {
      key: "id",
      label: "ID",
      render: (row: RecentReportAdmin) => (
        <span className="text-xs font-mono text-gris-texte">{row.id}</span>
      ),
    },
    {
      key: "reason",
      label: "Raison",
      render: (row: RecentReportAdmin) => (
        <span className="text-sm capitalize">{row.reason}</span>
      ),
    },
    {
      key: "severity",
      label: "Sévérité",
      render: (row: RecentReportAdmin) => {
        const colors: Record<string, "destructive" | "warning" | "secondary" | "default"> = {
          critical: "destructive",
          high: "warning",
          medium: "secondary",
          low: "default",
        };
        return (
          <Badge variant={colors[row.severity] ?? "default"}>
            {row.severity}
          </Badge>
        );
      },
    },
    {
      key: "status",
      label: "Statut",
      render: (row: RecentReportAdmin) => {
        const labels: Record<string, string> = {
          pending: "En attente",
          reviewed: "Examiné",
          actioned: "Action",
          dismissed: "Ignoré",
        };
        return (
          <span
            className={cn(
              "text-xs font-medium",
              row.status === "pending" && "text-yellow-400",
              row.status === "actioned" && "text-red-400",
              row.status === "reviewed" && "text-cuivre",
              row.status === "dismissed" && "text-gris-texte"
            )}
          >
            {labels[row.status]}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Il y a",
      render: (row: RecentReportAdmin) => (
        <span className="text-xs text-gris-texte">{timeAgo(row.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_row: RecentReportAdmin) => (
        <Button variant="outline" size="sm" className="text-xs">
          Examiner
        </Button>
      ),
    },
  ];

  const betaColumns = [
    {
      key: "pseudo",
      label: "Pseudo",
      render: (row: BetaSignup) => (
        <span className="text-sm font-semibold text-blanc-chaud">{row.pseudo}</span>
      ),
    },
    {
      key: "country",
      label: "Pays",
      render: (row: BetaSignup) => {
        const country = COUNTRIES[row.countryCode];
        return (
          <span className="text-sm">
            {country?.flag ?? "🌍"} {row.countryCode}
          </span>
        );
      },
    },
    {
      key: "city",
      label: "Ville",
      render: (row: BetaSignup) => (
        <span className="text-xs text-gris-texte">{row.city ?? "—"}</span>
      ),
    },
    {
      key: "language",
      label: "Langue",
      render: (row: BetaSignup) => (
        <span className="text-xs text-blanc-chaud uppercase">{row.languageCode}</span>
      ),
    },
    {
      key: "intention",
      label: "Intention",
      render: (row: BetaSignup) => (
        <Badge variant="secondary" className="text-xs">
          {INTENTION_LABELS[row.intention] ?? row.intention}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Inscrit",
      render: (row: BetaSignup) => (
        <span className="text-xs text-gris-texte">
          {timeAgo(typeof row.createdAt === "string" ? new Date(row.createdAt) : row.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-noir">
      <Header title="Admin Dashboard" showBack />

      <div className="px-4 pt-4 pb-24">
        {/* Admin badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl border border-cuivre/30 bg-cuivre/10 w-fit"
        >
          <Activity className="w-3.5 h-3.5 text-cuivre" />
          <span className="text-xs font-bold text-cuivre">
            Songi Songi Mabé · Console Admin
          </span>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 p-1 rounded-xl bg-noir-light border border-noir-border overflow-x-auto">
          {(["overview", "calls", "reports", "countries", "beta"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all capitalize",
                tab === t
                  ? "bg-vert-congo text-blanc-chaud"
                  : "text-gris-texte hover:text-blanc-chaud"
              )}
            >
              {t === "overview"
                ? "Vue globale"
                : t === "calls"
                ? "Appels"
                : t === "reports"
                ? "Signalements"
                : t === "countries"
                ? "Pays"
                : "Bêta"}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Primary stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatsCard
                title="Utilisateurs"
                value={stats.totalUsers}
                change={`+${stats.activeUsersToday} aujourd'hui`}
                changeType="positive"
                icon={Users}
                iconColor="#0F3D32"
              />
              <StatsCard
                title="Appels total"
                value={stats.totalCalls}
                change={`${stats.activeCallsNow} en cours`}
                changeType="positive"
                icon={Phone}
                iconColor="#C76A2D"
              />
              <StatsCard
                title="Durée moyenne"
                value={formatDuration(stats.avgCallDuration)}
                icon={Clock}
                iconColor="#0F3D32"
              />
              <StatsCard
                title="Revenus"
                value={`$${stats.totalRevenue.toLocaleString("fr-FR")}`}
                change={`$${stats.revenueToday} aujourd'hui`}
                changeType="positive"
                icon={DollarSign}
                iconColor="#C76A2D"
              />
              <StatsCard
                title="Signalements"
                value={stats.totalReports}
                change={`${stats.pendingReports} en attente`}
                changeType={stats.pendingReports > 10 ? "negative" : "neutral"}
                icon={Flag}
                iconColor="#EF4444"
              />
              <StatsCard
                title="Bannis"
                value={stats.bannedUsers}
                icon={Ban}
                iconColor="#EF4444"
              />
              <StatsCard
                title="Pays actifs"
                value={stats.activeCountries}
                icon={Globe}
                iconColor="#0F3D32"
              />
              <StatsCard
                title="Conversion"
                value={`${stats.conversionRate}%`}
                icon={TrendingUp}
                iconColor="#C76A2D"
              />
            </div>

            {/* Beta signups quick stat */}
            <div className="p-4 rounded-2xl border border-noir-border bg-noir-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserPlus className="w-5 h-5 text-vert-congo" />
                <div>
                  <div className="text-sm font-bold text-blanc-chaud">
                    Inscriptions bêta (local)
                  </div>
                  <div className="text-xs text-gris-texte">
                    Stockées dans le navigateur
                  </div>
                </div>
              </div>
              <div className="text-2xl font-black text-vert-light">
                {betaSignups.length}
              </div>
            </div>

            {/* Top modes */}
            <div className="p-4 rounded-2xl border border-noir-border bg-noir-card">
              <h3 className="text-sm font-bold text-blanc-chaud mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cuivre" />
                Modes les plus utilisés
              </h3>
              <div className="space-y-2">
                {stats.topModes.map((item) => {
                  const mode = MODES[item.mode];
                  const max = stats.topModes[0].count;
                  const pct = (item.count / max) * 100;
                  return (
                    <div key={item.mode} className="flex items-center gap-3">
                      <span className="text-base w-7 text-center">
                        {mode.icon}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-blanc-chaud font-medium">
                            {mode.label}
                          </span>
                          <span className="text-gris-texte">
                            {item.count.toLocaleString("fr-FR")}
                          </span>
                        </div>
                        <div className="h-1.5 bg-noir-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-vert-congo rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {tab === "calls" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-sm font-bold text-blanc-chaud mb-3">
              Appels récents
            </h3>
            <DataTable
              columns={callColumns as never}
              data={stats.recentCalls as never[]}
              keyField="id"
            />
          </motion.div>
        )}

        {tab === "reports" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-blanc-chaud">
                Signalements récents
              </h3>
              <span className="text-xs text-yellow-400 font-medium">
                {stats.pendingReports} en attente
              </span>
            </div>
            <DataTable
              columns={reportColumns as never}
              data={stats.recentReports as never[]}
              keyField="id"
            />
          </motion.div>
        )}

        {tab === "countries" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-bold text-blanc-chaud mb-3">
              Activité par pays
            </h3>
            {stats.topCountries.map((item) => {
              const country = COUNTRIES[item.code];
              return (
                <div
                  key={item.code}
                  className="flex items-center justify-between p-4 rounded-2xl border border-noir-border bg-noir-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="text-sm font-semibold text-blanc-chaud">
                        {country.name}
                      </div>
                      <div className="text-xs text-gris-texte">
                        {country.isDiaspora ? "Diaspora" : "Pays natif"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blanc-chaud">
                      {item.count.toLocaleString("fr-FR")}
                    </div>
                    <div className="text-xs text-gris-texte">utilisateurs</div>
                  </div>
                </div>
              );
            })}

            {/* Admin actions */}
            <div className="mt-6 space-y-2">
              <h4 className="text-xs font-bold text-gris-texte uppercase tracking-wide mb-3">
                Actions Admin
              </h4>
              <Button variant="destructive" size="sm" className="w-full">
                Bannir un utilisateur
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Désactiver un mode
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Ajuster les limites pays
              </Button>
            </div>
          </motion.div>
        )}

        {tab === "beta" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Beta stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatsCard
                title="Bêta inscrits"
                value={betaSignups.length}
                change="localStorage"
                changeType="neutral"
                icon={UserPlus}
                iconColor="#0F3D32"
              />
              <StatsCard
                title="Pays représentés"
                value={topBetaCountries.length}
                icon={Globe}
                iconColor="#C76A2D"
              />
            </div>

            {/* Pays les plus demandés */}
            {topBetaCountries.length > 0 && (
              <div className="p-4 rounded-2xl border border-noir-border bg-noir-card">
                <h3 className="text-sm font-bold text-blanc-chaud mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cuivre" />
                  Pays les plus demandés
                </h3>
                <div className="space-y-2">
                  {topBetaCountries.map((item) => {
                    const country = COUNTRIES[item.code as keyof typeof COUNTRIES];
                    const max = topBetaCountries[0].count;
                    const pct = (item.count / max) * 100;
                    return (
                      <div key={item.code} className="flex items-center gap-3">
                        <span className="text-base w-7 text-center">
                          {country?.flag ?? "🌍"}
                        </span>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-blanc-chaud font-medium">
                              {country?.name ?? item.code}
                            </span>
                            <span className="text-gris-texte">{item.count}</span>
                          </div>
                          <div className="h-1.5 bg-noir-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-vert-congo rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Distribution des intentions */}
            {betaIntentions.length > 0 && (
              <div className="p-4 rounded-2xl border border-noir-border bg-noir-card">
                <h3 className="text-sm font-bold text-blanc-chaud mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cuivre" />
                  Distribution des intentions
                </h3>
                <div className="space-y-2">
                  {betaIntentions.map((item) => {
                    const max = betaIntentions[0].count;
                    const pct = (item.count / max) * 100;
                    return (
                      <div key={item.intention} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-blanc-chaud font-medium">
                              {INTENTION_LABELS[item.intention] ?? item.intention}
                            </span>
                            <span className="text-gris-texte">{item.count}</span>
                          </div>
                          <div className="h-1.5 bg-noir-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cuivre rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tableau des inscriptions bêta */}
            <div>
              <h3 className="text-sm font-bold text-blanc-chaud mb-3">
                Inscriptions bêta ({betaSignups.length})
              </h3>
              {betaSignups.length === 0 ? (
                <div className="text-center py-12 text-gris-texte text-sm">
                  Aucune inscription bêta (localStorage vide)
                </div>
              ) : (
                <DataTable
                  columns={betaColumns as never}
                  data={betaSignups as never[]}
                  keyField="id"
                />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
