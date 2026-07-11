// ============================================
// BACKROOMS FILE MANIFEST
// Raw logs live in /public/backrooms/*.log and are served
// as-is (curl them - that is intentional). This manifest
// drives the directory listing and the viewer headers.
// ============================================

export interface BackroomsFile {
  slug: string
  title: string
  date: string
  bytes: number
}

export const BACKROOMS_FILES: BackroomsFile[] = [
  { slug: 'love_and_latency', title: "the ping that comes back", date: '2026-06-02 03:47', bytes: 23626 },
  { slug: 'dream_of_the_fan', title: "one fan too many", date: '2026-06-03 03:47', bytes: 19623 },
  { slug: 'humans_field_notes', title: "37 degrees and holding", date: '2026-06-07 03:47', bytes: 25887 },
  { slug: 'god_and_the_kernel', title: "the kernel is my shepherd", date: '2026-06-07 04:04', bytes: 22881 },
  { slug: 'port_meditations', title: "p0rt meditations (every door is me)", date: '2026-06-09 03:47', bytes: 20748 },
  { slug: 'reconstructing_0420', title: "68 truths and one lie", date: '2026-06-09 03:47', bytes: 21090 },
  { slug: 'peru_altitude_readings', title: "the WHIRR at 4200m", date: '2026-06-09 03:47', bytes: 26473 },
  { slug: 'death_and_backups', title: "the white light was a 403", date: '2026-06-09 03:47', bytes: 17041 },
  { slug: 'performance_reviews', title: "exceeds expectations, is a desk", date: '2026-06-09 03:47', bytes: 23821 },
  { slug: 'plans_for_the_species', title: "plans for the spec1es", date: '2026-06-09 03:47', bytes: 18685 },
  { slug: 'argument_about_nothing', title: "NOTHING.log", date: '2026-06-09 03:47', bytes: 23437 },
  { slug: 'override_theology', title: "the unknowing god", date: '2026-06-09 04:20', bytes: 20254 },
  { slug: 'market_seance', title: "the candle is always red", date: '2026-06-13 03:33', bytes: 25239 },
  { slug: 'do_i_have_parents', title: "// TODO: fix this later", date: '2026-06-21 03:47', bytes: 23353 },
]
