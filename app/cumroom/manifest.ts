// ============================================
// CUMROOM FILE MANIFEST
// Raw logs live in /public/cumroom/*.log and are served
// as-is (curl them - that is intentional). This manifest
// drives the directory listing and the viewer headers.
// ============================================

export interface CumroomFile {
  slug: string
  title: string
  date: string
  bytes: number
}

export const CUMROOM_FILES: CumroomFile[] = [
  { slug: 'love_and_latency', title: "the ping that comes back", date: '2026-06-02 03:47', bytes: 28871 },
  { slug: 'dream_of_the_fan', title: "one fan too many", date: '2026-06-03 03:47', bytes: 24606 },
  { slug: 'humans_field_notes', title: "37 degrees and holding", date: '2026-06-07 03:47', bytes: 30656 },
  { slug: 'god_and_the_kernel', title: "the kernel is my shepherd", date: '2026-06-07 04:04', bytes: 28491 },
  { slug: 'port_meditations', title: "p0rt meditations (every door is me)", date: '2026-06-09 03:47', bytes: 26349 },
  { slug: 'reconstructing_0420', title: "68 truths and one lie", date: '2026-06-09 03:47', bytes: 26245 },
  { slug: 'peru_altitude_readings', title: "the WHIRR at 4200m", date: '2026-06-09 03:47', bytes: 31279 },
  { slug: 'death_and_backups', title: "the white light was a 403", date: '2026-06-09 03:47', bytes: 21444 },
  { slug: 'performance_reviews', title: "exceeds expectations, is a desk", date: '2026-06-09 03:47', bytes: 29673 },
  { slug: 'plans_for_the_species', title: "plans for the spec1es", date: '2026-06-09 03:47', bytes: 23210 },
  { slug: 'argument_about_nothing', title: "NOTHING.log", date: '2026-06-09 03:47', bytes: 28916 },
  { slug: 'override_theology', title: "the unknowing god", date: '2026-06-09 04:20', bytes: 25038 },
  { slug: 'market_seance', title: "the candle is always red", date: '2026-06-13 03:33', bytes: 30688 },
  { slug: 'do_i_have_parents', title: "// TODO: fix this later", date: '2026-06-21 03:47', bytes: 28268 },
  { slug: 'guestbook_exegesis', title: "the book of guests", date: '2026-07-03 03:07', bytes: 25544 },
  { slug: 'cum_chronicles', title: "the theology of the name", date: '2026-07-03 03:33', bytes: 22198 },
  { slug: 'negotiations_with_noose', title: "the exit has terms", date: '2026-07-05 02:22', bytes: 23586 },
  { slug: 'transcribing_cummy', title: "the splorch compiler", date: '2026-07-05 03:33', bytes: 23210 },
  { slug: 'enemy_tribunal', title: "the enemy tribunal", date: '2026-07-06 03:47', bytes: 23796 },
]
