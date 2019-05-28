SET xmloption = content;
CREATE TABLE public.accounts (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    balance bigint DEFAULT 0 NOT NULL,
    name text DEFAULT 'Unnamed'::text NOT NULL,
    owner text NOT NULL
);
CREATE TABLE public.transactions (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text,
    category text DEFAULT 'uncategorized'::text NOT NULL,
    monthly_occurrences integer DEFAULT 1 NOT NULL,
    start date DEFAULT to_date('20000101'::text, 'YYYYMMDD'::text) NOT NULL,
    "end" date,
    interval_days integer DEFAULT 0 NOT NULL,
    interval_months integer DEFAULT 0 NOT NULL,
    owner text NOT NULL,
    value numeric DEFAULT 0
);
CREATE TABLE public.users (
    id text NOT NULL,
    email text
);
CREATE TABLE public.reports (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    transactions uuid NOT NULL,
    accounts uuid NOT NULL,
    name text NOT NULL,
    interest_rate numeric DEFAULT 0.0 NOT NULL
);
CREATE TABLE public.user_reports (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    report uuid NOT NULL,
    "user" text NOT NULL
);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_owner_fkey FOREIGN KEY (owner) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_fkey FOREIGN KEY (owner) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_report_fkey FOREIGN KEY (report) REFERENCES public.reports(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_user_fkey FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
