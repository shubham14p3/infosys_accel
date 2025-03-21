import api from './api';

const fileService = {
  getFiles: () => api.get('/files'),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteFile: (fileId) => api.delete(`/files/${fileId}`),
};

export default fileService;
