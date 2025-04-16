import api from './api';

const handleApiError = (error) => {
  // Handle authentication errors specifically
  if (error.response && error.response.status === 401) {
    console.error('Authentication failed. Please check your credentials.');
  }
  throw error;
};

const fileService = {
  getFiles: () => api.get('/api/getAllSidefiles').catch(handleApiError),
  getExcelFiles: () => api.get('/api/getAllXlxfiles').catch(handleApiError),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('files', file);
    return api.post('/api/uploadAction', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'text',
    }).catch(handleApiError);
  },
  deleteFileSide: (fileName) => api.delete(`/api/deleteAllSideFiles`, { data: fileName }).catch(handleApiError),
  deleteFileXlxs: (fileName) => api.delete(`/upload/deleteAllXlxFiles`, { data: fileName }).catch(handleApiError),
  convertToExcel: (fileName, useCase) =>
    api.post(`/api/convert-to-excel?useCase=${useCase}`, [fileName], {
      headers: { 'Content-Type': 'application/json' },
    }).catch(handleApiError),
  executeUploadAction: () => api.post('/api/executeUploadAction').catch(handleApiError),
  runCode: (fileId) => api.post(`/api/runCode`, { fileId }).catch(handleApiError),
  executeUseCases: (fileNames, options = {}) =>
    api.post('/execute/executeUseCases', {
      excelFilePaths: Array.isArray(fileNames) ? fileNames : [fileNames],
      waitTime: options.waitTime || 3000,
      captureScreenshot: options.captureScreenshot !== false,
      webTestingInParallel: options.webTestingInParallel || false,
    }).catch(handleApiError),
  recordUseCases: (record = true) =>
    api.post(`/api/recordUseCases?Record=${record}`).catch(handleApiError),
};

export default fileService;
