import { createClient } from 'jsr:@supabase/supabase-js@2'
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
)

Deno.serve(async (req) => {
  const { data, error } = await supabase
    .from('caregivers')
    .select('*, profiles(*)')
    .eq('is_available', true)
    
  return new Response(JSON.stringify({ data, error }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
