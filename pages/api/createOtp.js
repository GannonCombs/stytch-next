import * as stytch from 'stytch';

const stytchClient = new stytch.Client({
    project_id: "project-test-cdc40567-3409-4bcf-b27f-f35b920c224c",
    secret: "secret-test-qBd5SmYeO4Atv53XpH2Mg70TNNZDgQBdH90=",
    env: stytch.envs.test,
  });

export default async (req, res) => {
  if (req.method === "POST") {
    const { phoneNumber } = req.body;

    try {
      const response = await stytchClient.otps.sms.loginOrCreate({
        phone_number: phoneNumber,
      });

      res.status(200).json(response);
    } catch (error) {
      console.error("Stytch error:", error);
      res.status(500).json({ error: "Stytch OTP creation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
