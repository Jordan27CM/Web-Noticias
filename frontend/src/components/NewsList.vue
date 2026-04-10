<template>
  <div class="news-list-container">
    <h2>Últimas Noticias</h2>
    <div v-if="loading" class="loading">Cargando noticias de Firebase...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="news.length === 0" class="empty">No hay noticias disponibles en la base de datos (colección 'news').</div>
    <div v-else class="news-grid">
      <article v-for="item in news" :key="item.id" class="news-card">
        <!-- Adaptamos la lectura para soportar varios nombres de campos comunes -->
        <h3>{{ item.title || item.titulo || 'Sin título' }}</h3>
        <p>{{ truncateText(item.content || item.contenido || item.description || item.descripcion, 150) }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getNews } from '../services/newsService'

const news = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    news.value = await getNews()
  } catch (err) {
    error.value = 'Ocurrió un error al cargar las noticias.'
    console.error(err)
  } finally {
    loading.value = false
  }
})

const truncateText = (text, maxLength) => {
  if (!text) return 'Contenido no disponible.'
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>

<style scoped>
.news-list-container {
  margin-top: 2rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.news-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.news-card h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.25rem;
}

.news-card p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.4;
}

.loading, .error, .empty {
  padding: 2rem;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.error {
  color: #d32f2f;
  background-color: #ffebee;
}

@media (prefers-color-scheme: dark) {
  .news-card {
    background-color: #1e1e1e;
    border-color: #333;
  }
  .news-card h3 { color: #f0f0f0; }
  .news-card p { color: #aaa; }
  .loading, .empty { background-color: #1e1e1e; color: #aaa; }
  .error { background-color: #4a1c1c; color: #ff8a80; }
}
</style>
