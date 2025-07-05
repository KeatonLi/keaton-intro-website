---
title: 数据库设计与性能优化实战
excerpt: 深入探讨数据库设计原则、索引优化、查询性能调优、分库分表等核心技术，帮助构建高性能的数据存储系统。
author: Keaton
date: 2024-01-19
tags: [数据库, MySQL, 性能优化, 索引, 分库分表]
---

# 数据库设计与性能优化实战

数据库是现代应用系统的核心组件，其设计质量和性能直接影响整个系统的稳定性和用户体验。本文将从数据库设计原则出发，深入探讨索引优化、查询调优、架构设计等关键技术。

## 1. 数据库设计原则

### 范式设计与反范式

#### 第一范式 (1NF)
```sql
-- 违反1NF的设计（包含重复组）
CREATE TABLE bad_orders (
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    products VARCHAR(500), -- 存储多个产品，违反1NF
    quantities VARCHAR(100) -- 存储多个数量，违反1NF
);

-- 符合1NF的设计
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    order_date DATETIME
);

CREATE TABLE order_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
```

#### 第二范式 (2NF)
```sql
-- 违反2NF的设计（存在部分依赖）
CREATE TABLE bad_order_details (
    order_id INT,
    product_id INT,
    customer_name VARCHAR(100), -- 依赖于order_id，不依赖于完整主键
    product_name VARCHAR(100),  -- 依赖于product_id，不依赖于完整主键
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- 符合2NF的设计
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category_id INT,
    price DECIMAL(10,2)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

#### 第三范式 (3NF)
```sql
-- 违反3NF的设计（存在传递依赖）
CREATE TABLE bad_employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100), -- 传递依赖：employee_id -> department_id -> department_name
    department_location VARCHAR(100) -- 传递依赖
);

-- 符合3NF的设计
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100),
    location VARCHAR(100),
    manager_id INT
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100),
    department_id INT,
    salary DECIMAL(10,2),
    hire_date DATE,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
```

### 反范式设计场景

```sql
-- 为了查询性能，适当反范式化
CREATE TABLE order_summary (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100), -- 冗余字段，避免JOIN
    order_date DATETIME,
    total_amount DECIMAL(12,2), -- 计算字段，避免聚合查询
    item_count INT,             -- 计算字段
    status ENUM('pending', 'processing', 'shipped', 'delivered'),
    
    INDEX idx_customer_date (customer_id, order_date),
    INDEX idx_status_date (status, order_date)
);

-- 定期同步数据的存储过程
DELIMITER //
CREATE PROCEDURE UpdateOrderSummary()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_order_id INT;
    DECLARE cur CURSOR FOR 
        SELECT order_id FROM orders 
        WHERE updated_at > DATE_SUB(NOW(), INTERVAL 1 HOUR);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_order_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        INSERT INTO order_summary (order_id, customer_id, customer_name, order_date, total_amount, item_count, status)
        SELECT 
            o.order_id,
            o.customer_id,
            c.customer_name,
            o.order_date,
            COALESCE(SUM(oi.quantity * oi.unit_price), 0) as total_amount,
            COALESCE(SUM(oi.quantity), 0) as item_count,
            o.status
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        WHERE o.order_id = v_order_id
        GROUP BY o.order_id, o.customer_id, c.customer_name, o.order_date, o.status
        ON DUPLICATE KEY UPDATE
            customer_name = VALUES(customer_name),
            total_amount = VALUES(total_amount),
            item_count = VALUES(item_count),
            status = VALUES(status);
    END LOOP;
    
    CLOSE cur;
END //
DELIMITER ;
```

## 2. 索引设计与优化

### 索引类型与选择

```sql
-- B+树索引（默认）
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'suspended'),
    
    -- 唯一索引
    UNIQUE KEY uk_username (username),
    UNIQUE KEY uk_email (email),
    
    -- 普通索引
    KEY idx_age (age),
    KEY idx_status (status),
    KEY idx_created_at (created_at),
    
    -- 复合索引
    KEY idx_status_age (status, age),
    KEY idx_status_created (status, created_at)
);

