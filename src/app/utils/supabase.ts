import { Service } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Service()
export class Supabase {
  supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
}
