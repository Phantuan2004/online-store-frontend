const productImages = import.meta.glob('../../../assets/user/img/product/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default'
});

const getProductImage = (filename) => {
    return productImages[`../../../assets/user/img/product/${filename}`] || '';
};

/**
 * Cart Data
 * Sample cart items and metadata
 */

export const cartItemsData = [
    {
        id: 1,
        name: 'Organic Lemon',
        image: getProductImage('1.jpg'),
        price: 56.00,
        quantity: 1,
        category: 'Fruits'
    },
    {
        id: 2,
        name: 'Apple Juice',
        image: getProductImage('2.jpg'),
        price: 75.00,
        quantity: 1,
        category: 'Beverages'
    },
    {
        id: 3,
        name: 'Watermelon 5kg Pack',
        image: getProductImage('3.jpg'),
        price: 48.00,
        quantity: 1,
        category: 'Fruits'
    },
    {
        id: 4,
        name: 'Pomegranate 5kg Pack',
        image: getProductImage('4.jpg'),
        price: 90.00,
        quantity: 1,
        category: 'Fruits'
    },
    {
        id: 5,
        name: 'Organic Peach Fruits',
        image: getProductImage('5.jpg'),
        price: 50.00,
        quantity: 1,
        category: 'Fruits'
    }
];

/**
 * Popular products to display below cart
 */
export const popularProductsData = [
    {
        id: 101,
        name: 'Best snakes with hazel nut mix pack 200gm',
        image: getProductImage('9.jpg'),
        price: 120.25,
        oldPrice: 123.25,
        category: 'Snacks',
        rating: 4.5,
        reviews: 48
    },
    {
        id: 102,
        name: 'Sweet snakes crunchy nut mix 250gm pack',
        image: getProductImage('10.jpg'),
        price: 100.00,
        oldPrice: 110.00,
        category: 'Snacks',
        rating: 5.0,
        reviews: 62
    },
    {
        id: 103,
        name: 'Organic Lemon Juice 500ml',
        image: getProductImage('1.jpg'),
        price: 95.00,
        oldPrice: 105.00,
        category: 'Beverages',
        rating: 4.8,
        reviews: 35
    },
    {
        id: 104,
        name: 'Fresh Vegetables Bundle',
        image: getProductImage('3.jpg'),
        price: 125.00,
        oldPrice: 140.00,
        category: 'Vegetables',
        rating: 4.7,
        reviews: 44
    }
];

/**
 * Shipping rates
 */
export const shippingRates = {
    standard: 5.00,
    express: 12.00,
    free: 0
};

/**
 * Tax rate (%)
 */
export const TAX_RATE = 10;

/**
 * Free shipping threshold
 */
export const FREE_SHIPPING_THRESHOLD = 100.00;
