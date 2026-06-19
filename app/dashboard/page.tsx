"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Calculator,
  Calendar,
  Compass,
  Flame,
  MessageSquare,
  Stethoscope,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
type DashboardProfile = {
  full_name: string;
  class_name: string;
  school: string;
};

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${Math.max(0, mins)} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

const getActivityStyle = (type: string) => {
  switch (type) {
    case 'note':
      return {
        icon: BookOpen,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        badgeClass: "bg-blue-50 text-blue-600",
      };
    case 'ai':
      return {
        icon: MessageSquare,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
        badgeClass: "bg-purple-50 text-purple-600",
      };
    case 'opportunity':
      return {
        icon: Trophy,
        iconBg: "bg-yellow-50",
        iconColor: "text-yellow-500",
        badgeClass: "bg-[#FDF6EE] text-[#D4AF37]",
      };
    default:
      return {
        icon: Compass,
        iconBg: "bg-green-50",
        iconColor: "text-green-500",
        badgeClass: "bg-green-50 text-green-600",
      };
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [stats, setStats] = useState({
    notesSaved: 0,
    questionsAsked: 0,
    opportunitiesApplied: 0,
    daysActive: 1,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [savedNotes, setSavedNotes] = useState<any[]>([]);
  const [recommendedOpps, setRecommendedOpps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const displayName = profile?.full_name || "Student";
  const displayClass = profile?.class_name || "";
  const avatarLetter =
    profile?.full_name?.[0]?.toUpperCase() || "S";

  const welcomeDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile({
          full_name: profileData?.full_name || user.user_metadata?.full_name || "Student",
          class_name: profileData?.class_name || user.user_metadata?.class_name || "",
          school: profileData?.school || "",
        });

        // Notes Saved — real count
        const { count: notesCount } = await supabase
          .from('saved_notes')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Questions Asked — ai_chat_history se real count
        const { count: chatCount } = await supabase
          .from('ai_chat_history')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Opportunities Applied — real count
        const { count: oppCount } = await supabase
          .from('opportunity_applications')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Days Active — account creation se calculate karo
        const createdAt = new Date(user.created_at);
        const today = new Date();
        const daysActive = Math.max(1, Math.floor(
          (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        ));

        setStats({
          notesSaved: notesCount || 0,
          questionsAsked: chatCount || 0,
          opportunitiesApplied: oppCount || 0,
          daysActive: daysActive
        });

        // Real recent activity — combine karo teen sources se
        const activities: any[] = [];

        // Saved notes
        const { data: recentSaved } = await supabase
          .from('saved_notes')
          .select('created_at, notes(title)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(2);

        recentSaved?.forEach(item => {
          activities.push({
            type: 'note',
            text: `Saved note: ${(item.notes as any)?.title || 'Unknown'}`,
            time: item.created_at,
            badge: 'Notes',
            color: 'blue'
          });
        });

        // AI Chat history
        const { data: recentChats } = await supabase
          .from('ai_chat_history')
          .select('question, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(2);

        recentChats?.forEach(item => {
          activities.push({
            type: 'ai',
            text: `Asked AI: ${item.question.substring(0, 40)}...`,
            time: item.created_at,
            badge: 'AI Guide',
            color: 'purple'
          });
        });

        // Opportunity applications
        const { data: recentApps } = await supabase
          .from('opportunity_applications')
          .select('applied_at, opportunities(title)')
          .eq('user_id', user.id)
          .order('applied_at', { ascending: false })
          .limit(2);

        recentApps?.forEach(item => {
          activities.push({
            type: 'opportunity',
            text: `Applied for: ${(item.opportunities as any)?.title || 'Unknown'}`,
            time: item.applied_at,
            badge: 'Opportunity',
            color: 'yellow'
          });
        });

        // Sort by time — latest first
        activities.sort((a, b) => 
          new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setRecentActivity(activities.slice(0, 4));

        // Real saved notes fetch karo
        const { data: savedNotesData } = await supabase
          .from('saved_notes')
          .select(`
            note_id,
            notes (
              id,
              title,
              subject,
              class_name
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(2);

        setSavedNotes(savedNotesData || []);

        const studentClass = parseInt(profileData?.class_name || '10');

        // Opportunities fetch — class match karo
        const { data: recommendedOpps } = await supabase
          .from('opportunities')
          .select('*')
          .eq('is_published', true)
          .lte('min_class', studentClass)  // min_class <= student class
          .gte('max_class', studentClass)  // max_class >= student class
          .limit(2);

        setRecommendedOpps(recommendedOpps || []);

      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />
          <p className="mt-3 text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-auto bg-[#FAFAF8]">
      <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-8 py-4">
        <div>
          <h1 className="text-xl font-bold text-[#111111]">My Dashboard</h1>
          <p className="mt-0.5 text-sm text-gray-400">
            {welcomeDate} · Welcome back, {displayName.split(" ")[0]}! 👋
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] transition-colors hover:bg-white"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37] text-sm font-bold text-black">
            {avatarLetter}
          </div>
        </div>
      </header>

      <div className="space-y-6 px-6 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37] text-2xl font-bold text-black ring-4 ring-[#D4AF37]/20">
                {avatarLetter}
              </div>
              <Link
                href="/dashboard/profile"
                className="rounded-xl border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[#FAFAF8]"
              >
                Edit Profile
              </Link>
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#111111]">{displayName}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {displayClass && (
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                  Class {displayClass}
                </span>
              )}
              <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-600">
                Student
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Passionate about Science & Technology
            </p>
            <div className="mt-4 border-t border-[#F3F4F6]" />
            <div className="mt-4 flex gap-4">
              <span className="rounded-lg bg-[#FAFAF8] px-3 py-1 text-xs text-gray-600">
                📚 Science
              </span>
              <span className="rounded-lg bg-[#FAFAF8] px-3 py-1 text-xs text-gray-600">
                🔢 Maths
              </span>
            </div>
          </div>

          <div className="col-span-1 grid grid-cols-2 gap-4 lg:col-span-2">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#111111]">{stats.notesSaved}</p>
                  <p className="mt-1 text-sm text-gray-500">Notes Saved</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#111111]">{stats.questionsAsked}</p>
                  <p className="mt-1 text-sm text-gray-500">Questions Asked</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#111111]">{stats.opportunitiesApplied}</p>
                  <p className="mt-1 text-sm text-gray-500">Opportunities Applied</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF6EE]">
                  <Trophy className="h-5 w-5 text-[#D4AF37]" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#111111]">{stats.daysActive}</p>
                  <p className="mt-1 text-sm text-gray-500">Days Active</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-[#111111]">Continue Learning</h2>
                <p className="mt-1 text-xs text-gray-400">Pick up where you left off.</p>
              </div>
              <Link
                href="/notes"
                className="text-sm text-[#D4AF37] hover:underline"
              >
                View All Notes →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {savedNotes.length === 0 ? (
                <div className="text-center py-6 bg-[#FAFAF8] rounded-xl border border-[#E5E7EB]">
                  <p className="text-sm text-gray-500">No saved notes yet.</p>
                  <Link href="/notes" className="text-xs text-[#D4AF37] font-medium mt-2 block hover:underline">
                    Browse Notes →
                  </Link>
                </div>
              ) : (
                savedNotes.map((item: any) => (
                  <div key={item.note_id} className="bg-[#FAFAF8] rounded-xl p-4 border border-[#E5E7EB]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-[#111111]">{item.notes?.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.notes?.subject} · Class {item.notes?.class_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-3">
            <div>
              <h2 className="text-base font-bold text-[#111111]">Recommended for You</h2>
              <p className="mt-1 text-xs text-gray-400">Based on your interests.</p>
            </div>

            {recommendedOpps.length === 0 ? (
              <div className="text-center py-6 bg-[#FAFAF8] rounded-xl border border-[#E5E7EB]">
                <p className="text-sm text-gray-500">No recommended opportunities found.</p>
              </div>
            ) : (
              recommendedOpps.map((opp: any) => (
                <div key={opp.id} className="flex items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-gradient-to-r from-[#FDF6EE] to-white p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 p-2 text-yellow-500">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111111]">{opp.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      Deadline: {opp.deadline}
                    </p>
                    <Link
                      href="/opportunities"
                      className="mt-2 inline-block text-xs font-medium text-[#D4AF37] hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))
            )}

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Compass className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#111111]">Explore Careers</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Discover career paths that match your interests
                  </p>
                  <Link href="/careers" className="text-xs text-blue-500 font-medium mt-1 block hover:underline">
                    View All Careers →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#111111]">Recent Activity</h2>
            <span className="rounded-full border border-[#E5E7EB] bg-[#FAFAF8] px-3 py-1 text-xs text-gray-500">
              Today
            </span>
          </div>

          {recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No activity yet.</p>
              <p className="text-gray-400 text-xs mt-1">
                Try asking the AI Guide a question or save a note!
              </p>
            </div>
          ) : (
            <ul className="mt-4">
              {recentActivity.map((item: any, idx: number) => {
                const style = getActivityStyle(item.type);
                const IconComponent = style.icon;
                return (
                  <li
                    key={idx}
                    className="flex cursor-pointer items-center gap-4 rounded-xl border-b border-[#F3F4F6] px-2 py-3.5 transition-all last:border-0 hover:bg-[#FAFAF8]"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconBg}`}
                    >
                      <IconComponent className={`h-4 w-4 ${style.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#111111]">{item.text}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{timeAgo(item.time)}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
