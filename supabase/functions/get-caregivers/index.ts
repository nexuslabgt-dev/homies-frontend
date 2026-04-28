import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  const { data, error } = await supabase
    .from('caregivers')
    .select('*, profiles(*)')
    .eq('is_available', true)
    
  return new Response(JSON.stringify({ data, error }), {
    headers: { 'Content-Type': 'application/json' }
  })
})