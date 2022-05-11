import {
  config as loadConfig,
  DotenvConfig
} from "https://deno.land/std@0.136.0/dotenv/mod.ts";
export const config: DotenvConfig = await loadConfig();
