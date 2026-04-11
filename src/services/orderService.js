import api from './api';

const orderService = {
    /**
     * Get user orders
     */
    getOrders(status = null) {
        const url = status ? `orders?status=${status}` : 'orders';
        return api.get(url);
    },

    /**
     * Get order detail
     */
    getOrder(id) {
        return api.get(`orders/${id}`);
    },

    /**
     * Place a new order
     * @param {Object} orderData { address_id, payment_method, notes }
     */
    placeOrder(orderData) {
        return api.post('orders', orderData);
    },

    /**
     * Cancel an order
     */
    cancelOrder(id) {
        return api.post(`orders/${id}/cancel`);
    }
};

export default orderService;
