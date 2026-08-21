const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:5000';

export interface ApiError {
  field: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  admin?: T;
  errors?: ApiError[];
}

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const isFormData =
    typeof FormData !== 'undefined' &&
    options.body instanceof FormData;

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      credentials: 'include',

      headers: isFormData
        ? {
            ...options.headers
          }
        : {
            'Content-Type': 'application/json',
            ...options.headers
          },

      cache: 'no-store'
    }
  );

  let result: ApiResponse<T>;

  try {
    result =
      (await response.json()) as ApiResponse<T>;
  } catch {
    throw new Error(
      'Invalid response from server'
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message ?? 'Request failed'
    );
  }

  return result;
};

export const api = {
  get: async <T>(
    endpoint: string
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'GET'
    });
  },

  post: async <T>(
    endpoint: string,
    body?: unknown
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'POST',
      body:
        body === undefined
          ? undefined
          : JSON.stringify(body)
    });
  },

  /**
   * POST multipart/form-data.
   *
   * Do not manually set Content-Type here.
   * The browser automatically adds the multipart
   * boundary required by Multer.
   */
  postForm: async <T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'POST',
      body: formData
    });
  },

  patch: async <T>(
    endpoint: string,
    body?: unknown
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'PATCH',
      body:
        body === undefined
          ? undefined
          : JSON.stringify(body)
    });
  },

  delete: async <T>(
    endpoint: string
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'DELETE'
    });
  }
};