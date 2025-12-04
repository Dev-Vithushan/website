#!/bin/bash

# API Testing Script using curl
# Make sure your server is running on http://localhost:5000

BASE_URL="http://localhost:5000/api"
TOKEN=""
USER_ID=""
PRODUCT_ID=""

echo "🚀 Starting API Tests..."
echo "Base URL: $BASE_URL"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to make API calls
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local use_token=$4
    
    local headers=(-H "Content-Type: application/json")
    if [ "$use_token" = "true" ] && [ -n "$TOKEN" ]; then
        headers+=(-H "Authorization: Bearer $TOKEN")
    fi
    
    if [ "$method" = "GET" ] || [ "$method" = "DELETE" ]; then
        if [ -n "$data" ]; then
            curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" "${headers[@]}" "$BASE_URL$endpoint?$data"
        else
            curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" "${headers[@]}" "$BASE_URL$endpoint"
        fi
    else
        curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" "${headers[@]}" -d "$data" "$BASE_URL$endpoint"
    fi
}

# Test function
test_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    local use_token=$5
    local expected_status=$6
    
    echo -e "${YELLOW}Testing: $name${NC}"
    response=$(api_call "$method" "$endpoint" "$data" "$use_token")
    http_code=$(echo "$response" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
    body=$(echo "$response" | sed 's/HTTP_STATUS:[0-9]*$//')
    
    if [ "$http_code" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASSED${NC} - Status: $http_code"
        echo "Response: $body" | head -c 200
        echo ""
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ FAILED${NC} - Expected: $expected_status, Got: $http_code"
        echo "Response: $body"
        FAILED=$((FAILED + 1))
        return 1
    fi
    echo ""
}

# 1. Health Check
test_endpoint "Health Check" "GET" "/health" "" "false" "200"

# 2. Register User
echo -e "${YELLOW}Testing: User Registration${NC}"
REGISTER_DATA='{"name":"Test User","email":"test'$(date +%s)'@example.com","password":"test123456"}'
response=$(api_call "POST" "/auth/register" "$REGISTER_DATA" "false")
http_code=$(echo "$response" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
body=$(echo "$response" | sed 's/HTTP_STATUS:[0-9]*$//')

if [ "$http_code" = "201" ]; then
    echo -e "${GREEN}✅ PASSED${NC} - Status: $http_code"
    TOKEN=$(echo "$body" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    USER_ID=$(echo "$body" | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
    echo "Token saved: ${TOKEN:0:20}..."
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ FAILED${NC} - Status: $http_code"
    echo "Response: $body"
    FAILED=$((FAILED + 1))
fi
echo ""

# 3. Login (if registration failed, try with existing user)
if [ -z "$TOKEN" ]; then
    echo -e "${YELLOW}Testing: User Login${NC}"
    LOGIN_DATA='{"email":"test@example.com","password":"test123456"}'
    response=$(api_call "POST" "/auth/login" "$LOGIN_DATA" "false")
    http_code=$(echo "$response" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
    body=$(echo "$response" | sed 's/HTTP_STATUS:[0-9]*$//')
    
    if [ "$http_code" = "200" ]; then
        TOKEN=$(echo "$body" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
        USER_ID=$(echo "$body" | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
        echo -e "${GREEN}✅ PASSED${NC} - Status: $http_code"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌ FAILED${NC} - Status: $http_code"
        FAILED=$((FAILED + 1))
    fi
    echo ""
fi

# Continue with other tests only if we have a token
if [ -n "$TOKEN" ]; then
    # 4. Get Current User
    test_endpoint "Get Current User" "GET" "/auth/me" "" "true" "200"
    
    # 5. Get Products
    echo -e "${YELLOW}Testing: Get Products${NC}"
    response=$(api_call "GET" "/products" "" "false")
    http_code=$(echo "$response" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
    body=$(echo "$response" | sed 's/HTTP_STATUS:[0-9]*$//')
    
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ PASSED${NC} - Status: $http_code"
        PRODUCT_ID=$(echo "$body" | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)
        if [ -n "$PRODUCT_ID" ]; then
            echo "Product ID saved: $PRODUCT_ID"
        fi
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌ FAILED${NC} - Status: $http_code"
        FAILED=$((FAILED + 1))
    fi
    echo ""
    
    # 6. Get Single Product (if we have a product ID)
    if [ -n "$PRODUCT_ID" ]; then
        test_endpoint "Get Single Product" "GET" "/products/$PRODUCT_ID" "" "false" "200"
    fi
    
    # 7. Get My Profile
    test_endpoint "Get My Profile" "GET" "/users/profile/me" "" "true" "200"
    
    # 8. Update My Profile
    test_endpoint "Update My Profile" "PUT" "/users/profile/me" '{"name":"Updated Test User"}' "true" "200"
    
    # 9. Get All Users
    test_endpoint "Get All Users" "GET" "/users" "" "true" "200"
    
    # 10. Get Single User
    if [ -n "$USER_ID" ]; then
        test_endpoint "Get Single User" "GET" "/users/$USER_ID" "" "true" "200"
    fi
    
    # 11. Add to Wishlist
    if [ -n "$PRODUCT_ID" ]; then
        test_endpoint "Add to Wishlist" "POST" "/wishlist" "{\"productId\":\"$PRODUCT_ID\"}" "true" "200"
    fi
    
    # 12. Get Wishlist
    test_endpoint "Get Wishlist" "GET" "/wishlist" "" "true" "200"
    
    # 13. Add to Cart
    if [ -n "$PRODUCT_ID" ]; then
        test_endpoint "Add to Cart" "POST" "/cart" "{\"productId\":\"$PRODUCT_ID\",\"quantity\":2}" "true" "200"
    fi
    
    # 14. Get Cart
    test_endpoint "Get Cart" "GET" "/cart" "" "true" "200"
    
    # 15. Update Cart Item
    if [ -n "$PRODUCT_ID" ]; then
        test_endpoint "Update Cart Item" "PUT" "/cart/$PRODUCT_ID" '{"quantity":3}' "true" "200"
    fi
    
    # 16. Newsletter Subscribe
    test_endpoint "Newsletter Subscribe" "POST" "/newsletter" "{\"email\":\"newsletter$(date +%s)@example.com\"}" "false" "201"
else
    echo -e "${RED}⚠️  Cannot continue tests - No authentication token available${NC}"
fi

# Summary
echo ""
echo "=================================================="
echo "📊 TEST SUMMARY"
echo "=================================================="
echo -e "${GREEN}✅ Passed: $PASSED${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
TOTAL=$((PASSED + FAILED))
if [ $TOTAL -gt 0 ]; then
    SUCCESS_RATE=$(echo "scale=1; $PASSED * 100 / $TOTAL" | bc)
    echo "📈 Success Rate: ${SUCCESS_RATE}%"
fi
echo "=================================================="

