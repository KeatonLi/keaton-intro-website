import matter from 'gray-matter';

// 动态导入所有markdown文件
const markdownFiles = import.meta.glob('../blog/posts/*.md', { as: 'raw', eager: true });

// 解析markdown文件并提取数据
function parseBlogPosts() {
  const posts = [];
  
  for (const [path, content] of Object.entries(markdownFiles)) {
    try {
      // 使用gray-matter解析frontmatter
      const { data: frontmatter, content: markdownContent } = matter(content);
      
      // 从文件路径提取文件名作为ID
      const fileName = path.split('/').pop().replace('.md', '');
      
      // 构建博客文章对象
      const post = {
        id: fileName,
        title: frontmatter.title || '无标题',
        excerpt: frontmatter.excerpt || '',
        content: markdownContent,
        author: frontmatter.author || 'Anonymous',
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        tags: frontmatter.tags || []
      };
      
      posts.push(post);
    } catch (error) {
      console.error(`解析markdown文件失败: ${path}`, error);
    }
  }
  
  // 按日期降序排序
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 导出博客文章数据
export const blogPosts = parseBlogPosts();

// 导出获取单篇文章的函数
export function getBlogPost(id) {
  return blogPosts.find(post => post.id === id);
}

// 导出按标签过滤的函数
export function getBlogPostsByTag(tag) {
  return blogPosts.filter(post => post.tags.includes(tag));
}

// 导出所有标签
export function getAllTags() {
  const tags = new Set();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}