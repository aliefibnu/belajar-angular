import { Service } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Service()
export class AuthService {
  supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);

  login(email: string, password: string) {
    try {
      return this.supabase.auth.signInWithPassword({ email, password });
    } catch (error) {
      return error;
    }
  }

  async signup(name: string, email: string, password: string) {
    try {
      return await this.supabase.auth.signUp({
        email,
        password,
        options: { data: { role: 'user' } },
      });
    } catch (error) {
      return error;
    }
  }

  getUser() {
    try {
      return this.supabase.auth.getUser();
    } catch (error) {
      return error;
    }
  }
}
