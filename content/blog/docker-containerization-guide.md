---
title: Docker 容器化技术实战指南
excerpt: 从基础概念到生产实践，全面介绍Docker容器化技术，包括镜像构建、容器编排、网络配置和安全最佳实践。
author: Keaton
date: 2024-01-16
tags: [Docker, 容器化, DevOps, 微服务]
---

# Docker 容器化技术实战指南

Docker作为容器化技术的代表，已经成为现代软件开发和部署的标准工具。它解决了"在我机器上能运行"的经典问题，提供了一致的运行环境。本文将从基础概念到生产实践，全面介绍Docker的使用。

## 1. Docker基础概念

### 核心组件

- **镜像(Image)**: 只读的模板，用于创建容器
- **容器(Container)**: 镜像的运行实例
- **仓库(Repository)**: 存储镜像的地方
- **Dockerfile**: 构建镜像的脚本文件

### 基本命令

```bash
# 查看Docker版本
docker --version

# 拉取镜像
docker pull nginx:latest

# 查看本地镜像
docker images

# 运行容器
docker run -d -p 80:80 --name my-nginx nginx

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop my-nginx

# 删除容器
docker rm my-nginx

# 删除镜像
docker rmi nginx:latest
```

## 2. Dockerfile最佳实践

### Java应用Dockerfile示例

```dockerfile
# 多阶段构建
# 构建阶段
FROM maven:3.8.4-openjdk-17 AS builder

WORKDIR /app

# 复制pom.xml并下载依赖（利用Docker缓存）
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 复制源码并构建
COPY src ./src
RUN mvn clean package -DskipTests

# 运行阶段
FROM openjdk:17-jre-slim

# 创建非root用户
RUN groupadd -r appuser && useradd -r -g appuser appuser

# 设置工作目录
WORKDIR /app

# 复制构建产物
COPY --from=builder /app/target/*.jar app.jar

# 更改文件所有者
RUN chown -R appuser:appuser /app

# 切换到非root用户
USER appuser

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# 启动应用
ENTRYPOINT ["java", "-jar", "-Djava.security.egd=file:/dev/./urandom", "app.jar"]
```

### Node.js应用Dockerfile示例

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production && npm cache clean --force

# 复制源码
COPY . .

# 构建应用
RUN npm run build

# 生产镜像
FROM node:18-alpine

# 安装dumb-init
RUN apk add --no-cache dumb-init

# 创建用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# 使用dumb-init作为PID 1
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

### Dockerfile优化技巧

```dockerfile
# 1. 使用.dockerignore文件
# .dockerignore内容：
# node_modules
# .git
# .gitignore
# README.md
# Dockerfile
# .dockerignore

# 2. 合并RUN指令减少层数
RUN apt-get update && \
    apt-get install -y \
        curl \
        vim \
        git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 3. 使用特定版本标签
FROM node:18.17.0-alpine

# 4. 利用构建缓存，将变化频繁的指令放在后面
COPY package*.json ./
RUN npm install
COPY . .
```

## 3. Docker Compose编排

### 完整的应用栈示例

```yaml
# docker-compose.yml
version: '3.8'

services:
  # 前端应用
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8080
    depends_on:
      - backend
    networks:
      - app-network

  # 后端应用
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/myapp
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=password
      - SPRING_REDIS_HOST=redis
      - SPRING_REDIS_PORT=6379
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
    volumes:
      - ./logs:/app/logs

  # MySQL数据库
  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=myapp
      - MYSQL_USER=appuser
      - MYSQL_PASSWORD=apppass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10
    networks:
      - app-network

  # Redis缓存
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    networks:
      - app-network

  # Nginx反向代理
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

  # 监控
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
    networks:
      - app-network

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - app-network

volumes:
  mysql_data:
  redis_data:
  prometheus_data:
  grafana_data:

networks:
  app-network:
    driver: bridge
```

### Compose常用命令

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f backend

# 扩展服务
docker-compose up -d --scale backend=3

# 停止所有服务
docker-compose down

# 停止并删除卷
docker-compose down -v

# 重新构建镜像
docker-compose build --no-cache

