function Get-PrivilegedAccessDriftScore {
    param(
        [double]$VaultedCoveragePercent,
        [int]$RotationAgeDays,
        [int]$CheckoutPolicyGapCount,
        [int]$UnreviewedBreakGlassAccounts,
        [int]$StaleOwnerCount,
        [double]$SessionRecordingCoveragePercent
    )

    $raw = [Math]::Max(0, 98 - $VaultedCoveragePercent) * 2.1 +
        $RotationAgeDays * 0.55 +
        $CheckoutPolicyGapCount * 8 +
        $UnreviewedBreakGlassAccounts * 9.5 +
        $StaleOwnerCount * 4.5 +
        [Math]::Max(0, 95 - $SessionRecordingCoveragePercent) * 1.2

    [Math]::Round([Math]::Max(0, [Math]::Min(100, $raw)), 2)
}

function Get-PrivilegedAccessPosture {
    param([double]$DriftScore)

    if ($DriftScore -ge 68) { return "escalate" }
    if ($DriftScore -ge 34) { return "watch" }
    return "contained"
}
