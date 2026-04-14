const fs = require('fs');
const path = require('path');

const files = [
  'components/user/shop/ProductCard.vue',
  'components/user/cart/CartTable.vue',
  'components/user/product/PopularProducts.vue',
  'components/user/product/ProductActionBox.vue',
  'components/user/cart/PopularProductsCart.vue',
  'components/user/product/ProductDetails.vue'
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  if (content.includes('formatCurrencyUtil') && !content.includes('formatCurrency(val)')) {
     if (content.includes('methods: {')) {
        content = content.replace('methods: {', 'methods: {\n    formatCurrency(val) { return formatCurrencyUtil(val); },');
     } else if (content.includes('export default {')) {
        content = content.replace('export default {', "export default {\n  methods: {\n    formatCurrency(val) { return formatCurrencyUtil(val); }\n  },");
     }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', file);
  }
}
