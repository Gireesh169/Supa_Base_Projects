import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wdljzolwcxsqhmbshxeh.supabase.co"
const supabaseKey = "sb_publishable_4UJm-KmlQIJWg-hfqNBLxw_nUYWU965"
export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;  