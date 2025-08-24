import axios from 'axios'

// Crée une instance Axios avec une configuration par défaut
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:4040/', // L'URL de base pour toutes tes requêtes
  timeout: 10_000, // Temps limite des requêtes
  withCredentials: true,
  //  headers: {
  //  'Content-Type': 'application/json','multipart/form-data',
  // },
})

// Intercepteur pour ajuster le Content-Type dynamiquement
axiosInstance.interceptors.request.use(config => {
  // Exemple de logique pour ajuster le Content-Type
  if (config.data instanceof FormData) {
    // Si on envoie un fichier ou un formulaire multipart
    config.headers['Content-Type'] = 'multipart/form-data'
  } else if (config.headers['Content-Type'] === undefined) {
    // Par défaut, utilise JSON si rien d'autre n'est spécifié
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

export default axiosInstance
