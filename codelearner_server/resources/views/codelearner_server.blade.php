<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Route List</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex flex-col">
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Laravel Route List</h1>
        @if (empty($routes))
            <p class="text-red-600 text-center">No routes found. Please check the JSON file.</p>
        @else
            <p class="text-gray-600 mb-4 text-center">Total Routes: {{ count($routes) }}</p>
            <div class="bg-white shadow-md rounded-lg overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-800 text-white">
                            <th class="p-4">Method</th>
                            <th class="p-4">URI</th>
                            <th class="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($routes as $route)
                            <tr class="border-b hover:bg-gray-50">
                                <td class="p-4 text-gray-700">{{ $route['method'] ?? 'N/A' }}</td>
                                <td class="p-4 text-gray-700">{{ $route['uri'] ?? 'N/A' }}</td>
                                <td class="p-4 text-gray-700">{{ $route['action'] ?? 'N/A' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
</body>
</html>