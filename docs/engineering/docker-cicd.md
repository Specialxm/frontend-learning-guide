# Docker入门与流程编排

## 概述

Docker是现代软件开发和部署的核心技术，它通过容器化技术实现了应用程序的标准化打包、分发和运行。结合CI/CD流程，Docker能够显著提升软件交付的效率和质量。本文将深入探讨Docker的基础概念、最佳实践以及在企业级CI/CD流程中的应用。

## Docker基础概念

### 1. 容器化原理

Docker基于Linux内核的cgroups和namespace技术实现资源隔离：

```bash
# 容器资源隔离示例
# cgroups - 资源控制
# namespace - 进程隔离

# 查看容器进程
docker exec -it container_name ps aux

# 查看容器资源使用
docker stats container_name

# 查看容器网络配置
docker network inspect bridge
```

### 2. 核心组件

#### Docker Engine
```bash
# Docker守护进程管理
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker

# Docker信息查看
docker info
docker version
```

#### Docker Images
```bash
# 镜像管理
docker images
docker rmi image_name
docker image prune

# 镜像构建
docker build -t app:latest .
docker build --no-cache -t app:latest .
```

#### Docker Containers
```bash
# 容器生命周期管理
docker run -d --name app -p 3000:3000 app:latest
docker start app
docker stop app
docker restart app
docker rm app

# 容器状态查看
docker ps -a
docker logs app
docker exec -it app /bin/bash
```

## Dockerfile最佳实践

### 1. 基础Dockerfile

```dockerfile
# 多阶段构建示例
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动命令
CMD ["nginx", "-g", "daemon off;"]
```

### 2. 优化策略

#### 层缓存优化
```dockerfile
# 优化依赖安装顺序
FROM node:18-alpine

WORKDIR /app

# 先复制package文件，利用Docker层缓存
COPY package*.json ./
RUN npm ci --only=production

# 再复制源代码
COPY . .

# 构建应用
RUN npm run build
```

#### 多阶段构建
```dockerfile
# 开发环境镜像
FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# 测试环境镜像
FROM node:18-alpine AS testing

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run test

# 生产环境镜像
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 3. 安全最佳实践

```dockerfile
# 安全优化示例
FROM node:18-alpine

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# 复制package文件
COPY package*.json ./
RUN npm ci --only=production

# 复制源代码
COPY . .

# 更改文件所有者
RUN chown -R nextjs:nodejs /app
USER nextjs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
```

## Docker Compose

### 1. 基础配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/app
    depends_on:
      - db
      - redis
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=app
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

### 2. 环境配置

```yaml
# docker-compose.override.yml (开发环境)
version: '3.8'

services:
  app:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DEBUG=true
    command: npm run dev

  db:
    ports:
      - "5432:5432"

  redis:
    ports:
      - "6379:6379"
```

```yaml
# docker-compose.prod.yml (生产环境)
version: '3.8'

services:
  app:
    build:
      context: .
      target: production
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  nginx:
    restart: unless-stopped
    deploy:
      replicas: 2
```

### 3. 服务编排

```yaml
# 复杂服务编排示例
version: '3.8'

services:
  app:
    build: .
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
      placement:
        constraints:
          - node.role == worker
        preferences:
          - spread: node.labels.zone

  nginx:
    image: nginx:alpine
    deploy:
      replicas: 2
      placement:
        constraints:
          - node.role == manager
```

## CI/CD流程设计

### 1. GitHub Actions集成

```yaml
# .github/workflows/docker-build.yml
name: Docker Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # 部署脚本
```

### 2. GitLab CI/CD集成

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

test:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test
    - npm run lint
  only:
    - merge_requests
    - main

build:
  stage: build
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  variables:
    DOCKER_HOST: tcp://docker:2376
    DOCKER_TLS_CERTDIR: "/certs"
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - |
      if [ "$CI_COMMIT_BRANCH" = "main" ]; then
        docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
        docker push $CI_REGISTRY_IMAGE:latest
      fi
  only:
    - main
    - develop

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "
        cd /opt/app &&
        docker-compose pull &&
        docker-compose up -d &&
        docker system prune -f
      "
  only:
    - main
  environment:
    name: production
    url: https://app.example.com
```

