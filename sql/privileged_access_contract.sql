-- Reviewed source contract for privileged-access drift review.
select
  lane_id,
  segment,
  privileged_accounts,
  vaulted_coverage_percent,
  rotation_age_days,
  checkout_policy_gap_count,
  unreviewed_break_glass_accounts,
  stale_owner_count,
  session_recording_coverage_percent,
  owner,
  next_action
from identity.privileged_access_drift_evidence
where as_of_date = current_date
  and pam_status in ('contained', 'watch', 'escalate')
order by checkout_policy_gap_count desc, rotation_age_days desc, unreviewed_break_glass_accounts desc;
