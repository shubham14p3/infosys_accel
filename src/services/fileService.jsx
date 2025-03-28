import api from './api';

const fileService = {
  getFiles: () => api.get('/getAllSidefiles'),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('files', file);
    return api.post('/uploadAction', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'text',
    });
  },
  deleteFile: (fileName) => api.delete(`/deleteAllSideFiles`, { data: [fileName] }),
  convertToExcel: (selectedFile, useCase) =>
    api.post(`/convert-to-excel?useCase=${useCase}`, selectedFile, { responseType: 'text' }),
  executeUploadAction: () => api.post('/executeUploadAction'),
};

export default fileService;
