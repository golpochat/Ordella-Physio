export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;

export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const CUID_REGEX = /^c[a-z0-9]{24,}$/i;

/** Local Docker seed user/entity ids (e.g. dev_user_therapist). */
export const DEV_SEED_ID_REGEX = /^dev_[a-z0-9_]+$/i;

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