-- 全文索引
CREATE TABLE articles (
    article_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200),
    content TEXT,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 全文索引
    FULLTEXT KEY ft_title_content (title, content),
    
    KEY idx_author_created (author_id, created_at)
);

-- 使用全文索引查询
SELECT * FROM articles 
WHERE MATCH(title, content) AGAINST('数据库 优化' IN NATURAL LANGUAGE MODE);

-- 空间索引（MySQL 5.7+）
CREATE TABLE locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    coordinates POINT NOT NULL,
    
    SPATIAL KEY idx_coordinates (coordinates)
);

-- 空间查询示例
SELECT name, ST_Distance_Sphere(coordinates, POINT(116.397128, 39.916527)) as distance
FROM locations
WHERE ST_Distance_Sphere(coordinates, POINT(116.397128, 39.916527)) < 1000
ORDER BY distance;
```

### 复合索引设计原则

```sql
-- 最左前缀原则
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    status VARCHAR(20),
    order_date DATE,
    total_amount DECIMAL(10,2),
    
    -- 复合索引：遵循最左前缀原则
    KEY idx_customer_status_date (customer_id, status, order_date),
    KEY idx_status_date_amount (status, order_date, total_amount)
);

-- 可以使用索引的查询
SELECT * FROM orders WHERE customer_id = 123; -- 使用idx_customer_status_date
SELECT * FROM orders WHERE customer_id = 123 AND status = 'shipped'; -- 使用idx_customer_status_date
SELECT * FROM orders WHERE customer_id = 123 AND status = 'shipped' AND order_date = '2024-01-01'; -- 使用idx_customer_status_date

-- 无法使用索引的查询
SELECT * FROM orders WHERE status = 'shipped'; -- 无法使用idx_customer_status_date（跳过了customer_id）
SELECT * FROM orders WHERE order_date = '2024-01-01'; -- 无法使用idx_customer_status_date（跳过了customer_id和status）

-- 索引覆盖查询优化
SELECT customer_id, status, order_date 
FROM orders 
WHERE customer_id = 123 AND status = 'shipped'
ORDER BY order_date; -- 完全使用索引，无需回表
```

### 索引监控与维护

```sql
-- 查看索引使用情况
SELECT 
    t.TABLE_SCHEMA,
    t.TABLE_NAME,
    s.INDEX_NAME,
    s.COLUMN_NAME,
    s.SEQ_IN_INDEX,
    s.CARDINALITY,
    ROUND(((s.CARDINALITY / t.TABLE_ROWS) * 100), 2) AS selectivity
FROM 
    INFORMATION_SCHEMA.STATISTICS s
    INNER JOIN INFORMATION_SCHEMA.TABLES t ON s.TABLE_SCHEMA = t.TABLE_SCHEMA AND s.TABLE_NAME = t.TABLE_NAME
WHERE 
    t.TABLE_SCHEMA = 'your_database'
    AND t.TABLE_ROWS > 0
ORDER BY 
    t.TABLE_NAME, s.INDEX_NAME, s.SEQ_IN_INDEX;

-- 查找未使用的索引
SELECT 
    object_schema,
    object_name,
    index_name
FROM performance_schema.table_io_waits_summary_by_index_usage 
WHERE index_name IS NOT NULL
    AND count_star = 0
    AND object_schema = 'your_database'
ORDER BY object_schema, object_name;

-- 查找重复索引
SELECT 
    a.TABLE_SCHEMA,
    a.TABLE_NAME,
    a.INDEX_NAME as index1,
    b.INDEX_NAME as index2,
    GROUP_CONCAT(a.COLUMN_NAME ORDER BY a.SEQ_IN_INDEX) as columns1,
    GROUP_CONCAT(b.COLUMN_NAME ORDER BY b.SEQ_IN_INDEX) as columns2
