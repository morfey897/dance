
export type EnvType = {
  LANGS: Array<string>;
  SITE: string;
  CDN_PROVIDER: string;
  GOOGLE_API_KEY: string;
  GOOGLE_CALENDAR_ID: string;
  GOOGLE_PROJECT_ID: string;
  GOOGLE_SERVICE_ADDRESS: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
  } | null
};