### 3. Jenkins Pipeline

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        REGISTRY = 'registry.example.com'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm run test'
                sh 'npm run lint'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", 'registry-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        if (env.BRANCH_NAME == 'main') {
                            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh """
                        ssh deploy@prod-server "
                            cd /opt/app &&
                            docker-compose pull &&
                            docker-compose up -d &&
                            docker system prune -f
                        "
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

## 容器编排与集群管理

### 1. Docker Swarm

```yaml
# docker-stack.yml
version: '3.8'

services:
  app:
    image: app:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    deploy:
      replicas: 2
      placement:
        constraints:
          - node.role == manager
    networks:
      - app-network

networks:
  app-network:
    driver: overlay
    attachable: true
```

### 2. Kubernetes部署

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
  labels:
    app: app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app
  template:
    metadata:
      labels:
        app: app
    spec:
      containers:
      - name: app
        image: app:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: database-url

---
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app-service
            port:
              number: 80
```

## 监控与日志

### 1. 容器监控

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    depends_on:
      - prometheus

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    privileged: true
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro

volumes:
  prometheus_data:
  grafana_data:
```

### 2. 日志管理

```yaml
# docker-compose.logging.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.8.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

## 最佳实践

### 1. 安全实践

```bash
# 容器安全扫描
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image app:latest

# 镜像签名
docker trust signer add --key signer.key signer
docker trust sign app:latest

# 运行时安全
docker run --security-opt=no-new-privileges \
  --cap-drop=ALL \
  --read-only \
  app:latest
```

### 2. 性能优化

```dockerfile
# 性能优化示例
FROM node:18-alpine AS builder

# 使用多阶段构建减少镜像大小
WORKDIR /app

# 优化依赖安装
COPY package*.json ./
RUN npm ci --only=production --cache /tmp/.npm

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产镜像
FROM node:18-alpine

# 使用非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# 只复制必要文件
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
```

### 3. 部署策略

```yaml
# 蓝绿部署
version: '3.8'

services:
  app-blue:
    image: app:blue
    deploy:
      replicas: 3
    networks:
      - app-network

  app-green:
    image: app:green
    deploy:
      replicas: 0
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx-blue.conf:/etc/nginx/nginx.conf
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## 实际应用场景

### 1. 微服务架构

```yaml
# 微服务架构示例
version: '3.8'

services:
  user-service:
    build: ./user-service
    environment:
      - SERVICE_NAME=user-service
      - DATABASE_URL=postgresql://user:pass@user-db:5432/users
    depends_on:
      - user-db
    networks:
      - microservices

  order-service:
    build: ./order-service
    environment:
      - SERVICE_NAME=order-service
      - DATABASE_URL=postgresql://user:pass@order-db:5432/orders
    depends_on:
      - order-db
    networks:
      - microservices

  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    environment:
      - USER_SERVICE_URL=http://user-service:3001
      - ORDER_SERVICE_URL=http://order-service:3002
    depends_on:
      - user-service
      - order-service
    networks:
      - microservices

  user-db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=users
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - user_data:/var/lib/postgresql/data
    networks:
      - microservices

  order-db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=orders
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - order_data:/var/lib/postgresql/data
    networks:
      - microservices

volumes:
  user_data:
  order_data:

networks:
  microservices:
    driver: bridge
```

### 2. 前端应用部署

```dockerfile
# 前端应用Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 复制环境变量
COPY --from=builder /app/.env.production /usr/share/nginx/html/.env

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# 前端应用部署配置
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
      - API_URL=https://api.example.com
    restart: unless-stopped
    networks:
      - frontend-network

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx-ssl.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
    networks:
      - frontend-network

networks:
  frontend-network:
    driver: bridge
```

## 总结

Docker容器化技术结合CI/CD流程为现代软件开发和部署提供了强大的解决方案：

1. **标准化部署**：通过容器化实现环境一致性
2. **自动化流程**：CI/CD流水线自动化构建、测试、部署
3. **弹性扩展**：支持水平扩展和负载均衡
4. **环境隔离**：不同环境间的隔离和一致性

掌握Docker和CI/CD有助于：
- 提高软件交付效率
- 减少环境差异问题
- 实现自动化运维
- 提升系统可靠性

在实际项目中，应该根据项目规模和团队能力选择合适的容器化策略和CI/CD工具，建立完善的监控和日志体系。 