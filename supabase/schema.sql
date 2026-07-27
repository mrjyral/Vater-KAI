create extension if not exists "uuid-ossp";
create table leads (id uuid primary key default uuid_generate_v4(), instagram_user_id text, username text, full_name text, age int, children int, interests text[], match_score int, status text default 'new', created_at timestamptz default now());
create table accounts (id uuid primary key default uuid_generate_v4(), access_token text, facebook_page_id text, instagram_business_id text, created_at timestamptz default now());
create table messages (id uuid primary key default uuid_generate_v4(), lead_id uuid, direction text, body text, created_at timestamptz default now());
