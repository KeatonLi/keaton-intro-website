---
title: API设计与RESTful最佳实践
excerpt: 深入探讨现代API设计原则、RESTful架构风格、GraphQL、API安全、版本控制等核心概念，构建高质量的API服务。
author: Keaton
date: 2024-01-21
tags: [API设计, RESTful, GraphQL, 微服务, 安全, 文档]
---

# API设计与RESTful最佳实践

API（应用程序编程接口）是现代软件系统的核心组件，良好的API设计直接影响系统的可用性、可维护性和扩展性。本文将深入探讨API设计的最佳实践，包括RESTful架构、GraphQL、安全性、版本控制等关键主题。

## 1. RESTful API 设计原则

### REST 架构约束

REST（Representational State Transfer）是一种架构风格，具有以下核心约束：

1. **客户端-服务器架构**：关注点分离
2. **无状态**：每个请求包含所有必要信息
3. **可缓存**：响应应明确标识是否可缓存
4. **统一接口**：资源标识、资源操作、自描述消息、HATEOAS
5. **分层系统**：允许中间层（代理、网关等）
6. **按需代码**（可选）：服务器可向客户端发送可执行代码

### 资源设计

```http
# 良好的资源设计
GET    /api/v1/users              # 获取用户列表
GET    /api/v1/users/123          # 获取特定用户
POST   /api/v1/users              # 创建新用户
PUT    /api/v1/users/123          # 完整更新用户
PATCH  /api/v1/users/123          # 部分更新用户
DELETE /api/v1/users/123          # 删除用户

# 嵌套资源
GET    /api/v1/users/123/orders   # 获取用户的订单
POST   /api/v1/users/123/orders   # 为用户创建订单
GET    /api/v1/users/123/orders/456 # 获取用户的特定订单

# 避免的设计
GET    /api/v1/getUsers           # 动词形式，不符合REST
POST   /api/v1/users/delete       # 使用POST进行删除操作
GET    /api/v1/users/123/delete   # 使用GET进行删除操作
```

### HTTP 状态码使用

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // 200 OK - 成功获取资源
    @GetMapping
    public ResponseEntity<PagedResponse<UserDto>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search) {
        
        PagedResponse<UserDto> users = userService.getUsers(page, size, search);
        return ResponseEntity.ok(users);
    }
    
    // 200 OK - 成功获取特定资源
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    // 201 Created - 成功创建资源
    @PostMapping
    public ResponseEntity<UserDto> createUser(
            @Valid @RequestBody CreateUserRequest request,
            UriComponentsBuilder uriBuilder) {
        
        UserDto createdUser = userService.createUser(request);
        
        URI location = uriBuilder
            .path("/api/v1/users/{id}")
            .buildAndExpand(createdUser.getId())
            .toUri();
        
        return ResponseEntity.created(location).body(createdUser);
    }
    
    // 200 OK - 成功更新资源
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        
        UserDto updatedUser = userService.updateUser(id, request);
        return ResponseEntity.ok(updatedUser);
    }
    
    // 204 No Content - 成功删除资源
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    // 404 Not Found - 资源不存在
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .code("USER_NOT_FOUND")
            .message(ex.getMessage())
            .timestamp(Instant.now())
            .build();
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    // 400 Bad Request - 请求参数错误
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationError(MethodArgumentNotValidException ex) {
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        
        Map<String, String> errors = fieldErrors.stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                FieldError::getDefaultMessage,
                (existing, replacement) -> existing
            ));
        
        ErrorResponse error = ErrorResponse.builder()
            .code("VALIDATION_ERROR")
            .message("Request validation failed")
            .details(errors)
            .timestamp(Instant.now())
            .build();
        
        return ResponseEntity.badRequest().body(error);
    }
    
    // 409 Conflict - 资源冲突
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .code("USER_ALREADY_EXISTS")
            .message(ex.getMessage())
            .timestamp(Instant.now())
            .build();
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
}
```

### 请求和响应格式

```java
// 统一的响应格式
@Data
@Builder
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private Object metadata;
    private Instant timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
            .success(true)
            .data(data)
            .timestamp(Instant.now())
            .build();
    }
    
    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
            .success(true)
            .message(message)
            .data(data)
            .timestamp(Instant.now())
            .build();
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
            .success(false)
            .message(message)
            .timestamp(Instant.now())
            .build();
    }
}

