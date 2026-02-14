'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, TrendingDown, Zap, Apple, Dumbbell, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'meal-plan' | 'workouts' | 'tracking'>('overview');

  const healthStats = {
    currentWeight: 'TBD',
    goalWeight: '160 lbs',
    currentA1C: 'TBD',
    goalA1C: '<6.5%',
    duration: '12 weeks',
    startDate: 'Feb 14, 2026',
  };

  const tabs = [
    { id: 'overview' as const, label: '📊 Overview', icon: Heart },
    { id: 'meal-plan' as const, label: '🍽️ Meal Plan', icon: Apple },
    { id: 'workouts' as const, label: '💪 Workouts', icon: Dumbbell },
    { id: 'tracking' as const, label: '📈 Tracking', icon: TrendingDown },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-7 h-7 text-red-500" />
                Health & Fitness Plan
              </h1>
              <p className="text-slate-400 text-sm">12-week diabetes management & weight loss program</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400">Current Weight</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">{healthStats.currentWeight}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400">Goal Weight</div>
            <div className="text-2xl font-bold text-green-400 mt-1">{healthStats.goalWeight}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400">Current A1C</div>
            <div className="text-2xl font-bold text-yellow-400 mt-1">{healthStats.currentA1C}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400">Goal A1C</div>
            <div className="text-2xl font-bold text-purple-400 mt-1">{healthStats.goalA1C}</div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-100">
            <strong>Medical Disclaimer:</strong> This plan supports diabetes management but doesn't replace medical advice. Check with your doctor before starting, especially before workouts. Monitor blood sugar closely.
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-3">Program Overview</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  This is a <strong>complete, actionable roadmap</strong> for the next 12 weeks combining:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span> Diabetes-friendly nutrition
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span> Progressive strength training with Total Gym FIT
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span> Blood sugar management strategies
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span> Daily tracking & accountability
                  </li>
                </ul>
              </section>

              <section className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold mb-4">How to Get Started</h3>
                <ol className="space-y-3 text-slate-300">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 flex-shrink-0">1.</span>
                    <span>Read the complete plan (20-30 minutes)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 flex-shrink-0">2.</span>
                    <span>Download & print the tracking sheets</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 flex-shrink-0">3.</span>
                    <span>Do your first grocery shopping</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 flex-shrink-0">4.</span>
                    <span>Start on a Monday (Feb 17 or Feb 24)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 flex-shrink-0">5.</span>
                    <span>Track everything daily (meals, workouts, blood sugar)</span>
                  </li>
                </ol>
              </section>

              <section className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold mb-4">Key Milestones</h3>
                <div className="space-y-2 text-slate-300">
                  <p>📅 <strong>Week 1-2:</strong> Establish routine, baseline metrics</p>
                  <p>📅 <strong>Week 3-4:</strong> First noticeable energy boost</p>
                  <p>📅 <strong>Week 5-6:</strong> Weight loss becomes visible (2-3 lbs)</p>
                  <p>📅 <strong>Week 7-8:</strong> Strength improvements, better sleep</p>
                  <p>📅 <strong>Week 9-12:</strong> Sustained progress, habit formation</p>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'meal-plan' && (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-3">30-Day Meal Plan</h2>
                <p className="text-slate-300 mb-4">
                  Diabetes-friendly meals focusing on:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300 mb-6">
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span> Lean proteins
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span> Low glycemic vegetables
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span> Whole grains (limited)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span> Healthy fats
                  </li>
                </ul>
                <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                  <p className="text-sm text-slate-400 mb-3">Sample Day:</p>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>🌅 <strong>Breakfast:</strong> Veggie egg scramble with whole grain toast</p>
                    <p>🥗 <strong>Lunch:</strong> Grilled chicken with brown rice + steamed broccoli</p>
                    <p>🍎 <strong>Snack:</strong> Apple + almonds</p>
                    <p>🍲 <strong>Dinner:</strong> Salmon with roasted vegetables</p>
                  </div>
                </div>
              </section>

              <section className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold mb-4">Download Full Meal Plan</h3>
                <p className="text-slate-300 mb-4">
                  The complete 30-day meal plan with specific recipes, shopping lists, and macro targets is available in the full health document.
                </p>
                <Link
                  href="/documents"
                  className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition text-sm font-medium"
                >
                  View Full Document
                </Link>
              </section>
            </div>
          )}

          {activeTab === 'workouts' && (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-3">12-Week Workout Schedule</h2>
                <p className="text-slate-300 mb-4">
                  Progressive strength training using your <strong>Total Gym FIT Ultimate</strong>
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h3 className="font-semibold text-blue-300 mb-2">Weeks 1-4: Foundation</h3>
                    <p className="text-sm text-slate-300">3 days/week, 30 min sessions. Focus: Form + consistency</p>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h3 className="font-semibold text-blue-300 mb-2">Weeks 5-8: Build</h3>
                    <p className="text-sm text-slate-300">4 days/week, 35 min sessions. Increase resistance, add reps</p>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h3 className="font-semibold text-blue-300 mb-2">Weeks 9-12: Strength</h3>
                    <p className="text-sm text-slate-300">4 days/week, 40 min sessions. Max resistance, compound moves</p>
                  </div>
                </div>
              </section>

              <section className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold mb-4">Sample Workout (30 min)</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>🔢 5 min warm-up (light stretching)</p>
                  <p>💪 Chest press: 3 sets × 12 reps</p>
                  <p>💪 Leg press: 3 sets × 12 reps</p>
                  <p>💪 Row: 3 sets × 12 reps</p>
                  <p>💪 Core work: 2 sets × 15 reps</p>
                  <p>🔄 5 min cool-down + stretching</p>
                </div>
              </section>

              <section className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold mb-4">Download Full Workout Plan</h3>
                <p className="text-slate-300 mb-4">
                  Complete week-by-week progression with all exercises, sets, reps, and adjustments.
                </p>
                <Link
                  href="/documents"
                  className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition text-sm font-medium"
                >
                  View Full Document
                </Link>
              </section>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-3">Daily & Weekly Tracking</h2>
                <p className="text-slate-300 mb-4">
                  Track these metrics to stay accountable:
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h3 className="font-semibold text-yellow-300 mb-2">📊 Daily Tracking</h3>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>✓ Weight (same time, same scale)</li>
                      <li>✓ Blood sugar (morning & before bed)</li>
                      <li>✓ Meals eaten</li>
                      <li>✓ Workouts completed</li>
                      <li>✓ Water intake (8 glasses)</li>
                      <li>✓ Sleep hours</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h3 className="font-semibold text-blue-300 mb-2">📈 Weekly Summary</h3>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>✓ Weight change</li>
                      <li>✓ Average blood sugar</li>
                      <li>✓ Total workouts completed</li>
                      <li>✓ Notes & observations</li>
                      <li>✓ Adjustments needed</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h3 className="font-semibold text-green-300 mb-2">🎯 Monthly Review</h3>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>✓ Total weight loss</li>
                      <li>✓ A1C trend</li>
                      <li>✓ Strength improvements</li>
                      <li>✓ Energy/mood changes</li>
                      <li>✓ Next month goals</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold mb-4">Download Tracking Sheets</h3>
                <p className="text-slate-300 mb-4">
                  Ready-to-use PDF tracking sheets for daily, weekly, and monthly progress.
                </p>
                <Link
                  href="/documents"
                  className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition text-sm font-medium"
                >
                  View Full Document
                </Link>
              </section>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Ready to Start?</h3>
          <p className="text-slate-300 mb-4">
            The complete health plan with meal recipes, shopping lists, detailed workout progressions, and tracking sheets is available in the documents.
          </p>
          <Link
            href="/documents"
            className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition font-medium"
          >
            View Complete Health Plan
          </Link>
        </div>
      </main>
    </div>
  );
}
