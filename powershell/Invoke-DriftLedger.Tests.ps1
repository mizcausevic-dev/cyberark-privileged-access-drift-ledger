. "$PSScriptRoot/Invoke-DriftLedger.ps1"

$domain = Get-PrivilegedAccessDriftScore -VaultedCoveragePercent 88 -RotationAgeDays 47 -CheckoutPolicyGapCount 4 -UnreviewedBreakGlassAccounts 3 -StaleOwnerCount 5 -SessionRecordingCoveragePercent 71
if ((Get-PrivilegedAccessPosture -DriftScore $domain) -ne "escalate") {
    throw "domain-admin-safe should escalate"
}

$cloud = Get-PrivilegedAccessDriftScore -VaultedCoveragePercent 94 -RotationAgeDays 20 -CheckoutPolicyGapCount 1 -UnreviewedBreakGlassAccounts 1 -StaleOwnerCount 2 -SessionRecordingCoveragePercent 88
if ((Get-PrivilegedAccessPosture -DriftScore $cloud) -ne "watch") {
    throw "cloud-root-access should be watch"
}

$dba = Get-PrivilegedAccessDriftScore -VaultedCoveragePercent 97 -RotationAgeDays 12 -CheckoutPolicyGapCount 0 -UnreviewedBreakGlassAccounts 0 -StaleOwnerCount 1 -SessionRecordingCoveragePercent 93
if ((Get-PrivilegedAccessPosture -DriftScore $dba) -ne "contained") {
    throw "database-dba-safe should be contained"
}

Write-Output "powershell contract ok"
