import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  const { service_id, caregiver_id, pet_id, start_date, end_date, notes } = await req.json()
  
  const { data: service } = await supabase
    .from('services')
    .select('base_price, price_unit')
    .eq('id', service_id)
    .single()
    
  const start = new Date(start_date)
  const end = new Date(end_date)
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  const total_price = service.base_price * (service.price_unit === 'night' ? days : 1)
  
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      service_id,
      caregiver_id,
      pet_id,
      start_date,
      end_date,
      total_price,
      notes,
      status: 'pending'
    })
    .select()
    .single()
    
  return new Response(JSON.stringify({ data, error }), {
    headers: { 'Content-Type': 'application/json' }
  })
})