FROM 
    INFORMATION_SCHEMA.STATISTICS a
    JOIN INFORMATION_SCHEMA.STATISTICS b ON 
        a.TABLE_SCHEMA = b.TABLE_SCHEMA 
        AND a.TABLE_NAME = b.TABLE_NAME 
        AND a.INDEX_NAME < b.INDEX_NAME
WHERE 
    a.TABLE_SCHEMA = 'your_database'
GROUP BY 
    a.TABLE_SCHEMA, a.TABLE_NAME, a.INDEX_NAME, b.INDEX_NAME
HAVING 
    columns1 = columns2;
```

## 3. 查询优化

### EXPLAIN分析

```sql
-- 基本EXPLAIN使用
EXPLAIN SELECT 
    o.order_id,
    c.customer_name,
    o.order_date,
    SUM(oi.quantity * oi.unit_price) as total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-01-31'
    AND c.status = 'active'
GROUP BY o.order_id, c.customer_name, o.order_date
HAVING total > 1000
ORDER BY total DESC;

-- 详细分析
EXPLAIN FORMAT=JSON SELECT ...; -- JSON格式，提供更详细信息
EXPLAIN ANALYZE SELECT ...;     -- 实际执行并分析（MySQL 8.0+）

-- 优化前的查询
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE YEAR(o.order_date) = 2024 -- 函数导致无法使用索引
    AND c.customer_name LIKE '%张%'; -- 前缀通配符无法使用索引

-- 优化后的查询
SELECT o.order_id, o.customer_id, o.order_date, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date >= '2024-01-01' 
    AND o.order_date < '2025-01-01' -- 避免函数，使用范围查询
    AND c.customer_name LIKE '张%';  -- 避免前缀通配符
```

### 子查询优化

```sql
-- 低效的子查询
SELECT * FROM customers c
WHERE c.customer_id IN (
    SELECT o.customer_id 
    FROM orders o 
    WHERE o.order_date > '2024-01-01'
);

-- 优化为JOIN
SELECT DISTINCT c.*
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date > '2024-01-01';

-- 或使用EXISTS（通常更高效）
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.customer_id 
        AND o.order_date > '2024-01-01'
);

-- 相关子查询优化
-- 低效：每行都执行子查询
SELECT 
    c.customer_name,
    (
        SELECT COUNT(*) 
        FROM orders o 
        WHERE o.customer_id = c.customer_id
    ) as order_count
FROM customers c;

-- 优化：使用LEFT JOIN
SELECT 
    c.customer_name,
    COALESCE(o.order_count, 0) as order_count
FROM customers c
LEFT JOIN (
    SELECT customer_id, COUNT(*) as order_count
    FROM orders
    GROUP BY customer_id
) o ON c.customer_id = o.customer_id;
```

### 分页查询优化

```sql
-- 传统分页（大偏移量时性能差）
SELECT * FROM orders 
ORDER BY order_id 
LIMIT 100000, 20; -- 需要扫描前100000行

-- 优化方案1：使用游标分页
SELECT * FROM orders 
WHERE order_id > 100000 -- 上一页最后一条记录的ID
ORDER BY order_id 
LIMIT 20;

-- 优化方案2：延迟关联
SELECT o.* FROM orders o
JOIN (
    SELECT order_id FROM orders 
    ORDER BY order_id 
    LIMIT 100000, 20
) t ON o.order_id = t.order_id;

-- 优化方案3：使用覆盖索引
SELECT order_id, customer_id, order_date, total_amount
FROM orders 
ORDER BY order_id 
LIMIT 100000, 20;

-- 创建覆盖索引
CREATE INDEX idx_order_covering ON orders(order_id, customer_id, order_date, total_amount);
```

## 4. 数据库架构设计

### 读写分离

```java
// Spring Boot读写分离配置
@Configuration
public class DataSourceConfig {
    
