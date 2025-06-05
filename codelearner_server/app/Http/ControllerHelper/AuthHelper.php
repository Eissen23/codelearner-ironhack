<?php

namespace App\Http\ControllerHelper;

use App\Models\User;
use Illuminate\Http\Request;
use stdClass;
use function Laravel\Prompts\select;

class AuthHelper
{
    public static function createDeviceToken(User $user, Request $request): array
    {
        $deviceName = self::generateDeviceName($request);
        $deviceType = self::getDeviceType($request);

        // Delete existing token for this device (if any)
        $user->tokens()
            ->where('device_name', $deviceName)
            ->where('device_type', $deviceType)
            ->delete();

        // Clean up old tokens (keep last 5 devices)
        self::cleanupOldTokens($user, 5);

        // Create new token with device info
        $token = $user->createToken(
            $user->account_name . '-' . $deviceType,
            ['*'], // abilities
            now()->addDays(30) // expiration
        );

        // Update the token with device information
        $token->accessToken->update([
            'device_name' => $deviceName,
            'device_type' => $deviceType,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'last_used_at' => now()
        ]);

        return [
            'token' => $token->plainTextToken,
            'device_name' => $deviceName,
        ];
    }

    public static function generateDeviceName(Request $request)
    {
        $request->user();
        $userAgent = $request->userAgent();
        $ip = $request->ip();

        // Create a unique but recognizable device name
        $browser = self::getBrowserName($userAgent);
        $os = self::getOSName($userAgent);

        return $browser . ' on ' . $os . ' (' . substr($ip, 0, 7) . '...)';
    }

    public static function getDeviceType(Request $request)
    {
        $userAgent = strtolower($request->userAgent());

        if (str_contains($userAgent, 'mobile') || str_contains($userAgent, 'android') || str_contains($userAgent, 'iphone')) {
            return 'mobile';
        }

        return 'web';
    }

    public static function cleanupOldTokens(User $user, int $maxTokens)
    {
        $tokenCount = $user->tokens()->count();

        if ($tokenCount >= $maxTokens) {
            $tokensToDelete = $user->tokens()
                ->orderBy('last_used_at', 'asc')
                ->take($tokenCount - $maxTokens + 1)
                ->get();

            foreach ($tokensToDelete as $token) {
                $token->delete();
            }
        }
    }

    private static function getBrowserName($userAgent)
    {
        if (str_contains($userAgent, 'Chrome'))
            return 'Chrome';
        if (str_contains($userAgent, 'Firefox'))
            return 'Firefox';
        if (str_contains($userAgent, 'Safari'))
            return 'Safari';
        if (str_contains($userAgent, 'Edge'))
            return 'Edge';

        return 'Unknown Browser';
    }

    private static function getOSName($userAgent)
    {
        if (str_contains($userAgent, 'Windows'))
            return 'Windows';
        if (str_contains($userAgent, 'Mac'))
            return 'macOS';
        if (str_contains($userAgent, 'Linux'))
            return 'Linux';
        if (str_contains($userAgent, 'Android'))
            return 'Android';
        if (str_contains($userAgent, 'iPhone'))
            return 'iOS';

        return 'Unknown OS';
    }


}