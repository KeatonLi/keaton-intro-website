---
title: 云原生技术栈深度解析
excerpt: 全面探讨云原生技术生态，包括容器化、服务网格、可观测性、DevOps等核心技术，助力构建现代化云原生应用。
author: Keaton
date: 2024-01-20
tags: [云原生, Kubernetes, Docker, 微服务, DevOps, 监控]
---

# 云原生技术栈深度解析

云原生技术正在重塑现代应用的开发、部署和运维方式。本文将深入探讨云原生技术栈的核心组件，包括容器化、编排、服务网格、可观测性等关键技术。

## 1. 云原生基础概念

### 云原生的核心特征

云原生应用具备以下特征：
- **容器化**：应用及其依赖打包在容器中
- **动态编排**：容器由编排平台动态管理
- **微服务架构**：应用拆分为松耦合的微服务
- **声明式API**：通过声明式配置管理基础设施
- **不可变基础设施**：基础设施即代码，版本化管理

### 云原生技术栈架构

```yaml
# 云原生技术栈层次结构
Cloud Native Stack:
  Application Layer:
    - Microservices
    - Serverless Functions
    - Event-Driven Architecture
  
  Platform Layer:
    - Container Orchestration (Kubernetes)
    - Service Mesh (Istio, Linkerd)
    - API Gateway
    - Configuration Management
  
  Runtime Layer:
    - Container Runtime (Docker, containerd)
    - Storage (Persistent Volumes)
    - Networking (CNI)
  
  Infrastructure Layer:
    - Cloud Providers (AWS, Azure, GCP)
    - On-Premises
    - Edge Computing
```

## 2. Kubernetes 深度实践

### 核心资源对象

```yaml
# Deployment - 应用部署
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    app: web-app
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
        version: v1.0.0
    spec:
      containers:
      - name: web-app
        image: myregistry/web-app:v1.0.0
        ports:
        - containerPort: 8080
          name: http
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        - name: REDIS_URL
          valueFrom:
            configMapKeyRef:
              name: redis-config
              key: url
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
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: app-config
          mountPath: /etc/config
        - name: app-logs
          mountPath: /var/log
      volumes:
      - name: app-config
        configMap:
          name: app-config
      - name: app-logs
        emptyDir: {}
      imagePullSecrets:
      - name: registry-secret

---
# Service - 服务发现
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
  namespace: production
  labels:
    app: web-app
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
    name: http
  selector:
    app: web-app

---
# Ingress - 外部访问
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.example.com
    secretName: web-app-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-app-service
            port:
              number: 80

---
# HorizontalPodAutoscaler - 自动扩缩容
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
```

### StatefulSet 有状态应用

```yaml
# StatefulSet - 有状态应用（如数据库）
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql-cluster
  namespace: database
spec:
  serviceName: mysql-headless
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: root-password
        - name: MYSQL_REPLICATION_USER
          value: replicator
        - name: MYSQL_REPLICATION_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: replication-password
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
        - name: mysql-config
          mountPath: /etc/mysql/conf.d
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          exec:
            command:
            - mysqladmin
            - ping
            - -h
            - localhost
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - mysql
            - -h
            - localhost
            - -e
            - "SELECT 1"
          initialDelaySeconds: 5
          periodSeconds: 2
      volumes:
      - name: mysql-config
        configMap:
          name: mysql-config
  volumeClaimTemplates:
  - metadata:
      name: mysql-data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 100Gi

---
# Headless Service for StatefulSet
apiVersion: v1
kind: Service
metadata:
  name: mysql-headless
  namespace: database
spec:
  clusterIP: None
  ports:
  - port: 3306
    targetPort: 3306
  selector:
    app: mysql
```

### 高级调度策略

```yaml
# Pod调度策略
apiVersion: apps/v1
kind: Deployment
metadata:
  name: high-performance-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: high-performance-app
  template:
    metadata:
      labels:
        app: high-performance-app
    spec:
      # 节点选择器
      nodeSelector:
        node-type: high-performance
      
      # 节点亲和性
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: kubernetes.io/arch
                operator: In
                values:
                - amd64
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            preference:
              matchExpressions:
              - key: node-type
                operator: In
                values:
                - ssd
        
        # Pod亲和性
        podAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - cache
              topologyKey: kubernetes.io/hostname
        
        # Pod反亲和性
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - high-performance-app
            topologyKey: kubernetes.io/hostname
      
      # 容忍度
      tolerations:
      - key: "high-performance"
        operator: "Equal"
        value: "true"
        effect: "NoSchedule"
      
      # 优先级
      priorityClassName: high-priority
      
      containers:
      - name: app
        image: myapp:latest
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"

---
# 优先级类
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000
globalDefault: false
description: "High priority class for critical applications"
```

