<template>
  <div class="app-container">
    <header class="navbar">
      <div class="nav-brand">Logo Noticias</div>
      <nav class="nav-links">
        <router-link to="/">Inicio</router-link>
        <router-link to="/admin">Admin</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #2563eb;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #bfdbfe;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links a.router-link-active {
  color: white;
}

.main-content {
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
}

@media (prefers-color-scheme: dark) {
  .navbar { background-color: #1e3a8a; }
  .nav-links a { color: #9ca3af; }
}
</style>
