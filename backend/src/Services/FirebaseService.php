<?php

declare(strict_types=1);

namespace App\Services;

final class FirebaseService
{
    /**
     * Placeholder de servicio Firebase.
     *
     * Próximo paso:
     * - Cargar credenciales desde FIREBASE_CREDENTIALS.
     * - Inicializar cliente de Firestore.
     */
    public function isConfigured(): bool
    {
        $credentials = $_ENV['FIREBASE_CREDENTIALS'] ?? '';

        return $credentials !== '';
    }
}
