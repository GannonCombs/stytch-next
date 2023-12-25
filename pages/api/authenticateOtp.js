import * as stytch from 'stytch';

const stytchClient = new stytch.Client({
    project_id: "project-test-cdc40567-3409-4bcf-b27f-f35b920c224c",
    secret: "secret-test-qBd5SmYeO4Atv53XpH2Mg70TNNZDgQBdH90=",
    env: stytch.envs.test,
  });

export default async (req, res) => {
  if (req.method === "POST") {
    const { methodId, code } = req.body;
    console.log("Method: " , methodId)
    console.log("Code: " , code)

    try {
      const response = await stytchClient.otps.authenticate({
        method_id: methodId,
        code: code,
      });

      console.log("Response: ", response);

      if (response.status_code === 200) {
        res.status(200).json({ phone_number: response.phone_number });
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