## 3. 服务网格 (Service Mesh)

### Istio 配置

```yaml
# Istio Gateway
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: app-gateway
  namespace: production
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: app-tls-secret
    hosts:
    - api.example.com
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - api.example.com
    tls:
      httpsRedirect: true

---
# Virtual Service - 流量路由
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: app-vs
  namespace: production
spec:
  hosts:
  - api.example.com
  gateways:
  - app-gateway
  http:
  # 金丝雀发布
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: web-app-service
        subset: v2
      weight: 100
  # 默认路由
  - route:
    - destination:
        host: web-app-service
        subset: v1
      weight: 90
    - destination:
        host: web-app-service
        subset: v2
      weight: 10
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s
    timeout: 10s

---
# Destination Rule - 目标规则
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: app-dr
  namespace: production
spec:
  host: web-app-service
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        maxRequestsPerConnection: 10
    circuitBreaker:
      consecutiveErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
  subsets:
  - name: v1
    labels:
      version: v1.0.0
    trafficPolicy:
      connectionPool:
        tcp:
          maxConnections: 50
  - name: v2
    labels:
      version: v2.0.0
    trafficPolicy:
      connectionPool:
        tcp:
          maxConnections: 100

---
# Service Entry - 外部服务
apiVersion: networking.istio.io/v1beta1
kind: ServiceEntry
metadata:
  name: external-api
  namespace: production
spec:
  hosts:
  - external-api.com
  ports:
  - number: 443
    name: https
    protocol: HTTPS
  location: MESH_EXTERNAL
  resolution: DNS

---
# Authorization Policy - 访问控制
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: app-authz
  namespace: production
spec:
  selector:
    matchLabels:
      app: web-app
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/frontend"]
  - to:
    - operation:
        methods: ["GET"]
        paths: ["/health", "/metrics"]
  - when:
    - key: source.ip
      values: ["10.0.0.0/8"]

---
# Peer Authentication - mTLS
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT
```

### Linkerd 配置

```yaml
# Linkerd TrafficSplit
apiVersion: split.smi-spec.io/v1alpha1
kind: TrafficSplit
metadata:
  name: web-app-split
  namespace: production
spec:
  service: web-app-service
  backends:
  - service: web-app-v1
    weight: 80
  - service: web-app-v2
    weight: 20

---
# Linkerd ServiceProfile
apiVersion: linkerd.io/v1alpha2
kind: ServiceProfile
metadata:
  name: web-app-service.production.svc.cluster.local
  namespace: production
spec:
  routes:
  - name: users
    condition:
      method: GET
      pathRegex: "/users/[0-9]+"
    responseClasses:
    - condition:
        status:
          min: 200
          max: 299
      isFailure: false
    - condition:
        status:
          min: 500
          max: 599
      isFailure: true
    timeout: 30s
    retryBudget:
      retryRatio: 0.2
      minRetriesPerSecond: 10
      ttl: 10s
```

## 4. 可观测性 (Observability)

### Prometheus 监控配置