# 执行命令
docker-compose exec backend bash
```

## 4. 网络配置

### 自定义网络

```bash
# 创建自定义网络
docker network create --driver bridge my-network

# 查看网络
docker network ls

# 运行容器并连接到网络
docker run -d --name app1 --network my-network nginx
docker run -d --name app2 --network my-network nginx

# 容器间可以通过容器名通信
docker exec app1 ping app2
```

### 网络类型

```yaml
# docker-compose.yml中的网络配置
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # 内部网络，不能访问外网
  
services:
  web:
    networks:
      - frontend
      - backend
  
  db:
    networks:
      - backend  # 只能被后端访问
```

## 5. 数据持久化

### 卷的使用

```bash
# 创建命名卷
docker volume create my-data

# 使用卷
docker run -d -v my-data:/data nginx

# 绑定挂载
docker run -d -v /host/path:/container/path nginx

# 临时文件系统
docker run -d --tmpfs /tmp nginx
```

### 数据备份和恢复

```bash
# 备份卷数据
docker run --rm -v my-data:/data -v $(pwd):/backup alpine \
    tar czf /backup/backup.tar.gz -C /data .

# 恢复卷数据
docker run --rm -v my-data:/data -v $(pwd):/backup alpine \
    tar xzf /backup/backup.tar.gz -C /data
```

## 6. 安全最佳实践

### 镜像安全

```dockerfile
# 1. 使用官方基础镜像
FROM node:18-alpine

# 2. 定期更新基础镜像
RUN apk update && apk upgrade

# 3. 删除不必要的包
RUN apk add --no-cache curl && \
    apk del curl

# 4. 使用非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
USER nextjs

# 5. 设置只读根文件系统
# docker run --read-only --tmpfs /tmp myapp
```

### 运行时安全

```bash
# 限制容器权限
docker run --user 1001:1001 --cap-drop ALL myapp

# 限制资源使用
docker run --memory=512m --cpus=0.5 myapp

# 使用安全配置
docker run --security-opt no-new-privileges myapp
```

### 镜像扫描

```bash
# 使用Docker Scout扫描
docker scout cves myapp:latest

# 使用Trivy扫描
trivy image myapp:latest

# 使用Snyk扫描
snyk container test myapp:latest
```

## 7. 性能优化

### 镜像优化

```dockerfile
# 使用多阶段构建减小镜像大小
FROM golang:1.19 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```

### 容器资源限制

```yaml
# docker-compose.yml
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### 健康检查

```dockerfile
# Dockerfile中的健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1
```

```yaml
# docker-compose.yml中的健康检查
services:
  app:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## 8. 监控和日志

### 日志管理

```bash
# 查看容器日志
docker logs -f --tail 100 myapp

# 配置日志驱动
docker run --log-driver=json-file --log-opt max-size=10m --log-opt max-file=3 myapp
```

```yaml
# docker-compose.yml中的日志配置
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 监控配置

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'docker'
    static_configs:
      - targets: ['localhost:9323']
  
  - job_name: 'app'
    static_configs:
      - targets: ['backend:8080']
```

## 9. CI/CD集成

### GitHub Actions示例

```yaml
# .github/workflows/docker.yml
name: Docker Build and Push

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: |
          myapp:latest
          myapp:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
```

### Jenkins Pipeline示例

```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'myapp'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").inside {
                        sh 'npm test'
                    }
                }
            }
        }
        
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker-compose down
                    docker-compose pull
                    docker-compose up -d
                '''
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
```

## 总结

Docker容器化技术为现代应用开发和部署提供了强大的支持。关键要点包括：

1. **镜像优化**：使用多阶段构建、选择合适的基础镜像、减少层数
2. **安全实践**：使用非root用户、定期更新、镜像扫描
3. **网络配置**：合理设计网络拓扑、使用自定义网络
4. **数据管理**：正确使用卷、定期备份数据
5. **监控日志**：配置健康检查、集中化日志管理
6. **CI/CD集成**：自动化构建、测试和部署流程

掌握这些技能，能够帮助我们构建更加可靠、安全、高效的容器化应用。Docker不仅仅是一个工具，更是现代DevOps文化的重要组成部分。