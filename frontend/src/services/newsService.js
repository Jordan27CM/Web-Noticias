import { db } from '../firebase/config'
import { ref, push, set, get, query, limitToLast, serverTimestamp } from 'firebase/database'

export const getNews = async () => {
  try {
    const newsRef = ref(db, 'news')
    // Usamos query con limitToLast(20) para traer los más recientes si se insertaron por push chronologicamente
    const q = query(newsRef, limitToLast(20))
    const snapshot = await get(q)
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      
      // Transformar objeto de objetos (estructura de realtime DB) a Array simple
      const newsList = Object.keys(data).map(key => ({
        id: key, // Usamos la key como ID
        ...data[key]
      }))
      
      // Realtime Database los trae cronológicos descendientes, lo revertimos para mostrar los más nuevos primero
      return newsList.reverse()
    } else {
      return [] // Vacío si no hay elementos
    }
  } catch (error) {
    console.error("Error fetching news from Realtime DB:", error)
    throw error
  }
}

export const addNews = async (newsData) => {
  try {
    console.log("Comprobando URL de base de datos:", import.meta.env.VITE_FIREBASE_DATABASE_URL)
    
    if (!import.meta.env.VITE_FIREBASE_DATABASE_URL) {
      throw new Error("VITE_FIREBASE_DATABASE_URL no cargada. Debes reiniciar el servidor de Vite (Ctrl+C y npm run dev).")
    }

    const newsColRef = ref(db, 'news')
    // Creamos la referencia (que genera la key automáticamente estilo uid)
    const newDocRef = push(newsColRef)
    
    // Seteamos los datos en la base
    await set(newDocRef, {
      ...newsData,
      createdAt: serverTimestamp(),
    })
    
    return newDocRef.key
  } catch (error) {
    console.error("Error adding news to Realtime DB:", error)
    throw error
  }
}