```yaml
# Prometheus配置
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
    
    rule_files:
    - "/etc/prometheus/rules/*.yml"
    
    alerting:
      alertmanagers:
      - static_configs:
        - targets:
          - alertmanager:9093
    
    scrape_configs:
    # Kubernetes API Server
    - job_name: 'kubernetes-apiservers'
      kubernetes_sd_configs:
      - role: endpoints
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
        action: keep
        regex: default;kubernetes;https
    
    # Kubernetes Nodes
    - job_name: 'kubernetes-nodes'
      kubernetes_sd_configs:
      - role: node
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
      - target_label: __address__
        replacement: kubernetes.default.svc:443
      - source_labels: [__meta_kubernetes_node_name]
        regex: (.+)
        target_label: __metrics_path__
        replacement: /api/v1/nodes/${1}/proxy/metrics
    
    # Kubernetes Pods
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
      - role: pod
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_pod_name]
        action: replace
        target_label: kubernetes_pod_name
    
    # Application metrics
    - job_name: 'web-app'
      static_configs:
      - targets: ['web-app-service:8080']
      metrics_path: /metrics
      scrape_interval: 10s

---
# Prometheus告警规则
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-rules
  namespace: monitoring
data:
  app.yml: |
    groups:
    - name: application
      rules:
      # 高错误率告警
      - alert: HighErrorRate
        expr: |
          (
            sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)
            /
            sum(rate(http_requests_total[5m])) by (service)
          ) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
          description: "Service {{ $labels.service }} has error rate above 5% for 5 minutes"
      
      # 高延迟告警
      - alert: HighLatency
        expr: |
          histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service)) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "Service {{ $labels.service }} 95th percentile latency is above 1s"
      
      # Pod重启告警
      - alert: PodRestartingTooOften
        expr: |
          increase(kube_pod_container_status_restarts_total[1h]) > 5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Pod restarting too often"
          description: "Pod {{ $labels.namespace }}/{{ $labels.pod }} has restarted {{ $value }} times in the last hour"
      
      # 内存使用率告警
      - alert: HighMemoryUsage
        expr: |
          (
            container_memory_working_set_bytes{container!="POD",container!=""}
            /
            container_spec_memory_limit_bytes{container!="POD",container!=""}
          ) > 0.9
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High memory usage"
          description: "Container {{ $labels.container }} in pod {{ $labels.namespace }}/{{ $labels.pod }} is using {{ $value | humanizePercentage }} of memory"
      
      # CPU使用率告警
      - alert: HighCPUUsage
        expr: |
          (
            rate(container_cpu_usage_seconds_total{container!="POD",container!=""}[5m])
            /
            container_spec_cpu_quota{container!="POD",container!=""} * container_spec_cpu_period{container!="POD",container!=""}
          ) > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage"
          description: "Container {{ $labels.container }} in pod {{ $labels.namespace }}/{{ $labels.pod }} is using {{ $value | humanizePercentage }} of CPU"
```

### Grafana 仪表板

```json
{
  "dashboard": {
    "id": null,
    "title": "Kubernetes Cluster Overview",
    "tags": ["kubernetes", "cluster"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "Cluster CPU Usage",
        "type": "stat",
        "targets": [
          {
            "expr": "(1 - avg(irate(node_cpu_seconds_total{mode=\"idle\"}[5m]))) * 100",
            "legendFormat": "CPU Usage %"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "percent",
            "min": 0,
            "max": 100,
            "thresholds": {
              "steps": [
                {"color": "green", "value": null},
                {"color": "yellow", "value": 70},
                {"color": "red", "value": 90}
              ]
            }
          }
        }
      },
      {
        "id": 2,
        "title": "Memory Usage",
        "type": "stat",
        "targets": [
          {
            "expr": "(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100",
            "legendFormat": "Memory Usage %"
          }
        ]
      },
      {
        "id": 3,
        "title": "Pod Status",
        "type": "piechart",
        "targets": [
          {
            "expr": "sum by (phase) (kube_pod_status_phase)",
            "legendFormat": "{{ phase }}"
          }
        ]
      },
      {
        "id": 4,
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total[5m])) by (service)",
            "legendFormat": "{{ service }}"
          }
        ]
      },
      {
        "id": 5,
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) by (service) / sum(rate(http_requests_total[5m])) by (service)",
            "legendFormat": "{{ service }}"
          }
        ],
        "yAxes": [
          {
            "unit": "percentunit",
            "min": 0
          }
        ]
      },
      {
        "id": 6,
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service))",
            "legendFormat": "95th percentile - {{ service }}"
          },
          {
            "expr": "histogram_quantile(0.50, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service))",
            "legendFormat": "50th percentile - {{ service }}"
          }
        ],
        "yAxes": [
          {
            "unit": "s",
            "min": 0
          }
        ]
      }
    ],
    "time": {
      "from": "now-1h",
      "to": "now"
    },
    "refresh": "30s"
  }
}
```

### 分布式链路追踪 (Jaeger)

