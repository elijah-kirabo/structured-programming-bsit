// Utilities
const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

// Storage keys
const DB_KEY = 'mr_a_fire_db_v1';

// State
let db = [];
let filters = { search: '', category: '', sort: 'newest' };

// Elements
const form = qs('#record-form');
const recordIdEl = qs('#record-id');
const categoryEl = qs('#category');
const titleEl = qs('#title');
const dateEl = qs('#date');
const locationEl = qs('#location');
const descriptionEl = qs('#description');
const imageEl = qs('#image');
const imagePreviewEl = qs('#image-preview');
const resetBtn = qs('#reset-btn');

const searchEl = qs('#search');
const filterCategoryEl = qs('#filter-category');
const sortEl = qs('#sort');

const galleryEl = qs('#gallery');
const emptyStateEl = qs('#empty-state');

const exportBtn = qs('#export-btn');
const importInput = qs('#import-input');

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  loadDb();
  renderGallery();
  wireEvents();
});

function loadDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    db = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load DB', e);
    db = [];
  }
}

function saveDb() {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function wireEvents() {
  form.addEventListener('submit', onSubmit);
  resetBtn.addEventListener('click', clearForm);
  imageEl.addEventListener('change', onImageChange);

  searchEl.addEventListener('input', () => { filters.search = searchEl.value.trim().toLowerCase(); renderGallery(); });
  filterCategoryEl.addEventListener('change', () => { filters.category = filterCategoryEl.value; renderGallery(); });
  sortEl.addEventListener('change', () => { filters.sort = sortEl.value; renderGallery(); });

  exportBtn.addEventListener('click', onExport);
  importInput.addEventListener('change', onImport);
}

function onImageChange() {
  const file = imageEl.files && imageEl.files[0];
  imagePreviewEl.innerHTML = '';
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const url = reader.result;
    const img = document.createElement('img');
    img.src = url;
    imagePreviewEl.appendChild(img);
    const meta = document.createElement('div');
    meta.className = 'muted';
    meta.textContent = `${file.name} (${Math.round(file.size/1024)} KB)`;
    imagePreviewEl.appendChild(meta);
  };
  reader.readAsDataURL(file);
}

function validateForm() {
  let valid = true;
  // Clear errors
  qs('#category-error').textContent = '';
  qs('#title-error').textContent = '';

  if (!categoryEl.value) { qs('#category-error').textContent = 'Category is required'; valid = false; }
  if (!titleEl.value.trim()) { qs('#title-error').textContent = 'Title is required'; valid = false; }
  return valid;
}

async function fileToDataUrl(file) {
  if (!file) return '';
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function onSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const id = recordIdEl.value || crypto.randomUUID();
  const existingIdx = db.findIndex(r => r.id === id);
  const file = imageEl.files && imageEl.files[0];
  const imgUrl = file ? await fileToDataUrl(file) : (existingIdx >= 0 ? db[existingIdx].imageUrl : '');

  const record = {
    id,
    category: categoryEl.value,
    title: titleEl.value.trim(),
    date: dateEl.value || new Date().toISOString().slice(0,10),
    location: locationEl.value.trim(),
    description: descriptionEl.value.trim(),
    imageUrl: imgUrl,
    createdAt: existingIdx >= 0 ? db[existingIdx].createdAt : Date.now(),
    updatedAt: Date.now()
  };

  if (existingIdx >= 0) db[existingIdx] = record; else db.unshift(record);
  saveDb();
  renderGallery();
  clearForm();
}

function clearForm() {
  recordIdEl.value = '';
  categoryEl.value = '';
  titleEl.value = '';
  dateEl.value = '';
  locationEl.value = '';
  descriptionEl.value = '';
  imageEl.value = '';
  imagePreviewEl.innerHTML = '';
}

