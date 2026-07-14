"use client";

import { useState } from "react";
import type { PortfolioLocale } from "@/data/portfolio";

type NodeKind = "edge" | "compute" | "device" | "service";

type ArchitectureNode = {
  id: string;
  label: string;
  short: string;
  kind: NodeKind;
  x: number;
  y: number;
  detail: Record<PortfolioLocale, string>;
};

const nodes: ArchitectureNode[] = [
  { id: "visitor", label: "Public visitor", short: "WWW", kind: "edge", x: 52, y: 84, detail: { en: "The public entry point. Visitors know only the domain; the origin network stays hidden.", ru: "Публичная точка входа. Посетители знают только домен; сеть origin-сервера остаётся скрытой." } },
  { id: "domain", label: "Domain", short: "DNS", kind: "edge", x: 244, y: 84, detail: { en: "DNS routes public requests into Cloudflare rather than directly to a machine at either site.", ru: "DNS направляет публичные запросы в Cloudflare, а не напрямую на машину на одной из площадок." } },
  { id: "cloudflare", label: "Cloudflare edge", short: "CF", kind: "edge", x: 436, y: 84, detail: { en: "The public control plane: proxying, edge handling, and the receiving side of outbound tunnels.", ru: "Публичный control plane: proxy, обработка на edge и принимающая сторона исходящих туннелей." } },
  { id: "proxmox", label: "Work Proxmox", short: "PX", kind: "compute", x: 52, y: 256, detail: { en: "The larger compute host. It isolates hosted tools in containers and keeps general-purpose VM guests private.", ru: "Основной compute-хост. Он изолирует сервисы в контейнерах и оставляет универсальные VM-гости приватными." } },
  { id: "work-pc", label: "Work PC", short: "PC", kind: "device", x: 244, y: 256, detail: { en: "An authenticated internal client for work-hosted automation and password-management services.", ru: "Аутентифицированный внутренний клиент для рабочих сервисов автоматизации и управления паролями." } },
  { id: "macbook", label: "MacBook", short: "MB", kind: "device", x: 436, y: 256, detail: { en: "A portable administration and development device connected through the private mesh.", ru: "Переносное устройство для администрирования и разработки, подключённое через приватную mesh-сеть." } },
  { id: "laptop", label: "Laptop", short: "LT", kind: "device", x: 628, y: 256, detail: { en: "A second mobile client that reaches internal resources without being on the same physical LAN.", ru: "Второй мобильный клиент с доступом к внутренним ресурсам без нахождения в той же физической LAN." } },
  { id: "home-pc", label: "Home PC", short: "HP", kind: "device", x: 820, y: 256, detail: { en: "A personal workstation on the same private access plane as both infrastructure sites.", ru: "Личная рабочая станция в едином приватном контуре доступа к обеим площадкам." } },
  { id: "pi", label: "Raspberry Pi 5", short: "PI", kind: "compute", x: 1012, y: 256, detail: { en: "The low-power, always-on home host for personal automation, secrets, smart-home control, and games.", ru: "Энергоэффективный постоянно включённый домашний хост для автоматизации, секретов, умного дома и игр." } },
  { id: "work-n8n", label: "n8n", short: "N8N", kind: "service", x: 52, y: 548, detail: { en: "A containerized work automation service available to authenticated internal clients.", ru: "Контейнеризированный рабочий сервис автоматизации, доступный аутентифицированным внутренним клиентам." } },
  { id: "work-vault", label: "Vaultwarden", short: "VW", kind: "service", x: 180, y: 548, detail: { en: "The work-hosted password service, isolated in its own container.", ru: "Рабочий password-сервис, изолированный в собственном контейнере." } },
  { id: "stage", label: "Public stage", short: "WEB", kind: "service", x: 308, y: 548, detail: { en: "The public-facing workload reached through the work-side Cloudflare tunnel.", ru: "Публичная workload, доступная через рабочий Cloudflare-туннель." } },
  { id: "vms", label: "VM guests", short: "VM", kind: "service", x: 436, y: 548, detail: { en: "Windows and Ubuntu guests kept behind the Proxmox panel with no external access path.", ru: "Windows- и Ubuntu-гости за панелью Proxmox без внешнего пути доступа." } },
  { id: "home-n8n", label: "n8n", short: "N8N", kind: "service", x: 660, y: 548, detail: { en: "A separate personal automation instance running on the home Pi.", ru: "Отдельный личный экземпляр автоматизации на домашнем Pi." } },
  { id: "home-vault", label: "Vaultwarden", short: "VW", kind: "service", x: 788, y: 548, detail: { en: "The personal password service, separated from the work-hosted instance.", ru: "Личный password-сервис, отделённый от рабочего экземпляра." } },
  { id: "assistant", label: "Home Assistant", short: "HA", kind: "service", x: 916, y: 548, detail: { en: "Local smart-home control that remains useful even when the public path is unavailable.", ru: "Локальное управление умным домом, продолжающее работать даже без публичного пути." } },
  { id: "minecraft", label: "Minecraft", short: "MC", kind: "service", x: 1044, y: 548, detail: { en: "A small game server sharing the Pi while remaining logically separate from home automation.", ru: "Небольшой игровой сервер на том же Pi, логически отделённый от домашней автоматизации." } },
];

