import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId
})

export default firebase.firestore()
