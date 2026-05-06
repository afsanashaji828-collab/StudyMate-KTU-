import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetch } from '@/hooks'
import {
  subjectService, notesService, videoService,
  questionPaperService, trendService
} from '@/services/api'
import { ModuleCard } from '@/components/features/ModuleCard'
import { VideoList } from '@/components/features/VideoList'
// QuestionPapers import removed as requested
import { TrendAnalysis } from '@/components/features/TrendAnalysis'
import { Tabs, TabPanel } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ModuleCardSkeleton } from '@/components/ui/Skeleton'
import { ErrorState, EmptyState } from '@/components/ui/EmptyState'



// ─── Subject Header ──────────────────────────────────────
function SubjectHeader({ subject }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm animate-fade-in">
        <Link to="/" className="text-slate-500 hover:text-amber-400 transition-colors font-mono text-xs">
          Home
        </Link>
        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link to="/subjects" className="text-slate-500 hover:text-amber-400 transition-colors font-mono text-xs">
          Subjects
        </Link>
        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-amber-400 font-mono text-xs font-semibold">{subject.code}</span>
      </div>

      <div className="flex items-start justify-between gap-6 flex-wrap animate-slide-up">
        <div>
          {/* Code badge */}
          <Badge variant="amber" className="mb-3 text-sm px-3 py-1.5 font-bold">
            {subject.code}
          </Badge>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-3 max-w-xl">
            {subject.name}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-3 flex-wrap">
            {subject.semester && (
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Semester {subject.semester}
              </div>
            )}
            {subject.branch && (
              <>
                <span className="text-slate-700">·</span>
                <span className="text-sm text-slate-400">{subject.branch}</span>
              </>
            )}
            {subject.credits && (
              <>
                <span className="text-slate-700">·</span>
                <span className="text-sm text-slate-400">{subject.credits} Credits</span>
              </>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-3">
          {[
            { label: 'Modules', value: subject.modules?.length || 5 },
            { label: 'Credits', value: subject.credits || '—' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl px-4 py-3 text-center min-w-[72px]">
              <div className="font-display font-bold text-xl text-amber-400">{stat.value}</div>
              <div className="text-xs text-slate-500 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Lazy tab content ────────────────────────────────────
function NotesTab({ code }) {
  const normalizedCode = code?.trim().toUpperCase();

  // temporary debug log
  console.log("Subject Code:", code);
  console.log("Normalized Code:", normalizedCode);

  const notesData = {
    CST306: [
      { title: "Module 1 Notes", file: "/notes/aad_module1.pdf", type: "local" },
      { title: "Module 2 Notes", file: "/notes/aad_module2.pdf", type: "local" },
      { title: "Module 3 Notes", file: "/notes/aad_module3.pdf", type: "local" },
      { title: "Complete Notes (Drive)", file: "https://drive.google.com/drive/folders/1_KzZuS4Cu00T57-Sk75uctoSUMU1q-ji", type: "drive" }
    ],
    MAT101: [
      { title: "Module 1 Notes", file: "/notes/mat101_module1.pdf", type: "local" },
      { title: "Module 2 Notes", file: "/notes/mat101_module2.pdf", type: "local" },
      { title: "Module 3 Notes", file: "/notes/mat101_module3.pdf", type: "local" },
      { title: "Module 4 Notes", file: "/notes/mat101_module4.pdf", type: "local" },
      { title: "Module 5 Notes", file: "/notes/mat101_module5.pdf", type: "local" },
      { title: "Complete Notes (Drive)", file: "https://drive.google.com/drive/folders/1iphRtUb_1L_lcRsBdVXtcjCyubNJ8E48", type: "drive" }
    ],
    PHT100: [
      { title: "Module 1 Notes", file: "/notes/pht100_module1.pdf", type: "local" },
      { title: "Module 2 Notes", file: "/notes/pht100_module2.pdf", type: "local" },
      { title: "Module 3 Notes", file: "/notes/pht100_module3.pdf", type: "local" },
      { title: "Module 4 Notes", file: "/notes/pht100_module4.pdf", type: "local" },
      { title: "Module 5 Notes", file: "/notes/pht100_module5.pdf", type: "local" },
      { title: "Complete Notes (Drive)", file: "https://drive.google.com/drive/folders/1eGiRFbcRKM4_Fzc2EB9Xr159oraIvudk", type: "drive" }
    ],
    CYT100: [
      { title: "Module 1 Notes", file: "/notes/cyt100_module1.pdf", type: "local" },
      { title: "Module 2 Notes", file: "/notes/cyt100_module2.pdf", type: "local" },
      { title: "Module 3 Notes", file: "/notes/cyt100_module3.pdf", type: "local" },
      { title: "Module 4 Notes", file: "/notes/cyt100_module4.pdf", type: "local" },
      { title: "Module 5 Notes", file: "/notes/cyt100_module5.pdf", type: "local" },
      { title: "Complete Notes (Drive)", file: "https://drive.google.com/drive/folders/1csGZK3CjNjLqXRL5eb1BqSmFKVQnTM_H", type: "drive" }
    ],
    EST100: [
      { title: "Module 1 Notes", file: "/notes/est100_module1.pdf", type: "local" },
      { title: "Module 2 Notes", file: "/notes/est100_module2.pdf", type: "local" },
      { title: "Module 3 Notes", file: "/notes/est100_module3.pdf", type: "local" },
      { title: "Module 4 Notes", file: "/notes/est100_module4.pdf", type: "local" },
      { title: "Module 5 Notes", file: "/notes/est100_module5.pdf", type: "local" },
      { title: "Complete Notes (Drive)", file: "https://drive.google.com/drive/folders/1p8Uo4d9h1W_D5YePV6JVqKh6onmc1N50", type: "drive" }
    ],
    EST110: [
      { title: "Module 1 Notes", file: "/notes/est110_module1.pdf", type: "local" },
      { title: "Module 2 Notes", file: "/notes/est110_module2.pdf", type: "local" },
      { title: "Module 3 Notes", file: "/notes/est110_module3.pdf", type: "local" },
      { title: "Module 4 Notes", file: "/notes/est110_module4.pdf", type: "local" },
      { title: "Module 5 Notes", file: "/notes/est110_module5.pdf", type: "local" },
      { title: "Complete Notes (Drive)", file: "https://drive.google.com/drive/folders/1862-lBSWVkytdIl9O4OtF3Ve5U5marvv", type: "drive" }
    ],
    EST120: [
      {
        title: "Complete Notes (Drive)",
        file: "https://drive.google.com/drive/folders/1RjGNzegJCMi4m-bIqefyoYZsAj5GbKSU",
        type: "drive"
      }
    ],
    EST130: [
      {
        title: "Complete Notes (Drive)",
        file: "https://drive.google.com/drive/folders/1krp1jDEtGSZc4XxeN482bRcBkz85RBQO",
        type: "drive"
      }
    ],
    HUN101: [
      { title: "Module 1 - Communication Skills", file: "/notes/hun101_module1.pdf", type: "local" },
      { title: "Module 2 - Professional Skills", file: "/notes/hun101_module2.pdf", type: "local" },
      { title: "Module 3 - Leadership & Teamwork", file: "/notes/hun101_module3.pdf", type: "local" },
      { title: "Module 4 - Ethics & Values", file: "/notes/hun101_module4.pdf", type: "local" },
      { title: "Module 5 - Personality Development", file: "/notes/hun101_module5.pdf", type: "local" },
      { title: "Complete Notes (Drive)", file: "https://drive.google.com/drive/folders/1_D3G2iu-MMPTZxhP2sEdXRjYd8TJ6mfM", type: "drive" }
    ]
  };

  const notes = notesData[normalizedCode] || [];

  function handleOpen(note) {
    if (note.type === "drive") {
      window.open(note.file, "_blank");
    } else {
      window.open(note.file, "_blank");
    }
  }

  return (
    <div className="space-y-4">
      {notes.length > 0 ? (
        notes.map((note, i) => (
          <div key={i} className="glass-card rounded-xl p-4 flex items-center justify-between hover:border-amber-400/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-700/50 border border-white/8 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-white flex items-center gap-2">
                  {note.title}
                  {note.type === "drive" && <span className="text-xs font-mono text-amber-400 bg-navy-950 px-2 py-0.5 rounded border border-amber-400/20">🌐 Drive</span>}
                  {note.type === "local" && <span className="text-xs font-mono text-slate-300 bg-navy-950 px-2 py-0.5 rounded border border-white/10">📄 PDF</span>}
                </h4>
              </div>
            </div>
            <Button onClick={() => handleOpen(note)} variant="secondary" size="sm">
              View Notes
            </Button>
          </div>
        ))
      ) : (
        <div className="glass-card rounded-xl p-8 text-center text-slate-400">
          No notes available
        </div>
      )}
    </div>
  );
}

function VideosTab({ code }) {
  const { data: res, loading, error } = useFetch(() => videoService.getByCode(code), [code])
  const videos = Array.isArray(res?.data?.data) ? res.data.data : []

  if (loading) return <div className="animate-pulse space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-24 glass-card rounded-xl" />)}</div>
  if (error) return <ErrorState error={error} />
  return <VideoList videos={videos} />
}

function PapersTab({ code }) {
  const isAAD = code === "CST306";
  const isAI = code === "CST401";

  const aadQPs = [
    { year: 2023, exam: "Regular", file: "/qps/aad_2023.pdf" },
    { year: 2022, exam: "Supplementary", file: "/qps/aad_2022.pdf" }
  ];

  const aiQPs = [
    { year: 2023, exam: "Regular", file: "/qps/ai_2023.pdf" },
    { year: 2022, exam: "Supplementary", file: "/qps/ai_2022.pdf" }
  ];

  return (
    <div className="space-y-4">
      {isAAD ? (
        aadQPs.map((qp, i) => (
          <div key={i} style={{ marginBottom: "15px" }} className="glass-card rounded-xl p-4 flex items-center justify-between hover:border-amber-400/20 transition-colors">
            <h4 className="font-medium text-white">{qp.year} - {qp.exam}</h4>
            <Button onClick={() => window.open(qp.file, "_blank")} variant="secondary" size="sm">
              View Official Question Paper
            </Button>
          </div>
        ))
      ) : isAI ? (
        aiQPs.map((qp, i) => (
          <div key={i} style={{ marginBottom: "15px" }} className="glass-card rounded-xl p-4 flex items-center justify-between hover:border-amber-400/20 transition-colors">
            <h4 className="font-medium text-white">{qp.year} - {qp.exam}</h4>
            <Button onClick={() => window.open(qp.file, "_blank")} variant="secondary" size="sm">
              View Official Question Paper
            </Button>
          </div>
        ))
      ) : (
        <div className="glass-card rounded-xl p-8 text-center text-slate-400">
          No papers available
        </div>
      )}
    </div>
  );
}

function TrendTab({ code }) {
  const { data: res, loading, error } = useFetch(() => trendService.getByCode(code), [code])
  const trend = res?.data?.data || {}

  if (loading) return <div className="animate-pulse space-y-4">{[1, 2].map(i => <div key={i} className="h-40 glass-card rounded-xl" />)}</div>
  if (error) return <ErrorState error={error} />
  return <TrendAnalysis trend={trend} />
}

// ─── Main page ───────────────────────────────────────────
export function SubjectPage() {
  const { code } = useParams()
  const [activeTab, setActiveTab] = useState('modules')

  const { data: res, loading, error, refetch } = useFetch(
    () => subjectService.getByCode(code),
    [code]
  )

  const subject = res?.data?.data || {}
  const modules = Array.isArray(subject?.modules) ? subject.modules : []

  const tabs = [
    { id: 'modules', label: 'Modules', icon: '📚', count: modules.length },
    { id: 'notes', label: 'Notes', icon: '📄' },
    { id: 'videos', label: 'Videos', icon: '🎬' },
    { id: 'papers', label: 'Past Papers', icon: '📋' },
    { id: 'trends', label: 'Trends', icon: '📊' },
  ]

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-24 skeleton rounded-full" />
          <div className="h-10 w-96 skeleton rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map(i => <ModuleCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <ErrorState
          title="Failed to load subject"
          description={error.message || "Please check your connection."}
          onRetry={refetch}
        />
      </div>
    )
  }

  return (
    <div>
      {subject?.code && <SubjectHeader subject={subject} />}



      {/* Tab navigation */}
      <div className="sticky top-16 z-30 bg-navy-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Modules tab */}
        <TabPanel id="modules" activeTab={activeTab}>
          {modules.length === 0 ? (
            <EmptyState icon="📚" title="No modules" description="Module data not available." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {modules.map((mod, i) => (
                <div
                  key={mod.moduleNo || i}
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  <ModuleCard module={mod} subjectCode={code} />
                </div>
              ))}
            </div>
          )}
        </TabPanel>

        {/* Notes tab */}
        <TabPanel id="notes" activeTab={activeTab}>
          <NotesTab code={code} />
        </TabPanel>

        {/* Videos tab */}
        <TabPanel id="videos" activeTab={activeTab}>
          <VideosTab code={code} />
        </TabPanel>

        {/* Papers tab */}
        <TabPanel id="papers" activeTab={activeTab}>
          <PapersTab code={code} />
        </TabPanel>

        {/* Trends tab */}
        <TabPanel id="trends" activeTab={activeTab}>
          <TrendTab code={code} />
        </TabPanel>
      </div>
    </div>
  )
}