const copy = {
  en: {
    eyebrow: "Interactive logical map",
    prompt: "Hover, focus, or select a node",
    selected: "Pinned node",
    reset: "Return to edge",
    public: "Public request path",
    private: "Private Tailscale mesh",
    hosted: "Hosted service link",
    workZone: "WORK SERVER / PROXMOX",
    homeZone: "HOME PI / ALWAYS ON",
    meshZone: "TAILSCALE MESH / PRIVATE ACCESS",
  },
  ru: {
    eyebrow: "Интерактивная логическая карта",
    prompt: "Наведите, сфокусируйте или выберите узел",
    selected: "Закреплённый узел",
    reset: "Вернуться к edge",
    public: "Путь публичного запроса",
    private: "Приватная Tailscale mesh",
    hosted: "Связь с hosted-сервисом",
    workZone: "WORK SERVER / PROXMOX",
    homeZone: "HOME PI / ALWAYS ON",
    meshZone: "TAILSCALE MESH / PRIVATE ACCESS",
  },
} satisfies Record<PortfolioLocale, Record<string, string>>;

export function HomelabArchitecture({ locale }: { locale: PortfolioLocale }) {
  const [selectedId, setSelectedId] = useState("cloudflare");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = hoveredId ?? selectedId;
  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[2];
  const t = copy[locale];

  const selectNode = (id: string) => {
    setSelectedId(id);
    setHoveredId(null);
  };

  return (
    <section className="homelab-explorer" aria-label={t.eyebrow}>
      <header className="homelab-explorer-header">
        <div>
          <p>{t.eyebrow}</p>
          <span>{t.prompt}</span>
        </div>
        <button type="button" onClick={() => selectNode("cloudflare")}>{t.reset}</button>
      </header>

      <div className="homelab-map-wrap">
        <div className="homelab-canvas">
          <svg className="homelab-map" viewBox="0 0 1200 720" role="img" aria-labelledby="homelab-map-title homelab-map-desc">
          <title id="homelab-map-title">Homelab and work infrastructure</title>
          <desc id="homelab-map-desc">Public requests pass through Cloudflare tunnels while devices and hosts communicate over a private Tailscale mesh.</desc>
          <defs>
            <linearGradient id="homelab-zone" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#1b1b22" />
              <stop offset="1" stopColor="#111115" />
            </linearGradient>
            <filter id="homelab-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <marker id="homelab-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0l8 4-8 4z" fill="currentColor" />
            </marker>
          </defs>

          <rect className="homelab-zone homelab-zone-mesh" x="28" y="194" width="1144" height="194" rx="24" />
          <text className="homelab-zone-label" x="52" y="224">{t.meshZone}</text>
          <rect className="homelab-zone" x="28" y="446" width="552" height="218" rx="24" />
          <text className="homelab-zone-label" x="52" y="476">{t.workZone}</text>
          <rect className="homelab-zone" x="620" y="446" width="552" height="218" rx="24" />
          <text className="homelab-zone-label" x="644" y="476">{t.homeZone}</text>

          <path className="homelab-route homelab-route-public" d="M180 127H244M372 127H436" />
          <path className="homelab-route homelab-route-tunnel" d="M500 148C500 418 372 400 372 548" />
          <path className="homelab-route homelab-route-tunnel" d="M500 148C500 194 1076 184 1076 256" />
          <path className="homelab-route homelab-route-private" d="M116 324H1076" />
          <path className="homelab-route homelab-route-hosted" d="M116 344V548M116 410C116 432 244 430 244 548M116 410C116 438 372 432 372 548M116 410C116 444 500 438 500 548" />
          <path className="homelab-route homelab-route-hosted" d="M1076 344V548M1076 410C1076 432 724 432 724 548M1076 410C1076 438 852 434 852 548M1076 410C1076 442 980 438 980 548" />

          <g className="homelab-packets" aria-hidden="true">
            <circle r="5"><animateMotion dur="3.2s" repeatCount="indefinite" path="M180 127H436" /></circle>
            <circle r="4"><animateMotion dur="4.6s" repeatCount="indefinite" path="M500 148C500 418 372 400 372 548" /></circle>
            <circle r="4"><animateMotion dur="5.4s" repeatCount="indefinite" path="M500 148C500 194 1076 184 1076 256" /></circle>
          </g>

          {nodes.map((node) => {
            const isActive = node.id === activeId;
            const isSelected = node.id === selectedId;
            return (
              <g
                className={`homelab-node homelab-node-${node.kind}${isActive ? " is-active" : ""}${isSelected ? " is-selected" : ""}`}
                key={node.id}
                transform={`translate(${node.x} ${node.y})`}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}. ${node.detail[locale]}`}
                aria-pressed={isSelected}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => selectNode(node.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectNode(node.id);
                  }
                }}
              >
                <rect width={node.kind === "service" ? 104 : 128} height={node.kind === "service" ? 72 : 86} rx="16" />
                <circle className="homelab-node-icon" cx="25" cy={node.kind === "service" ? 24 : 29} r="14" />
                <text className="homelab-node-short" x="25" y={node.kind === "service" ? 29 : 34}>{node.short}</text>
                <text className="homelab-node-label" x="14" y={node.kind === "service" ? 57 : 68}>{node.label}</text>
              </g>
            );
          })}
          </svg>
        </div>

        <aside className="homelab-inspector" aria-live="polite">
          <div className={`homelab-inspector-icon homelab-inspector-icon-${activeNode.kind}`}>{activeNode.short}</div>
          <p>{activeNode.kind} / {t.selected}</p>
          <h3>{activeNode.label}</h3>
          <span>{activeNode.detail[locale]}</span>
          <div className="homelab-inspector-signal"><i /><i /><i /><i /></div>
        </aside>
      </div>

      <footer className="homelab-legend" aria-label="Map legend">
        <span><i className="legend-public" />{t.public}</span>
        <span><i className="legend-private" />{t.private}</span>
        <span><i className="legend-hosted" />{t.hosted}</span>
      </footer>
    </section>
  );
}
