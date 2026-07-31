import { Service } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Service()
export class AuthService {
  supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);

  async login(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signup(name: string, email: string, password: string) {
    return await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { role: 'user', display_name: name } },
    });
  }

  async getUser() {
    return this.supabase.auth.getUser();
  }
}
