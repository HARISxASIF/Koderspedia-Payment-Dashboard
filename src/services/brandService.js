// src/services/packagesService.js
import axios from 'axios';
import axiosInstance from '../api/axios';

const BrandService = {
    getAll: () => axiosInstance.get('/brands'),

    create: (formData) => {
        const data = new FormData();

        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('address', formData.address);
        if (formData.logo) {
            data.append('logo', formData.logo);
        }

        return axiosInstance.post('/brands/store', data);
    },

    update: (id, formData) => {
        const data = new FormData();
        if (formData.name !== null && formData.name !== undefined) {
            data.append('name', formData.name);
        }
        if (formData.email !== null && formData.email !== undefined) {
            data.append('email', formData.email);
        }
        if (formData.address !== null && formData.address !== undefined) {
            data.append('address', formData.address);
        }
        if (formData.logo) {
            data.append('logo', formData.logo); // Only if logo is selected
        }
        return axiosInstance.post(`/brands/update/${id}`, data); // POST if Laravel doesn't accept PUT with multipart
    },

    delete: (id) => axiosInstance.delete(`/brands/delete/${id}`),

};

export default BrandService;
