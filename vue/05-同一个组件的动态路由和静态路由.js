const route = [
  { path: '/editor', name: 'editor', component: Editor, meta: { requiresAuth: true } },
  { path: '/editor/:slug', name: 'editor-edit', component: Editor, props: true, meta: { requiresAuth: true } },
]