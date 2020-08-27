interface UploadProgressEvent {
  total: number;
  loaded: number;
}

export interface OnUploadProgress {
  (event: UploadProgressEvent): void;
}
