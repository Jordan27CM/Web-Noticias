<template>
  <div class="admin-panel">
    <h2>Publicar Nueva Noticia</h2>
    
    <form @submit.prevent="submitNews" class="news-form">
      <!-- Title -->
      <div class="form-group">
        <label for="title">Título</label>
        <input id="title" v-model="formData.title" type="text" required placeholder="Ej. El equipo local gana la final" />
      </div>

      <!-- Excerpt -->
      <div class="form-group">
        <label for="excerpt">Extracto / Resumen</label>
        <input id="excerpt" v-model="formData.excerpt" type="text" placeholder="Breve descripción para las tarjetas" />
      </div>

      <!-- Author -->
      <div class="form-group">
        <label for="author">Autor</label>
        <input id="author" v-model="formData.author" type="text" placeholder="Nombre completo o redacción" />
      </div>

      <!-- Image URL -->
      <div class="form-group">
        <label for="imageUrl">URL de la Imagen Web</label>
        <input id="imageUrl" v-model="formData.imageUrl" type="url" placeholder="https://ejemplo.com/imagen.jpg" />
      </div>

      <!-- Rich Text Editor (Tiptap) -->
      <div class="form-group">
        <label>Contenido</label>
        <div class="tiptap-editor-container" v-if="editor">
          <div class="editor-menu">
            <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
              <b>Negrita</b>
            </button>
            <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
              <i>Cursiva</i>
            </button>
            <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
              H2
            </button>
          </div>
          <editor-content :editor="editor" class="editor-content-area" />
        </div>
      </div>

      <!-- Submit Button & Feedback -->
      <button type="submit" :disabled="loading" class="btn-submit">
        {{ loading ? 'Publicando...' : 'Publicar Noticia' }}
      </button>

      <div v-if="message" :class="['feedback-message', messageType]">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { addNews } from '../services/newsService'

const formData = ref({
  title: '',
  excerpt: '',
  author: '',
  imageUrl: ''
})

const loading = ref(false)
const message = ref('')
const messageType = ref('')

const editor = useEditor({
  content: '<p>Empieza a escribir la noticia aquí...</p>',
  extensions: [
    StarterKit,
  ],
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

const submitNews = async () => {
  loading.value = true
  message.value = ''
  
  try {
    const htmlContent = editor.value.getHTML()
    
    // Check if empty
    if (!formData.value.title || htmlContent === '<p></p>') {
      message.value = 'El título y el contenido son obligatorios'
      messageType.value = 'error'
      loading.value = false
      return
    }

    const newsData = {
      ...formData.value,
      content: htmlContent,
      published: true
    }

    await addNews(newsData)
    
    message.value = 'Noticia publicada con éxito!'
    messageType.value = 'success'
    
    // Reset Form
    formData.value.title = ''
    formData.value.excerpt = ''
    formData.value.author = ''
    formData.value.imageUrl = ''
    editor.value.commands.setContent('<p>Escribe tu siguiente noticia...</p>')
    
  } catch (error) {
    console.error("Failed to add component", error)
    message.value = 'Hubo un error al publicar la noticia.'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-panel {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.news-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
}

input[type="text"], input[type="url"] {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

/* Tiptap Styles */
.tiptap-editor-container {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
}

.editor-menu {
  background: #f3f4f6;
  padding: 0.5rem;
  border-bottom: 1px solid #d1d5db;
  display: flex;
  gap: 0.5rem;
}

.editor-menu button {
  padding: 0.4rem 0.8rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
}

.editor-menu button:hover {
  background: #e5e7eb;
}

.editor-menu button.is-active {
  background: #dbeafe;
  border-color: #bfdbfe;
  color: #1e40af;
}

.editor-content-area {
  padding: 1rem;
  min-height: 15rem;
  outline: none;
}

/* TipTap inner content styling */
:deep(.ProseMirror) {
  min-height: 150px;
  outline: none;
}

.btn-submit {
  background: #2563eb;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-submit:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.feedback-message {
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
}

.success {
  background: #dcfce7;
  color: #166534;
}

.error {
  background: #fee2e2;
  color: #991b1b;
}

@media (prefers-color-scheme: dark) {
  .admin-panel { background: #1f2937; border-color: #374151; }
  .form-group label { color: #d1d5db; }
  input[type="text"], input[type="url"] { background: #374151; color: white; border-color: #4b5563; }
  .tiptap-editor-container { border-color: #4b5563; background: #374151; color: white; }
  .editor-menu { background: #1f2937; border-color: #4b5563; }
  .editor-menu button { background: #374151; border-color: #4b5563; color: #d1d5db;}
  .editor-menu button.is-active { background: #1e3a8a; border-color: #1e3a8a; color: white;}
}
</style>
