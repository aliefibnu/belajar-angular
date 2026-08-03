import { inject, Service } from '@angular/core';
import { UserAttributes } from '@supabase/supabase-js';
import { Supabase } from '../../utils/supabase';

@Service()
export class AuthService {
  supabaseUtil = inject(Supabase);
  supabase = this.supabaseUtil.supabase;
  async login(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signup(name: string, email: string, password: string) {
    return await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
  }

  async update(user: Partial<UserAttributes>) {
    return await this.supabase.auth.updateUser(user);
  }

  async getUser() {
    return this.supabase.auth.getUser();
  }

  async logout() {
    return await this.supabase.auth.signOut();
  }
}
