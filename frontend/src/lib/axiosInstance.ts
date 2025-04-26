'use client'

import axios from "axios"
import { getSession } from "next-auth/react"

const backendAPI = axios.create({
  baseURL: "http://localhost:8000", // Backend URL
})

backendAPI.interceptors.request.use(async (config) => {
  const session = await getSession()

  if (session?.idToken) {
    config.headers.Authorization = `Bearer ${session.idToken}`
  }

  return config
})

export default backendAPI
