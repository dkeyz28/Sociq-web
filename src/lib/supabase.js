import {createClient} from '@supabase/supabase-js'; import {supabaseUrl,supabaseAnonKey} from '../constants';
export const supabase=createClient(supabaseUrl,supabaseAnonKey,{auth:{storage:window.localStorage,autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}});