```yaml
# Jaeger部署
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jaeger
  namespace: tracing
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jaeger
  template:
    metadata:
      labels:
        app: jaeger
    spec:
      containers:
      - name: jaeger
        image: jaegertracing/all-in-one:latest
        env:
        - name: COLLECTOR_ZIPKIN_HTTP_PORT
          value: "9411"
        - name: SPAN_STORAGE_TYPE
          value: "elasticsearch"
        - name: ES_SERVER_URLS
          value: "http://elasticsearch:9200"
        ports:
        - containerPort: 16686
          name: ui
        - containerPort: 14268
          name: collector
        - containerPort: 9411
          name: zipkin
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"

---
# Jaeger Service
apiVersion: v1
kind: Service
metadata:
  name: jaeger
  namespace: tracing
spec:
  ports:
  - port: 16686
    targetPort: 16686
    name: ui
  - port: 14268
    targetPort: 14268
    name: collector
  - port: 9411
    targetPort: 9411
    name: zipkin
  selector:
    app: jaeger
```

## 5. CI/CD 流水线

### GitLab CI/CD 配置

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - security
  - deploy-staging
  - deploy-production

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  REGISTRY: registry.gitlab.com
  IMAGE_NAME: $REGISTRY/$CI_PROJECT_PATH
  KUBECONFIG: /tmp/kubeconfig

# 单元测试
unit-test:
  stage: test
  image: node:16-alpine
  script:
    - npm ci
    - npm run test:unit
    - npm run test:coverage
  coverage: '/Lines\s*:\s*(\d+\.?\d*)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
  only:
    - merge_requests
    - main
    - develop

# 集成测试
integration-test:
  stage: test
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  script:
    - docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
    - docker-compose -f docker-compose.test.yml down
  only:
    - merge_requests
    - main
    - develop

# 构建镜像
build-image:
  stage: build
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  before_script:
    - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
  script:
    - |
      if [[ "$CI_COMMIT_BRANCH" == "$CI_DEFAULT_BRANCH" ]]; then
        tag="latest"
        echo "Running on default branch '$CI_DEFAULT_BRANCH': tag = 'latest'"
      else
        tag="$CI_COMMIT_REF_SLUG"
        echo "Running on branch '$CI_COMMIT_BRANCH': tag = $tag"
      fi
    - docker build --pull -t "$IMAGE_NAME:$tag" .
    - docker push "$IMAGE_NAME:$tag"
    - |
      if [[ "$CI_COMMIT_BRANCH" == "$CI_DEFAULT_BRANCH" ]]; then
        docker tag "$IMAGE_NAME:$tag" "$IMAGE_NAME:$CI_COMMIT_SHA"
        docker push "$IMAGE_NAME:$CI_COMMIT_SHA"
      fi
  rules:
    - if: $CI_COMMIT_BRANCH
      exists:
        - Dockerfile

# 安全扫描
security-scan:
  stage: security
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  script:
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock 
        -v $PWD:/tmp/.cache/ aquasec/trivy:latest 
        image --exit-code 0 --no-progress --format table $IMAGE_NAME:$CI_COMMIT_SHA
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock 
        -v $PWD:/tmp/.cache/ aquasec/trivy:latest 
        image --exit-code 1 --severity HIGH,CRITICAL --no-progress --format table $IMAGE_NAME:$CI_COMMIT_SHA
  allow_failure: true
  only:
    - main
    - develop

# 部署到Staging环境
deploy-staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  script:
    - echo $KUBE_CONFIG | base64 -d > $KUBECONFIG
    - kubectl config use-context staging
    - |
      sed -i "s|IMAGE_TAG|$CI_COMMIT_SHA|g" k8s/staging/deployment.yaml
      kubectl apply -f k8s/staging/
    - kubectl rollout status deployment/web-app -n staging --timeout=300s
    - kubectl get pods -n staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

# 部署到Production环境
deploy-production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  script:
    - echo $KUBE_CONFIG | base64 -d > $KUBECONFIG
    - kubectl config use-context production
    - |
      sed -i "s|IMAGE_TAG|$CI_COMMIT_SHA|g" k8s/production/deployment.yaml
      kubectl apply -f k8s/production/
    - kubectl rollout status deployment/web-app -n production --timeout=600s
    - kubectl get pods -n production
  environment:
    name: production
    url: https://api.example.com
  when: manual
  only:
    - main

# 回滚
rollback-production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  script:
    - echo $KUBE_CONFIG | base64 -d > $KUBECONFIG
    - kubectl config use-context production
    - kubectl rollout undo deployment/web-app -n production
    - kubectl rollout status deployment/web-app -n production --timeout=300s
  environment:
    name: production
    url: https://api.example.com
  when: manual
  only:
    - main
