"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { helpers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type RequestMode = "customer" | "helper";

function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mode, setMode] = useState<RequestMode>("customer");
  const [needDate, setNeedDate] = useState("");
  const [needTime, setNeedTime] = useState("");
  const [needLocation, setNeedLocation] = useState("");
  const [needTask, setNeedTask] = useState("");

  useEffect(() => {
    if (searchParams) {
      setNeedDate(searchParams.get("date") || "");
      setNeedTime(searchParams.get("time") || "");
      setNeedLocation(searchParams.get("location") || "");
      setNeedTask(searchParams.get("task") || "");
    }
  }, [searchParams]);

  const filteredHelpers = useMemo(() => {
    return helpers.slice(0, 3);
  }, []);

  const openDispatch = () => {
    const query = new URLSearchParams();
    if (mode) query.set("mode", mode);
    router.push(`/dispatch?${query.toString()}`);
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <section className="surface booking-panel bg-white/80 border border-white/60 p-6 rounded-[2rem] shadow-soft">
        <div className="eyebrow text-xs font-semibold uppercase tracking-[0.24em] text-forest-500">Buchung</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-forest-900">Wann brauchst du Gartenarbeit?</h1>
        <p className="mt-3 text-sm leading-7 text-forest-700">Datum, Uhrzeit und Ort oben angeben, dann dispatchen wir passende Helfer in deiner Nähe.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <label className="field flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">Datum</span>
            <input value={needDate} onChange={(e) => setNeedDate(e.target.value)} type="date" className="input min-h-12 rounded-2xl border border-forest-100 px-4" />
          </label>
          <label className="field flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">Uhrzeit</span>
            <input value={needTime} onChange={(e) => setNeedTime(e.target.value)} type="time" className="input min-h-12 rounded-2xl border border-forest-100 px-4" />
          </label>
          <label className="field flex flex-col gap-2 md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">Ort / PLZ</span>
            <input value={needLocation} onChange={(e) => setNeedLocation(e.target.value)} placeholder="Düsseldorf 40210" className="input min-h-12 rounded-2xl border border-forest-100 px-4" />
          </label>
          <label className="field flex flex-col gap-2 md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-500">Aufgabe</span>
            <input value={needTask} onChange={(e) => setNeedTask(e.target.value)} placeholder="Unkraut jäten, Rasen mähen..." className="input min-h-12 rounded-2xl border border-forest-100 px-4" />
          </label>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setMode("customer")}
            className={cn("min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition", mode === "customer" ? "border-forest-500 bg-forest-50 text-forest-900" : "border-forest-100 bg-white text-forest-700")}
          >
            Ich brauche Hilfe
          </button>
          <button
            type="button"
            onClick={() => setMode("helper")}
            className={cn("min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition", mode === "helper" ? "border-forest-500 bg-forest-50 text-forest-900" : "border-forest-100 bg-white text-forest-700")}
          >
            Ich biete Hilfe
          </button>
        </div>

        <button type="button" onClick={openDispatch} className="mt-6 min-h-12 w-full rounded-2xl bg-forest-700 px-5 text-sm font-semibold text-white transition hover:bg-forest-800">
          Anfrage bestätigen
        </button>

        <div className="mt-5 rounded-3xl border border-forest-100 bg-forest-50 p-4 text-sm text-forest-800">
          {mode === "helper" ? "Helfer-Flow: Die Anfrage geht direkt in die Queue." : "Kunden-Flow: Wir dispatchen passende Helfer in deiner Nähe."}
        </div>
      </section>

      <aside className="space-y-6">
        <article className="surface booking-preview bg-white/80 border border-white/60 p-6 rounded-[2rem] shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-forest-900">Vorschau</h3>
              <p className="mt-1 text-sm text-forest-600">So wird die Anfrage dispatcht.</p>
            </div>
            <span className="status-pill rounded-full bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">{filteredHelpers.length}</span>
          </div>
          <div className="mt-4 grid gap-3">
            <div className="info-row flex justify-between bg-white border border-forest-100 p-3 rounded-2xl"><span className="text-forest-600 text-sm">Wann</span><strong className="text-forest-900 text-sm">{needDate || "—"}</strong></div>
            <div className="info-row flex justify-between bg-white border border-forest-100 p-3 rounded-2xl"><span className="text-forest-600 text-sm">Zeit</span><strong className="text-forest-900 text-sm">{needTime || "—"}</strong></div>
            <div className="info-row flex justify-between bg-white border border-forest-100 p-3 rounded-2xl"><span className="text-forest-600 text-sm">Ort</span><strong className="text-forest-900 text-sm">{needLocation || "—"}</strong></div>
            <div className="info-row flex justify-between bg-white border border-forest-100 p-3 rounded-2xl"><span className="text-forest-600 text-sm">Aufgabe</span><strong className="text-forest-900 text-sm">{needTask || "—"}</strong></div>
          </div>
        </article>

        <article className="surface booking-preview bg-white/80 border border-white/60 p-6 rounded-[2rem] shadow-soft">
          <h3 className="text-xl font-semibold text-forest-900">Passende Helfer</h3>
          <div className="mt-4 space-y-3">
            {filteredHelpers.map((helper) => (
              <div key={helper.id} className="rounded-2xl border border-forest-100 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="text-forest-900">{helper.name}</strong>
                      <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">{helper.role}</span>
                    </div>
                    <p className="mt-1 text-sm text-forest-600">
                      {helper.location} • {helper.distanceKm.toFixed(1)} km • {helper.responseMins} Min.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.22em] text-forest-500">Bewertung</div>
                    <div className="text-lg font-semibold text-forest-900">{helper.rating.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </aside>
    </main>
  );
}

export default function BookingPageWrapper() {
  return (
    <React.Suspense fallback={<div className="flex justify-center p-8">Lade Buchungsseite...</div>}>
      <BookingPage />
    </React.Suspense>
  );
}