    @Bean
    @ConfigurationProperties("spring.datasource.master")
    public DataSource masterDataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean
    @ConfigurationProperties("spring.datasource.slave")
    public DataSource slaveDataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean
    public DataSource routingDataSource() {
        RoutingDataSource routingDataSource = new RoutingDataSource();
        
        Map<Object, Object> dataSourceMap = new HashMap<>();
        dataSourceMap.put("master", masterDataSource());
        dataSourceMap.put("slave", slaveDataSource());
        
        routingDataSource.setTargetDataSources(dataSourceMap);
        routingDataSource.setDefaultTargetDataSource(masterDataSource());
        
        return routingDataSource;
    }
}

// 动态数据源路由
public class RoutingDataSource extends AbstractRoutingDataSource {
    
    @Override
    protected Object determineCurrentLookupKey() {
        return DataSourceContextHolder.getDataSourceType();
    }
}

// 数据源上下文
public class DataSourceContextHolder {
    private static final ThreadLocal<String> contextHolder = new ThreadLocal<>();
    
    public static void setDataSourceType(String dataSourceType) {
        contextHolder.set(dataSourceType);
    }
    
    public static String getDataSourceType() {
        return contextHolder.get();
    }
    
    public static void clearDataSourceType() {
        contextHolder.remove();
    }
}

// AOP切面实现自动路由
@Aspect
@Component
public class DataSourceAspect {
    
    @Around("@annotation(readOnly)")
    public Object around(ProceedingJoinPoint point, ReadOnly readOnly) throws Throwable {
        try {
            DataSourceContextHolder.setDataSourceType("slave");
            return point.proceed();
        } finally {
            DataSourceContextHolder.clearDataSourceType();
        }
    }
    
    @Around("execution(* com.example.service.*Service.find*(..)) || " +
            "execution(* com.example.service.*Service.get*(..)) || " +
            "execution(* com.example.service.*Service.query*(..))")
    public Object routeRead(ProceedingJoinPoint point) throws Throwable {
        try {
            DataSourceContextHolder.setDataSourceType("slave");
            return point.proceed();
        } finally {
            DataSourceContextHolder.clearDataSourceType();
        }
    }
}

// 使用注解
@Service
public class OrderService {
    
    @ReadOnly
    public List<Order> findOrdersByCustomer(Long customerId) {
        // 自动路由到从库
        return orderRepository.findByCustomerId(customerId);
    }
    
    public Order createOrder(Order order) {
        // 默认路由到主库
        return orderRepository.save(order);
    }
}
```

### 分库分表

```java
// 分片策略接口
public interface ShardingStrategy {
    String determineTargetDataSource(Object shardingValue);
    String determineTargetTable(Object shardingValue);
}

// 用户ID分片策略
@Component
public class UserIdShardingStrategy implements ShardingStrategy {
    
    private static final int DB_COUNT = 4;
    private static final int TABLE_COUNT = 8;
    
    @Override
    public String determineTargetDataSource(Object shardingValue) {
        Long userId = (Long) shardingValue;
        int dbIndex = (int) (userId % DB_COUNT);
        return "db" + dbIndex;
    }
    
    @Override
    public String determineTargetTable(Object shardingValue) {
        Long userId = (Long) shardingValue;
        int tableIndex = (int) (userId % TABLE_COUNT);
        return "user_" + tableIndex;
    }
}

// 分片上下文
public class ShardingContext {
    private static final ThreadLocal<String> dataSourceHolder = new ThreadLocal<>();
    private static final ThreadLocal<String> tableHolder = new ThreadLocal<>();
    
    public static void setDataSource(String dataSource) {
        dataSourceHolder.set(dataSource);
    }
    
    public static String getDataSource() {
        return dataSourceHolder.get();
    }
    
    public static void setTable(String table) {
        tableHolder.set(table);
    }
    
    public static String getTable() {
        return tableHolder.get();
    }
    
    public static void clear() {
        dataSourceHolder.remove();
        tableHolder.remove();
    }
}

// 分片AOP
@Aspect
@Component
public class ShardingAspect {
    
    @Autowired
    private UserIdShardingStrategy shardingStrategy;
    
