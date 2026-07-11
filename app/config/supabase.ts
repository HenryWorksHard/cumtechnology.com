// ============================================
// SUPABASE - community chat backend
// Project: cumtek (isjqcwpdrtkueswzpacd), ap-southeast-2
// The anon key is publishable (client-safe); the messages
// table is guarded by RLS (anon can select + insert only).
// ============================================

export const SUPABASE_URL = 'https://isjqcwpdrtkueswzpacd.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzanFjd3BkcnRrdWVzd3pwYWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NzQzODMsImV4cCI6MjA5OTM1MDM4M30.JQBoDn8Av92QAq9v_0nMmEpjj11tShxXEmezcd99r4o'

export const supabaseHeaders = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
}
