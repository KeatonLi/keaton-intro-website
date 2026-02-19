import { readdirSync, statSync } from 'fs'
import { join } from 'path'

interface Photo {
  src: string
  title: string
  description: string
  date: string
  category: string
}

export default defineEventHandler((): { photos: Photo[] } => {
  const photos: Photo[] = []
  const galleryDir = join(process.cwd(), 'public', 'images', 'gallery')
  
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  
  try {
    const files = readdirSync(galleryDir)
    
    for (const file of files) {
      const ext = file.slice(file.lastIndexOf('.')).toLowerCase()
      if (!validExtensions.includes(ext)) continue
      
      const filePath = join(galleryDir, file)
      const stats = statSync(filePath)
      
      // 从文件名提取信息 (格式: title_category_date.jpg)
      // 例如: "深圳湾日出_travel_2024-01-15.jpg"
      const fileName = file.slice(0, file.lastIndexOf('.'))
      const parts = fileName.split('_')
      
      let title = fileName
      let category = 'life'
      let date = new Date(stats.mtime).toISOString().split('T')[0]
      let description = ''
      
      if (parts.length >= 2) {
        title = parts[0]
        category = parts[1] || 'life'
        if (parts[2] && /^\d{4}-\d{2}-\d{2}$/.test(parts[2])) {
          date = parts[2]
        }
        if (parts[3]) {
          description = parts.slice(3).join('_')
        }
      }
      
      photos.push({
        src: `/images/gallery/${file}`,
        title: decodeURIComponent(title),
        description: decodeURIComponent(description),
        date,
        category
      })
    }
    
    // 按日期倒序排列
    photos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
  } catch (error) {
    console.error('Failed to read gallery directory:', error)
  }
  
  return { photos }
})
