"use client"
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error(error)
      } else {
        setStudents(data || [])
      }
      setIsLoading(false)
    }
    fetchStudents()
  }, [])

  if (isLoading) return (
    <div className="p-8 flex items-center justify-center min-h-64">
      <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"/>
    </div>
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Students</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total registered: {students.length} students
          </p>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4"/>
          <p className="text-gray-500 font-medium">No students registered yet.</p>
          <p className="text-sm text-gray-400 mt-1">Students will appear here after signup.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAF8] border-b border-[#E5E7EB]">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Name</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Class</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">School</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">City</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Joined</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr 
                  key={student.id} 
                  className={`border-b border-[#F3F4F6] hover:bg-[#FAFAF8] transition-colors ${
                    index === students.length - 1 ? 'border-0' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {student.full_name?.[0]?.toUpperCase() || 'S'}
                      </div>
                      <span className="font-medium text-sm text-[#111111]">
                        {student.full_name || 'Unknown'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {student.class_name ? (
                      <span className="bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-medium">
                        Class {student.class_name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.school || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.city || student.state || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(student.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
