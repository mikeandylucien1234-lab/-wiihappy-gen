-- FAQ content, editable from admin — replaces the hardcoded t.faq.items array.
-- Flat per-locale columns (not a join) since this is a small, bounded list edited
-- as whole Q&A rows, not looked up by key like site_content.

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  active boolean not null default true,
  question_fr text not null,
  answer_fr text not null,
  question_en text not null,
  answer_en text not null,
  question_es text not null,
  answer_es text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists faq_items_sort_order_idx on public.faq_items (sort_order);

alter table public.faq_items enable row level security;

create policy "Anyone can view active FAQ items"
  on public.faq_items for select
  to anon, authenticated
  using (active = true);

create policy "Staff can view all FAQ items"
  on public.faq_items for select
  to authenticated
  using (private.is_admin_user());

create policy "Admin and Agent can manage FAQ items"
  on public.faq_items for all
  to authenticated
  using (private.admin_role() in ('Admin', 'Agent'))
  with check (private.admin_role() in ('Admin', 'Agent'));

insert into public.faq_items (sort_order, question_fr, answer_fr, question_en, answer_en, question_es, answer_es) values
(1,
  'Comment se passe le paiement ?', 'Le paiement s''effectue par virement bancaire sécurisé, selon les modalités précisées dans votre devis.',
  'How does payment work?', 'Payment is made by secure bank transfer, under the terms specified in your quote.',
  '¿Cómo se realiza el pago?', 'El pago se efectúa mediante transferencia bancaria segura, según las condiciones indicadas en su presupuesto.'
),
(2,
  'Quels délais pour recevoir un devis ?', 'Nous vous transmettons une proposition détaillée sous 24 à 48h après réception de votre demande.',
  'How long does it take to receive a quote?', 'We send you a detailed proposal within 24 to 48h after receiving your request.',
  '¿Cuánto tiempo tarda en recibir un presupuesto?', 'Le enviamos una propuesta detallada en un plazo de 24 a 48h tras recibir su solicitud.'
),
(3,
  'Puis-je suivre ma commande en ligne ?', 'Oui, un suivi personnalisé vous est communiqué par WhatsApp ou email à chaque étape.',
  'Can I track my order online?', 'Yes, you get personalized tracking by WhatsApp or email at every step.',
  '¿Puedo seguir mi pedido en línea?', 'Sí, recibirá un seguimiento personalizado por WhatsApp o email en cada etapa.'
),
(4,
  'Quels pays sont desservis ?', 'Nous travaillons principalement avec la Chine, mais aussi de nombreux autres pays fournisseurs à travers le monde.',
  'Which countries do you cover?', 'We mainly work with China, but also with many other supplier countries around the world.',
  '¿Qué países están cubiertos?', 'Trabajamos principalmente con China, pero también con muchos otros países proveedores en todo el mundo.'
),
(5,
  'Que faire si le produit n''est pas dans votre catalogue ?', 'Décrivez-le dans le formulaire de sourcing personnalisé : nous le trouvons et l''expédions pour vous.',
  'What if the product isn''t in your catalogue?', 'Describe it in the custom sourcing form: we find it and ship it for you.',
  '¿Qué hacer si el producto no está en su catálogo?', 'Descríbalo en el formulario de sourcing personalizado: lo encontramos y se lo enviamos.'
);
