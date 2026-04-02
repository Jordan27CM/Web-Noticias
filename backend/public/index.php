<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($path === '/api/health' && $method === 'GET') {
    echo json_encode([
        'status' => 'ok',
        'service' => 'web-noticias-api',
        'timestamp' => gmdate('c'),
    ]);
    exit;
}

if ($path === '/api/news' && $method === 'GET') {
    echo json_encode([
        'data' => [],
        'message' => 'Endpoint inicial. Aquí se conectará Firestore.',
    ]);
    exit;
}

http_response_code(404);
echo json_encode([
    'error' => 'Ruta no encontrada',
]);
