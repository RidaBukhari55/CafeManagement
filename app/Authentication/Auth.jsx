// auth.js
const API_KEY = 'tumhara_firebase_api_key_here'; // Replace with your actual Firebase Web API key

export async function signUp(email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  return data;
}

export async function logIn(email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  return data;
}
