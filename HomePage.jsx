import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch, useDebounce } from '@/hooks'
import { subjectService } from '@/services/api'
import { SubjectCard } from '@/components/features/SubjectCard'
import { SubjectCardSkeleton, PageSkeleton } from '@/components/ui/Skeleton'
import { SearchBar } from '@/components/ui/SearchBar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/EmptyState'
import { Chatbot } from '@/components/features/Chatbot'


function HeroSection({ subjectCount }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-6 animate-fade-in">
        <div className="w-5 h-px bg-amber-400" />
        <span className="text-amber-400 text-xs font-mono tracking-[0.2em] uppercase">Kerala Technological University</span>
      </div>

      <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-5 animate-slide-up">
        Study<br />
        <span className="text-gradient">smarter.</span>
      </h1>

      <p className="text-slate-400 text-lg max-w-lg leading-relaxed mb-8 animate-slide-up delay-100">
        Access module-wise notes, video lectures, previous question papers, and AI-powered exam trend analysis — all in one place.
      </p>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-10 animate-slide-up delay-200">
        {[
          { value: subjectCount || '50+', label: 'Subjects' },
          { value: '5', label: 'Modules each' },
          { value: 'AI', label: 'Trend Analysis' },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-3">
            <div>
              <div className="font-display font-bold text-xl text-amber-400 leading-none">{stat.value}</div>
              <div className="text-xs text-slate-500 font-mono">{stat.label}</div>
            </div>
            {i < 2 && <div className="w-px h-8 bg-white/10" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function SemesterFilter({ activeSemester, onChange }) {
  const semesters = ['All', 1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-slate-500 font-mono mr-1">Semester:</span>
      {semesters.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s === 'All' ? null : s)}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-mono transition-all
            ${activeSemester === (s === 'All' ? null : s)
              ? 'bg-amber-400 text-navy-950 font-bold'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }
          `}
        >
          {s === 'All' ? 'All' : `S${s}`}
        </button>
      ))}
    </div>
  )
}

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSemester, setActiveSemester] = useState(null)
  const debouncedQuery = useDebounce(searchQuery, 250)
  const navigate = useNavigate()

  const { data: res, loading, error, refetch } = useFetch(
    () => subjectService.getAll(),
    []
  )

  const subjects = Array.isArray(res?.data?.data) ? res.data.data : []

  const filtered = useMemo(() => {
    return subjects.filter((subject) => {
      const q = debouncedQuery.toLowerCase()
      const matchesSearch = !q ||
        subject.code?.toLowerCase().includes(q) ||
        subject.name?.toLowerCase().includes(q) ||
        subject.branch?.toLowerCase().includes(q)
      const matchesSemester = !activeSemester || Number(subject.semester) === Number(activeSemester)
      return matchesSearch && matchesSemester
    })
  }, [subjects, debouncedQuery, activeSemester])

  return (
    <div>
      <HeroSection subjectCount={subjects.length} />

      {/* Search + Filter bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="glass-card rounded-2xl p-4 space-y-4 animate-slide-up delay-300">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by subject code, name, or branch..."
          />
          <SemesterFilter activeSemester={activeSemester} onChange={setActiveSemester} />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Count + state */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-semibold text-white text-lg">
              {searchQuery || activeSemester ? 'Results' : 'All Subjects'}
            </h2>
            {!loading && (
              <Badge variant="default">{filtered.length}</Badge>
            )}
          </div>
          {(searchQuery || activeSemester) && (
            <button
              onClick={() => { setSearchQuery(''); setActiveSemester(null) }}
              className="text-xs text-slate-500 hover:text-amber-400 transition-colors font-mono"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6 animate-fade-in">
            <ErrorState 
              title="Failed to load subjects" 
              description={error.message || "Please check your connection to the backend server."}
              onRetry={refetch}
            />
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SubjectCardSkeleton key={i} />)}
          </div>
        )}

        {/* Empty state for no results */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="font-display font-semibold text-white text-xl mb-2">No subjects found</h3>
            <p className="text-slate-400 text-sm mb-6">
              Try searching with a different subject code or name
            </p>
            <Button variant="secondary" onClick={() => { setSearchQuery(''); setActiveSemester(null) }}>
              Clear search
            </Button>
          </div>
        )}

        {/* Subject grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((subject, i) => (
              <SubjectCard
                key={subject._id || subject.code}
                subject={subject}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  )
}