// 分页响应格式
@Data
@Builder
public class PagedResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean first;
    private boolean last;
    private boolean hasNext;
    private boolean hasPrevious;
    
    public static <T> PagedResponse<T> of(Page<T> page) {
        return PagedResponse.<T>builder()
            .content(page.getContent())
            .page(page.getNumber())
            .size(page.getSize())
            .totalElements(page.getTotalElements())
            .totalPages(page.getTotalPages())
            .first(page.isFirst())
            .last(page.isLast())
            .hasNext(page.hasNext())
            .hasPrevious(page.hasPrevious())
            .build();
    }
}

// 错误响应格式
@Data
@Builder
public class ErrorResponse {
    private String code;
    private String message;
    private Object details;
    private Instant timestamp;
    private String path;
    private String traceId;
}

// DTO设计
@Data
@Builder
public class UserDto {
    private Long id;
    
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;
    
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;
    
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Instant createdAt;
    
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Instant updatedAt;
    
    // 嵌套资源
    private List<RoleDto> roles;
    
    // HATEOAS链接
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Map<String, String> links;
}

// 请求DTO
@Data
public class CreateUserRequest {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50)
    private String username;
    
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]",
             message = "Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character")
    private String password;
    
    private List<Long> roleIds;
}
```

## 2. 高级API设计模式

### HATEOAS (Hypermedia as the Engine of Application State)

```java
@Component
public class UserResourceAssembler {
    
    public UserDto toResource(User user) {
        UserDto userDto = UserDto.builder()
            .id(user.getId())
            .username(user.getUsername())
            .email(user.getEmail())
            .createdAt(user.getCreatedAt())
            .updatedAt(user.getUpdatedAt())
            .build();
        
        // 添加HATEOAS链接
        Map<String, String> links = new HashMap<>();
        links.put("self", "/api/v1/users/" + user.getId());
        links.put("orders", "/api/v1/users/" + user.getId() + "/orders");
        links.put("profile", "/api/v1/users/" + user.getId() + "/profile");
        
        // 条件性链接
        if (hasPermission(user, "UPDATE")) {
            links.put("update", "/api/v1/users/" + user.getId());
        }
        
        if (hasPermission(user, "DELETE")) {
            links.put("delete", "/api/v1/users/" + user.getId());
        }
        
        userDto.setLinks(links);
        return userDto;
    }
    
    private boolean hasPermission(User user, String action) {
        // 权限检查逻辑
        return true;
    }
}

// 使用Spring HATEOAS
@RestController
public class UserHateoasController {
    
    @GetMapping("/api/v1/users/{id}")
    public EntityModel<UserDto> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        UserDto userDto = userMapper.toDto(user);
        
        return EntityModel.of(userDto)
            .add(linkTo(methodOn(UserController.class).getUser(id)).withSelfRel())
            .add(linkTo(methodOn(UserController.class).getUsers(0, 20, null)).withRel("users"))
            .add(linkTo(methodOn(OrderController.class).getUserOrders(id, 0, 20)).withRel("orders"));
    }
}
```

### 内容协商

```java
@RestController
public class ContentNegotiationController {
    
