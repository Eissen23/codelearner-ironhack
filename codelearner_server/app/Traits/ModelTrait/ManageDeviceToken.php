<?php

namespace App\Traits\ModelTrait;

trait ManageDeviceToken
{
    // In your User model
    public function getActiveDevices()
    {
        return $this->tokens()
            ->select('device_name', 'device_type', 'ip_address', 'last_used_at', 'created_at')
            ->orderBy('last_used_at', 'desc')
            ->get();
    }

    public function revokeDeviceToken($deviceName)
    {
        return $this->tokens()
            ->where('device_name', $deviceName)
            ->delete();
    }

    public function revokeAllTokensExceptCurrent($currentTokenId)
    {
        return $this->tokens()
            ->where('id', '!=', $currentTokenId)
            ->delete();
    }

}