```

### ArgoCD GitOps 配置

```yaml
# ArgoCD Application
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: web-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/company/web-app-config
    targetRevision: HEAD
    path: k8s/production
    helm:
      valueFiles:
      - values.yaml
      - values-production.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
    - CreateNamespace=true
    - PrunePropagationPolicy=foreground
    - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  revisionHistoryLimit: 10

---
# ArgoCD AppProject
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: web-apps
  namespace: argocd
spec:
  description: Web applications project
  sourceRepos:
  - 'https://github.com/company/*'
  destinations:
  - namespace: 'production'
    server: https://kubernetes.default.svc
  - namespace: 'staging'
    server: https://kubernetes.default.svc
  clusterResourceWhitelist:
  - group: ''
    kind: Namespace
  - group: 'rbac.authorization.k8s.io'
    kind: ClusterRole
  - group: 'rbac.authorization.k8s.io'
    kind: ClusterRoleBinding
  namespaceResourceWhitelist:
  - group: ''
    kind: '*'
  - group: 'apps'
    kind: '*'
  - group: 'networking.k8s.io'
    kind: '*'
  roles:
  - name: admin
    description: Admin access to web-apps project
    policies:
    - p, proj:web-apps:admin, applications, *, web-apps/*, allow
    - p, proj:web-apps:admin, repositories, *, *, allow
    groups:
    - company:devops
  - name: developer
    description: Developer access to web-apps project
    policies:
    - p, proj:web-apps:developer, applications, get, web-apps/*, allow
    - p, proj:web-apps:developer, applications, sync, web-apps/*, allow
    groups:
    - company:developers
```

## 6. 安全最佳实践

### Pod Security Standards

```yaml
# Pod Security Policy (已弃用，使用Pod Security Standards)
apiVersion: v1
kind: Namespace
metadata:
  name: secure-namespace
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted

---
# 安全的Pod配置
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-app
  namespace: secure-namespace
spec:
  replicas: 3
  selector:
    matchLabels:
      app: secure-app
  template:
    metadata:
      labels:
        app: secure-app
    spec:
      serviceAccountName: secure-app-sa
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        runAsGroup: 3000
        fsGroup: 2000
        seccompProfile:
          type: RuntimeDefault
      containers:
      - name: app
        image: myapp:latest
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          runAsNonRoot: true
          runAsUser: 1000
          capabilities:
            drop:
            - ALL
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: var-run
          mountPath: /var/run
        - name: app-config
          mountPath: /etc/config
          readOnly: true
      volumes:
      - name: tmp
        emptyDir: {}
      - name: var-run
        emptyDir: {}
      - name: app-config
        configMap:
          name: app-config

---
# RBAC配置
apiVersion: v1
kind: ServiceAccount
metadata:
  name: secure-app-sa
  namespace: secure-namespace

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: secure-namespace
  name: secure-app-role
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: secure-app-binding
  namespace: secure-namespace
subjects:
- kind: ServiceAccount
  name: secure-app-sa
  namespace: secure-namespace
roleRef:
  kind: Role
  name: secure-app-role
  apiGroup: rbac.authorization.k8s.io
```

### Network Policies

```yaml
# 网络策略 - 默认拒绝所有流量
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress

---
# 允许特定服务间通信
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-web-to-api
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api-server
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: web-frontend
    ports:
    - protocol: TCP
      port: 8080

---
# 允许访问外部服务
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-external-api
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api-server
  policyTypes:
  - Egress
  egress:
  - to: []
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
```

## 总结

云原生技术栈为现代应用提供了强大的基础设施和工具链：

1. **容器化与编排**：Docker + Kubernetes 提供了标准化的应用打包和部署方式
2. **服务网格**：Istio/Linkerd 解决了微服务间的通信、安全和可观测性问题
3. **可观测性**：Prometheus + Grafana + Jaeger 提供了全方位的监控和追踪能力
4. **CI/CD**：GitLab CI + ArgoCD 实现了自动化的持续集成和部署
5. **安全**：Pod Security Standards + RBAC + Network Policies 确保了集群安全

云原生技术的采用需要团队在技术栈、开发流程和运维模式上的全面转型。建议从小规模试点开始，逐步扩展到整个组织，同时注重团队技能培养和最佳实践的建立。