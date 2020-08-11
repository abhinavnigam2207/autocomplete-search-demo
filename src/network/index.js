const errorObject = async (res) => {
  const body = await res.json();
  const error = new Error(body.errorMessage || body.error || body);
  error.statusCode = res.status;
  error.statusText = res.statusText;
  error.dynMsg = { ...body.dynMsg };
  error.code = body.errorCode;
  throw error;
};

export const validateResponse = async (resp) => {
  if (!resp.ok) return errorObject(resp);
  return {
    headers: resp.headers,
    data: await resp.json()
  };
};
