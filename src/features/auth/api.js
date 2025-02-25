/**
 * Authentication API services
 */

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Login result
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch('https://api-freelancehub.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store user data in localStorage
      localStorage.setItem('usuario_id', data.usuario_id);
      localStorage.setItem('usuario_email', email);
      
      return {
        success: true,
        user: {
          usuario_id: data.usuario_id,
          usuario_email: email
        }
      };
    } else {
      return {
        success: false,
        error: data.error || 'Credenciales incorrectas'
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Error de conexión. Intenta nuevamente.'
    };
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Registration result
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch('https://api-freelancehub.vercel.app/agregar-usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Usuario registrado exitosamente'
      };
    } else {
      return {
        success: false,
        error: data.error || 'Error al registrar usuario'
      };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Error de conexión. Intenta nuevamente.'
    };
  }
};

/**
 * Logout a user
 * @returns {Object} Logout result
 */
export const logoutUser = () => {
  try {
    // Clear localStorage
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('usuario_email');
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: 'Error al cerrar sesión'
    };
  }
};

/**
 * Request a password reset code
 * @param {string} email - User email
 * @returns {Promise<Object>} Request result
 */
export const requestPasswordReset = async (email) => {
  try {
    // For demo purposes, simulate a successful response
    // In production, this would call the actual API
    /* 
    const response = await fetch('https://api-freelancehub.vercel.app/reset-password-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Código enviado exitosamente'
      };
    } else {
      return {
        success: false,
        error: data.error || 'Error al enviar código'
      };
    }
    */
    
    // Simulate API response
    return {
      success: true,
      message: 'Código enviado exitosamente'
    };
  } catch (error) {
    console.error('Password reset request error:', error);
    return {
      success: false,
      error: 'Error de conexión. Intenta nuevamente.'
    };
  }
};

/**
 * Verify a password reset code
 * @param {string} email - User email
 * @param {string} code - Verification code
 * @returns {Promise<Object>} Verification result
 */
export const verifyPasswordResetCode = async (email, code) => {
  try {
    // For demo purposes, simulate a successful response
    // In production, this would call the actual API
    /* 
    const response = await fetch('https://api-freelancehub.vercel.app/verify-reset-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Código verificado correctamente'
      };
    } else {
      return {
        success: false,
        error: data.error || 'Código inválido o expirado'
      };
    }
    */
    
    // Simulate API response (accept 123456 as valid code)
    if (code === '123456') {
      return {
        success: true,
        message: 'Código verificado correctamente'
      };
    } else {
      return {
        success: false,
        error: 'Código inválido o expirado'
      };
    }
  } catch (error) {
    console.error('Code verification error:', error);
    return {
      success: false,
      error: 'Error de conexión. Intenta nuevamente.'
    };
  }
};

/**
 * Reset user password
 * @param {string} email - User email
 * @param {string} code - Verification code
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Reset result
 */
export const resetPassword = async (email, code, newPassword) => {
  try {
    // For demo purposes, simulate a successful response
    // In production, this would call the actual API
    /* 
    const response = await fetch('https://api-freelancehub.vercel.app/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code, newPassword }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Contraseña actualizada correctamente'
      };
    } else {
      return {
        success: false,
        error: data.error || 'Error al actualizar contraseña'
      };
    }
    */
    
    // Simulate API response
    return {
      success: true,
      message: 'Contraseña actualizada correctamente'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: 'Error de conexión. Intenta nuevamente.'
    };
  }
};

export default {
  loginUser,
  logoutUser,
  requestPasswordReset,
  verifyPasswordResetCode,
  resetPassword
}; 