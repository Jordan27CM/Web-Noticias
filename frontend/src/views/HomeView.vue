<template>
  <div class="home-view">
    <div class="hero">
      <h1>Portal de Noticias</h1>
      <p>Entérate de las últimas novedades alrededor del mundo</p>
    </div>
    
    <NewsList />
  </div>
</template>

<script setup>
import NewsList from '../components/NewsList.vue'
</script>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 0;
  background-color: #f3f4f6;
  border-radius: 8px;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}
.hero p {
  font-size: 1.1rem;
  color: #4b5563;
}
@media (prefers-color-scheme: dark) {
  .hero { background-color: #1f2937; }
  .hero h1 { color: #f9fafb; }
  .hero p { color: #d1d5db; }
}
</style>
