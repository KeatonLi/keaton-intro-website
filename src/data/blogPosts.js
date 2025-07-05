// 动态导入所有markdown文件
const markdownFiles = import.meta.glob('../blog/posts/*.md', { as: 'raw', eager: true });

// 自定义 frontmatter 解析器（不依赖 Buffer）
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {
      data: {},
      content: content
    };
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2];
  
  // 简单的 YAML 解析（支持基本的键值对）
  const data = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    if (trimmedLine.includes(':')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      let value = valueParts.join(':').trim();
      
      // 移除引号
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // 处理数组（简单的方括号格式）
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        if (arrayContent.trim()) {
          data[key.trim()] = arrayContent.split(',').map(item => 
            item.trim().replace(/^["']|["']$/g, '')
          );
        } else {
          data[key.trim()] = [];
        }
      } else {
        data[key.trim()] = value;
      }
    }
  }
  
  return {
    data,
    content: markdownContent
  };
}

// 解析markdown文件并提取数据
function parseBlogPosts() {
  const posts = [];
  
  for (const [path, content] of Object.entries(markdownFiles)) {
    try {
      // 使用自定义解析器解析frontmatter
      const { data: frontmatter, content: markdownContent } = parseFrontmatter(content);
      
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