    @GetMapping(value = "/api/v1/users/{id}", 
                produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping(value = "/api/v1/users/{id}/export", 
                produces = "text/csv")
    public ResponseEntity<String> exportUserToCsv(@PathVariable Long id) {
        String csvData = userService.exportUserToCsv(id);
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=user-" + id + ".csv");
        
        return ResponseEntity.ok()
            .headers(headers)
            .body(csvData);
    }
    
    @GetMapping(value = "/api/v1/users/{id}/avatar", 
                produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getUserAvatar(@PathVariable Long id) {
        byte[] avatarData = userService.getUserAvatar(id);
        
        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(avatarData);
    }
}
```

### 缓存策略

```java
@RestController
public class CacheableController {
    
    @GetMapping("/api/v1/users/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        
        // 设置缓存头
        return ResponseEntity.ok()
            .cacheControl(CacheControl.maxAge(Duration.ofMinutes(10)))
            .eTag(String.valueOf(user.getUpdatedAt().hashCode()))
            .body(user);
    }
    
    @GetMapping("/api/v1/users/{id}/conditional")
    public ResponseEntity<UserDto> getUserConditional(
            @PathVariable Long id,
            @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch,
            @RequestHeader(value = "If-Modified-Since", required = false) String ifModifiedSince) {
        
        User user = userService.getUserEntityById(id);
        String etag = String.valueOf(user.getUpdatedAt().hashCode());
        
        // ETag检查
        if (ifNoneMatch != null && ifNoneMatch.equals(etag)) {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
        }
        
        // Last-Modified检查
        if (ifModifiedSince != null) {
            try {
                Instant ifModifiedSinceDate = Instant.parse(ifModifiedSince);
                if (!user.getUpdatedAt().isAfter(ifModifiedSinceDate)) {
                    return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
                }
            } catch (DateTimeParseException e) {
                // 忽略无效的日期格式
            }
        }
        
        UserDto userDto = userMapper.toDto(user);
        
        return ResponseEntity.ok()
            .eTag(etag)
            .lastModified(user.getUpdatedAt())
            .cacheControl(CacheControl.maxAge(Duration.ofMinutes(10)))
            .body(userDto);
    }
}
```

## 3. API 版本控制

### URL版本控制

```java
// V1 API
@RestController
@RequestMapping("/api/v1/users")
public class UserV1Controller {
    
    @GetMapping("/{id}")
    public ResponseEntity<UserV1Dto> getUser(@PathVariable Long id) {
        // V1版本的用户数据结构
        UserV1Dto user = userService.getUserV1(id);
        return ResponseEntity.ok(user);
    }
}

// V2 API
@RestController
@RequestMapping("/api/v2/users")
public class UserV2Controller {
    
    @GetMapping("/{id}")
    public ResponseEntity<UserV2Dto> getUser(@PathVariable Long id) {
        // V2版本的用户数据结构（包含新字段）
        UserV2Dto user = userService.getUserV2(id);
        return ResponseEntity.ok(user);
    }
}

// DTO版本差异
@Data
public class UserV1Dto {
    private Long id;
    private String username;
    private String email;
    private Instant createdAt;
}

@Data
public class UserV2Dto {
    private Long id;
    private String username;
    private String email;
    private String firstName;  // 新增字段
    private String lastName;   // 新增字段
    private String phoneNumber; // 新增字段
    private Instant createdAt;
    private Instant updatedAt; // 新增字段
    private List<RoleDto> roles; // 新增字段
}
```

### Header版本控制

```java
@RestController
@RequestMapping("/api/users")
public class UserVersionController {
    
    @GetMapping(value = "/{id}", headers = "API-Version=1")
    public ResponseEntity<UserV1Dto> getUserV1(@PathVariable Long id) {
        UserV1Dto user = userService.getUserV1(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping(value = "/{id}", headers = "API-Version=2")
    public ResponseEntity<UserV2Dto> getUserV2(@PathVariable Long id) {
        UserV2Dto user = userService.getUserV2(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(
            @PathVariable Long id,
            @RequestHeader(value = "API-Version", defaultValue = "1") String apiVersion) {
        
        switch (apiVersion) {
            case "1":
                return ResponseEntity.ok(userService.getUserV1(id));
            case "2":
                return ResponseEntity.ok(userService.getUserV2(id));
            default:
                return ResponseEntity.badRequest()
                    .body("Unsupported API version: " + apiVersion);
        }
    }
}
```

### 内容类型版本控制

```java
@RestController
public class MediaTypeVersionController {
    
    @GetMapping(value = "/api/users/{id}", 
                produces = "application/vnd.company.user-v1+json")
    public ResponseEntity<UserV1Dto> getUserV1(@PathVariable Long id) {
        UserV1Dto user = userService.getUserV1(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping(value = "/api/users/{id}", 
                produces = "application/vnd.company.user-v2+json")
    public ResponseEntity<UserV2Dto> getUserV2(@PathVariable Long id) {
        UserV2Dto user = userService.getUserV2(id);
        return ResponseEntity.ok(user);
    }
}
```

## 4. GraphQL API 设计

### Schema定义

```graphql
# schema.graphql
type User {
  id: ID!
  username: String!
  email: String!
  firstName: String
  lastName: String
  phoneNumber: String
  createdAt: DateTime!
  updatedAt: DateTime!
  roles: [Role!]!
  orders(first: Int, after: String): OrderConnection!
  profile: UserProfile
}

type Role {
  id: ID!
  name: String!
  description: String
  permissions: [Permission!]!
}

type Permission {
  id: ID!
  name: String!
  resource: String!
  action: String!
}

type Order {
  id: ID!
  orderNumber: String!
  status: OrderStatus!
  totalAmount: Float!
  createdAt: DateTime!
  items: [OrderItem!]!
  user: User!
}

type OrderItem {
  id: ID!
  product: Product!
  quantity: Int!
  unitPrice: Float!
  totalPrice: Float!
}

type Product {
  id: ID!
  name: String!
  description: String
  price: Float!
  category: Category!
}

type Category {
  id: ID!
  name: String!
  description: String
  products(first: Int, after: String): ProductConnection!
}

type UserProfile {
  id: ID!
  bio: String
  avatar: String
  website: String
  location: String
  user: User!
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

# 分页类型
type OrderConnection {
  edges: [OrderEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type OrderEdge {
  node: Order!
  cursor: String!
}

type ProductConnection {
  edges: [ProductEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type ProductEdge {
  node: Product!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# 查询
type Query {
  # 用户查询
  user(id: ID!): User
  users(first: Int, after: String, search: String): UserConnection!
  me: User
  
  # 订单查询
  order(id: ID!): Order
  orders(first: Int, after: String, status: OrderStatus): OrderConnection!
  
  # 产品查询
  product(id: ID!): Product
  products(first: Int, after: String, categoryId: ID): ProductConnection!
  
  # 分类查询
  categories: [Category!]!
}

# 变更
type Mutation {
  # 用户操作
  createUser(input: CreateUserInput!): CreateUserPayload!
  updateUser(id: ID!, input: UpdateUserInput!): UpdateUserPayload!
  deleteUser(id: ID!): DeleteUserPayload!
  
  # 订单操作
  createOrder(input: CreateOrderInput!): CreateOrderPayload!
  updateOrderStatus(id: ID!, status: OrderStatus!): UpdateOrderStatusPayload!
  cancelOrder(id: ID!): CancelOrderPayload!
  
  # 产品操作
  createProduct(input: CreateProductInput!): CreateProductPayload!
  updateProduct(id: ID!, input: UpdateProductInput!): UpdateProductPayload!
  deleteProduct(id: ID!): DeleteProductPayload!
}

# 订阅
type Subscription {
  orderStatusChanged(userId: ID!): Order!
  newMessage(chatId: ID!): Message!
}

# 输入类型
input CreateUserInput {
  username: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  phoneNumber: String
  roleIds: [ID!]
}

input UpdateUserInput {
  username: String
  email: String
  firstName: String
  lastName: String
  phoneNumber: String
  roleIds: [ID!]
}

input CreateOrderInput {
  items: [OrderItemInput!]!
  shippingAddress: AddressInput!
  billingAddress: AddressInput
}

input OrderItemInput {
  productId: ID!
  quantity: Int!
}

input AddressInput {
  street: String!
  city: String!
  state: String!
  zipCode: String!
  country: String!
}

# 输出类型
type CreateUserPayload {
  user: User
  errors: [Error!]
}

type UpdateUserPayload {
  user: User
  errors: [Error!]
}

type DeleteUserPayload {
  success: Boolean!
  errors: [Error!]
}

type Error {
  field: String
  message: String!
  code: String!
}

scalar DateTime
```

### GraphQL Resolver实现

```java
@Component
public class UserResolver implements GraphQLQueryResolver, GraphQLMutationResolver {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private OrderService orderService;
    
    // Query resolvers
    public User user(String id) {
        return userService.getUserById(Long.valueOf(id));
    }
    
    public Connection<User> users(int first, String after, String search) {
        return userService.getUsers(first, after, search);
    }
    
    @PreAuthorize("hasRole('USER')")
    public User me(DataFetchingEnvironment env) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userService.getUserByUsername(username);
    }
    
    // Mutation resolvers
    @PreAuthorize("hasRole('ADMIN')")
    public CreateUserPayload createUser(CreateUserInput input) {
        try {
            User user = userService.createUser(input);
            return CreateUserPayload.builder()
                .user(user)
                .build();
        } catch (ValidationException e) {
            return CreateUserPayload.builder()
                .errors(e.getErrors())
                .build();
        }
    }
    
    @PreAuthorize("hasRole('ADMIN') or @userService.isOwner(#id, authentication.name)")
    public UpdateUserPayload updateUser(String id, UpdateUserInput input) {
        try {
            User user = userService.updateUser(Long.valueOf(id), input);
            return UpdateUserPayload.builder()
                .user(user)
                .build();
        } catch (ValidationException e) {
            return UpdateUserPayload.builder()
                .errors(e.getErrors())
                .build();
        }
    }
    
    // Field resolvers
    public Connection<Order> orders(User user, int first, String after) {
        return orderService.getOrdersByUserId(user.getId(), first, after);
    }
    
    public UserProfile profile(User user) {
        return userService.getUserProfile(user.getId());
    }
}

@Component
public class OrderResolver implements GraphQLQueryResolver {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private UserService userService;
    
    public Order order(String id) {
        return orderService.getOrderById(Long.valueOf(id));
    }
    
    public Connection<Order> orders(int first, String after, OrderStatus status) {
        return orderService.getOrders(first, after, status);
    }
    
    // Field resolver for User in Order
    public User user(Order order) {
        return userService.getUserById(order.getUserId());
    }
}

// DataLoader for N+1 problem
@Component
public class DataLoaderConfiguration {
    
    @Autowired
    private UserService userService;
    
    @Bean
    public DataLoader<Long, User> userDataLoader() {
        return DataLoader.newMappedDataLoader((Set<Long> userIds) -> {
            List<User> users = userService.getUsersByIds(userIds);
            return users.stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));
        });
    }
    
    @Bean
    public DataLoaderRegistry dataLoaderRegistry() {
        DataLoaderRegistry registry = new DataLoaderRegistry();
        registry.register("userDataLoader", userDataLoader());
        return registry;
    }
}

// 使用DataLoader
@Component
public class OptimizedOrderResolver {
    
    public CompletableFuture<User> user(Order order, DataFetchingEnvironment env) {
        DataLoader<Long, User> userDataLoader = env.getDataLoader("userDataLoader");
        return userDataLoader.load(order.getUserId());
    }
}
```

## 5. API 安全

### JWT认证

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(
            @Valid @RequestBody LoginRequest loginRequest) {
        
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);
        
        return ResponseEntity.ok(new JwtAuthenticationResponse(
            jwt, 
            refreshToken,
            tokenProvider.getExpirationTime()
        ));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {
        
        String refreshToken = request.getRefreshToken();
        
        if (tokenProvider.validateToken(refreshToken)) {
            String username = tokenProvider.getUsernameFromToken(refreshToken);
            UserDetails userDetails = userService.loadUserByUsername(username);
            
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
            
            String newJwt = tokenProvider.generateToken(authentication);
            String newRefreshToken = tokenProvider.generateRefreshToken(authentication);
            
            return ResponseEntity.ok(new JwtAuthenticationResponse(
                newJwt, 
                newRefreshToken,
                tokenProvider.getExpirationTime()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(null);
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(
            @RequestHeader("Authorization") String token) {
        
        // 将token加入黑名单
        String jwt = token.substring(7); // 移除"Bearer "前缀
        tokenProvider.invalidateToken(jwt);
        
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
    }
}

@Component
public class JwtTokenProvider {
    
    private static final String JWT_SECRET = "mySecretKey";
    private static final int JWT_EXPIRATION = 86400000; // 24小时
    private static final int REFRESH_TOKEN_EXPIRATION = 604800000; // 7天
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date expiryDate = new Date(System.currentTimeMillis() + JWT_EXPIRATION);
        
        return Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(expiryDate)
            .claim("userId", userPrincipal.getId())
            .claim("roles", userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()))
            .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
            .compact();
    }
    
    public String generateRefreshToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date expiryDate = new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION);
        
        String refreshToken = Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(expiryDate)
            .claim("type", "refresh")
            .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
            .compact();
        
        // 存储refresh token到Redis
        redisTemplate.opsForValue().set(
            "refresh_token:" + userPrincipal.getUsername(),
            refreshToken,
            Duration.ofMillis(REFRESH_TOKEN_EXPIRATION)
        );
        
        return refreshToken;
    }
    
    public boolean validateToken(String token) {
        try {
            // 检查token是否在黑名单中
            if (isTokenBlacklisted(token)) {
                return false;
            }
            
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(JWT_SECRET)
            .parseClaimsJws(token)
            .getBody();
        
        return claims.getSubject();
    }
    
    public void invalidateToken(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(JWT_SECRET)
            .parseClaimsJws(token)
            .getBody();
        
        Date expiration = claims.getExpiration();
        long ttl = expiration.getTime() - System.currentTimeMillis();
        
        if (ttl > 0) {
            redisTemplate.opsForValue().set(
                "blacklist:" + token,
                "true",
                Duration.ofMillis(ttl)
            );
        }
    }
    
    private boolean isTokenBlacklisted(String token) {
        return redisTemplate.hasKey("blacklist:" + token);
    }
}
```

### API限流

```java
@Component
public class RateLimitingFilter implements Filter {
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    private static final int DEFAULT_REQUESTS_PER_MINUTE = 60;
    private static final int DEFAULT_REQUESTS_PER_HOUR = 1000;
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String clientId = getClientId(httpRequest);
        String endpoint = httpRequest.getRequestURI();
        
        RateLimitConfig config = getRateLimitConfig(endpoint);
        
        if (!isRequestAllowed(clientId, endpoint, config)) {
            httpResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
            
            ErrorResponse error = ErrorResponse.builder()
                .code("RATE_LIMIT_EXCEEDED")
                .message("Rate limit exceeded. Try again later.")
                .timestamp(Instant.now())
                .build();
            
            ObjectMapper mapper = new ObjectMapper();
            httpResponse.getWriter().write(mapper.writeValueAsString(error));
            return;
        }
        
        chain.doFilter(request, response);
    }
    
    private String getClientId(HttpServletRequest request) {
        // 优先使用API Key
        String apiKey = request.getHeader("X-API-Key");
        if (apiKey != null) {
            return "api_key:" + apiKey;
        }
        
        // 使用JWT中的用户ID
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                String username = jwtTokenProvider.getUsernameFromToken(token);
                return "user:" + username;
            } catch (Exception e) {
                // 忽略JWT解析错误
            }
        }
        
        // 使用IP地址
        return "ip:" + getClientIpAddress(request);
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
    
    private RateLimitConfig getRateLimitConfig(String endpoint) {
        // 根据端点配置不同的限流规则
        if (endpoint.startsWith("/api/auth/")) {
            return new RateLimitConfig(5, 60, 20, 3600); // 认证端点更严格
        } else if (endpoint.startsWith("/api/admin/")) {
            return new RateLimitConfig(30, 60, 200, 3600); // 管理端点
        } else {
            return new RateLimitConfig(DEFAULT_REQUESTS_PER_MINUTE, 60, DEFAULT_REQUESTS_PER_HOUR, 3600);
        }
    }
    
    private boolean isRequestAllowed(String clientId, String endpoint, RateLimitConfig config) {
        String minuteKey = String.format("rate_limit:%s:%s:minute:%d", 
            clientId, endpoint, System.currentTimeMillis() / 60000);
        String hourKey = String.format("rate_limit:%s:%s:hour:%d", 
            clientId, endpoint, System.currentTimeMillis() / 3600000);
        
        // 检查分钟级限制
        Long minuteCount = redisTemplate.opsForValue().increment(minuteKey);
        if (minuteCount == 1) {
            redisTemplate.expire(minuteKey, Duration.ofSeconds(config.getMinuteWindow()));
        }
        
        if (minuteCount > config.getRequestsPerMinute()) {
            return false;
        }
        
        // 检查小时级限制
        Long hourCount = redisTemplate.opsForValue().increment(hourKey);
        if (hourCount == 1) {
            redisTemplate.expire(hourKey, Duration.ofSeconds(config.getHourWindow()));
        }
        
        return hourCount <= config.getRequestsPerHour();
    }
    
    @Data
    @AllArgsConstructor
    private static class RateLimitConfig {
        private int requestsPerMinute;
        private int minuteWindow;
        private int requestsPerHour;
        private int hourWindow;
    }
}
```

### API密钥管理

```java
@Entity
@Table(name = "api_keys")
@Data
public class ApiKey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String keyValue;
    
    @Column(nullable = false)
    private String name;
    
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @Enumerated(EnumType.STRING)
    private ApiKeyStatus status;
    
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<ApiScope> scopes;
    
    private Instant expiresAt;
    private Instant createdAt;
    private Instant lastUsedAt;
    
    @Column(name = "rate_limit_per_minute")
    private Integer rateLimitPerMinute;
    
    @Column(name = "rate_limit_per_hour")
    private Integer rateLimitPerHour;
}

enum ApiKeyStatus {
    ACTIVE, SUSPENDED, REVOKED
}

enum ApiScope {
    READ, WRITE, DELETE, ADMIN
}

@Service
public class ApiKeyService {
    
    @Autowired
    private ApiKeyRepository apiKeyRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public ApiKey createApiKey(CreateApiKeyRequest request) {
        String keyValue = generateApiKey();
        String hashedKey = passwordEncoder.encode(keyValue);
        
        ApiKey apiKey = new ApiKey();
        apiKey.setKeyValue(hashedKey);
        apiKey.setName(request.getName());
        apiKey.setDescription(request.getDescription());
        apiKey.setUser(request.getUser());
        apiKey.setStatus(ApiKeyStatus.ACTIVE);
        apiKey.setScopes(request.getScopes());
        apiKey.setExpiresAt(request.getExpiresAt());
        apiKey.setCreatedAt(Instant.now());
        apiKey.setRateLimitPerMinute(request.getRateLimitPerMinute());
        apiKey.setRateLimitPerHour(request.getRateLimitPerHour());
        
        ApiKey savedKey = apiKeyRepository.save(apiKey);
        
        // 返回明文key（仅此一次）
        savedKey.setKeyValue(keyValue);
        return savedKey;
    }
    
    public ApiKey validateApiKey(String keyValue) {
        List<ApiKey> apiKeys = apiKeyRepository.findByStatus(ApiKeyStatus.ACTIVE);
        
        for (ApiKey apiKey : apiKeys) {
            if (passwordEncoder.matches(keyValue, apiKey.getKeyValue())) {
                if (apiKey.getExpiresAt() != null && apiKey.getExpiresAt().isBefore(Instant.now())) {
                    throw new ApiKeyExpiredException("API key has expired");
                }
                
                // 更新最后使用时间
                apiKey.setLastUsedAt(Instant.now());
                apiKeyRepository.save(apiKey);
                
                return apiKey;
            }
        }
        
        throw new InvalidApiKeyException("Invalid API key");
    }
    
    private String generateApiKey() {
        return "ak_" + UUID.randomUUID().toString().replace("-", "");
    }
}

@Component
public class ApiKeyAuthenticationFilter implements Filter {
    
    @Autowired
    private ApiKeyService apiKeyService;
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String apiKey = httpRequest.getHeader("X-API-Key");
        
        if (apiKey != null) {
            try {
                ApiKey validatedKey = apiKeyService.validateApiKey(apiKey);
                
                // 创建认证对象
                ApiKeyAuthenticationToken authentication = 
                    new ApiKeyAuthenticationToken(validatedKey);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                
            } catch (Exception e) {
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                httpResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
                httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
                
                ErrorResponse error = ErrorResponse.builder()
                    .code("INVALID_API_KEY")
                    .message(e.getMessage())
                    .timestamp(Instant.now())
                    .build();
                
                ObjectMapper mapper = new ObjectMapper();
                httpResponse.getWriter().write(mapper.writeValueAsString(error));
                return;
            }
        }
        
        chain.doFilter(request, response);
    }
}
```

## 6. API 文档

### OpenAPI/Swagger 配置

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.example.controller"))
            .paths(PathSelectors.regex("/api/.*"))
            .build()
            .apiInfo(apiInfo())
            .securitySchemes(Arrays.asList(apiKeyScheme(), bearerScheme()))
            .securityContexts(Arrays.asList(securityContext()));
    }
    
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("User Management API")
            .description("RESTful API for user management system")
            .version("2.0")
            .contact(new Contact("API Team", "https://example.com", "api@example.com"))
            .license("MIT License")
            .licenseUrl("https://opensource.org/licenses/MIT")
            .build();
    }
    
    private SecurityScheme apiKeyScheme() {
        return new ApiKey("X-API-Key", "X-API-Key", "header");
    }
    
    private SecurityScheme bearerScheme() {
        return new ApiKey("Authorization", "Authorization", "header");
    }
    
    private SecurityContext securityContext() {
        return SecurityContext.builder()
            .securityReferences(defaultAuth())
            .forPaths(PathSelectors.regex("/api/.*"))
            .build();
    }
    
    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        
        return Arrays.asList(
            new SecurityReference("X-API-Key", authorizationScopes),
            new SecurityReference("Authorization", authorizationScopes)
        );
    }
}

// 控制器注解示例
@RestController
@RequestMapping("/api/v1/users")
@Api(tags = "User Management", description = "Operations related to user management")
public class UserController {
    
    @GetMapping
    @ApiOperation(
        value = "Get all users",
        notes = "Retrieve a paginated list of users with optional search functionality",
        response = PagedResponse.class
    )
    @ApiResponses({
        @ApiResponse(code = 200, message = "Successfully retrieved users"),
        @ApiResponse(code = 400, message = "Invalid request parameters"),
        @ApiResponse(code = 401, message = "Unauthorized"),
        @ApiResponse(code = 403, message = "Forbidden")
    })
    public ResponseEntity<PagedResponse<UserDto>> getUsers(
            @ApiParam(value = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            
            @ApiParam(value = "Page size", example = "20")
            @RequestParam(defaultValue = "20") int size,
            
            @ApiParam(value = "Search term for username or email")
            @RequestParam(required = false) String search) {
        
        PagedResponse<UserDto> users = userService.getUsers(page, size, search);
        return ResponseEntity.ok(users);
    }
    
    @PostMapping
    @ApiOperation(
        value = "Create a new user",
        notes = "Create a new user with the provided information"
    )
    @ApiResponses({
        @ApiResponse(code = 201, message = "User created successfully"),
        @ApiResponse(code = 400, message = "Invalid user data"),
        @ApiResponse(code = 409, message = "User already exists")
    })
    public ResponseEntity<UserDto> createUser(
            @ApiParam(value = "User creation data", required = true)
            @Valid @RequestBody CreateUserRequest request) {
        
        UserDto createdUser = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}

// DTO注解示例
@Data
@ApiModel(description = "User information")
public class UserDto {
    
    @ApiModelProperty(value = "User ID", example = "123", readOnly = true)
    private Long id;
    
    @ApiModelProperty(value = "Username", example = "john_doe", required = true)
    private String username;
    
    @ApiModelProperty(value = "Email address", example = "john@example.com", required = true)
    private String email;
    
    @ApiModelProperty(value = "First name", example = "John")
    private String firstName;
    
    @ApiModelProperty(value = "Last name", example = "Doe")
    private String lastName;
    
    @ApiModelProperty(value = "User creation timestamp", readOnly = true)
    private Instant createdAt;
    
    @ApiModelProperty(value = "User roles")
    private List<RoleDto> roles;
}
```

## 总结

API设计是现代软件开发的核心技能，需要考虑多个方面：

1. **RESTful设计**：遵循REST原则，合理使用HTTP方法和状态码
2. **版本控制**：选择合适的版本控制策略，确保向后兼容
3. **安全性**：实施认证、授权、限流等安全措施
4. **性能优化**：使用缓存、分页、字段选择等技术
5. **文档化**：提供清晰、完整的API文档
6. **监控**：实施全面的API监控和日志记录

良好的API设计不仅提高了开发效率，还为系统的长期维护和扩展奠定了坚实基础。在设计API时，要始终从用户角度出发，追求简洁、一致、可预测的接口设计。