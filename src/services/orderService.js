import api from './api';

const orderService = {
    /**
     * Get user orders
     */
    getOrders(status = null, page = 1) {
        let url = `orders?page=${page}`;
        if (status && status !== 'all') {
            url += `&status=${status}`;
        }
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
