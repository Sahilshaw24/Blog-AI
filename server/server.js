import express from "express"
import 'dotenv/config'
import cors from "cors"
import connectDB from "./config/db.js"
import adminRouter from "./routes/adminRoutes.js"
import blogRouter from "./routes/blogRoutes.js"

const app = express()
await connectDB()

// ✅ CORS Configuration - Allow your frontend
app.use(cors({
  origin: [
    'https://blog-site-gn4w.vercel.app', // Your frontend production URL
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes 
app.get('/', (req, res) => {
  res.json({ message: "API WORKING !!" })
})
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server -> PORT ->", PORT)
})

export default app