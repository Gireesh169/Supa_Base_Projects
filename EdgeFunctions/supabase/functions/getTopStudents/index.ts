import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

interface Student {
  id: string
  name: string
  marks: number
}

interface StudentWithGrade extends Student {
  grade: string
}

serve(async (req: Request) => {

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .gt("marks", 70)

  if (error) {
    return new Response(JSON.stringify(error), { status: 400 })
  }

  const result = data.map((student: Student): StudentWithGrade => ({
    ...student,
    grade: student.marks > 90 ? "A" : "B"
  }))

  return new Response(
    JSON.stringify(result),
    { headers: { "Content-Type": "application/json" } }
  )
})