    @Around("@annotation(sharding)")
    public Object around(ProceedingJoinPoint point, Sharding sharding) throws Throwable {
        try {
            Object[] args = point.getArgs();
            Object shardingValue = extractShardingValue(args, sharding.value());
            
            String dataSource = shardingStrategy.determineTargetDataSource(shardingValue);
            String table = shardingStrategy.determineTargetTable(shardingValue);
            
            ShardingContext.setDataSource(dataSource);
            ShardingContext.setTable(table);
            
            return point.proceed();
        } finally {
            ShardingContext.clear();
        }
    }
    
    private Object extractShardingValue(Object[] args, String fieldName) {
        // 提取分片键值的逻辑
        for (Object arg : args) {
            if (arg instanceof Long && "userId".equals(fieldName)) {
                return arg;
            }
            // 可以通过反射提取对象中的字段值
        }
        throw new IllegalArgumentException("Sharding value not found");
    }
}

// 使用分片
@Service
public class UserService {
    
    @Sharding("userId")
    public User findById(Long userId) {
        // 自动路由到对应的数据库和表
        return userRepository.findById(userId);
    }
    
    @Sharding("userId")
    public User save(User user) {
        return userRepository.save(user);
    }
    
    // 跨分片查询需要特殊处理
    public List<User> findByAge(int age) {
        List<User> result = new ArrayList<>();
        
        // 需要查询所有分片
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 8; j++) {
                ShardingContext.setDataSource("db" + i);
                ShardingContext.setTable("user_" + j);
                
                List<User> users = userRepository.findByAge(age);
                result.addAll(users);
                
                ShardingContext.clear();
            }
        }
        
        return result;
    }
}
```

### 数据库连接池优化

```java
// HikariCP连接池配置
@Configuration
public class DataSourceConfig {
    
    @Bean
    @ConfigurationProperties("spring.datasource.hikari")
    public HikariConfig hikariConfig() {
        HikariConfig config = new HikariConfig();
        
        // 基本配置
        config.setDriverClassName("com.mysql.cj.jdbc.Driver");
        config.setJdbcUrl("jdbc:mysql://localhost:3306/testdb");
        config.setUsername("root");
        config.setPassword("password");
        
        // 连接池配置
        config.setMinimumIdle(10);                    // 最小空闲连接数
        config.setMaximumPoolSize(50);                // 最大连接数
        config.setConnectionTimeout(30000);           // 连接超时时间（毫秒）
        config.setIdleTimeout(600000);                // 空闲超时时间（毫秒）
        config.setMaxLifetime(1800000);               // 连接最大生存时间（毫秒）
        config.setLeakDetectionThreshold(60000);      // 连接泄漏检测阈值
        
        // 性能配置
        config.setConnectionTestQuery("SELECT 1");    // 连接测试查询
        config.setValidationTimeout(5000);            // 验证超时时间
        config.setInitializationFailTimeout(1);       // 初始化失败超时
        
        // 缓存配置
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        config.addDataSourceProperty("useServerPrepStmts", "true");
        config.addDataSourceProperty("useLocalSessionState", "true");
        config.addDataSourceProperty("rewriteBatchedStatements", "true");
        config.addDataSourceProperty("cacheResultSetMetadata", "true");
        config.addDataSourceProperty("cacheServerConfiguration", "true");
        config.addDataSourceProperty("elideSetAutoCommits", "true");
        config.addDataSourceProperty("maintainTimeStats", "false");
        
        return config;
    }
    
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource(hikariConfig());
    }
}

// 连接池监控
@Component
public class DataSourceMonitor {
    
    @Autowired
    private HikariDataSource dataSource;
    
