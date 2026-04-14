const fs = require('fs');
const path = require('path');

const files = [
  'pages/user/TrackOrder.vue',
  'pages/user/Profile.vue',
  'pages/user/Checkout.vue',
  'components/user/home/FeaturedProducts.vue',
  'components/user/product/PopularProducts.vue',
  'components/user/product/ProductActionBox.vue',
  'components/user/product/ProductDetails.vue',
  'components/user/shop/ProductCard.vue',
  'components/user/MyCart.vue',
  'components/user/cart/PopularProductsCart.vue',
  'components/user/cart/CartTable.vue'
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Not found: ${filePath}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace ${{ abc }} with {{ formatCurrency(abc) }}
  content = content.replace(/\$\{\{\s*(.*?)\s*\}\}/g, (match, p1) => {
    let expr = p1.trim();
    if (expr.startsWith('formatPrice(') && expr.endsWith(')')) {
       expr = expr.substring(12, expr.length - 1);
    }
    return `{{ formatCurrency(${expr}) }}`;
  });
  
  // Replace $ {{ abc }} with {{ formatCurrency(abc) }}
  content = content.replace(/\$\s*\{\{\s*(.*?)\s*\}\}/g, (match, p1) => {
    let expr = p1.trim();
    if (expr.startsWith('formatPrice(') && expr.endsWith(')')) {
       expr = expr.substring(12, expr.length - 1);
    }
    return `{{ formatCurrency(${expr}) }}`;
  });

  // Inject import if changed
  if (content !== originalContent || content.includes('formatCurrency')) {
    if (!content.includes('@/utils/currency')) {
        const importStmt = `import { formatCurrency as formatCurrencyUtil } from '@/utils/currency';\n`;
        if (content.includes('<script setup>')) {
            content = content.replace('<script setup>', `<script setup>\nimport { formatCurrency } from '@/utils/currency';`);
        } else if (content.includes('<script>')) {
            content = content.replace('<script>', `<script>\n${importStmt}`);
            
            // Expose it to options API template
            if (content.includes('methods: {') && !content.includes('formatCurrency(')) {
                content = content.replace('methods: {', `methods: {\n    formatCurrency(val) { return formatCurrencyUtil(val); },`);
            } else if (!content.includes('methods: {') && content.includes('export default {')) {
                content = content.replace('export default {', `export default {\n  methods: {\n    formatCurrency(val) { return formatCurrencyUtil(val); }\n  },`);
            }
        }
    }
  }

  // remove local formatPrice definitions inside methods
  if (content.includes('formatPrice(')) {
      // Very basic regex that handles formatPrice(price) { ... } inside methods
      content = content.replace(/\s*formatPrice\([^)]*\)\s*\{[^}]*\},?/g, '');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
}
