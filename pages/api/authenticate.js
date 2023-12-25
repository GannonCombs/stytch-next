import * as stytch from 'stytch';

const stytchClient = new stytch.Client({
  project_id: "project-test-cdc40567-3409-4bcf-b27f-f35b920c224c",
  secret: "secret-test-qBd5SmYeO4Atv53XpH2Mg70TNNZDgQBdH90=",
  env: stytch.envs.test,
});

export default async (req, res) => {
  if (req.method === "GET") {
    const { token } = req.query;

    try {
      const response = await stytchClient.magicLinks.authenticate(token);

      if (response.status === "success") {
        res.status(200).json({ email: response.email });
      } else {
        res.status(401).json({ error: "Authentication failed" });
      }
    } catch (error) {
      console.error("Stytch error:", error);
      res.status(500).json({ error: "Stytch authentication failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