    @Scheduled(fixedRate = 30000) // 每30秒监控一次
    public void monitorConnectionPool() {
        HikariPoolMXBean poolBean = dataSource.getHikariPoolMXBean();
        
        int activeConnections = poolBean.getActiveConnections();
        int idleConnections = poolBean.getIdleConnections();
        int totalConnections = poolBean.getTotalConnections();
        int threadsAwaitingConnection = poolBean.getThreadsAwaitingConnection();
        
        log.info("Connection Pool Status - Active: {}, Idle: {}, Total: {}, Waiting: {}",
                activeConnections, idleConnections, totalConnections, threadsAwaitingConnection);
        
        // 告警逻辑
        if (activeConnections > totalConnections * 0.8) {
            log.warn("Connection pool usage is high: {}%", 
                    (activeConnections * 100.0 / totalConnections));
        }
        
        if (threadsAwaitingConnection > 0) {
            log.warn("Threads waiting for connection: {}", threadsAwaitingConnection);
        }
    }
}
```

## 5. 性能监控与调优

### 慢查询监控

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';
SET GLOBAL long_query_time = 1; -- 超过1秒的查询记录到慢查询日志
SET GLOBAL log_queries_not_using_indexes = 'ON'; -- 记录未使用索引的查询

-- 查看慢查询统计
SHOW GLOBAL STATUS LIKE 'Slow_queries';

-- 使用Performance Schema监控
SELECT 
    SCHEMA_NAME,
    DIGEST_TEXT,
    COUNT_STAR,
    AVG_TIMER_WAIT/1000000000 AS avg_time_seconds,
    MAX_TIMER_WAIT/1000000000 AS max_time_seconds,
    SUM_TIMER_WAIT/1000000000 AS total_time_seconds
FROM performance_schema.events_statements_summary_by_digest
WHERE SCHEMA_NAME = 'your_database'
ORDER BY AVG_TIMER_WAIT DESC
LIMIT 10;

-- 查看当前运行的查询
SELECT 
    ID,
    USER,
    HOST,
    DB,
    COMMAND,
    TIME,
    STATE,
    INFO
FROM INFORMATION_SCHEMA.PROCESSLIST
WHERE COMMAND != 'Sleep'
ORDER BY TIME DESC;
```

### 数据库性能调优

```sql
-- MySQL配置优化（my.cnf）
[mysqld]
# 基本配置
port = 3306
socket = /var/lib/mysql/mysql.sock
basedir = /usr
datadir = /var/lib/mysql

# 内存配置
innodb_buffer_pool_size = 2G        # 设置为物理内存的70-80%
innodb_buffer_pool_instances = 8     # 缓冲池实例数
innodb_log_file_size = 256M          # 日志文件大小
innodb_log_buffer_size = 16M         # 日志缓冲区大小
innodb_flush_log_at_trx_commit = 2   # 日志刷新策略
innodb_flush_method = O_DIRECT       # 刷新方法

# 连接配置
max_connections = 1000               # 最大连接数
max_connect_errors = 100000          # 最大连接错误数
connect_timeout = 10                 # 连接超时
wait_timeout = 28800                 # 等待超时
interactive_timeout = 28800          # 交互超时

# 查询缓存
query_cache_type = 1                 # 开启查询缓存
query_cache_size = 256M              # 查询缓存大小
query_cache_limit = 2M               # 单个查询缓存限制

# 临时表配置
tmp_table_size = 256M                # 临时表大小
max_heap_table_size = 256M           # 内存表大小

# 排序配置
sort_buffer_size = 2M                # 排序缓冲区
read_buffer_size = 2M                # 读缓冲区
read_rnd_buffer_size = 8M            # 随机读缓冲区
join_buffer_size = 2M                # 连接缓冲区

# 线程配置
thread_cache_size = 50               # 线程缓存
thread_stack = 256K                  # 线程栈大小

# 慢查询日志
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 1
log_queries_not_using_indexes = 1

# 二进制日志
log_bin = mysql-bin
binlog_format = ROW
expire_logs_days = 7
max_binlog_size = 100M

# InnoDB配置
innodb_file_per_table = 1            # 每表一个文件
innodb_open_files = 2000             # 打开文件数
innodb_io_capacity = 2000            # IO容量
innodb_read_io_threads = 8           # 读IO线程数
innodb_write_io_threads = 8          # 写IO线程数
innodb_thread_concurrency = 16       # 线程并发数
innodb_lock_wait_timeout = 50        # 锁等待超时
```

