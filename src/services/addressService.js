import api from './api';

const addressService = {
    /**
     * Get all addresses for current user
     */
    getAddresses() {
        return api.get('addresses');
    },

    /**
     * Create a new address
     */
    createAddress(addressData) {
        return api.post('addresses', addressData);
    },

    /**
     * Update an existing address
     */
    updateAddress(id, addressData) {
        return api.put(`addresses/${id}`, addressData);
    },

    /**
     * Delete an address
     */
    deleteAddress(id) {
        return api.delete(`addresses/${id}`);
    }
};

export default addressService;
