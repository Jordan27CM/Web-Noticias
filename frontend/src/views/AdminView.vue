<template>
  <div class="admin-view">
    <div class="admin-header">
      <h1>Panel de Administración</h1>
      <p>Área restringida para editores</p>
    </div>
    
    <AdminNewsForm />
  </div>
</template>

<script setup>
import AdminNewsForm from '../components/AdminNewsForm.vue'
</script>

<style scoped>
.admin-header {
  margin-bottom: 2rem;
}
.admin-header h1 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}
.admin-header p {
  color: #6b7280;
}
@media (prefers-color-scheme: dark) {
  .admin-header h1 { color: #f9fafb; }
  .admin-header p { color: #9ca3af; }
}
</style>