### 性能监控脚本

```bash
#!/bin/bash
# MySQL性能监控脚本

DB_USER="monitor"
DB_PASS="password"
DB_HOST="localhost"
LOG_FILE="/var/log/mysql_monitor.log"

# 获取当前时间
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# 连接数监控
CONNECTIONS=$(mysql -u$DB_USER -p$DB_PASS -h$DB_HOST -e "SHOW STATUS LIKE 'Threads_connected';" | awk 'NR==2{print $2}')
MAX_CONNECTIONS=$(mysql -u$DB_USER -p$DB_PASS -h$DB_HOST -e "SHOW VARIABLES LIKE 'max_connections';" | awk 'NR==2{print $2}')
CONNECTION_USAGE=$(echo "scale=2; $CONNECTIONS * 100 / $MAX_CONNECTIONS" | bc)

# 缓冲池命中率
BUFFER_POOL_READS=$(mysql -u$DB_USER -p$DB_PASS -h$DB_HOST -e "SHOW STATUS LIKE 'Innodb_buffer_pool_reads';" | awk 'NR==2{print $2}')
BUFFER_POOL_READ_REQUESTS=$(mysql -u$DB_USER -p$DB_PASS -h$DB_HOST -e "SHOW STATUS LIKE 'Innodb_buffer_pool_read_requests';" | awk 'NR==2{print $2}')
BUFFER_POOL_HIT_RATE=$(echo "scale=4; (1 - $BUFFER_POOL_READS / $BUFFER_POOL_READ_REQUESTS) * 100" | bc)

# 查询缓存命中率
QCACHE_HITS=$(mysql -u$DB_USER -p$DB_PASS -h$DB_HOST -e "SHOW STATUS LIKE 'Qcache_hits';" | awk 'NR==2{print $2}')
COM_SELECT=$(mysql -u$DB_USER -p$DB_PASS -h$DB_HOST -e "SHOW STATUS LIKE 'Com_select';" | awk 'NR==2{print $2}')
QCACHE_HIT_RATE=$(echo "scale=4; $QCACHE_HITS * 100 / ($QCACHE_HITS + $COM_SELECT)" | bc)

# 慢查询数量
SLOW_QUERIES=$(mysql -u$DB_USER -p$DB_PASS -h$DB_HOST -e "SHOW STATUS LIKE 'Slow_queries';" | awk 'NR==2{print $2}')

# 记录监控数据
echo "$TIMESTAMP - Connections: $CONNECTIONS/$MAX_CONNECTIONS ($CONNECTION_USAGE%), Buffer Pool Hit Rate: $BUFFER_POOL_HIT_RATE%, Query Cache Hit Rate: $QCACHE_HIT_RATE%, Slow Queries: $SLOW_QUERIES" >> $LOG_FILE

# 告警逻辑
if (( $(echo "$CONNECTION_USAGE > 80" | bc -l) )); then
    echo "$TIMESTAMP - ALERT: High connection usage: $CONNECTION_USAGE%" >> $LOG_FILE
fi

if (( $(echo "$BUFFER_POOL_HIT_RATE < 95" | bc -l) )); then
    echo "$TIMESTAMP - ALERT: Low buffer pool hit rate: $BUFFER_POOL_HIT_RATE%" >> $LOG_FILE
fi
```

## 总结

数据库设计与优化是一个系统性工程，需要从多个层面进行考虑：

1. **设计阶段**：遵循范式设计原则，合理使用反范式
2. **索引优化**：选择合适的索引类型，遵循最左前缀原则
3. **查询优化**：使用EXPLAIN分析，避免全表扫描
4. **架构设计**：读写分离、分库分表、连接池优化
5. **监控调优**：慢查询监控、性能指标跟踪

数据库优化是一个持续的过程，需要根据业务发展和数据增长，不断调整和优化策略。同时要注意平衡性能和一致性，避免过度优化导致系统复杂性增加。