function renderGallery() {
  const filtered = db
    .filter(r => !filters.category || r.category === filters.category)
    .filter(r => {
      if (!filters.search) return true;
      const hay = `${r.title} ${r.description} ${r.location}`.toLowerCase();
      return hay.includes(filters.search);
    })
    .sort((a,b) => {
      if (filters.sort === 'newest') return (b.date || '').localeCompare(a.date || '') || b.createdAt - a.createdAt;
      if (filters.sort === 'oldest') return (a.date || '').localeCompare(b.date || '') || a.createdAt - b.createdAt;
      if (filters.sort === 'title-asc') return a.title.localeCompare(b.title);
      if (filters.sort === 'title-desc') return b.title.localeCompare(a.title);
      return 0;
    });

  galleryEl.innerHTML = '';
  emptyStateEl.style.display = filtered.length ? 'none' : 'block';
  for (const r of filtered) {
    galleryEl.appendChild(renderCard(r));
  }
}

function renderCard(r) {
  const el = document.createElement('article');
  el.className = 'card-item';
  el.setAttribute('role', 'listitem');
  el.innerHTML = `
    <img class="thumb" src="${r.imageUrl || placeholderThumb(r.category)}" alt="${escapeAttr(r.title)}">
    <div class="item-body">
      <div class="item-title">${escapeHtml(r.title)}</div>
      <div class="item-meta">
        <span>${escapeHtml(capitalize(r.category))}</span>
        <span>${escapeHtml(r.date || '')}</span>
        ${r.location ? `<span>${escapeHtml(r.location)}</span>` : ''}
      </div>
      ${r.description ? `<div class="item-desc">${escapeHtml(r.description)}</div>` : ''}
      <div class="item-actions">
        <button class="btn" data-action="edit" data-id="${r.id}">Edit</button>
        <button class="btn" data-action="delete" data-id="${r.id}">Delete</button>
      </div>
    </div>
  `;

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    if (action === 'edit') startEdit(id);
    if (action === 'delete') deleteRecord(id);
  });
  return el;
}

function startEdit(id) {
  const r = db.find(x => x.id === id);
  if (!r) return;
  recordIdEl.value = r.id;
  categoryEl.value = r.category;
  titleEl.value = r.title;
  dateEl.value = r.date || '';
  locationEl.value = r.location || '';
  descriptionEl.value = r.description || '';
  imagePreviewEl.innerHTML = '';
  if (r.imageUrl) {
    const img = document.createElement('img');
    img.src = r.imageUrl;
    imagePreviewEl.appendChild(img);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteRecord(id) {
  if (!confirm('Delete this record?')) return;
  db = db.filter(r => r.id !== id);
  saveDb();
  renderGallery();
}

function onExport() {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mr-a-fire-db-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function onImport(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error('Invalid format');
      // Best-effort sanitize
      db = data.map(x => ({
        id: x.id || crypto.randomUUID(),
        category: String(x.category || ''),
        title: String(x.title || ''),
        date: x.date || '',
        location: String(x.location || ''),
        description: String(x.description || ''),
        imageUrl: String(x.imageUrl || ''),
        createdAt: Number(x.createdAt || Date.now()),
        updatedAt: Date.now()
      }));
      saveDb();
      renderGallery();
    } catch (err) {
      alert('Failed to import JSON.');
      console.error(err);
    } finally {
      importInput.value = '';
    }
  };
  reader.readAsText(file);
}

function placeholderThumb(category) {
  const map = {
    equipment: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23111827"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ef4444" font-family="Inter, Arial" font-size="40">Equipment</text></svg>',
    incident: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23111827"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ef4444" font-family="Inter, Arial" font-size="40">Incident</text></svg>',
    team: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23111827"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ef4444" font-family="Inter, Arial" font-size="40">Team</text></svg>',
    training: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23111827"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ef4444" font-family="Inter, Arial" font-size="40">Training</text></svg>'
  };
  return map[category] || map.equipment;
}

function capitalize(s) { return (s || '').charAt(0).toUpperCase() + (s || '').slice(1); }
function escapeHtml(s) { return String(s || '').replace(/[&<>"]+/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch])); }
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }


