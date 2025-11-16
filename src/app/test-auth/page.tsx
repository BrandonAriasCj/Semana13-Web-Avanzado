'use client';

import { useState } from 'react';

export default function TestAuthPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string, success: boolean) => {
    const emoji = success ? '✅' : '❌';
    setTestResults(prev => [...prev, `${emoji} ${message}`]);
  };

  const testRegistration = async () => {
    try {
      const testUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'test123456',
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser),
      });

      const data = await response.json();

      if (response.ok) {
        addResult('Registro exitoso', true);
        return testUser;
      } else {
        addResult(`Error en registro: ${data.error}`, false);
        return null;
      }
    } catch (error) {
      addResult('Error de conexión en registro', false);
      return null;
    }
  };

  const testDuplicateRegistration = async () => {
    try {
      const testUser = {
        name: 'Duplicate User',
        email: 'duplicate@example.com',
        password: 'test123456',
      };

      // Primer registro
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser),
      });

      // Segundo registro (debe fallar)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser),
      });

      if (!response.ok) {
        addResult('Validación de usuario duplicado funciona', true);
      } else {
        addResult('Validación de usuario duplicado falló', false);
      }
    } catch (error) {
      addResult('Error en test de duplicados', false);
    }
  };

  const testPasswordValidation = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test',
          email: 'test@example.com',
          password: '123', // Muy corta
        }),
      });

      if (!response.ok) {
        addResult('Validación de longitud de contraseña funciona', true);
      } else {
        addResult('Validación de longitud de contraseña falló', false);
      }
    } catch (error) {
      addResult('Error en test de validación', false);
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);

    addResult('Iniciando pruebas de autenticación...', true);

    // Test 1: Registro exitoso
    await testRegistration();

    // Test 2: Usuario duplicado
    await testDuplicateRegistration();

    // Test 3: Validación de contraseña
    await testPasswordValidation();

    addResult('Pruebas completadas', true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl text-gray-900 font-bold mb-4">
            🧪 Pruebas de Autenticación
          </h1>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              Esta página te permite probar las funcionalidades de autenticación implementadas.
            </p>

            <button
              onClick={runAllTests}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Ejecutando pruebas...' : 'Ejecutar Pruebas'}
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h2 className="font-semibold text-gray-900 mb-3">Resultados:</h2>
              <div className="space-y-2 font-mono text-sm">
                {testResults.map((result, index) => (
                  <div key={index} className="text-gray-700">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Pruebas Manuales Recomendadas:
            </h3>
            <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
              <li>Registrar un usuario en /register</li>
              <li>Iniciar sesión con credenciales correctas</li>
              <li>Intentar login con contraseña incorrecta 5 veces (bloqueo)</li>
              <li>Probar login con Google OAuth</li>
              <li>Probar login con GitHub OAuth</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
