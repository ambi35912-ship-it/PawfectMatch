-- Run this once in the Supabase SQL editor for the Pawfect Match project.
create table if not exists public.user_app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_app_state enable row level security;

drop policy if exists "Users can read their own app state" on public.user_app_state;
create policy "Users can read their own app state"
on public.user_app_state for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own app state" on public.user_app_state;
create policy "Users can insert their own app state"
on public.user_app_state for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own app state" on public.user_app_state;
create policy "Users can update their own app state"
on public.user_app_state for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- Private veterinary records. Object paths must start with the owner's user ID.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'veterinary-documents',
  'veterinary-documents',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users can upload their veterinary documents" on storage.objects;
create policy "Users can upload their veterinary documents"
on storage.objects for insert to authenticated
with check (bucket_id = 'veterinary-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can read their veterinary documents" on storage.objects;
create policy "Users can read their veterinary documents"
on storage.objects for select to authenticated
using (bucket_id = 'veterinary-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can delete their veterinary documents" on storage.objects;
create policy "Users can delete their veterinary documents"
on storage.objects for delete to authenticated
using (bucket_id = 'veterinary-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
