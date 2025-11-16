'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center">
          Iniciar Sesión
        </h1>

        {registered && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            ¡Registro exitoso! Ahora puedes iniciar sesión.
          </div>
        )}

        <LoginForm />

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">¿No tienes cuenta? </span>
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
