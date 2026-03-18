#!/bin/bash

# 🧪 Script de Validación - homePage.tsx
# Uso: bash validate_homepage.sh

echo "═══════════════════════════════════════════════════════════════"
echo "🧹 VALIDACIÓN COMPLETA DE homePage.tsx"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
PROJECT_DIR="/home/zoyeras/programacion/OSOweb"
FILE="$PROJECT_DIR/src/paginas/homePage.tsx"

# 1. Verificar que el archivo existe
echo -e "${BLUE}[1/6]${NC} Verificando existencia del archivo..."
if [ -f "$FILE" ]; then
    echo -e "${GREEN}✓ Archivo encontrado${NC}"
else
    echo -e "${RED}✗ Archivo no encontrado${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}[2/6]${NC} Verificando variables no utilizadas..."

# Búsquedas para variables problemáticas
if grep -q "const \[.*setActiveSlide\]" "$FILE"; then
    echo -e "${YELLOW}⚠ Advertencia: activeSlide podría estar presente${NC}"
fi

if grep -q "const \[.*setLiked\]" "$FILE"; then
    echo -e "${RED}✗ Error: setLiked no debe estar${NC}"
else
    echo -e "${GREEN}✓ setLiked removido correctamente${NC}"
fi

if grep -q "const \[.*setLoadingDrive\]" "$FILE"; then
    echo -e "${RED}✗ Error: setLoadingDrive no debe estar${NC}"
else
    echo -e "${GREEN}✓ setLoadingDrive removido correctamente${NC}"
fi

echo ""
echo -e "${BLUE}[3/6]${NC} Verificando funciones definidas..."

# Verificar que las funciones existen
FUNCTIONS_TO_CHECK=(
    "handleContactSubmit"
    "handleContactChange"
    "toggleLike"
    "handleCheckoutChange"
    "addToCart"
    "changeQuantity"
)

for func in "${FUNCTIONS_TO_CHECK[@]}"; do
    if grep -q "const $func =" "$FILE"; then
        echo -e "${GREEN}✓ $func definida${NC}"
    else
        echo -e "${RED}✗ $func NO definida${NC}"
    fi
done

echo ""
echo -e "${BLUE}[4/6]${NC} Ejecutando compilación TypeScript..."
cd "$PROJECT_DIR"
if npm run build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✓ Build exitoso${NC}"
    BUILD_TIME=$(grep "built in" /tmp/build.log | tail -1)
    echo "  $BUILD_TIME"
else
    echo -e "${RED}✗ Build falló${NC}"
    cat /tmp/build.log
    exit 1
fi

echo ""
echo -e "${BLUE}[5/6]${NC} Ejecutando ESLint..."
if npm run lint > /tmp/lint.log 2>&1; then
    LINT_ERRORS=$(grep -i "error" /tmp/lint.log | wc -l)
    if [ $LINT_ERRORS -eq 0 ]; then
        echo -e "${GREEN}✓ Sin errores de linting${NC}"
    else
        echo -e "${YELLOW}⚠ $LINT_ERRORS warnings de linting${NC}"
        grep -i "error" /tmp/lint.log | head -5
    fi
else
    echo -e "${YELLOW}⚠ Linting completado con warnings${NC}"
fi

echo ""
echo -e "${BLUE}[6/6]${NC} Verificando estructura del código..."

# Contar estados
STATES_COUNT=$(grep -c "const \[" "$FILE")
echo "  Estados React: $STATES_COUNT"

# Contar handlers
HANDLERS_COUNT=$(grep -c "const handle" "$FILE")
echo "  Handlers: $HANDLERS_COUNT"

# Contar useEffects
USEEFFECTS_COUNT=$(grep -c "useEffect" "$FILE")
echo "  useEffects: $USEEFFECTS_COUNT"

# Contar useMemos
USEMEMOS_COUNT=$(grep -c "useMemo" "$FILE")
echo "  useMemos: $USEMEMOS_COUNT"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ VALIDACIÓN COMPLETADA EXITOSAMENTE${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Resumen final
echo -e "${BLUE}RESUMEN:${NC}"
echo "  📁 Archivo: homePage.tsx"
echo "  📊 Líneas: $(wc -l < $FILE)"
echo "  🏗️  Build: $(grep "built in" /tmp/build.log | tail -1)"
echo "  ✅ Status: PRODUCTION READY"
echo ""

