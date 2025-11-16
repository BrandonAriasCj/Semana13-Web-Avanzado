import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl text-gray-900 font-bold">
              Dashboard
            </h1>
            <LogoutButton />
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Bienvenido
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Nombre:</span> {session?.user?.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {session?.user?.email}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                ✅ Autenticación Exitosa
              </h3>
              <p className="text-blue-800 text-sm">
                Has iniciado sesión correctamente. Esta página está protegida y solo es accesible para usuarios autenticados.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Proveedores de Autenticación Disponibles:
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Credenciales (Email/Password)</li>
                <li>Google OAuth</li>
                <li>GitHub OAuth</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
