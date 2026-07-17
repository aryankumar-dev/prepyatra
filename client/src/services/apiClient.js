'use client';

import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

const apiClient = {
  register({ fullName, email, password, username, role, courseId }) {
    return http
      .post('/api/v1/auth/register', { fullName, email, password, username, role, courseId })
      .then((res) => res.data);
  },

  login(email, password) {
    return http.post('/api/v1/auth/login', { email, password }).then((res) => res.data);
  },

  logout() {
    return http.post('/api/v1/auth/logout').then((res) => res.data);
  },

  getCurrentUser() {
    return http.get('/api/v1/auth/me').then((res) => res.data);
  },

  updateProfile(data) {
    return http.put('/api/v1/auth/profile', data).then((res) => res.data);
  },

  changePassword(currentPassword, newPassword) {
    return http.put('/api/v1/auth/change-password', { currentPassword, newPassword }).then((res) => res.data);
  },

  getMyPrepLogs() {
    return http.get('/api/v1/preplogs/my').then((res) => res.data);
  },

  createPrepLog(data) {
    return http.post('/api/v1/preplogs/', data).then((res) => res.data);
  },

  updatePrepLog(id, data) {
    return http.put(`/api/v1/preplogs/${id}`, data).then((res) => res.data);
  },

  deletePrepLog(id) {
    return http.delete(`/api/v1/preplogs/${id}`).then((res) => res.data);
  },

  getMyRecruiterNetwork() {
    return http.get('/api/v1/recruiternetwork/my').then((res) => res.data);
  },

  createRecruiterNetwork(data) {
    return http.post('/api/v1/recruiternetwork/create', data).then((res) => res.data);
  },

  updateRecruiterNetwork(id, data) {
    return http.put(`/api/v1/recruiternetwork/${id}`, data).then((res) => res.data);
  },

  deleteRecruiterNetwork(id) {
    return http.delete(`/api/v1/recruiternetwork/${id}`).then((res) => res.data);
  },

  getChatResponse(message) {
    return http.post('/api/chat', { message }).then((res) => res.data.reply);
  },

  getCourses() {
    return http.get('/api/v1/courses').then((res) => res.data);
  },

  getResourcesByCourse(courseId) {
    return http.get('/api/v1/resources', { params: { courseId } }).then((res) => res.data);
  },

  createTuitionRequest(data) {
    return http.post('/api/v1/tuition-requests', data).then((res) => res.data);
  },

  getMyTuitionRequests() {
    return http.get('/api/v1/tuition-requests/my').then((res) => res.data);
  },

  getOpenTuitionRequests() {
    return http.get('/api/v1/tuition-requests/open').then((res) => res.data);
  },

  getMyTutoringJobs() {
    return http.get('/api/v1/tuition-requests/mine-as-tutor').then((res) => res.data);
  },

  offerTuition(id, price) {
    return http.put(`/api/v1/tuition-requests/${id}/offer`, { price }).then((res) => res.data);
  },

  respondTuition(id, accept) {
    return http.put(`/api/v1/tuition-requests/${id}/respond`, { accept }).then((res) => res.data);
  },

  createCourse(data) {
    return http.post('/api/v1/courses', data).then((res) => res.data);
  },

  getAdminStats() {
    return http.get('/api/v1/admin/stats').then((res) => res.data);
  },

  getAdminUsers() {
    return http.get('/api/v1/admin/users').then((res) => res.data);
  },

  getAdminAppointments() {
    return http.get('/api/v1/admin/appointments').then((res) => res.data);
  },

  blockUser(id) {
    return http.put(`/api/v1/admin/users/${id}/block`).then((res) => res.data);
  },

  unblockUser(id) {
    return http.put(`/api/v1/admin/users/${id}/unblock`).then((res) => res.data);
  },

  getPendingOffers() {
    return http.get('/api/v1/admin/pending-offers').then((res) => res.data);
  },

  getOpenOffers() {
    return http.get('/api/v1/admin/open-offers').then((res) => res.data);
  },

  getUnblockRequests() {
    return http.get('/api/v1/admin/unblock-requests').then((res) => res.data);
  },

  denyUnblockRequest(id) {
    return http.put(`/api/v1/admin/unblock-requests/${id}/deny`).then((res) => res.data);
  },

  submitUnblockRequest(email, message) {
    return http.post('/api/v1/unblock-requests', { email, message }).then((res) => res.data);
  },
};

export default apiClient;
