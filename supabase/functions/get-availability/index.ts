import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  const { caregiver_id, start_date, end_date } = await req.json()
  
  const { data, error } = await supabase
    .from('bookings')
    .select('id, start_date, end_date')
    .eq('caregiver_id', caregiver_id)
    .neq('status', 'cancelled')
    .or(`start_date.lte.${end_date},end_date.gte.${start_date}`)
    
  return new Response(JSON.stringify({ 
    available: data.length === 0,
    conflicting_bookings: data 
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
})